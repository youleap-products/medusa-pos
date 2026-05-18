import { NativeModules, Platform } from 'react-native';
import type { PaymentProvider, ChargeParams, RefundParams, VoidParams, PaymentResult } from '../../types';
import { buildChargeXml, buildRefundXml, buildVoidXml, buildQueryXml } from './caspit-xml';
import { parseResponse } from './caspit.parser';

const { IntentBridge } = NativeModules;

const TIMEOUT_MS = 100_000; // slightly over the 90s pinpad timeout

/**
 * Guards against calling the terminal on non-Android platforms.
 * The physical Caspit terminal communicates via Android Intents — it literally
 * doesn't exist on iOS or web.
 *
 * @throws `{ code: 'PLATFORM_UNSUPPORTED' }` on non-Android
 */
function assertAndroid(): void {
  if (Platform.OS !== 'android') {
    throw Object.assign(new Error('Payment terminal only available on Android'), {
      code: 'PLATFORM_UNSUPPORTED',
    });
  }
}

/**
 * Sends an XML request to the Caspit terminal via the native Android Intent bridge
 * and races it against a JS-side timeout.
 *
 * Two distinct failure paths:
 * - **TIMEOUT** — no response within `TIMEOUT_MS` (100 s). Terminal is unreachable or hung.
 * - **CANCELLED** — Kotlin rejects immediately when the user presses Back on the terminal screen.
 *
 * @param xml - Fully-built Caspit request XML string
 * @returns Raw XML response string from the terminal
 * @throws `{ code: 'TIMEOUT' }` | `{ code: 'CANCELLED' }`
 */
async function sendWithTimeout(xml: string): Promise<string> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(Object.assign(new Error('Terminal timeout'), { code: 'TIMEOUT' })),
      TIMEOUT_MS
    )
  );
  return Promise.race([IntentBridge.sendIntent(xml), timeout]);
}

/**
 * Converts any thrown error into a normalized `PaymentResult` failure object.
 * Ensures every catch block in the adapter returns a consistent shape regardless
 * of whether the error came from a timeout, Android rejection, or platform guard.
 *
 * @param err - Any caught error; `err.code` is forwarded as `errorCode`
 */
function handleError(err: any): PaymentResult {
  return {
    success: false,
    errorCode: err.code ?? 'UNKNOWN',
    errorMessage: err.message,
  };
}

export class CaspitAdapter implements PaymentProvider {
  /**
   * Charges a card via the physical terminal.
   *
   * Sends **Cmd 001 / TranType 1** (regular card-present purchase).
   * The cardholder taps/dips/swipes on the Sunmi pinpad.
   *
   * @param params.amount - Amount in agorot (100 NIS = 10 000)
   * @param params.orderId - Medusa order ID used as Xfield (must be ≤19 chars)
   * @returns `success: true` with `uid` (save for void) on approval;
   *          `success: false` with `errorCode` on any failure
   */
  async charge(params: ChargeParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      const xml = buildChargeXml(params);
      console.log('[Caspit] charge params:', JSON.stringify(params));
      console.log('[Caspit] charge XML:', xml);
      const rawXml = await sendWithTimeout(xml);
      console.log('[Caspit] raw response:', rawXml);
      const result = parseResponse(rawXml);
      console.log('[Caspit] parsed result:', JSON.stringify(result));
      return result;
    } catch (err: any) {
      console.log('[Caspit] charge error:', err?.code, err?.message);
      return handleError(err);
    }
  }

  /**
   * Issues an independent refund via the terminal.
   *
   * Sends **Cmd 001 / TranType 53**. The cardholder must present the same card —
   * this is NOT linked to the original transaction, so no Uid is required.
   * Use this when the original transaction has already been transmitted to Shva.
   *
   * @param params.amount - Refund amount in agorot
   * @param params.xfield - New unique Xfield for this refund (≤19 chars, not the original)
   */
  async refund(params: RefundParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildRefundXml(params)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  /**
   * Voids (cancels) an existing transaction before it's transmitted to Shva.
   *
   * Sends **Cmd 001 / Mti 400**. Requires the 23-digit `Uid` from the original
   * charge response — store it immediately after every successful charge.
   * Once a transaction has been transmitted to Shva (end-of-day), use `refund` instead.
   *
   * @param params.originalUid - 23-digit Uid from the original charge response
   * @param params.xfield - New unique Xfield for this void (not the original Xfield)
   * @param params.amount - Must match the original transaction amount
   * @param params.creditTerms - Must match the original (`CreditTerms` field)
   * @param params.tranType - Must match the original (`TranType` field)
   */
  async void(params: VoidParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildVoidXml(params)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  /**
   * Looks up a previous transaction by its Xfield (Medusa order ID).
   *
   * Sends **Cmd 012**. Use this as a recovery mechanism after a network disconnect —
   * if the charge call throws TIMEOUT but the terminal may have already approved the
   * card, call `getStatus` to check before retrying.
   *
   * @param xfield - The Xfield (order ID) used in the original charge
   */
  async getStatus(xfield: string): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildQueryXml(xfield)));
    } catch (err: any) {
      return handleError(err);
    }
  }
}
