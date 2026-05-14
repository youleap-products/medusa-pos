# Caspit — Pinpad Configuration (Section 17)

**Command: 013**  
**Source:** Caspit SmartRetail Solution v1.53 §17

Use to: read current config, set config options, check card-inside status, check unsent transactions.

---

## Request

Send with no config tags to read current config. Include config tags to change settings.

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `013` |
| `<TerminalId>` | Required to change config | Terminal ID |
| `<TermNo>` | Required to change config | Terminal number |
| `<RequestId>` | Optional | Unique request ID |
| `<ShvaTime>` | Optional | Shva transmission time |
| `<ShvaTimerType>` | Optional | `0`=disabled, `1`=daily, `2`=custom |
| `<EnableIdleSwipe>` | Optional | `1`=enable idle swipe mode |
| `<EnableSmartSwipe>` | Optional | `1`=enable smart swipe |
| `<BlockDoubleTrans>` | Optional | `1`=block duplicate Xfield (default=1), `0`=allow |
| `<AccessControl>` | Optional | `1`=enable access control |
| `<EnableFullPAN>` | Optional | `1`=return full PAN in responses, `0`=masked |
| `<IdleSwipeAddress>` | Optional | IP:port for idle swipe callbacks |
| `<EnableTranSteps>` | Optional | `1`=enable transaction step notifications |
| `<TranStepsAddress>` | Optional | IP:port for TranSteps callbacks |
| `<MustTranSteps>` | Optional | `1`=require TranSteps listener to be running |
| `<BlockAutoSwitchBatchDelete>` | Optional | `1`=block auto-deletion of old Switch batch |
| `<PinpadLock>` | Optional | `1`=lock pinpad, `0`=unlock |
| `<DCCAuthorization>` | Optional | `1`=ECR supports DCC (Dynamic Currency Conversion) |
| `<BListTime>` | Optional | Blacklist refresh time |

```xml
<!-- Read-only (no config changes) -->
<Request>
  <Command>013</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
</Request>

<!-- Set BlockDoubleTrans -->
<Request>
  <Command>013</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120001</RequestId>
  <BlockDoubleTrans>0</BlockDoubleTrans>
</Request>
```

---

## Response

All config tags plus read-only status tags:

```xml
<Response>
  <ResultCode>0</ResultCode>

  <!-- Identity -->
  <TerminalId>0880381</TerminalId>
  <SerialNumber>123456</SerialNumber>
  <PartNumber>ABC123</PartNumber>

  <!-- Versions -->
  <SmartRetailVersion>1.53</SmartRetailVersion>
  <AshraitEMVVersion>...</AshraitEMVVersion>
  <EPAVersion>...</EPAVersion>
  <CPAVersion>...</CPAVersion>
  <SDKVersion>...</SDKVersion>
  <ShvaVersion>...</ShvaVersion>

  <!-- Connection -->
  <CommType>TCP</CommType>
  <ShvaAddress>...</ShvaAddress>
  <SwitchAddress1>...</SwitchAddress1>
  <SwitchAddress2>...</SwitchAddress2>
  <CaspitAddress>...</CaspitAddress>
  <TMSAddress>...</TMSAddress>
  <ReportServerAddress>...</ReportServerAddress>
  <CertServerAddress>...</CertServerAddress>
  <LogServerAddress>...</LogServerAddress>

  <!-- Switch info (read-only) -->
  <SwitchEnabled>0</SwitchEnabled>
  <SwitchName></SwitchName>
  <SwitchId></SwitchId>

  <!-- Status (read-only, critical) -->
  <CardInside>0</CardInside>
  <UnsentTransactions>0</UnsentTransactions>
  <BlacklistStatus>0</BlacklistStatus>
  <ShvaParamStatus>0</ShvaParamStatus>

  <!-- Config (read/write) -->
  <BlockDoubleTrans>1</BlockDoubleTrans>
  <EnableFullPan>0</EnableFullPan>
  <EnableTransSteps>0</EnableTransSteps>
  <TransStepsAddress></TransStepsAddress>
  <MustTransSteps>0</MustTransSteps>
  <EnableIdleSwipe>0</EnableIdleSwipe>
  <EnableSmartSwipe>0</EnableSmartSwipe>
  <AccessControl>0</AccessControl>
  <IdleSwipeAddress></IdleSwipeAddress>

  <!-- Timestamps -->
  <DateTime>...</DateTime>
  <SetupDateTime>...</SetupDateTime>
  <LastTranDateTime>...</LastTranDateTime>
  <LastShvaDateTime>...</LastShvaDateTime>
  <LastSwitchDateTime>...</LastSwitchDateTime>
  <LastCaspitDateTime>...</LastCaspitDateTime>
  <LastTMSDateTime>...</LastTMSDateTime>

  <!-- Business info -->
  <ShvaBusinessName>...</ShvaBusinessName>
  <AshraitSSL>...</AshraitSSL>

  <!-- Timeouts -->
  <CardEntryTimeout>...</CardEntryTimeout>
  <PinEntryTimeout>...</PinEntryTimeout>
</Response>
```

---

## Key response tags

| Tag | Description |
|-----|-------------|
| `CardInside` | `1` = card stuck in reader. Show "please remove card" via UI Command (019) |
| `UnsentTransactions` | Count of transactions not yet transmitted. If >0, call Transmit (006) before EOD |
| `SwitchEnabled` | `1` = Switch mode active (read-only) |
| `BlockDoubleTrans` | `1` = duplicate Xfield blocked (default). ECR can override per-transaction with `<SkipDoubleTranCheck>1` |
| `BlacklistStatus` | `0` = OK, `1` = blacklist update needed |
| `ShvaParamStatus` | `0` = OK, `1` = Shva params update needed |

---

## Common use cases

### Check card stuck in reader (after J2 abort)
```
1. Send Command 013
2. If CardInside == "1" → Send Command 019 with MessageCode for "please remove card"
```

### Check for unsent transactions before EOD
```
1. Send Command 013
2. If UnsentTransactions > 0 → Call Transmit (006) first
```

### Check if Switch mode
```
1. Send Command 013
2. SwitchEnabled == "1" → use Switch flow for EOD
```

---

## Notes

- `<CardInside>` added v1.6 (Dec 2016)
- `<SwitchEnabled>`, `<SwitchName>`, `<SwitchId>` added v1.20/v1.26
- `<BlockAutoSwitchBatchDelete>` added v1.33
- `<PinpadLock>` added v1.34
- Default `<BlockDoubleTrans>` on new pinpad is `1` (enabled); older docs incorrectly said 0 (corrected v1.35)
- Response only has `<ResultCode>` (no `<Status>` / `<AshStatus>`)
