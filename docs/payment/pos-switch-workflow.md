# POS Switch — Workflow & Required Operations

Source: `docs/POS interface switch.md`

---

## What the Switch Does

- Multiple Pinpads share one terminal number; Switch centralizes them facing SHVA
- Stores transactions securely; returns a **token** (not the real card number) for future operations
- Handles EOD transmission to SHVA on a schedule
- Enables online/e-commerce transactions without a physical card

---

## Business Day Lifecycle

```
Start of Day
  → Command 013: Pinpad config check/update
  → Check UnsentTransactions != 0 → if yes: Command 010 SubCmd 012 (transmit to switch)
  → Command 010 SubCmd 006: Call SHVA (update blacklist/parameters)
    → ResultCode != 0 → Retry or Stop

During Sale
  → Command 001 [J2]: optional card check
  → Command 001 [J4]: transaction
  → Command 012: query status if response lost
  → Command 010 SubCmd 012: send transaction record to Switch

End of Day
  → Command 010 SubCmd 012: flush any remaining unsent transactions
  → Command 010 SubCmd 013: delete transaction file
```

---

## Required POS Operations — Quick Reference

| Phase | Command | Action | Notes |
|---|---|---|---|
| Start of Day | `Command 013` | Config check | Verify terminal+POS number compatibility |
| Start of Day | `Command 010 SubCmd 006` | Update blacklist/params from SHVA | Mainly for offline transactions |
| During Sale | `Command 001` (J2) | Card check (optional) | Get card details, credit options |
| During Sale | `Command 001` (J4) | Execute transaction | Must print receipt in returned format |
| During Sale | `Command 012` | Query transaction status | Use when response was not received |
| During Sale | `Command 010 SubCmd 012` | Send tran record to Switch | Can be done automatically ("switch send") |
| End of Day | `Command 010 SubCmd 012` | Flush unsent transactions | Catches any "stuck" records on Pinpad |
| End of Day | `Command 010 SubCmd 013` | Delete transaction file | Only allowed if all transactions sent |
| Maintenance | `Command 010 SubCmd 002` | Update Caspit parameters | On-demand |
| Maintenance | `Command 010 SubCmd 003` | Transmit logs | For troubleshooting |
| Maintenance | `Command 010 SubCmd 007` | Pinpad version update | Coordinated with Caspit |

---

## Required BO (Back Office) Switch Operations — EOD

| Action | Notes |
|---|---|
| Get transaction list for terminal | Compare against POS BO using UID |
| Freeze surplus transactions in switch | Frozen = treated as exceptions |
| Request transmission for terminal | Based on business day |
| Get transmission report | SHVA transmission reference for reconciliation |
| Perform missing card transaction | Charge / cancel / refund without card |

---

## Additional Pinpad Capabilities

| Feature | Notes |
|---|---|
| J2 (Card check) | Get card details + credit terms before charging |
| J4 after J2 (Continuation) | No re-swipe needed |
| Smart Swipe | Return Track 2 for non-credit cards via J2 |
| Idle Swipe | Track 2 returned without any command |
| Transaction Query | Look up transaction by POS transaction ID |
| Block Double Transaction | Based on Amount + Card + Transaction ID |
| Fetch Transaction File | For reconciliation with POS |
| Signature | On-screen signature (credit or other purpose) |

---

## Key: Switch vs No-Switch Differences

| Feature | Without Switch | With Switch |
|---|---|---|
| TOTAL/STATIS/TRAN files | Available (Cmds 005/014/007) | Not available |
| Deposit Report | Available (Command 015) | Not available |
| Transaction storage | On Pinpad | On Switch (centralized) |
| Card token | Raw PAN returned | Token returned instead of PAN |
| EOD transmit | Direct to SHVA via Command 006 | Via Command 010 SubCmd 012 |
