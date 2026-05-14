# Caspit Request XML (INT_IN) — Tag Reference

Command for all transactions: `<Command>001</Command>`

---

## Minimal Charge Template

```xml
<Request>
  <Command>001</Command>
  <RequestId>UNIQUE_ID</RequestId>
  <TerminalId>YOUR_TERMINAL_ID</TerminalId>
  <TermNo>001</TermNo>
  <TimeoutInSeconds>90</TimeoutInSeconds>
  <Mti>100</Mti>
  <CreditTerms>1</CreditTerms>
  <TranType>1</TranType>
  <Amount>10000</Amount>
  <Currency>376</Currency>
  <PanEntryMode>PinPad</PanEntryMode>
  <Xfield>UNIQUE_INVOICE_NUMBER</Xfield>
</Request>
```

---

## Essential Tags

| Tag | Required | Description |
|---|---|---|
| `Command` | Yes | Always `001` for transactions |
| `RequestId` | Yes | Your request ID — echoed back in response for matching |
| `TerminalId` | Yes | 7-digit terminal ID assigned by Caspit |
| `TermNo` | Yes | Station/ECR number, default `001` |
| `TimeoutInSeconds` | Yes | How long Pinpad waits for cardholder action. Use 60–90. |
| `Mti` | Yes | `100`=charge, `400`=void/cancel, `420`=void pre-auth (J5) |
| `CreditTerms` | Yes | `1`=Regular, `3`=Immediate, `8`=Installments |
| `TranType` | Yes | See table below |
| `Amount` | Yes | In **agorot** (cents), no decimal. 100 NIS = `10000` |
| `Currency` | Yes | `376`=NIS, `840`=USD, `978`=EUR |
| `PanEntryMode` | Yes | `PinPad`=default (any method). `50`=CNP/phone. After J2: use value from J2 response. |
| `Xfield` | **Mandatory** | **Medusa JS order ID.** Max 19 chars. Pinpad rejects duplicates (ResultCode 10050). Used for transaction queries. ⚠️ Medusa default order IDs are 32 chars — must be truncated/hashed before use. |
| `ParameterJ` | Conditional | `2`=J2 (card check only), `4`=J4 real charge (default), `5`=pre-auth, `49`=complete J5 |
| `ContinueJ2` | Conditional | `1` if this J4 follows a J2. `2` if following J2 without amount check. |
| `OriginalUid` | For void | Uid from the original transaction response |
| `AllowCardInsideBefore` | J2+J4 | `1` = allow card to stay in reader between J2 and J4 |
| `AllowCardInsideAfter` | J2 | `1` = don't ask cardholder to remove card after J2 |
| `NoPayments` | Installments | Number of installments (not including first) |
| `FirstPayment` | Installments | First installment amount in agorot |
| `NotFirstPayment` | Installments | Remaining installments amount in agorot |

---

## TranType values

| Value | Meaning |
|---|---|
| `01` or `1` | Regular debit charge |
| `02` | Discharge |
| `03` | Forced (merchant takes responsibility, no online auth) |
| `06` | Cashback |
| `07` | Cash |
| `11` | Recurring |
| `30` | Get balance (Amount must be 100) |
| `53` | Refund (credit) |
| `55` | Topup (load gift card) |

---

## Mti values

| Value | Meaning |
|---|---|
| `100` | Regular / refund / J2 / J4 / J5 |
| `400` | Void (cancel existing transaction) |
| `420` | Void pre-authorization (cancel J5) |

---

## Void/Cancel extra tags

```xml
<Mti>400</Mti>
<CreditTerms>1</CreditTerms>          <!-- same as original -->
<TranType>01</TranType>               <!-- same as original -->
<Amount>10000</Amount>                <!-- same as original -->
<Currency>376</Currency>              <!-- same as original -->
<OriginalUid>ORIGINAL_UID</OriginalUid>
<Xfield>NEW_UNIQUE_XFIELD</Xfield>   <!-- must be NEW, not original -->
```
