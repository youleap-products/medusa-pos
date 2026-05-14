import type { ChargeParams, RefundParams, VoidParams } from '../../types';

const TERMINAL_ID = process.env.EXPO_PUBLIC_CASPIT_TERMINAL_ID ?? '';
const TERM_NO = process.env.EXPO_PUBLIC_CASPIT_TERM_NO ?? '001';
const CURRENCY_NIS = '376';
const TIMEOUT = '90';

function requestId(): string {
  return Date.now().toString(); // 13 digits, always unique enough for POS use
}

// Xfield max 19 chars. Medusa order IDs are 32 chars — shortening strategy TBD.
// Throws if caller passes an already-shortened ID that's still too long.
function validateXfield(xfield: string): string {
  if (xfield.length > 19) {
    throw Object.assign(
      new Error(`Xfield too long: ${xfield.length} chars (max 19)`),
      { code: 'INVALID_XFIELD' }
    );
  }
  return xfield;
}

function tag(name: string, value: string): string {
  return `<${name}>${value}</${name}>`;
}

function baseRequest(command: string, extraTags: string[]): string {
  return [
    '<Request>',
    tag('Command', command),
    tag('RequestId', requestId()),
    tag('TerminalId', TERMINAL_ID),
    tag('TermNo', TERM_NO),
    tag('TimeoutInSeconds', TIMEOUT),
    ...extraTags,
    '</Request>',
  ].join('');
}

export function buildChargeXml(params: ChargeParams): string {
  return baseRequest('001', [
    tag('Mti', '100'),
    tag('CreditTerms', '1'),
    tag('TranType', '1'),
    tag('Amount', String(params.amount)),
    tag('Currency', CURRENCY_NIS),
    tag('PanEntryMode', 'PinPad'),
    tag('Xfield', validateXfield(params.orderId)),
  ]);
}

export function buildRefundXml(params: RefundParams): string {
  // Independent refund — cardholder presents card, no link to original transaction
  return baseRequest('001', [
    tag('Mti', '100'),
    tag('CreditTerms', '1'),
    tag('TranType', '53'),
    tag('Amount', String(params.amount)),
    tag('Currency', CURRENCY_NIS),
    tag('PanEntryMode', 'PinPad'),
    tag('Xfield', validateXfield(params.xfield)),
  ]);
}

export function buildVoidXml(params: VoidParams): string {
  // Cancel an existing transaction that hasn't been transmitted to Shva yet
  // Requires Uid from the original transaction response
  return baseRequest('001', [
    tag('Mti', '400'),
    tag('CreditTerms', params.creditTerms),
    tag('TranType', params.tranType),
    tag('Amount', String(params.amount)),
    tag('Currency', CURRENCY_NIS),
    tag('OriginalUid', params.originalUid),
    tag('Xfield', validateXfield(params.xfield)),
  ]);
}

export function buildQueryXml(xfield: string): string {
  // Command 012: look up a transaction by its Xfield (Medusa order ID)
  // Use this to recover a lost response after a disconnect
  return baseRequest('012', [
    tag('Xfield', xfield),
  ]);
}
