# Implementation Reference — Full Source

## types.ts (src/payment/types.ts)

```typescript
export interface PaymentProvider {
  charge(params: ChargeParams): Promise<PaymentResult>;
  refund(params: RefundParams): Promise<PaymentResult>;
  void(params: VoidParams): Promise<PaymentResult>;
  getStatus(xfield: string): Promise<PaymentResult>;
}

export interface ChargeParams {
  amount: number;   // in agorot (cents). 100 NIS = 10000
  orderId: string;  // Medusa order ID — used as Xfield. MUST be ≤19 chars after shortening.
}

export interface RefundParams {
  amount: number;   // in agorot
  xfield: string;   // new unique Xfield for this refund transaction (≤19 chars)
}

export interface VoidParams {
  originalUid: string;   // Uid from the original transaction response (23-digit)
  xfield: string;        // NEW unique Xfield for this void (≤19 chars, not the original)
  amount: number;        // same as original transaction
  creditTerms: string;   // same as original transaction
  tranType: string;      // same as original transaction
}

export interface PaymentResult {
  success: boolean;
  uid?: string;           // 23-digit Caspit UID — save this for void/cancel
  authManpikNo?: string;  // issuer authorization number
  pan?: string;           // masked card number
  cardName?: string;      // e.g. "Visa Gold"
  errorCode?: string;
  errorMessage?: string;
  rawResponse?: unknown;
}

export type PaymentProviderKey = 'ashrait' | 'mock';
```

---

## PaymentService (src/payment/PaymentService.ts)

```typescript
import { getProvider } from './registry';
import type { ChargeParams, RefundParams, VoidParams, PaymentResult, PaymentProviderKey } from './types';

const PROVIDER_KEY = (process.env.EXPO_PUBLIC_PAYMENT_PROVIDER ?? 'mock') as PaymentProviderKey;

class PaymentService {
  private provider = getProvider(PROVIDER_KEY);

  charge(params: ChargeParams): Promise<PaymentResult> {
    return this.provider.charge(params);
  }

  refund(params: RefundParams): Promise<PaymentResult> {
    return this.provider.refund(params);
  }

  void(params: VoidParams): Promise<PaymentResult> {
    return this.provider.void(params);
  }

  getStatus(xfield: string): Promise<PaymentResult> {
    return this.provider.getStatus(xfield);
  }
}

export const paymentService = new PaymentService();
```

---

## registry.ts (src/payment/registry.ts)

```typescript
import { CaspitAdapter } from './providers/caspit/CaspitAdapter';
import { MockProvider } from './providers/mock/MockProvider';
import type { PaymentProvider, PaymentProviderKey } from './types';

const PROVIDERS: Record<PaymentProviderKey, () => PaymentProvider> = {
  ashrait: () => new CaspitAdapter(),
  mock: () => new MockProvider(),
};

export function getProvider(key: PaymentProviderKey): PaymentProvider {
  const factory = PROVIDERS[key];
  if (!factory) throw new Error(`Unknown payment provider: ${key}`);
  return factory();
}
```

---

## CaspitAdapter (src/payment/providers/caspit/CaspitAdapter.ts)

```typescript
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
```

---

## XML Builder (src/payment/providers/caspit/caspit.xml.ts)

```typescript
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
```

---

## Response Parser (src/payment/providers/caspit/caspit.parser.ts)

```typescript
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
```

---

## MockProvider (src/payment/providers/mock/MockProvider.ts)

```typescript
import type { PaymentProvider, ChargeParams, RefundParams, VoidParams, PaymentResult } from '../../types';

let mockShouldFail = false;
let mockDelay = 800;

export const MockControls = {
  setFail: (v: boolean) => { mockShouldFail = v; },
  setDelay: (ms: number) => { mockDelay = ms; },
};

export class MockProvider implements PaymentProvider {
  private simulate(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, mockDelay));
  }

  async charge(params: ChargeParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return {
      success: true,
      uid: `mock-uid-${Date.now()}`,
      pan: '000400XXXXXX1234',
      cardName: 'Mock Visa',
      rawResponse: { mock: true, params },
    };
  }

  async refund(params: RefundParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return { success: true, uid: `mock-refund-${Date.now()}`, rawResponse: { mock: true, params } };
  }

  async void(params: VoidParams): Promise<PaymentResult> {
    await this.simulate();
    if (mockShouldFail) return { success: false, errorCode: 'MOCK_DECLINE', errorMessage: 'Mock decline' };
    return { success: true, uid: params.originalUid, rawResponse: { mock: true, params } };
  }

  async getStatus(xfield: string): Promise<PaymentResult> {
    await this.simulate();
    return { success: true, rawResponse: { mock: true, xfield } };
  }
}
```
