# Caspit — Day Operations (Sections 10–15)

**Source:** Caspit SmartRetail Solution v1.53 §§10–15

Commands for EOD reconciliation: TOTAL, STATIS, TRAN, JENR, DATA, Transmit to Shva.  
All these commands return only `<ResultCode>` (no `<Status>` / `<AshStatus>`).

---

## EOD workflow overview

### Direct Shva mode
```
1. Command 006                → Transmit batch to Shva (gets new Session-Number)
2. Command 005                → Get TOTAL (last deposit summary)
3. Command 014                → Get STATIS (all deposits, paginated)
4. Command 007                → Get TRAN file (ISO8583 records, paginated)
5. Command 002                → Get JENR file
6. Command 008                → Get DATA file
```

### Switch mode
```
Command 010 / SubCommand 012  → Send batch to Switch
(TOTAL, STATIS, TRAN, JENR not available in Switch mode)
```

---

## Section 10: Get TOTAL File — Command 005

Summary of the **last** deposit only.

### Request
| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `005` |
| `<TerminalId>` | Required | Terminal ID |
| `<TermNo>` | Required | Terminal number |
| `<RequestId>` | Required | Unique request ID |

```xml
<Request>
  <Command>005</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

### Response
```xml
<Response>
  <ResultCode>0</ResultCode>
  <StaticObj>
    <Date>011201</Date>
    <Session-Number>18</Session-Number>
    <File-Number>02</File-Number>
    <File-Open-Date>011201</File-Open-Date>
    <All-Debit-Num-Recs>5</All-Debit-Num-Recs>
    <All-Debit-Sums>50000</All-Debit-Sums>
    <All-Credit-Num-Recs>1</All-Credit-Num-Recs>
    <All-Credit-Sums>10000</All-Credit-Sums>
    <Solek-List>...</Solek-List>
  </StaticObj>
</Response>
```

| Tag | Description |
|-----|-------------|
| `Date` | Deposit date (DDMMYY) |
| `Session-Number` | Deposit/batch session number |
| `File-Number` | File number (cycles 01–99) |
| `All-Debit-Num-Recs` | Count of debit transactions |
| `All-Debit-Sums` | Total debit amount (agorot) |
| `All-Credit-Num-Recs` | Count of credit (refund) transactions |
| `All-Credit-Sums` | Total credit amount (agorot) |
| `Solek-List` | Per-acquirer breakdown |

> **Switch-incompatible** — not available in Switch mode.

---

## Section 11: Get STATIS File — Command 014

Summary of **all** deposits (up to 99), paginated via `<CurrentRecord>`.

### Request
| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `014` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Required | |
| `<CurrentRecord>` | Optional | `000` to start from beginning; omit for first page |

```xml
<Request>
  <Command>014</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <CurrentRecord>000</CurrentRecord>
</Request>
```

### Response
```xml
<Response>
  <ResultCode>0</ResultCode>
  <CurrentRecord>005</CurrentRecord>
  <NumberOfRecords>18</NumberOfRecords>
  <StaticObj>...</StaticObj>   <!-- one per returned record, same structure as TOTAL -->
</Response>
```

**Pagination:** Repeat request with `<CurrentRecord>` set to last returned value until all records fetched.

> **Switch-incompatible** — not available in Switch mode.

---

## Section 12: Get TRAN File — Command 007

Detailed transaction records for a specific deposit. Records are ISO8583 format, Base64 encoded.

### Request
| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `007` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Required | |
| `<FileNo>` | Optional | `00` = current/latest deposit |
| `<CurrentRecord>` | Optional | `000` = start from first record |
| `<RecordsPerRequest>` | Optional | 1–5 records per response |

```xml
<Request>
  <Command>007</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <FileNo>00</FileNo>
  <CurrentRecord>000</CurrentRecord>
  <RecordsPerRequest>5</RecordsPerRequest>
</Request>
```

### Response
```xml
<Response>
  <ResultCode>0</ResultCode>
  <FileNo>02</FileNo>
  <RecordFrom>1</RecordFrom>
  <RecordTo>5</RecordTo>
  <TotalNumberOfRecords>23</TotalNumberOfRecords>
  <Record>BASE64_ISO8583_DATA</Record>
  <Record>BASE64_ISO8583_DATA</Record>
  <!-- up to RecordsPerRequest records -->
</Response>
```

**Pagination:** Repeat with `<CurrentRecord>` = `RecordTo` until `RecordTo == TotalNumberOfRecords`.

> **Switch-incompatible** — not available in Switch mode.

---

## Section 13: Get JENR File — Command 002

Journal file (224 characters per record).

### Request
| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `002` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Required | |

```xml
<Request>
  <Command>002</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

### Response
```xml
<Response>
  <ResultCode>0</ResultCode>
  <JENR>...224 chars...</JENR>
</Response>
```

---

## Section 14: Get DATA File — Command 008

Transaction data file (47 characters).

### Request
| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `008` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Required | |

```xml
<Request>
  <Command>008</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

### Response
```xml
<Response>
  <ResultCode>0</ResultCode>
  <DATA>...47 chars...</DATA>
</Response>
```

---

## Section 15: Transmit to Shva — Command 006

EOD settlement command. Transmits current batch to Shva. Opens a new session/batch.

### Request
| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `006` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Required | |

```xml
<Request>
  <Command>006</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>
```

### Response (direct Shva mode)
```xml
<Response>
  <ResultCode>0</ResultCode>
  <Session-Number>18</Session-Number>   <!-- new session after transmission -->
  <File-Number>02</File-Number>          <!-- increments 01-99 cyclically -->
  <Date>011201</Date>
  <DATA>...47 chars...</DATA>
</Response>
```

### Response (Switch mode)
```xml
<Response>
  <ResultCode>0</ResultCode>
  <!-- Session-Number, File-Number, Date, DATA are absent in Switch mode -->
</Response>
```

**Notes:**
- After successful transmit, TRAN file starts fresh for next batch
- `File-Number` cycles 01–99
- Switch mode: sends to Switch, not directly to Shva; `Session-Number` etc. absent
- Added `Session-Number` and `File-Number` to response in v1.3
