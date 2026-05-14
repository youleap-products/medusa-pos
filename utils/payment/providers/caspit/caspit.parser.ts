import type { PaymentResult } from '../../types';

function extractTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`, 'i'));
  return match?.[1]?.trim();
}

export function parseResponse(xml: string | null | undefined): PaymentResult {
  if (!xml) {
    return { success: false, errorCode: 'NO_RESPONSE', errorMessage: 'Terminal returned no data' };
  }

  try {
    const resultCode = extractTag(xml, 'ResultCode');
    const status = extractTag(xml, 'Status');
    const ashStatus = extractTag(xml, 'AshStatus');

    // All three must be '0' for approval — checking any subset is wrong
    const success = resultCode === '0' && status === '0' && ashStatus === '0';

    if (success) {
      return {
        success: true,
        uid: extractTag(xml, 'Uid'),               // save for void/cancel
        authManpikNo: extractTag(xml, 'AuthManpikNo'),
        pan: extractTag(xml, 'Pan'),
        cardName: extractTag(xml, 'CardName'),
        rawResponse: xml,
      };
    }

    // Determine which status field carries the real error
    // AshStatus != 0 → credit company error (check AshStatus first)
    // AshStatus == 0 but ResultCode != 0 → Caspit-level error
    const errorCode = ashStatus !== '0'
      ? `ASH_${ashStatus}`
      : `RC_${resultCode}`;

    return {
      success: false,
      errorCode,
      errorMessage: buildErrorMessage(resultCode, status, ashStatus),
      rawResponse: xml,
    };
  } catch {
    return {
      success: false,
      errorCode: 'PARSE_ERROR',
      errorMessage: 'Failed to parse terminal response',
      rawResponse: xml,
    };
  }
}

function buildErrorMessage(
  resultCode: string | undefined,
  status: string | undefined,
  ashStatus: string | undefined
): string {
  if (ashStatus && ashStatus !== '0') {
    if (ashStatus === '4') return 'Declined by credit company';
    if (ashStatus === '443') return 'Original transaction not found (already transmitted or wrong Uid)';
    return `Credit company error (AshStatus ${ashStatus})`;
  }
  if (resultCode === '10044') return 'User cancelled on terminal';
  if (resultCode === '10050') return 'Duplicate transaction (Xfield already used)';
  if (resultCode === '10041') return 'Cannot reach Pinpad';
  if (resultCode === '10053') return 'Pinpad returned empty response';
  if (resultCode === '10048') return `Terminal error (Status ${status})`;
  return `Terminal error (ResultCode ${resultCode})`;
}
