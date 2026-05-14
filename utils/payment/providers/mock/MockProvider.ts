import type { PaymentProvider, ChargeParams, RefundParams, VoidParams, PaymentResult } from '../../types';

let mockShouldFail = false;
let mockDelay = 800;

export const MockControls = {
  setFail: (v: boolean) => { mockShouldFail = v; },
  setDelay: (ms: number) => { mockDelay = ms; },
};

export class MockProvider implements PaymentProvider {
  private simulate(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, mockDelay));
  }

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

  async refund(params: RefundParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return { success: true, uid: `mock-refund-${Date.now()}`, rawResponse: { mock: true, params } };
  }

  async void(params: VoidParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return { success: true, uid: params.originalUid, rawResponse: { mock: true, params } };
  }

  async getStatus(xfield: string): Promise<PaymentResult> {
    await this.simulate();
    return { success: true, rawResponse: { mock: true, xfield } };
  }
}
