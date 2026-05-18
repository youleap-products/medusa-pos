import { MockProvider, MockControls } from '../providers/mock/MockProvider';

beforeEach(() => {
  MockControls.setFail(false);
  MockControls.setDelay(0); // no delay in tests
});

describe('MockProvider.charge', () => {
  it('returns success with uid, pan, cardName', async () => {
    const provider = new MockProvider();
    const result = await provider.charge({ amount: 10000, orderId: 'order-001' });
    expect(result.success).toBe(true);
    expect(result.uid).toMatch(/^mock-uid-/);
    expect(result.pan).toBe('000400XXXXXX1234');
    expect(result.cardName).toBe('Mock Visa');
  });

  it('returns failure when mockShouldFail=true', async () => {
    MockControls.setFail(true);
    const provider = new MockProvider();
    const result = await provider.charge({ amount: 10000, orderId: 'order-001' });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('MOCK_DECLINE');
  });
});

describe('MockProvider.refund', () => {
  it('returns success with uid', async () => {
    const provider = new MockProvider();
    const result = await provider.refund({ amount: 5000, xfield: 'refund-001' });
    expect(result.success).toBe(true);
    expect(result.uid).toMatch(/^mock-refund-/);
  });

  it('returns failure when mockShouldFail=true', async () => {
    MockControls.setFail(true);
    const provider = new MockProvider();
    const result = await provider.refund({ amount: 5000, xfield: 'refund-001' });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('MOCK_DECLINE');
  });
});

describe('MockProvider.void', () => {
  it('echoes back originalUid on success', async () => {
    const provider = new MockProvider();
    const result = await provider.void({
      originalUid: '12345678901234567890123',
      xfield: 'void-001',
      amount: 10000,
      creditTerms: '1',
      tranType: '1',
    });
    expect(result.success).toBe(true);
    expect(result.uid).toBe('12345678901234567890123');
  });

  it('returns failure when mockShouldFail=true', async () => {
    MockControls.setFail(true);
    const provider = new MockProvider();
    const result = await provider.void({
      originalUid: '12345678901234567890123',
      xfield: 'void-001',
      amount: 10000,
      creditTerms: '1',
      tranType: '1',
    });
    expect(result.success).toBe(false);
  });
});

describe('MockProvider.getStatus', () => {
  it('always returns success', async () => {
    const provider = new MockProvider();
    const result = await provider.getStatus('order-001');
    expect(result.success).toBe(true);
  });

  it('includes xfield in rawResponse', async () => {
    const provider = new MockProvider();
    const result = await provider.getStatus('order-xyz');
    expect((result.rawResponse as any).xfield).toBe('order-xyz');
  });
});
