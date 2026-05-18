import type { ChargeParams, RefundParams, VoidParams } from '../../types';

const TERMINAL_ID = process.env.EXPO_PUBLIC_CASPIT_TERMINAL_ID ?? '';
const TERM_NO = process.env.EXPO_PUBLIC_CASPIT_TERM_NO ?? '001';
const CURRENCY_NIS = '376';
const TIMEOUT = '90';

/**
 * Generates a unique request ID for each Caspit XML request.
 * Uses the current timestamp (13 digits) — unique enough for POS single-terminal use.
 */
function requestId(): string {
  return Date.now().toString();
}

/**
 * Validates that an Xfield value fits within Caspit's 19-character limit.
 * Caspit silently truncates or rejects longer values, so we throw early here.
 *
 * @param xfield - The Xfield string to validate (typically a shortened Medusa order ID)
 * @returns The same string if valid
 * @throws `{ code: 'INVALID_XFIELD' }` if longer than 19 chars
 */
function validateXfield(xfield: string): string {
  if (xfield.length > 19) {
    throw Object.assign(
      new Error(`Xfield too long: ${xfield.length} chars (max 19)`),
      { code: 'INVALID_XFIELD' }
    );
  }
  return xfield;
}

/**
 * Wraps a value in an XML tag pair. Used as the single primitive for all XML building.
 *
 * @example tag('Amount', '10000') → '<Amount>10000</Amount>'
 */
function tag(name: string, value: string): string {
  return `<${name}>${value}</${name}>`;
}

/**
 * Builds the common wrapper for every Caspit XML request.
 * Injects terminal identity (TerminalId, TermNo), a unique RequestId, the
 * 90-second pinpad timeout, and the caller-supplied command-specific tags.
 *
 * @param command - Caspit command number (e.g. `'001'` for charge, `'012'` for query)
 * @param extraTags - Pre-serialized XML tag strings specific to the transaction type
 */
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

/**
 * Builds the XML for a regular card-present charge (Cmd 001, TranType 1, Mti 100).
 * The cardholder taps/dips/swipes on the pinpad; no card data is passed in JS.
 *
 * @param params.amount - Charge amount in agorot (100 NIS = 10 000)
 * @param params.orderId - Medusa order ID used as Xfield (must be ≤19 chars)
 */
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

/**
 * Builds the XML for an independent refund (Cmd 001, TranType 53, Mti 100).
 * The cardholder must present their card again — this is NOT linked to the original
 * transaction and does not require a Uid. Use after the original has been transmitted to Shva.
 *
 * @param params.amount - Refund amount in agorot
 * @param params.xfield - New unique Xfield for this refund transaction (≤19 chars)
 */
export function buildRefundXml(params: RefundParams): string {
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

/**
 * Builds the XML to void/cancel a transaction (Cmd 001, Mti 400).
 * Only works on transactions that have NOT yet been transmitted to Shva (end-of-day).
 * Requires the exact `Uid`, `CreditTerms`, `TranType`, and `Amount` from the original charge.
 *
 * @param params.originalUid - 23-digit Uid returned by the original charge response
 * @param params.xfield - NEW unique Xfield for this void (not the original Xfield)
 * @param params.amount - Must equal the original transaction amount
 * @param params.creditTerms - Must equal the original `CreditTerms`
 * @param params.tranType - Must equal the original `TranType`
 */
export function buildVoidXml(params: VoidParams): string {
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

/**
 * Builds the XML to query a transaction by its Xfield (Cmd 012).
 * Used as a recovery tool: if the charge call timed out or disconnected, call this
 * to check whether the terminal actually approved the card before retrying.
 *
 * @param xfield - The Xfield (Medusa order ID) used in the original charge
 */
export function buildQueryXml(xfield: string): string {
  return baseRequest('012', [
    tag('Xfield', xfield),
  ]);
}
