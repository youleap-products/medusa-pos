# Caspit — Generic Command (Section 18)

**Command: 010**  
**Source:** Caspit SmartRetail Solution v1.53 §18

Uses `<SubCommand>` to select the operation.

---

## Request structure

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `010` |
| `<SubCommand>` | Required | See table below |
| `<TerminalId>` | Required | Terminal ID (use `0000000` for RAV-SAPAK) |
| `<TermNo>` | Required | Terminal number |
| `<RequestId>` | Optional | Unique request ID |

```xml
<Request>
  <Command>010</Command>
  <SubCommand>NNN</SubCommand>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

---

## SubCommand table

| SubCommand | Purpose | Notes |
|------------|---------|-------|
| `001` | Call TMS (Terminal Management System) | Download params from Caspit server |
| `002` | Call Caspit server | |
| `003` | Reboot terminal | |
| `004` | Clean communication engine | |
| `005` | Set date/time | |
| `006` | Call Shva without sending transactions | Connectivity test to Shva |
| `007` | Call certificates server | |
| `008` | Call reports server | |
| `009` | Transmit logs | |
| `010` | Delete logs | |
| `011` | Toggle transactions center | |
| `012` | Send transaction records to Shva/Switch | Main EOD command |
| `013` | Switch-specific: delete Switch batch | |
| `014` | Switch-specific: get Switch batch status | |
| `015` | Call transactions center | |

---

## SubCommand 006 — Call Shva without transactions

Tests Shva connectivity without sending any transaction data.

```xml
<Request>
  <Command>010</Command>
  <SubCommand>006</SubCommand>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

Response:
```xml
<Response>
  <ResultCode>0</ResultCode>   <!-- 0 = Shva reachable -->
</Response>
```

Error codes: `10033`=SHVA_CALL_FAILED, `10058`=NO_CONNECTION_TO_SHVA

---

## SubCommand 012 — Transmit to Shva / Switch (EOD)

Sends all unsent transaction records. Same as Command 006 (Transmit) but via Generic Command.

```xml
<Request>
  <Command>010</Command>
  <SubCommand>012</SubCommand>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

Response (direct Shva):
```xml
<Response>
  <ResultCode>0</ResultCode>
  <Session-Number>18</Session-Number>
  <File-Number>02</File-Number>
  <Date>011201</Date>
  <DATA>...47 chars...</DATA>
</Response>
```

Response (Switch mode — `Session-Number`, `File-Number`, `Date`, `DATA` absent):
```xml
<Response>
  <ResultCode>0</ResultCode>
</Response>
```

Error codes: `10019`=NOTHING_TO_SEND, `10021`=TRAN_FILE_EMPTY, `10024`=HAS_UNSENT, `10025`=SENT_FAILED, `10038`=SWITCH_CALL_FAILED

> When `<SwitchSend>1</SwitchSend>` is in a transaction request, Pinpad auto-calls SubCommand 012 after each transaction (sends all pending, not just current).

---

## SubCommand 013 — Delete Switch batch

Deletes current Switch batch (Switch mode only).

Error codes: `10031`=BLACKLIST_DELETION_FAILED, `10030`=SHVA_PARAMS_DELETION_FAILED

---

## SubCommand 014 — Get Switch batch status

Returns Switch batch status information (Switch mode only).

---

## SubCommand 001 — Call TMS

Downloads latest parameters from Caspit TMS server.

Error codes: `10062`=STARTING_TMS_CALL_FAILED

---

## RAV-SAPAK mode

For multi-terminal management (`TerminalId=0000000`), only SubCommands **012** and **013** are supported.

```xml
<Request>
  <Command>010</Command>
  <SubCommand>012</SubCommand>
  <TerminalId>0000000</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

On per-terminal error, response includes `<FailedTerminal>` tag:
```xml
<Response>
  <ResultCode>10025</ResultCode>
  <FailedTerminal>0880381</FailedTerminal>
</Response>
```

---

## Response (general)

All Generic Command responses use only `<ResultCode>` (no `<Status>` / `<AshStatus>`):

```xml
<Response>
  <ResultCode>0</ResultCode>
  <!-- SubCommand-specific tags (if any) -->
</Response>
```

---

## Version history

- SubCommand `006` added v1.3
- SubCommands `012`, `013`, `014` added v1.20–v1.21
- SubCommand `001` (TMS) added v1.40+
