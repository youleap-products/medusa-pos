import type { Printer, ReceiptData } from '../../types';
import { getSunmiService } from './sunmi-service';

/**
 * Sunmi thermal receipt printer.
 *
 * Output is built command-by-command on the printer service's internal
 * buffer (alignment, font size, weight, text) then flushed with
 * `commitPrinterBuffer()`. Note: the no-arg commit is `commitPrinterBuffer`
 * — the similarly-named `commitPrint(TransBean[])` takes typed line objects
 * and is not what we want for free-form receipt text.
 */
export class SunmiPrinter implements Printer {
  async printReceipt(data: ReceiptData): Promise<void> {
    const service = getSunmiService();
    if (!service) return;
    try {
      service.printerInit();
      this.writeHeader(service, data);
      this.writeItems(service, data);
      this.writeTotals(service, data);
      this.writePayment(service, data);
      service.lineWrap(4);
      service.commitPrinterBuffer();
    } catch (e) {
      console.warn('[SunmiPrinter] printReceipt failed:', e);
    }
  }

  private writeHeader(p: any, data: ReceiptData): void {
    p.setAlignment(1);
    p.setFontSize(28);
    p.setFontWeight(true);
    p.printerText('RECEIPT\n');
    p.setFontWeight(false);
    p.setFontSize(24);
    if (data.orderNumber) p.printerText(`Order #${data.orderNumber}\n`);
    p.printerText(`${new Date().toLocaleString()}\n`);
    p.printerText('--------------------------------\n');
  }

  private writeItems(p: any, data: ReceiptData): void {
    p.setAlignment(0);
    for (const item of data.items) {
      const lineTotal = fmt(item.unitPrice * item.quantity, data.currencyCode);
      p.printerText(`${item.title}\n`);
      p.printerText(`  x${item.quantity}  ${fmt(item.unitPrice, data.currencyCode)}   ${lineTotal}\n`);
    }
    p.printerText('--------------------------------\n');
  }

  private writeTotals(p: any, data: ReceiptData): void {
    p.setAlignment(2);
    p.printerText(`Subtotal: ${fmt(data.subtotal, data.currencyCode)}\n`);
    if (data.taxTotal) p.printerText(`Tax: ${fmt(data.taxTotal, data.currencyCode)}\n`);
    if (data.discountTotal) p.printerText(`Discount: -${fmt(data.discountTotal, data.currencyCode)}\n`);
    p.setFontWeight(true);
    p.setFontSize(28);
    p.printerText(`Total: ${fmt(data.total, data.currencyCode)}\n`);
    p.setFontWeight(false);
    p.setFontSize(24);
    p.printerText('--------------------------------\n');
  }

  private writePayment(p: any, data: ReceiptData): void {
    p.printerText(data.paymentMethod === 'cash' ? 'Payment: Cash\n' : 'Payment: Card\n');
    if (data.cardName) p.printerText(`${data.cardName}\n`);
    if (data.pan) p.printerText(`${data.pan}\n`);
  }
}

function fmt(amount: number, currency: string): string {
  return (amount / 100).toFixed(2) + ' ' + currency.toUpperCase();
}
