# Caspit SmartRetail — Commands Table (Appendix C)

**Source:** Caspit SmartRetail Solution v1.53 §Appendix C (page 183)

---

## All Commands

| Command | Name | Doc Section | Notes |
|---------|------|-------------|-------|
| `001` | Payment transaction | §9 | Charge, void, refund, J2, J4, J5 |
| `002` | Get JENR file | §13 | Journal file (224 chars) |
| `003` | Communication Test | §16 | Pinpad alive + Shva connectivity check |
| `005` | Get TOTAL file | §10 | Last deposit summary. **Switch-incompatible** |
| `006` | Transmit to Shva | §15 | EOD settle batch to Shva |
| `007` | Get TRAN file | §12 | ISO8583 Base64 records per deposit. **Switch-incompatible** |
| `008` | Get DATA file | §14 | Transaction data file (47 chars) |
| `010` | Generic Command | §18 | SubCommand selects operation (see 08-generic-command.md) |
| `012` | Transaction Query | §19 | Query by Xfield or LAST; also used for TRAN file in some flows |
| `013` | Pinpad Configuration | §17 | Get/set config; check CardInside; check UnsentTransactions |
| `014` | Get STATIS file | §11 | All deposits summary (up to 99). **Switch-incompatible** |
| `015` | Get Deposit Report | §22 | Detailed receipt-style deposit report. **Switch-incompatible** |
| `016` | Retrieve File | §20 | Generic file retrieval (whitelist of 8 log files) |
| `019` | UI Command | §23 | Display message on pinpad screen |
| `020` | QR Code | §24 | Display or scan QR code |
| `023` | Swipe Command | §21 | Read card without transaction |
| `026` | VAS | §27 | Apple Pay / Google Pay value-added services |
| `030` | RavSapak | §9.14 | Multi-terminal management (v1.52+) |

---

## Switch-incompatible commands

When terminal uses a Switch (gateway), these commands are **not available / irrelevant**:

| Command | Name | Reason |
|---------|------|--------|
| `005` | Get TOTAL file | Transactions not stored on Pinpad; Switch handles settlement |
| `007` | Get TRAN file | No local TRAN file in Switch mode |
| `014` | Get STATIS file | No local STATIS in Switch mode |
| `015` | Get Deposit Report | No local deposit in Switch mode |

With Switch: use `Command 010 / SubCommand 012` to send batch to Switch.

---

## EOD workflow (quick reference)

### Direct Shva mode
```
1. Command 006                → Transmit batch to Shva
2. Command 005                → Get TOTAL (last deposit summary)
3. Command 014                → Get STATIS (all deposits)
4. Command 007                → Get TRAN (transaction detail records)
5. Command 002                → Get JENR (journal)
6. Command 008                → Get DATA
```

### Switch mode
```
1. Command 010 / SubCommand 012  → Send batch to Switch
```

---

## Response format for non-transaction commands

All non-`001` commands return only `<ResultCode>` (no `<Status>` / `<AshStatus>`):

```xml
<Response>
  <ResultCode>0</ResultCode>
  <!-- command-specific tags -->
</Response>
```
