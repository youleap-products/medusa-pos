import { CaspitAdapter } from './providers/caspit/CaspitAdapter';
import { MockProvider } from './providers/mock/MockProvider';
import type { PaymentProvider, PaymentProviderKey } from './types';

const PROVIDERS: Record<PaymentProviderKey, () => PaymentProvider> = {
  ashrait: () => new CaspitAdapter(),
  mock: () => new MockProvider(),
};

/**
 * Instantiates and returns the payment provider for the given key.
 * Each call creates a new instance — `PaymentService` is responsible for
 * holding the singleton.
 *
 * @param key - Provider identifier (`'ashrait'` | `'mock'`)
 * @throws If `key` is not registered in `PROVIDERS`
 */
export function getProvider(key: PaymentProviderKey): PaymentProvider {
  const factory = PROVIDERS[key];
  if (!factory) throw new Error(`Unknown payment provider: ${key}`);
  return factory();
}
