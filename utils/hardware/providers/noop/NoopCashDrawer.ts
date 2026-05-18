import type { CashDrawer } from '../../types';

/** No-op drawer for iOS / dev / unsupported hardware. */
export class NoopCashDrawer implements CashDrawer {
  async open(): Promise<void> {
    console.log('[NoopCashDrawer] open');
  }
}
