# Provider-declared config schema with lazy per-call reads

Each `PaymentProvider` declares its own runtime config schema (Caspit declares `{ terminalId }`; mock declares nothing). The setup wizard reads the active provider's schema and renders a per-provider config step, or skips the step entirely if the provider has no schema. The provider's transaction methods read the saved config from SecureStore *lazily, on each call* — no constructor injection, no in-memory cache, no service-rebuild dance when Settings edits the config.

## Considered options

- **Always-required Terminal ID field, regardless of provider.** Simplest, but treats a Caspit-specific concept as universal — annoys devs running the mock provider and is meaningless on web.
- **Constructor injection** — `new CaspitAdapter({ terminalId })` built once from SecureStore at boot. Most "correct" OO shape, but every edit in Settings forces a `PaymentService` rebuild; that's a failure mode that only surfaces when a cashier edits the terminal id mid-shift.
- **In-memory config cache with pub/sub** — hydrate at boot, expose sync to adapters, push updates from Settings. Fast, but a pub/sub primitive earns its keep on hot paths, and POS charges are seconds-long human interactions.
- **Provider-declared schema + lazy read per call (chosen).** Wizard step is conditional on the schema. Each `charge` / `refund` / `void` re-reads SecureStore (~1ms — invisible at human timescales). Settings edits are picked up automatically.

## Consequences

- `PaymentProvider` gains an optional `verifyConfig(candidate)` method so the wizard can test a *candidate* config (not yet persisted) without saving-then-rolling-back. Caspit implements it via Cmd 003 (CommTest, depth = pinpad + Shva). Providers without a meaningful online check (mock) simply omit the method and the wizard treats format validation as sufficient.
- Adding a new payment provider means writing a `<Name>Adapter`, optionally declaring a config schema, and registering — *no* wizard or Settings code is touched. The wizard adapts.
- Build-time env vars (`EXPO_PUBLIC_CASPIT_TERMINAL_ID`, `EXPO_PUBLIC_CASPIT_TERM_NO`) are deleted in the same change. `TermNo` is hard-coded to `'001'` until a multi-lane shop appears.
