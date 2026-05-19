# Context — medusa-pos

Domain glossary for the Agilo Medusa POS app (Expo bare workflow, Android tablets, Caspit/Ashrait payments).

## Identity & credentials

- **Shop URL** — Base URL of the Medusa backend this tablet talks to. Captured at login, persisted per-tablet, displayed (read-only) under Settings → Account. Changing requires sign-out.
- **Email** — The Medusa admin user this tablet is signed in as. Captured at login, displayed under Settings → Account.
- **Password** — Never persisted. Used only at login to obtain a JWT; the JWT is what's stored.
- **API Key** — Misleading name kept for backward compatibility. The value behind `KEYS.API_KEY` (storage string `'apiKey'`) is the JWT returned by `sdk.auth.login`, not a static admin API key.

## Payment terminal

- **Terminal ID** (מסוף) — Caspit's 7-digit merchant terminal number (e.g. `0880381`). Identifies the physical pinpad to the acquirer. Per-tablet, in SecureStore. Collected as wizard step 4 and editable in Settings → Payment Terminal.
- **TermNo** — Caspit's lane index *within* a terminal. Defaults to `'001'` and is not user-configurable today. Multi-lane shops would surface it later.
- **Xfield** — Caspit's reference key in request/response XML. Capped at 19 chars by the Caspit spec. The POS uses a shortened Medusa order id.
- **Verified / Unverified** — A saved Terminal ID is *Verified* when CommTest (Cmd 003, depth = pinpad + Shva) most recently succeeded against it. *Unverified* means it's saved but the live check never succeeded (or hasn't been re-run). Unverified does **not** block app entry; it's a soft signal shown as a badge in Settings.

## Provider abstraction

- **Payment provider** — One of `mock`, `caspit` (today). Active provider chosen at build time via `EXPO_PUBLIC_PAYMENT_PROVIDER`. Each provider exposes `charge`, `refund`, `void`, `getStatus`, and optionally `verifyConfig`.
- **Provider config schema** — Declarative description of the runtime settings a provider needs. The setup wizard reads this from the active provider and either renders a per-provider config step (Caspit → Terminal ID) or skips it (mock has no schema). New providers add a schema instead of touching wizard code.
- **`verifyConfig(candidate)`** — Optional provider method. Takes a candidate config (not yet persisted) and returns `{ ok: true }` or a typed failure (`NOT_INSTALLED`, `WRONG_TERMINAL_ID`, `SHVA_UNREACHABLE`). Used by the wizard's "Verify" button and Settings' "Re-verify".

## Wizard

- **Wizard completion gate** — The router considers the wizard complete when both conditions hold: (1) the Medusa backend has at least one sales channel, stock location, and region; (2) the active payment provider's required config is saved locally (or provider has no schema). Failing either drops the user into the wizard at the first unsatisfied step.
- **Wizard steps** — `sales-channel → region → stock-location → terminal-id → welcome`. Each step is skipped if its prerequisite is already satisfied.

## Storage

- **`kv`** — The single swap point for persisted storage. SecureStore on native, localStorage on web. Lives in `utils/storage/kv.ts`.
- **`KEYS`** — Registry of all persisted key strings. Single source of truth in `utils/storage/keys.ts`. Read sites never inline raw key strings.
- **Per-concern stores** — `authStorage`, `caspitStorage`, etc. in `utils/storage/`. Read/write sites import these, never `kv` or `KEYS` directly.
