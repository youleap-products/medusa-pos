import { NoopCashDrawer } from './providers/noop/NoopCashDrawer';
import { NoopPrinter } from './providers/noop/NoopPrinter';
import { SunmiCashDrawer } from './providers/sunmi/SunmiCashDrawer';
import { SunmiPrinter } from './providers/sunmi/SunmiPrinter';
import type { CashDrawer, HardwareProviderKey, Printer } from './types';

const PRINTERS: Record<HardwareProviderKey, () => Printer> = {
  sunmi: () => new SunmiPrinter(),
  noop: () => new NoopPrinter(),
};

const CASH_DRAWERS: Record<HardwareProviderKey, () => CashDrawer> = {
  sunmi: () => new SunmiCashDrawer(),
  noop: () => new NoopCashDrawer(),
};

export function getPrinter(key: HardwareProviderKey): Printer {
  const factory = PRINTERS[key];
  if (!factory) throw new Error(`Unknown printer provider: ${key}`);
  return factory();
}

export function getCashDrawer(key: HardwareProviderKey): CashDrawer {
  const factory = CASH_DRAWERS[key];
  if (!factory) throw new Error(`Unknown cash drawer provider: ${key}`);
  return factory();
}
