import type { PaymentResult } from '../../types';

/**
 * Extracts the inner text of the first matching XML tag (case-insensitive).
 * Uses a simple regex rather than a full XML parser — Caspit responses are
 * flat, single-depth XML so this is safe and avoids a native dependency.
 *
 * @param xml - Raw XML string from the terminal
 * @param tag - Tag name to look for (e.g. `'ResultCode'`)
 * @returns The trimmed tag content, or `undefined` if the tag is absent
 */
function extractTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`, 'i'));
  return match?.[1]?.trim();
}

/**
 * Parses a raw Caspit XML response into a normalized `PaymentResult`.
 *
 * **Success rule:** All three fields must equal `'0'`:
 * - `ResultCode` — Caspit-level processing result
 * - `Status` — terminal hardware/connection status
 * - `AshStatus` — credit company (Ashrait/issuer) authorization status
 *
 * **Error priority:** `AshStatus !== '0'` takes precedence (credit company declined),
 * otherwise `ResultCode` carries the error (Caspit/terminal error).
 *
 * On success, extracts `Uid` (save this — needed for void/cancel), `AuthManpikNo`
 * (issuer auth number), `Pan` (masked card), and `CardName`.
 *
 * @param xml - Raw XML string from the terminal, or null/undefined if no response
 * @returns Normalized `PaymentResult` — never throws
 */
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

/**
 * Maps known Caspit/Ashrait error codes to human-readable messages.
 * `AshStatus` errors (credit company) are checked first since they're the most
 * actionable for the cashier ("card declined" vs a terminal error).
 *
 * Common codes:
 * - `AshStatus 4` — declined by issuer
 * - `AshStatus 443` — original transaction not found (already transmitted or wrong Uid)
 * - `ResultCode 10044` — user cancelled on terminal (pressed ×)
 * - `ResultCode 10050` — duplicate Xfield (same order ID charged twice)
 * - `ResultCode 10041` — pinpad unreachable
 * - `ResultCode 10053` — pinpad connected but returned empty response
 *
 * @param resultCode - Value of `<ResultCode>` from the response
 * @param status - Value of `<Status>` from the response
 * @param ashStatus - Value of `<AshStatus>` from the response
 */
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
