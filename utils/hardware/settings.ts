import * as Storage from '@/utils/storage';

/**
 * Hardware feature flags — cashier-facing toggles for each connected device.
 *
 * Why this exists: a Sunmi POS can be deployed without the cash drawer plugged
 * in, or with a broken printer, or for training where no real hardware should
 * fire. The cashier needs a one-tap way to mute a misbehaving device without
 * uninstalling the app or redeploying. When a feature is `false`, the
 * corresponding `HardwareService` method becomes a no-op (it logs and
 * returns) — adapter calls are skipped entirely.
 *
 * Add new features here as new fields. The settings screen and the
 * `HardwareService` consume this shape directly.
 */
export interface HardwareSettings {
  printer: boolean;
  cashDrawer: boolean;
}

export const DEFAULT_HARDWARE_SETTINGS: HardwareSettings = {
  printer: true,
  cashDrawer: true,
};

const STORAGE_KEY = 'hardware_settings_v1';

let current: HardwareSettings = { ...DEFAULT_HARDWARE_SETTINGS };
let hydrated = false;
const listeners = new Set<(s: HardwareSettings) => void>();

// Hydrate from storage at module load — fire-and-forget. Until the first read
// resolves, callers see the defaults (both enabled), which is the safe default
// for a freshly installed POS.
void (async () => {
  try {
    const raw = await Storage.getItemAsync(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<HardwareSettings>;
      current = { ...DEFAULT_HARDWARE_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.warn('[hardware-settings] hydrate failed:', e);
  } finally {
    hydrated = true;
    for (const l of listeners) l(current);
  }
})();

export function getHardwareSettings(): HardwareSettings {
  return current;
}

export function isHardwareEnabled(feature: keyof HardwareSettings): boolean {
  return current[feature];
}

export async function setHardwareSetting<K extends keyof HardwareSettings>(
  feature: K,
  value: HardwareSettings[K],
): Promise<void> {
  current = { ...current, [feature]: value };
  for (const l of listeners) l(current);
  try {
    await Storage.setItemAsync(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('[hardware-settings] persist failed:', e);
  }
}

export function subscribeHardwareSettings(listener: (s: HardwareSettings) => void): () => void {
  listeners.add(listener);
  // Replay current state so subscribers don't have to also call getHardwareSettings.
  if (hydrated) listener(current);
  return () => {
    listeners.delete(listener);
  };
}
