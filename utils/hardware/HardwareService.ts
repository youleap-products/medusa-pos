import { Platform } from 'react-native';
import { getCashDrawer, getPrinter } from './registry';
import type { CashDrawer, HardwareProviderKey, Printer, ReceiptData } from './types';

/**
 * Resolves the active hardware provider key.
 *
 * Order of precedence:
 *   1. `EXPO_PUBLIC_HARDWARE_PROVIDER` env var (`'sunmi'` | `'noop'`)
 *   2. Android → `'sunmi'` (the only supported Android target today)
 *   3. Anything else → `'noop'`
 */
function resolveProviderKey(): HardwareProviderKey {
  const fromEnv = process.env.EXPO_PUBLIC_HARDWARE_PROVIDER as HardwareProviderKey | undefined;
  if (fromEnv) return fromEnv;
  return Platform.OS === 'android' ? 'sunmi' : 'noop';
}

/**
 * Singleton facade over the active printer + cash drawer providers.
 * Checkout code calls this service — never a provider directly — so swapping
 * hardware (e.g. moving off Sunmi) requires only registering a new provider.
 */
class HardwareService {
  private printer: Printer;
  private cashDrawer: CashDrawer;

  constructor() {
    const key = resolveProviderKey();
    this.printer = getPrinter(key);
    this.cashDrawer = getCashDrawer(key);
  }

  printReceipt(data: ReceiptData): Promise<void> {
    return this.printer.printReceipt(data);
  }

  openCashDrawer(): Promise<void> {
    return this.cashDrawer.open();
  }

  getCashDrawerStatus(): Promise<boolean> | undefined {
    return this.cashDrawer.getStatus?.();
  }
}

export const hardwareService = new HardwareService();
