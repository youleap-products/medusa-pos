# Caspit SmartRetail API — Navigation Index

**Source:** Caspit SmartRetail Solution v1.53 (Dec 2023)  
**Android context:** On Android the XML is sent via `Intent` extra `REQUEST_XML` (not Windows Service/TCP). Response comes back in `CASPIT_RESPONSE_EXTRA`. All XML content is identical.

---

## Quick lookup — which file to read

| Question / Task | Read |
|---|---|
| What fields go in a charge request? | `01-request-xml.md` |
| What fields are mandatory for a minimal charge? | `01-request-xml.md` → Minimal Charge Template |
| How do I send a void/cancel? | `02-examples.md` → Example 5 |
| How do I send a refund? | `02-examples.md` → Example 7 |
| How do I do J2 (get card details) then J4? | `02-examples.md` → Example 11 |
| How do I know if the transaction succeeded? | `03-response-xml.md` → Success Detection |
| What does `ResultCode` X mean? | `05-error-codes.md` → ResultCode table |
| What response tags do I need to save? | `03-response-xml.md` → Key Response Tags |
| What is `AshStatus` / `Status`? | `05-error-codes.md` → AshStatus / Status tables |
| What command numbers exist? | `04-commands-table.md` |
| EOD: transmit batch to Shva (direct mode)? | `06-day-operations.md` → Command 006 |
| EOD: send batch to Switch? | `08-generic-command.md` → SubCommand 012 |
| How do I get TOTAL file (last deposit)? | `06-day-operations.md` → Command 005 |
| How do I get STATIS file (all deposits)? | `06-day-operations.md` → Command 014 |
| How do I get TRAN file (transaction records)? | `06-day-operations.md` → Command 007 |
| How do I get JENR / DATA files? | `06-day-operations.md` → Commands 002 / 008 |
| What is the full error codes table? | `05-error-codes.md` |
| How do I check if a card is stuck in reader? | `07-pinpad-config.md` → CardInside |
| How do I configure the pinpad? | `07-pinpad-config.md` → Command 013 |
| What SubCommands exist for Generic Command? | `08-generic-command.md` → Command 010 |
| How do I look up a transaction after a disconnect? | `09-transaction-query.md` → Command 012 |
| How do I display a message on the pinpad screen? | `10-other-commands.md` → Command 019 |
| How do I do a QR code scan/display? | `10-other-commands.md` → Command 020 |
| How do I do a communication test? | `10-other-commands.md` → Command 003 |
| How do I read a card without charging? | `10-other-commands.md` → Command 023 (Swipe) |
| Which commands don't work in Switch mode? | `04-commands-table.md` → Switch-incompatible |

---

## File inventory

| File | Contents |
|---|---|
| `00-index.md` | This index |
| `01-request-xml.md` | Command 001 request tags, minimal template, TranType/Mti values |
| `02-examples.md` | XML examples: charge, installments, void, refund, J2/J4, J5 |
| `03-response-xml.md` | Response tags, success detection, common ResultCode/AshStatus values |
| `04-commands-table.md` | All command numbers and their purpose (quick reference) |
| `05-error-codes.md` | Full ResultCode table, Status, AshStatus, error handling decision tree |
| `06-day-operations.md` | EOD workflow: TOTAL, STATIS, TRAN, JENR, DATA, Transmit to Shva |
| `07-pinpad-config.md` | Command 013: Pinpad config, CardInside check, UnsentTransactions |
| `08-generic-command.md` | Command 010: Generic command with SubCommands (006, 012, 013, 014) |
| `09-transaction-query.md` | Command 012: Query transaction by Xfield or LAST |
| `10-other-commands.md` | Cmds 016, 020, 021, 022, 023, 024, 025: CommTest, Swipe, DepositReport, UI, QR, Delek |

---

## Key Android-specific facts

- **Intent package:** `caspit.core`
- **Intent activity:** `caspit.core.ui.activities.URLSchemeActivity`
- **Request code:** `6600`
- **Request extra key:** `REQUEST_XML` (put the full XML string here)
- **Response extra key:** `CASPIT_RESPONSE_EXTRA` (contains the response XML string)
- If `CASPIT_RESPONSE_EXTRA` is null → treat as `RESULT_CANCELED`

## Critical XML rules

- Do NOT use empty self-closing tags like `<TranType/>` — use `<TranType></TranType>`
- Do NOT use XML attributes
- `<Amount>` is in **agorot** (cents), no decimal point. 100 NIS = `10000`
- `<Currency>` is ISO 4217: `376` = NIS, `840` = USD, `978` = EUR
- `<Xfield>` is **mandatory**, max **19 chars**, must be unique — use the **Medusa JS order ID** (⚠️ Medusa default IDs are 32 chars, must be shortened first)
- `<Command>` for transactions is always `001`

## Android intent for non-transaction commands

Same Intent pattern as transactions — just change the XML:
```kotlin
// Example: UI Command (show message on pinpad) — Command 019
val requestXml = "<Request><Command>019</Command>" +
  "<TerminalId>0880381</TerminalId>" +
  "<TimeoutInSeconds>60</TimeoutInSeconds>" +
  "<TermNo>1</TermNo>" +
  "<RequestId>20200830131427</RequestId></Request>"
```

For non-transaction commands, only `<ResultCode>` is in the response — no `<Status>` or `<AshStatus>`.

---

## Success detection (memorize this)

A transaction is approved **only when ALL THREE** are zero:
```
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
```

If `AshStatus` ≠ 0 → check AshStatus first (credit company declined or error).  
If `AshStatus` = 0 but `ResultCode` ≠ 0 → Caspit-level error (see result codes in `03-response-xml.md`).
