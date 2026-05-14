import { NativeModules, Platform } from 'react-native';
import type { PaymentProvider, ChargeParams, RefundParams, VoidParams, PaymentResult } from '../../types';
import { buildChargeXml, buildRefundXml, buildVoidXml, buildQueryXml } from './caspit.xml';
import { parseResponse } from './caspit.parser';

const { IntentBridge } = NativeModules;

const TIMEOUT_MS = 100_000; // slightly over the 90s pinpad timeout

function assertAndroid(): void {
  if (Platform.OS !== 'android') {
    throw Object.assign(new Error('Payment terminal only available on Android'), {
      code: 'PLATFORM_UNSUPPORTED',
    });
  }
}

async function sendWithTimeout(xml: string): Promise<string> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(Object.assign(new Error('Terminal timeout'), { code: 'TIMEOUT' })),
      TIMEOUT_MS
    )
  );
  return Promise.race([IntentBridge.sendIntent(xml), timeout]);
}
// Two distinct failure modes to handle here:
// 1. TIMEOUT — JS-side: fires after TIMEOUT_MS if no response. Code: 'TIMEOUT'.
// 2. RESULT_CANCELED — Kotlin-side: fires immediately if user presses Back on the
//    terminal screen. The Kotlin module rejects with code: 'CANCELLED'.
//    handleError maps both to PaymentResult { success: false, errorCode: ... }.
//    Always handle both in UI — TIMEOUT means "terminal unreachable", CANCELLED means
//    "customer backed out".

function handleError(err: any): PaymentResult {
  return {
    success: false,
    errorCode: err.code ?? 'UNKNOWN',
    errorMessage: err.message,
  };
}

export class CaspitAdapter implements PaymentProvider {
  async charge(params: ChargeParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildChargeXml(params)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  async refund(params: RefundParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildRefundXml(params)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  async void(params: VoidParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildVoidXml(params)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  async getStatus(xfield: string): Promise<PaymentResult> {
    try {
      assertAndroid();
      return parseResponse(await sendWithTimeout(buildQueryXml(xfield)));
    } catch (err: any) {
      return handleError(err);
    }
  }
}
