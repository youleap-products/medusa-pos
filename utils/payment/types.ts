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
