import { KEYS } from './keys';
import { kv } from './kv';

// Per-concern typed stores. Call sites import these — never `kv` or `KEYS` directly.
// Each store owns its keys, knows its shape, and is the only place that has to
// change if the underlying storage backend is swapped or a key is renamed.

// ─── Auth ───────────────────────────────────────────────────────────────────

export type AuthState = {
  medusaUrl: string | null;
  email: string | null;
  // JWT, despite the legacy 'apiKey' storage key.
  apiKey: string | null;
};

export const authStorage = {
  async load(): Promise<AuthState> {
    const [medusaUrl, email, apiKey] = await Promise.all([
      kv.get(KEYS.MEDUSA_URL),
      kv.get(KEYS.USER_EMAIL),
      kv.get(KEYS.API_KEY),
    ]);
    return { medusaUrl, email, apiKey };
  },

  async save(state: { medusaUrl: string; email: string; apiKey: string }): Promise<void> {
    await Promise.all([
      kv.set(KEYS.MEDUSA_URL, state.medusaUrl),
      kv.set(KEYS.USER_EMAIL, state.email),
      kv.set(KEYS.API_KEY, state.apiKey),
    ]);
  },

  async clearSession(): Promise<void> {
    // Only the JWT is cleared on logout — shopUrl + email survive so the
    // login screen can pre-fill on the next attempt.
    await kv.delete(KEYS.API_KEY);
  },

  async clearAll(): Promise<void> {
    await Promise.all([
      kv.delete(KEYS.MEDUSA_URL),
      kv.delete(KEYS.USER_EMAIL),
      kv.delete(KEYS.API_KEY),
    ]);
  },
};

// ─── Caspit payment terminal ────────────────────────────────────────────────

export type CaspitConfig = {
  terminalId: string | null;
  verified: boolean;
};

export const caspitStorage = {
  async loadConfig(): Promise<CaspitConfig> {
    const [terminalId, verifiedRaw] = await Promise.all([
      kv.get(KEYS.CASPIT_TERMINAL_ID),
      kv.get(KEYS.CASPIT_VERIFIED),
    ]);
    return { terminalId, verified: verifiedRaw === 'true' };
  },

  async saveConfig(terminalId: string, verified: boolean): Promise<void> {
    await Promise.all([
      kv.set(KEYS.CASPIT_TERMINAL_ID, terminalId),
      kv.set(KEYS.CASPIT_VERIFIED, verified ? 'true' : 'false'),
    ]);
  },

  async clear(): Promise<void> {
    await Promise.all([
      kv.delete(KEYS.CASPIT_TERMINAL_ID),
      kv.delete(KEYS.CASPIT_VERIFIED),
    ]);
  },
};

// ─── Operational settings (region / sales channel / stock location) ─────────

export type OperationalSettings = {
  sales_channel_id: string | null;
  stock_location_id: string | null;
  region_id: string | null;
};

export const settingsStorage = {
  async load(): Promise<OperationalSettings> {
    const [sales_channel_id, stock_location_id, region_id] = await Promise.all([
      kv.get(KEYS.SALES_CHANNEL_ID),
      kv.get(KEYS.STOCK_LOCATION_ID),
      kv.get(KEYS.REGION_ID),
    ]);
    return { sales_channel_id, stock_location_id, region_id };
  },

  async save(partial: { sales_channel_id?: string; stock_location_id?: string; region_id?: string }): Promise<void> {
    await Promise.all([
      partial.sales_channel_id !== undefined &&
        kv.set(KEYS.SALES_CHANNEL_ID, partial.sales_channel_id),
      partial.stock_location_id !== undefined &&
        kv.set(KEYS.STOCK_LOCATION_ID, partial.stock_location_id),
      partial.region_id !== undefined && kv.set(KEYS.REGION_ID, partial.region_id),
    ]);
  },

  async clear(): Promise<void> {
    await Promise.all([
      kv.delete(KEYS.SALES_CHANNEL_ID),
      kv.delete(KEYS.STOCK_LOCATION_ID),
      kv.delete(KEYS.REGION_ID),
    ]);
  },
};

// ─── Draft order ────────────────────────────────────────────────────────────

export const draftOrderStorage = {
  get(): Promise<string | null> {
    return kv.get(KEYS.DRAFT_ORDER_ID);
  },
  set(id: string): Promise<void> {
    return kv.set(KEYS.DRAFT_ORDER_ID, id);
  },
  clear(): Promise<void> {
    return kv.delete(KEYS.DRAFT_ORDER_ID);
  },
};

// ─── Hardware (printer / cash drawer toggles, JSON-serialized blob) ─────────

export const hardwareStorage = {
  async loadRaw(): Promise<string | null> {
    return kv.get(KEYS.HARDWARE_SETTINGS);
  },
  async saveRaw(serialized: string): Promise<void> {
    await kv.set(KEYS.HARDWARE_SETTINGS, serialized);
  },
};
