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
