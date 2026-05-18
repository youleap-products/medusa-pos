import { getProvider } from './registry';
import type { ChargeParams, RefundParams, VoidParams, PaymentResult, PaymentProviderKey } from './types';

const PROVIDER_KEY = (process.env.EXPO_PUBLIC_PAYMENT_PROVIDER ?? 'mock') as PaymentProviderKey;

/**
 * Singleton facade over the active payment provider.
 * The provider is resolved once at module load from `EXPO_PUBLIC_PAYMENT_PROVIDER`
 * (defaults to `'mock'` when unset). All POS code calls this service — never a
 * provider directly — so swapping terminals requires only a config change.
 *
 * Supported values: `'ashrait'` (Caspit physical terminal) | `'mock'` (dev/test)
 */
class PaymentService {
  private provider = getProvider(PROVIDER_KEY);

  /**
   * Initiates a card-present charge on the terminal.
   * @see {@link PaymentProvider.charge} for full param/return docs
   */
  charge(params: ChargeParams): Promise<PaymentResult> {
    return this.provider.charge(params);
  }

  /**
   * Issues an independent refund on the terminal (cardholder presents card again).
   * @see {@link PaymentProvider.refund} for full param/return docs
   */
  refund(params: RefundParams): Promise<PaymentResult> {
    return this.provider.refund(params);
  }

  /**
   * Voids a transaction before end-of-day Shva transmission.
   * Requires the `uid` from the original charge response.
   * @see {@link PaymentProvider.void} for full param/return docs
   */
  void(params: VoidParams): Promise<PaymentResult> {
    return this.provider.void(params);
  }

  /**
   * Queries a transaction by Xfield — use as a recovery check after a timeout
   * to confirm whether the terminal approved the card before retrying.
   * @see {@link PaymentProvider.getStatus} for full param/return docs
   */
  getStatus(xfield: string): Promise<PaymentResult> {
    return this.provider.getStatus(xfield);
  }
}

export const paymentService = new PaymentService();
