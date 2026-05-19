import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Single swap point for persisted key-value storage.
// Native → expo-secure-store. Web → localStorage.
// To migrate to a different backend (MMKV, AsyncStorage with encryption, …),
// replace the three functions below — nothing else in the app touches the backend.

export const kv = {
  async get(key: string): Promise<string | null> {
    if (Platform.OS === 'web') return globalThis.localStorage?.getItem(key) ?? null;
    return SecureStore.getItemAsync(key);
  },

  async set(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },

  async delete(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};
