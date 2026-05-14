# Caspit — Other Commands (Sections 16, 20–27)

**Source:** Caspit SmartRetail Solution v1.53 §§16, 20–27

All commands here return only `<ResultCode>` (no `<Status>` / `<AshStatus>`).

---

## Section 16: Communication Test — Command 003

Tests that the pinpad is alive and optionally checks connectivity to Shva.

### Request

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `003` |
| `<TerminalId>` | Required | Terminal ID |
| `<TermNo>` | Required | Terminal number |
| `<RequestId>` | Optional | |
| `<CheckShva>` | Optional | `1`=also check Shva connectivity |
| `<CheckSwitch>` | Optional | `1`=also check Switch connectivity |
| `<CheckCaspit>` | Optional | `1`=also check Caspit server |
| `<CheckTMS>` | Optional | `1`=also check TMS server |
| `<CheckReports>` | Optional | `1`=also check reports server |

```xml
<Request>
  <Command>003</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <CheckShva>1</CheckShva>
</Request>
```

### Response

```xml
<Response>
  <ResultCode>0</ResultCode>
  <CardInside>0</CardInside>
  <SmartRetailVersion>1.53</SmartRetailVersion>
  <AshraitEMVVersion>...</AshraitEMVVersion>
  <ShvaVersion>...</ShvaVersion>
  <CheckShvaResult>0</CheckShvaResult>     <!-- 0=OK, non-zero=unreachable -->
  <CheckSwitchResult>0</CheckSwitchResult>
  <CheckCaspitResult>0</CheckCaspitResult>
</Response>
```

| Tag | Description |
|-----|-------------|
| `CardInside` | `1`=card stuck in reader (added v1.5) |
| `CheckShvaResult` | `0`=Shva reachable |
| `SmartRetailVersion` | Pinpad firmware version |

---

## Section 20: Retrieve File — Command 016

Retrieve a specific log file from the pinpad. Only whitelisted files allowed.

### Request

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `016` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Optional | |
| `<FileName>` | Required | File name (must be on whitelist) |
| `<BlockNumber>` | Optional | Block index for pagination (starts at 0) |
| `<BlockSize>` | Optional | Bytes per block (default varies) |

```xml
<Request>
  <Command>016</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <FileName>caspit.log</FileName>
  <BlockNumber>0</BlockNumber>
  <BlockSize>4096</BlockSize>
</Request>
```

### Whitelisted files

| File | Description |
|------|-------------|
| `caspit.log` | Caspit application log |
| `ashrait.log` | Ashrait EMV log |
| `shva.log` | Shva communication log |
| `switch.log` | Switch communication log |
| `tms.log` | TMS log |
| `update.log` | Update/install log |
| `error.log` | Error log |
| `debug.log` | Debug log |

### Response

```xml
<Response>
  <ResultCode>0</ResultCode>
  <FileContent>BASE64_ENCODED_FILE_BLOCK</FileContent>
  <TotalBlocks>5</TotalBlocks>
  <CurrentBlock>0</CurrentBlock>
</Response>
```

**Pagination:** Increment `<BlockNumber>` until `CurrentBlock == TotalBlocks - 1`.

Error codes: `10040`=FILE_CANNOT_BE_RETRIEVED (not whitelisted or not found)

---

## Section 21: Swipe Command — Command 023

Read card data without performing a transaction.

### Request

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `023` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Optional | |
| `<TimeoutInSeconds>` | Required | How long to wait for card |
| `<Line1>` | Optional | Base64-encoded Hebrew text for line 1 on pinpad |
| `<Line2>` | Optional | Base64-encoded Hebrew text for line 2 on pinpad |

```xml
<Request>
  <Command>023</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <TimeoutInSeconds>60</TimeoutInSeconds>
</Request>
```

### Response

```xml
<Response>
  <ResultCode>0</ResultCode>
  <Pan>000458XXXXXX9709</Pan>
  <CardHash>...</CardHash>
  <CardName>Visa Gold</CardName>
  <Manpik>02</Manpik>
  <Brand>2</Brand>
  <PanEntryMode>0</PanEntryMode>   <!-- 0=swipe, 51=manual keypad entry -->
  <Track1>...</Track1>
  <Track2>...</Track2>
  <Track3>...</Track3>
</Response>
```

| Tag | Description |
|-----|-------------|
| `Pan` | Masked PAN (full if EnableFullPan=1) |
| `CardHash` | Card hash (added v1.29) |
| `PanEntryMode` | `0`=swipe, `51`=manual keypad |
| `Track1/2/3` | Raw track data |

Error codes: `10501`=TIMEOUT_WAITING, `10502`=TIMEOUT_AFTER_FAIL, `10503`=CANCEL_NO_SWIPE, `10504`=CANCEL_AFTER_FAIL

---

## Section 22: Deposit Report — Command 015

Detailed receipt-style report of all transactions in a deposit.  
**Not available in Switch mode.**

### Request

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `015` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Optional | |
| `<Session-Number>` | Required | Session number, or `LAST` for most recent deposit |

```xml
<!-- Last deposit -->
<Request>
  <Command>015</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <Session-Number>LAST</Session-Number>
</Request>

<!-- Specific deposit -->
<Request>
  <Command>015</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120001</RequestId>
  <Session-Number>17</Session-Number>
</Request>
```

### Response

```xml
<Response>
  <ResultCode>0</ResultCode>
  <DepositReport>
    <Line>...</Line>
    <Line>...</Line>
    <!-- receipt-style lines, one per transaction -->
  </DepositReport>
</Response>
```

`<Session-Number>LAST</Session-Number>` support added v1.52.

Error code: `10103`=CANT_FIND_DEPOSIT_REPORT

---

## Section 23: UI Command — Command 019

Display a message on the pinpad screen.

### Request

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `019` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Optional | |
| `<TimeoutInSeconds>` | Required | How long to show message |
| `<MessageCode>` | Required | Code from table below (or `000` for free text) |
| `<FreeText>` | Optional | Free text (v1.53+, used when MessageCode=000) |
| `<WaitCardRemoval>` | Optional | `1`=wait until card removed before returning |
| `<WaitForKey>` | Optional | `1`=wait for keypress before returning |
| `<Language>` | Optional | `iw_IL`=Hebrew (default), `en_US`=English |

```xml
<Request>
  <Command>019</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <TimeoutInSeconds>30</TimeoutInSeconds>
  <MessageCode>004</MessageCode>
</Request>
```

### MessageCode values

| Code | Message |
|------|---------|
| `001` | Please insert/swipe card |
| `002` | Please remove card |
| `003` | Transaction approved |
| `004` | Transaction declined |
| `005` | Please wait |
| `006` | Communication error |
| `007` | Please enter PIN |
| `008` | Incorrect PIN |
| `009` | Card blocked |
| `010` | Card error |
| `011` | Processing |
| `012` | Connecting to Shva |
| `013` | Connecting to Switch |
| `014` | Transmitting |
| `015` | Complete |
| `016` | Thank you |
| `017` | Cashback |
| `018` | Enter amount |
| `019` | Approved — remove card |
| `020` | Declined — remove card |
| `021` | Sign slip |
| `022` | Check signature |
| `023` | Partial approval |
| `024` | Voice authorization required |
| `025` | Enter auth code |
| `026` | Transaction cancelled |
| `027` | Timeout |
| `028` | No connection |
| `029` | Try again |
| `030` | Use chip |
| `031` | Use contactless |
| `032` | Use magstripe |
| `033` | Card not supported |
| `000` | Free text (v1.53+, set `<FreeText>` tag) |

### Response

```xml
<Response>
  <ResultCode>0</ResultCode>
</Response>
```

Error code: `10027`=INVALID_MESSAGE_CODE

---

## Section 24: QR Code — Command 020

Display a QR code on the pinpad or scan a QR code using the camera.

### Request — Display QR

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `020` |
| `<TerminalId>` | Required | |
| `<TermNo>` | Required | |
| `<RequestId>` | Optional | |
| `<QrCode>` | Required | Data string to encode as QR |
| `<TimeoutInSeconds>` | Optional | How long to display |

```xml
<Request>
  <Command>020</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <QrCode>https://example.com/pay/12345</QrCode>
  <TimeoutInSeconds>60</TimeoutInSeconds>
</Request>
```

### Request — Scan QR (camera)

Omit `<QrCode>` tag to enter scan mode:

```xml
<Request>
  <Command>020</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120001</RequestId>
  <TimeoutInSeconds>30</TimeoutInSeconds>
</Request>
```

### Response

```xml
<!-- Display mode -->
<Response>
  <ResultCode>0</ResultCode>
</Response>

<!-- Scan mode -->
<Response>
  <ResultCode>0</ResultCode>
  <QrCode>SCANNED_CONTENT</QrCode>
</Response>
```

QR Display added v1.41 (Nov 2019). Camera scan on supported devices added v1.52.

---

## Section 25: Delek (Fuel) Commands — Command 001

Petrol/fuel station support via Ashrait Delek extension. Uses Command 001 with special transaction types.

### J59 — Delek fuel authorization (pre-auth)

```xml
<Request>
  <Command>001</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <Xfield>UNIQUE_ID</Xfield>
  <Amount>0</Amount>
  <Currency>376</Currency>
  <TranType>59</TranType>           <!-- J59 = Delek pre-auth -->
  <ParameterJ5>1</ParameterJ5>
  <Tidluk1>PUMP_NUMBER</Tidluk1>
  <!-- additional Delek-specific tags -->
</Request>
```

Response includes `<TwoPhaseRequest>` tag with data needed for J49 completion.

### J49 — Delek completion

```xml
<Request>
  <Command>001</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120001</RequestId>
  <Xfield>UNIQUE_ID_2</Xfield>
  <Amount>ACTUAL_FUEL_AMOUNT</Amount>
  <Currency>376</Currency>
  <TranType>49</TranType>           <!-- J49 = Delek completion -->
  <ParameterJ49>DATA_FROM_J59_RESPONSE</ParameterJ49>
  <!-- fuelling quantity fields -->
</Request>
```

Delek support added v1.50.

---

## Section 26: RavSapak — Command 030

Multi-terminal management. Controls multiple terminals from a single ECR.

```xml
<Request>
  <Command>030</Command>
  <TerminalId>0000000</TerminalId>   <!-- 0000000 = all terminals -->
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <!-- RavSapak-specific tags -->
</Request>
```

Added v1.52.

---

## Section 27: VAS (Value-Added Services) — Command 026

Apple Pay, Google Pay, and other wallet integrations.

```xml
<Request>
  <Command>026</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <TimeoutInSeconds>30</TimeoutInSeconds>
</Request>
```

Response:
```xml
<Response>
  <ResultCode>0</ResultCode>         <!-- or 12003=CONTINUE_WITH_GOOGLE, 12005=CONTINUE_WITH_PAYMENT -->
  <VasData>...</VasData>
</Response>
```

| ResultCode | Meaning |
|------------|---------|
| `0` | VAS approved |
| `12001` | Invalid VAS card |
| `12003` | Continue with Google Pay flow |
| `12005` | Continue with normal payment |
| `12008` | VAS not activated |
| `12009` | Other wallet type |

Added v1.53.
