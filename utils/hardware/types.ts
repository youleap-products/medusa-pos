/**
 * POS hardware abstraction — printer + cash drawer.
 *
 * Devices differ wildly (Sunmi AIDL, Star/Epson Bluetooth, USB ESC/POS, etc.)
 * so all checkout code talks to these interfaces only. Swapping hardware = new
 * provider in `registry.ts`; no checkout changes.
 */

export interface ReceiptItem {
  title: string;
  quantity: number;
  unitPrice: number;
}

/** Single payment line on the receipt — one per tender used to settle the order. */
export interface ReceiptTender {
  method: 'cash' | 'card';
  amount: number;
  pan?: string;
  cardName?: string;
}

export interface ReceiptData {
  orderNumber?: number | string;
  items: ReceiptItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  currencyCode: string;
  /** All tenders used to settle the order, in the order they were taken. Always ≥ 1 entry. */
  tenders: ReceiptTender[];
  /** Amount handed back to the customer when cash tendered exceeded the total. */
  changeDue?: number;
}

export interface Printer {
  /** Render and print a receipt. Resolves once the buffer is committed. */
  printReceipt(data: ReceiptData): Promise<void>;
}

export interface CashDrawer {
  /** Fire the drawer solenoid. Resolves once the pulse is sent (not when fully open). */
  open(): Promise<void>;
  /** Optional — true = open, false = closed. Undefined when the device can't report. */
  getStatus?(): Promise<boolean>;
}

export type HardwareProviderKey = 'sunmi' | 'noop';
