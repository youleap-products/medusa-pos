import * as React from 'react';

export type TenderMethod = 'cash' | 'card';

/**
 * A single payment recorded against an order. Multiple tenders may settle one
 * order ("split payment") — e.g. half cash, half card. Amounts are in the
 * smallest currency unit (agorot/cents) so they add up with the order total
 * without rounding drift.
 */
export interface Tender {
  /** Local-only id, stable for the list lifetime — used for React keys + removal. */
  id: string;
  method: TenderMethod;
  amount: number;
  /** Caspit/Ashrait transaction Uid — present on successful card tenders, used for void/refund later. */
  caspit_uid?: string;
  /** Masked PAN as returned by the terminal. Card tenders only. */
  pan?: string;
  /** Cardholder name as returned by the terminal. Card tenders only. */
  cardName?: string;
}

export type NewTender = Omit<Tender, 'id'>;

export interface UseTendersResult {
  tenders: Tender[];
  /** Sum of all tender amounts. */
  paid: number;
  /** total - paid, clamped to 0 (overpayment shows separately as change). */
  remaining: number;
  /** True when paid covers the total — the cashier may complete the sale. */
  isSettled: boolean;
  /** Amount the customer is owed back when cash overpayment was tendered. */
  changeDue: number;
  add: (tender: NewTender) => void;
  remove: (id: string) => void;
  reset: () => void;
}

function nextId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Tender-list state for the checkout screen.
 *
 * The hook is the source of truth for split payment: callers add a tender
 * after the hardware (cash drawer / Caspit terminal) has already settled
 * its part, so a tender in the list always represents real money that
 * physically moved. Removal is the cashier's "I didn't mean to add that"
 * escape hatch — the caller is responsible for the corresponding
 * hardware-side reversal (Caspit void / drawer reopen) before calling
 * `remove`.
 */
export function useTenders(total: number): UseTendersResult {
  const [tenders, setTenders] = React.useState<Tender[]>([]);

  const paid = React.useMemo(
    () => tenders.reduce((sum, t) => sum + t.amount, 0),
    [tenders],
  );

  const remaining = Math.max(0, total - paid);
  const changeDue = Math.max(0, paid - total);
  const isSettled = total > 0 && paid >= total;

  const add = React.useCallback((tender: NewTender) => {
    setTenders((prev) => [...prev, { ...tender, id: nextId() }]);
  }, []);

  const remove = React.useCallback((id: string) => {
    setTenders((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const reset = React.useCallback(() => setTenders([]), []);

  return { tenders, paid, remaining, changeDue, isSettled, add, remove, reset };
}
