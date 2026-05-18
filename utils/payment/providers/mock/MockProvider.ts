import type { PaymentProvider, ChargeParams, RefundParams, VoidParams, PaymentResult } from '../../types';

let mockShouldFail = false;
let mockDelay = 800;

/**
 * Test controls for the mock provider.
 * Use in dev/test code to simulate terminal failures or adjust simulated latency.
 *
 * @example
 * MockControls.setFail(true);   // next call returns MOCK_DECLINE
 * MockControls.setDelay(2000);  // simulate a slow terminal (2 s)
 * MockControls.setFail(false);  // back to success
 */
export const MockControls = {
  setFail: (v: boolean) => { mockShouldFail = v; },
  setDelay: (ms: number) => { mockDelay = ms; },
};

export class MockProvider implements PaymentProvider {
  /**
   * Simulates terminal processing latency.
   * Waits `mockDelay` ms before resolving — mirrors the real pinpad roundtrip
   * so UI loading states are exercised during development.
   */
  private simulate(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, mockDelay));
  }

  /**
   * Simulates a successful card charge.
   * Returns a fake `uid`, masked PAN, and card name.
   * If `MockControls.setFail(true)`, returns `MOCK_DECLINE` instead.
   *
   * @param params.amount - Charge amount in agorot (unused by mock, echoed in rawResponse)
   * @param params.orderId - Medusa order ID (unused by mock, echoed in rawResponse)
   */
  async charge(params: ChargeParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return {
      success: true,
      uid: `mock-uid-${Date.now()}`,
      pan: '000400XXXXXX1234',
      cardName: 'Mock Visa',
      rawResponse: { mock: true, params },
    };
  }

  /**
   * Simulates a successful refund.
   * Returns a unique `uid` prefixed with `mock-refund-`.
   * If `MockControls.setFail(true)`, returns `MOCK_DECLINE`.
   *
   * @param params.amount - Refund amount in agorot (echoed in rawResponse)
   * @param params.xfield - Xfield for this refund (echoed in rawResponse)
   */
  async refund(params: RefundParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return { success: true, uid: `mock-refund-${Date.now()}`, rawResponse: { mock: true, params } };
  }

  /**
   * Simulates a successful void.
   * Echoes back the `originalUid` as the result `uid` — mirrors real Caspit
   * behavior where a void response references the original transaction.
   * If `MockControls.setFail(true)`, returns `MOCK_DECLINE`.
   *
   * @param params.originalUid - Uid of the transaction being voided
   */
  async void(params: VoidParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return { success: true, uid: params.originalUid, rawResponse: { mock: true, params } };
  }

  /**
   * Simulates a transaction status query. Always returns success — the mock
   * has no stored transaction history to look up, so it assumes the transaction
   * exists. Use `MockControls.setFail` if you need to test not-found scenarios.
   *
   * @param xfield - The Xfield to query (echoed in rawResponse)
   */
  async getStatus(xfield: string): Promise<PaymentResult> {
    await this.simulate();
    return { success: true, rawResponse: { mock: true, xfield } };
  }
}
