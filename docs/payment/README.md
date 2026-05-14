# Payment Layer — Overview

Android POS payment integration for the Sunmi P3Mix tablet. The provider is **Caspit/Ashrait**, communicating via Android Intent (`startActivityForResult`). The layer is provider-agnostic — swapping terminals requires no changes to checkout screens.

---

## Architecture

```
POS Checkout Screen
        │
        ▼
PaymentService           utils/payment/PaymentService.ts
        │  resolves provider from env
        ▼
PaymentProvider          utils/payment/types.ts  (interface)
        │
   ┌────┴───────────┐
   │                │
CaspitAdapter    MockProvider        (dev/test)
        │
        ▼
IntentBridge (Kotlin native module)
        │
        ▼
startActivityForResult → Caspit Android app
```

Active provider is set via `EXPO_PUBLIC_PAYMENT_PROVIDER`:
- `ashrait` → CaspitAdapter (real terminal)
- `mock` → MockProvider (dev/testing)

---

## File inventory

| File | Description |
|------|-------------|
| `README.md` | This file |
| `implementation.md` | Full TypeScript source for all payment layer files |
| `native-bridge.md` | Kotlin source for `IntentBridgeModule` + registration steps |
| `pos-switch-workflow.md` | Day lifecycle: SOD → sale → EOD, Switch command reference |

---

## Key constraints

| Constraint | Detail |
|-----------|--------|
| `<Xfield>` max 19 chars | Medusa JS order IDs are 32 chars — must be shortened before passing as `orderId` |
| `<Amount>` in agorot | 100 NIS = `10000`. No decimals. |
| Success requires ALL THREE zero | `ResultCode=0 AND Status=0 AND AshStatus=0` |
| Save `Uid` from every response | 23-digit string — required for void/cancel |
| TIMEOUT vs CANCELLED | `TIMEOUT` = JS-side (100s, terminal unreachable). `CANCELLED` = Kotlin-side (user pressed Back, immediate). Handle both in UI. |
| Android only | `CaspitAdapter` throws `PLATFORM_UNSUPPORTED` on iOS/web |

---

## Caspit API reference

See [`../caspit/00-index.md`](../caspit/00-index.md) — start there for any question about request/response XML, error codes, or specific commands.

---

## Vendor docs

Raw vendor-supplied documents are in [`../vendor/`](../vendor/):
- `caspit-intent-guide.md` — original Android Intent integration guide
- `caspit-smartretail-spec.md` — full Caspit SmartRetail Solutions spec (v1.53)
- `pos-switch-interface.md` — raw Switch interface notes
