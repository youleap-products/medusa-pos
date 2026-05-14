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
