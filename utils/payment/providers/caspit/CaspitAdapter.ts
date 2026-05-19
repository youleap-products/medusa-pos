import { NativeModules, Platform } from 'react-native';
import type {
  PaymentProvider,
  ChargeParams,
  RefundParams,
  VoidParams,
  PaymentResult,
  ProviderConfigSchema,
  ConfigValues,
  VerifyResult,
} from '../../types';
import {
  buildChargeXml,
  buildRefundXml,
  buildVoidXml,
  buildQueryXml,
  buildCommTestXml,
  type CaspitWireConfig,
} from './caspit-xml';
import { parseResponse } from './caspit.parser';
import { caspitStorage } from '@/utils/storage';

const { IntentBridge } = NativeModules;

const TIMEOUT_MS = 100_000;
const VERIFY_TIMEOUT_MS = 15_000;

export const CASPIT_CONFIG_SCHEMA: ProviderConfigSchema = {
  fields: [
    {
      key: 'terminalId',
      label: 'Terminal ID (מסוף)',
      helper: '7-digit merchant number printed on your Caspit terminal',
      placeholder: '0880381',
      keyboardType: 'number-pad',
      validate: (v) => {
        if (!/^\d{7}$/.test(v)) return 'Must be exactly 7 digits';
        return null;
      },
    },
  ],
};

function assertAndroid(): void {
  if (Platform.OS !== 'android') {
    throw Object.assign(new Error('Payment terminal only available on Android'), {
      code: 'PLATFORM_UNSUPPORTED',
    });
  }
}

async function getCaspitConfig(): Promise<CaspitWireConfig> {
  const { terminalId } = await caspitStorage.loadConfig();
  if (!terminalId) {
    throw Object.assign(new Error('Caspit terminal not configured'), {
      code: 'CONFIG_MISSING',
    });
  }
  return { terminalId, termNo: '001' };
}

async function sendWithTimeout(xml: string, timeoutMs = TIMEOUT_MS): Promise<string> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(Object.assign(new Error('Terminal timeout'), { code: 'TIMEOUT' })),
      timeoutMs
    )
  );
  return Promise.race([IntentBridge.sendIntent(xml), timeout]);
}

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
      const config = await getCaspitConfig();
      const xml = buildChargeXml(params, config);
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

  async refund(params: RefundParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      const config = await getCaspitConfig();
      return parseResponse(await sendWithTimeout(buildRefundXml(params, config)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  async void(params: VoidParams): Promise<PaymentResult> {
    try {
      assertAndroid();
      const config = await getCaspitConfig();
      return parseResponse(await sendWithTimeout(buildVoidXml(params, config)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  async getStatus(xfield: string): Promise<PaymentResult> {
    try {
      assertAndroid();
      const config = await getCaspitConfig();
      return parseResponse(await sendWithTimeout(buildQueryXml(xfield, config)));
    } catch (err: any) {
      return handleError(err);
    }
  }

  async verifyConfig(candidate: ConfigValues): Promise<VerifyResult> {
    try {
      assertAndroid();
    } catch {
      return { ok: false, code: 'NOT_INSTALLED', message: 'Not running on Android' };
    }

    if (!IntentBridge) {
      return { ok: false, code: 'NOT_INSTALLED', message: 'Caspit app not found on this device' };
    }

    const config: CaspitWireConfig = { terminalId: candidate.terminalId, termNo: '001' };
    const xml = buildCommTestXml(config);

    let rawXml: string;
    try {
      rawXml = await sendWithTimeout(xml, VERIFY_TIMEOUT_MS);
    } catch (err: any) {
      if (err.code === 'TIMEOUT') {
        return { ok: false, code: 'TIMEOUT', message: 'No response from terminal within 15 seconds' };
      }
      if (err.code === 'CANCELLED') {
        return { ok: false, code: 'UNKNOWN', message: 'Verification cancelled by user' };
      }
      return { ok: false, code: 'NOT_INSTALLED', message: err.message ?? 'Failed to reach Caspit app' };
    }

    // Parse the CommTest response
    const resultCode = rawXml.match(/<ResultCode>([^<]*)<\/ResultCode>/)?.[1];
    const checkShvaResult = rawXml.match(/<CheckShvaResult>([^<]*)<\/CheckShvaResult>/)?.[1];

    if (resultCode === '0') {
      // Terminal ID accepted; check Shva reachability
      if (checkShvaResult && checkShvaResult !== '0') {
        return { ok: false, code: 'SHVA_UNREACHABLE', message: 'Terminal reached but acquirer is unreachable' };
      }
      return { ok: true };
    }

    // ResultCode 10003 = wrong terminal ID (per Caspit spec)
    if (resultCode === '10003') {
      return { ok: false, code: 'WRONG_TERMINAL_ID', message: 'Terminal rejected this ID — check the 7-digit number' };
    }

    return {
      ok: false,
      code: 'UNKNOWN',
      message: `Terminal returned ResultCode ${resultCode ?? 'unknown'}`,
    };
  }
}
