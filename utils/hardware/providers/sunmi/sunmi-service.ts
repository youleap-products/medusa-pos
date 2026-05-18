import { Platform } from 'react-native';

/**
 * Lazy loader for the Sunmi printer AIDL bridge (`@heasy/react-native-sunmi-printer`).
 * The library hard-requires Android — importing it on iOS / web throws — so we
 * gate the require and expose a single `any` handle that both Sunmi providers
 * (printer + cash drawer) share. Returns `null` on non-Sunmi platforms.
 */
let cached: any | null | undefined;

export function getSunmiService(): any | null {
  if (cached !== undefined) return cached;
  if (Platform.OS !== 'android') {
    cached = null;
    return cached;
  }
  try {
    cached = require('@heasy/react-native-sunmi-printer').default;
  } catch (e) {
    console.warn('[Sunmi] failed to load native module:', e);
    cached = null;
  }
  return cached;
}
