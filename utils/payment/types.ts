export interface PaymentProvider {
  charge(params: ChargeParams): Promise<PaymentResult>;
  refund(params: RefundParams): Promise<PaymentResult>;
  void(params: VoidParams): Promise<PaymentResult>;
  getStatus(xfield: string): Promise<PaymentResult>;

  /**
   * Verify a candidate config against the live terminal/network, without
   * persisting it. Called by the setup wizard's "Verify" button and Settings'
   * "Re-verify" action.
   *
   * Implementations that have no meaningful online check (mock providers,
   * providers that need no per-tablet config) should omit this method — the
   * wizard then treats format validation as sufficient.
   *
   * @param candidate - Field values as collected by the wizard form. Keys
   *                    match the provider's `configSchema.fields[].key`.
   */
  verifyConfig?(candidate: ConfigValues): Promise<VerifyResult>;
}

/**
 * Declarative description of the runtime configuration a provider needs.
 * Read by the setup wizard to render a per-provider step. Providers with no
 * schema (or `fields.length === 0`) cause the wizard to auto-skip that step.
 */
export interface ProviderConfigSchema {
  fields: ProviderConfigField[];
}

export interface ProviderConfigField {
  /** Stable key. Used as the form state key and (optionally) the storage key suffix. */
  key: string;
  label: string;
  /** Helper text shown beneath the input. Plain-language, ≤ 1 line. */
  helper?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad';
  /** Returns an error message, or `null` if the value is acceptable. */
  validate: (value: string) => string | null;
}

export type ConfigValues = Record<string, string>;

/**
 * Result of `verifyConfig`. Failure codes are deliberately enumerated so the
 * wizard can show distinct copy per cause (see TerminalIdStep).
 */
export type VerifyResult =
  | { ok: true }
  | {
      ok: false;
      code: VerifyErrorCode;
      message: string;
    };

export type VerifyErrorCode =
  | 'NOT_INSTALLED'      // Caspit Android app not found on this device
  | 'WRONG_TERMINAL_ID'  // pinpad rejected the id (Caspit ResultCode 10003 / similar)
  | 'SHVA_UNREACHABLE'   // pinpad ok, but the acquirer is unreachable right now
  | 'TIMEOUT'            // no response within the verify timeout
  | 'UNKNOWN';           // anything else — surfaced for debugging

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
  /**
   * High-level error category for UX routing. Drives toast color/icon and the
   * follow-up prompt the cashier sees ("try another card", "retry", "call
   * admin"). Only set when `success: false`.
   */
  errorCategory?: 'card' | 'limit' | 'comm' | 'data' | 'config' | 'device' | 'user' | 'unknown';
  rawResponse?: unknown;
}

export type PaymentProviderKey = 'ashrait' | 'mock';
