# Storage layer split into `kv` + `keys` + per-concern stores

`utils/storage/` is split into three files: `kv.ts` (the swap point — SecureStore on native, localStorage on web), `keys.ts` (a single registry of every persisted key string), and per-concern typed stores in `index.ts` (`authStorage`, `caspitStorage`, …). Read sites import the per-concern stores and never touch `kv` or `KEYS` directly. The point is to give the app one grep-able place for every persisted key and one swap point for the storage backend, without scattering raw `SecureStore.getItemAsync('apiKey')` calls across the codebase.

## Considered options

- **Flat untyped bag** (status quo, a single `utils/storage.ts` exporting `get/set/delete`). Cheap but every caller invents its own key strings — typos and drift are silent.
- **One big typed `storage` object** with all helpers as methods. Less ceremony than per-concern stores, but read sites lose self-documentation (`storage.getApiKey()` vs `authStorage.load().apiKey`).
- **Per-concern stores (chosen).** Most structure for the price; read sites communicate intent; future provider swap or per-concern backend split (e.g. moving non-secret prefs to AsyncStorage) only changes the affected store.

## Consequences

- The string `'apiKey'` is preserved in `keys.ts` even though it actually holds a JWT, because renaming would orphan every signed-in user's token on upgrade. Read sites use the honest helper name (`authStorage.load().apiKey` is still misleading; consider renaming the *helper* in a follow-up without touching the underlying SecureStore key).
