/**
 * Shortens a Medusa order ID to fit Caspit's 19-character Xfield limit.
 * Takes the last 19 characters — Medusa ULIDs are time-sortable, so the suffix
 * is the most unique part and collisions across a single POS terminal are negligible.
 *
 * @param id - Full Medusa order/draft-order ID (typically 26+ chars)
 * @returns Last 19 characters of `id`
 */
export function shortenXfield(id: string): string {
  return id.slice(-19);
}
