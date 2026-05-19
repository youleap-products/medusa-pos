import {
  buildChargeXml,
  buildRefundXml,
  buildVoidXml,
  buildQueryXml,
  buildCommTestXml,
  type CaspitWireConfig,
} from '../providers/caspit/caspit-xml';

const mockConfig: CaspitWireConfig = { terminalId: '0880381', termNo: '001' };

function extractTag(xml: string, name: string): string | undefined {
  return xml.match(new RegExp(`<${name}>([^<]*)<\/${name}>`))?.[1];
}

describe('buildChargeXml', () => {
  it('uses Command 001 and Mti 100', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'Command')).toBe('001');
    expect(extractTag(xml, 'Mti')).toBe('100');
  });

  it('uses TranType 1 for charge', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'TranType')).toBe('1');
  });

  it('sets amount correctly', () => {
    const xml = buildChargeXml({ amount: 15050, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'Amount')).toBe('15050');
  });

  it('sets currency to 376 (NIS)', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'Currency')).toBe('376');
  });

  it('sets PanEntryMode to PinPad', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'PanEntryMode')).toBe('PinPad');
  });

  it('puts orderId into Xfield', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'ord-abc123' }, mockConfig);
    expect(extractTag(xml, 'Xfield')).toBe('ord-abc123');
  });

  it('throws INVALID_XFIELD when orderId > 19 chars', () => {
    expect(() =>
      buildChargeXml({ amount: 10000, orderId: '01234567890123456789' }, mockConfig) // 20 chars
    ).toThrow('Xfield too long');
  });

  it('accepts orderId exactly 19 chars', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: '0123456789012345678' }, mockConfig); // 19 chars
    expect(extractTag(xml, 'Xfield')).toBe('0123456789012345678');
  });

  it('includes TimeoutInSeconds 90', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'TimeoutInSeconds')).toBe('90');
  });

  it('wraps in <Request>...</Request>', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(xml).toMatch(/^<Request>/);
    expect(xml).toMatch(/<\/Request>$/);
  });

  it('injects TerminalId and TermNo from config', () => {
    const xml = buildChargeXml({ amount: 10000, orderId: 'order-123' }, mockConfig);
    expect(extractTag(xml, 'TerminalId')).toBe('0880381');
    expect(extractTag(xml, 'TermNo')).toBe('001');
  });
});

describe('buildRefundXml', () => {
  it('uses TranType 53 for refund', () => {
    const xml = buildRefundXml({ amount: 5000, xfield: 'refund-001' }, mockConfig);
    expect(extractTag(xml, 'TranType')).toBe('53');
  });

  it('uses Mti 100', () => {
    const xml = buildRefundXml({ amount: 5000, xfield: 'refund-001' }, mockConfig);
    expect(extractTag(xml, 'Mti')).toBe('100');
  });

  it('sets amount and xfield correctly', () => {
    const xml = buildRefundXml({ amount: 5000, xfield: 'refund-001' }, mockConfig);
    expect(extractTag(xml, 'Amount')).toBe('5000');
    expect(extractTag(xml, 'Xfield')).toBe('refund-001');
  });

  it('throws INVALID_XFIELD when xfield > 19 chars', () => {
    expect(() =>
      buildRefundXml({ amount: 5000, xfield: '01234567890123456789' }, mockConfig) // 20 chars
    ).toThrow('Xfield too long');
  });
});

describe('buildVoidXml', () => {
  const voidParams = {
    originalUid: '12345678901234567890123',
    xfield: 'void-001',
    amount: 10000,
    creditTerms: '1',
    tranType: '1',
  };

  it('uses Mti 400 for void', () => {
    const xml = buildVoidXml(voidParams, mockConfig);
    expect(extractTag(xml, 'Mti')).toBe('400');
  });

  it('includes OriginalUid from params', () => {
    const xml = buildVoidXml(voidParams, mockConfig);
    expect(extractTag(xml, 'OriginalUid')).toBe(voidParams.originalUid);
  });

  it('uses provided creditTerms and tranType', () => {
    const xml = buildVoidXml({ ...voidParams, creditTerms: '8', tranType: '5' }, mockConfig);
    expect(extractTag(xml, 'CreditTerms')).toBe('8');
    expect(extractTag(xml, 'TranType')).toBe('5');
  });

  it('throws INVALID_XFIELD when xfield > 19 chars', () => {
    expect(() =>
      buildVoidXml({ ...voidParams, xfield: '01234567890123456789' }, mockConfig) // 20 chars
    ).toThrow('Xfield too long');
  });
});

describe('buildQueryXml', () => {
  it('uses Command 012', () => {
    const xml = buildQueryXml('order-123', mockConfig);
    expect(extractTag(xml, 'Command')).toBe('012');
  });

  it('sets Xfield from argument', () => {
    const xml = buildQueryXml('order-123', mockConfig);
    expect(extractTag(xml, 'Xfield')).toBe('order-123');
  });

  it('accepts LAST as xfield for last-transaction lookup', () => {
    const xml = buildQueryXml('LAST', mockConfig);
    expect(extractTag(xml, 'Xfield')).toBe('LAST');
  });
});

describe('buildCommTestXml', () => {
  it('uses Command 003', () => {
    const xml = buildCommTestXml(mockConfig);
    expect(extractTag(xml, 'Command')).toBe('003');
  });

  it('includes CheckShva 1', () => {
    const xml = buildCommTestXml(mockConfig);
    expect(extractTag(xml, 'CheckShva')).toBe('1');
  });

  it('injects TerminalId from config', () => {
    const xml = buildCommTestXml(mockConfig);
    expect(extractTag(xml, 'TerminalId')).toBe('0880381');
  });
});
