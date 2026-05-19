# Wizard completion via hybrid server+local gate with soft-block verification

The router decides the wizard is "done" when **both** conditions hold: (1) the Medusa backend has at least one sales channel, stock location, and region; (2) the active payment provider's required config is saved locally (or the provider has no schema). A saved-but-*unverified* Terminal ID satisfies condition (2) — verification is a soft signal, surfaced as an "Unverified" badge in Settings, never a hard block. This keeps fresh tablets recoverable on day-one setup where the Caspit Android app may not be sideloaded yet, while still nudging the user toward a verified state.

## Considered options

- **Single local `wizard_completed: true` flag.** Simplest routing, but a second tablet pointed at the same backend would not auto-detect that SC/SL/region already exist; cashier sees a wizard that immediately asks them to "create" things that already exist.
- **Two separate gates** — server gate routes to today's wizard, a second local-only gate sits in front of `(tabs)` routing to a standalone "Configure terminal" screen. Workable but creates two onboarding surfaces with different visual languages.
- **Hybrid gate, hard block on unverified.** Wizard refuses to advance until live verify returns OK. Brick-on-arrival risk: a brand-new tablet without Caspit installed can't complete setup.
- **Hybrid gate, soft block (chosen).** One unified wizard, one unified gate, both sources of truth contribute. Verify is offered with three distinguishable failure modes (`NOT_INSTALLED`, `WRONG_TERMINAL_ID`, `SHVA_UNREACHABLE`); on failure the user can retry or "Save without verifying" and re-verify from Settings later.

## Consequences

- Verification depth is **pinpad + Shva** (CommTest with `<CheckShva>1</CheckShva>`) — matches what a real charge will do. A green check here means the next charge has a real chance of succeeding, not just that the Caspit app is installed.
- Settings shows an "Unverified" badge next to the Terminal ID until a successful verify is recorded; a "Re-verify" action runs the same check.
- Full-stack diagnostics (also check Switch, Caspit cloud, TMS) are explicitly *out of scope* for this gate and deferred to a future "Diagnostics" Settings action.
