// Single source of truth for every persisted storage key.
// Existing string values are preserved verbatim so upgrading tablets do not
// orphan their SecureStore data (auth JWT, draft orders, etc).
//
// When adding a new persisted value:
//   1. Add the key here.
//   2. Expose it through a typed helper in ./index.ts.
//   3. Never inline the raw string at the call site.

export const KEYS = {
  // Auth (set by contexts/auth.tsx at login)
  MEDUSA_URL: 'medusaUrl',
  USER_EMAIL: 'userEmail',
  // Misleading name kept for backward compat — this is actually a JWT.
  // Renaming would orphan every signed-in tablet's session.
  API_KEY: 'apiKey',

  // Operational settings (selected during the setup wizard)
  SALES_CHANNEL_ID: 'sales_channel_id',
  STOCK_LOCATION_ID: 'stock_location_id',
  REGION_ID: 'region_id',

  // Active draft order (cleared on logout / completion)
  DRAFT_ORDER_ID: 'draft_order_id',

  // Hardware (printer / cash drawer toggles)
  HARDWARE_SETTINGS: 'hardware_settings_v1',

  // Caspit payment terminal (set by wizard step 4 / Settings → Payment Terminal)
  CASPIT_TERMINAL_ID: 'caspit.terminalId',
  CASPIT_VERIFIED: 'caspit.verified',
} as const;

export type StorageKey = (typeof KEYS)[keyof typeof KEYS];
