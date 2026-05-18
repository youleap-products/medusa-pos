import { CaspitAdapter } from '../providers/caspit/CaspitAdapter';

// Mock react-native so tests run without a device
jest.mock('react-native', () => ({
  NativeModules: {
    IntentBridge: {
      sendIntent: jest.fn(),
    },
  },
  Platform: {
    OS: 'android',
  },
}));

import { NativeModules, Platform } from 'react-native';
const mockSendIntent = NativeModules.IntentBridge.sendIntent as jest.Mock;

const APPROVED_XML = [
  '<Response>',
  '<ResultCode>0</ResultCode>',
  '<Status>0</Status>',
  '<AshStatus>0</AshStatus>',
  '<Uid>12345678901234567890123</Uid>',
  '<AuthManpikNo>654321</AuthManpikNo>',
  '<Pan>000400XXXXXX1234</Pan>',
  '<CardName>Visa Gold</CardName>',
  '</Response>',
].join('');

const DECLINED_XML = [
  '<Response>',
  '<ResultCode>0</ResultCode>',
  '<Status>0</Status>',
  '<AshStatus>4</AshStatus>',
  '</Response>',
].join('');

beforeEach(() => {
  jest.clearAllMocks();
  (Platform as any).OS = 'android';
});

describe('CaspitAdapter.charge', () => {
  it('calls sendIntent with charge XML and returns parsed result', async () => {
    mockSendIntent.mockResolvedValue(APPROVED_XML);
    const adapter = new CaspitAdapter();
    const result = await adapter.charge({ amount: 10000, orderId: 'order-001' });

    expect(mockSendIntent).toHaveBeenCalledTimes(1);
    const sentXml: string = mockSendIntent.mock.calls[0][0];
    expect(sentXml).toContain('<Command>001</Command>');
    expect(sentXml).toContain('<TranType>1</TranType>');
    expect(sentXml).toContain('<Amount>10000</Amount>');
    expect(sentXml).toContain('<Xfield>order-001</Xfield>');

    expect(result.success).toBe(true);
    expect(result.uid).toBe('12345678901234567890123');
    expect(result.authManpikNo).toBe('654321');
  });

  it('returns failure when terminal declines', async () => {
    mockSendIntent.mockResolvedValue(DECLINED_XML);
    const adapter = new CaspitAdapter();
    const result = await adapter.charge({ amount: 10000, orderId: 'order-001' });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('ASH_4');
  });

  it('returns CANCELLED when user presses Back (Kotlin rejects)', async () => {
    const cancelled = Object.assign(new Error('User cancelled'), { code: 'CANCELLED' });
    mockSendIntent.mockRejectedValue(cancelled);
    const adapter = new CaspitAdapter();
    const result = await adapter.charge({ amount: 10000, orderId: 'order-001' });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('CANCELLED');
  });

  it('returns TIMEOUT on JS-side timeout', async () => {
    jest.useFakeTimers();
    mockSendIntent.mockImplementation(() => new Promise(() => {})); // never resolves

    const adapter = new CaspitAdapter();
    const chargePromise = adapter.charge({ amount: 10000, orderId: 'order-001' });

    jest.advanceTimersByTime(100_001);
    const result = await chargePromise;

    jest.clearAllTimers();
    jest.useRealTimers();

    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('TIMEOUT');
  });

  it('returns PLATFORM_UNSUPPORTED on non-Android', async () => {
    (Platform as any).OS = 'ios';
    const adapter = new CaspitAdapter();
    const result = await adapter.charge({ amount: 10000, orderId: 'order-001' });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('PLATFORM_UNSUPPORTED');
  });

  it('returns INVALID_XFIELD when orderId > 19 chars', async () => {
    const adapter = new CaspitAdapter();
    const result = await adapter.charge({ amount: 10000, orderId: '01234567890123456789' }); // 20 chars
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_XFIELD');
  });
});

describe('CaspitAdapter.refund', () => {
  it('sends refund XML with TranType 53', async () => {
    mockSendIntent.mockResolvedValue(APPROVED_XML);
    const adapter = new CaspitAdapter();
    await adapter.refund({ amount: 5000, xfield: 'refund-001' });

    const sentXml: string = mockSendIntent.mock.calls[0][0];
    expect(sentXml).toContain('<TranType>53</TranType>');
    expect(sentXml).toContain('<Xfield>refund-001</Xfield>');
  });
});

describe('CaspitAdapter.void', () => {
  it('sends void XML with Mti 400 and OriginalUid', async () => {
    mockSendIntent.mockResolvedValue(APPROVED_XML);
    const adapter = new CaspitAdapter();
    await adapter.void({
      originalUid: '12345678901234567890123',
      xfield: 'void-001',
      amount: 10000,
      creditTerms: '1',
      tranType: '1',
    });

    const sentXml: string = mockSendIntent.mock.calls[0][0];
    expect(sentXml).toContain('<Mti>400</Mti>');
    expect(sentXml).toContain('<OriginalUid>12345678901234567890123</OriginalUid>');
    expect(sentXml).toContain('<Xfield>void-001</Xfield>');
  });
});

describe('CaspitAdapter.getStatus', () => {
  it('sends query XML with Command 012 and the given Xfield', async () => {
    mockSendIntent.mockResolvedValue(APPROVED_XML);
    const adapter = new CaspitAdapter();
    await adapter.getStatus('order-001');

    const sentXml: string = mockSendIntent.mock.calls[0][0];
    expect(sentXml).toContain('<Command>012</Command>');
    expect(sentXml).toContain('<Xfield>order-001</Xfield>');
  });
});
