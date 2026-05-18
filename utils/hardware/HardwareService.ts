import { Platform } from 'react-native';
import { getCashDrawer, getPrinter } from './registry';
import { isHardwareEnabled } from './settings';
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
    if (!isHardwareEnabled('printer')) {
      console.log('[HardwareService] printReceipt skipped — printer disabled in settings');
      return Promise.resolve();
    }
    return this.printer.printReceipt(data);
  }

  openCashDrawer(): Promise<void> {
    const enabled = isHardwareEnabled('cashDrawer');
    console.log('[HardwareService] openCashDrawer called, enabled=', enabled);
    if (!enabled) return Promise.resolve();
    return this.cashDrawer.open();
  }

  getCashDrawerStatus(): Promise<boolean> | undefined {
    if (!isHardwareEnabled('cashDrawer')) return undefined;
    return this.cashDrawer.getStatus?.();
  }

  /**
   * Fire the cash drawer directly, ignoring the enable flag. Used by the
   * hardware settings screen so a cashier can verify the device works even
   * when the feature is currently disabled.
   */
  testCashDrawer(): Promise<void> {
    return this.cashDrawer.open();
  }

  /**
   * Print a canned diagnostic receipt — same path as a real sale, but with
   * sample data. Ignores the enable flag (same reason as `testCashDrawer`).
   */
  testPrinter(): Promise<void> {
    const sample: ReceiptData = {
      orderNumber: 'TEST',
      items: [
        { title: 'Hardware test print', quantity: 1, unitPrice: 100 },
      ],
      subtotal: 100,
      taxTotal: 0,
      discountTotal: 0,
      total: 100,
      currencyCode: 'ils',
      tenders: [{ method: 'cash', amount: 100 }],
    };
    return this.printer.printReceipt(sample);
  }
}

export const hardwareService = new HardwareService();
