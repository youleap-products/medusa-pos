import type { Printer, ReceiptData } from '../../types';

/** No-op printer for iOS / dev / unsupported hardware. Logs the receipt and resolves. */
export class NoopPrinter implements Printer {
  async printReceipt(data: ReceiptData): Promise<void> {
    console.log('[NoopPrinter] printReceipt', data);
  }
}
