import type { PaymentResult } from '../../types';
import { getAshStatusInfo, getUserFacingMessage } from './ash-status';

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
    if (ashStatus && ashStatus !== '0') {
      const info = getAshStatusInfo(ashStatus);
      return {
        success: false,
        errorCode: `ASH_${ashStatus}`,
        errorMessage: getUserFacingMessage(ashStatus) ?? info.msg,
        errorCategory: info.category,
        rawResponse: xml,
      };
    }
    return {
      success: false,
      errorCode: `RC_${resultCode}`,
      errorMessage: buildResultCodeMessage(resultCode, status),
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
 * Maps Caspit-level `<ResultCode>` errors (terminal/Caspit side, distinct from
 * credit-company errors which are handled by the AshStatus lookup table).
 *
 * Common codes:
 * - `10044` — user cancelled on terminal (pressed ×)
 * - `10050` — duplicate Xfield (same order ID charged twice)
 * - `10041` — pinpad unreachable
 * - `10053` — pinpad connected but returned empty response
 * - `10048` — terminal hardware/connection error (see Status)
 */
function buildResultCodeMessage(resultCode: string | undefined, status: string | undefined): string {
  if (resultCode === '10044') return 'User cancelled on terminal';
  if (resultCode === '10050') return 'Duplicate transaction (Xfield already used)';
  if (resultCode === '10041') return 'Cannot reach Pinpad';
  if (resultCode === '10053') return 'Pinpad returned empty response';
  if (resultCode === '10048') return `Terminal error (Status ${status})`;
  return `Terminal error (ResultCode ${resultCode})`;
}
