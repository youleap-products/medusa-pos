# Caspit Response XML (INT_OT) — Parsing Guide

---

## Success Detection

**A transaction is approved only when ALL THREE are zero:**

```xml
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
```

**Decision tree:**
1. Check `AshStatus` first. If non-zero → credit company error/decline. See AshStatus table below.
2. If `AshStatus`=0 but `ResultCode`≠0 → Caspit-level error. See ResultCode table below.
3. `CaspitInternalError` is internal debug info — log it but don't show to user.

**Example of a declined transaction:**
```xml
<Status>1038</Status>
<AshStatus>4</AshStatus>
<ResultCode>10048</ResultCode>     <!-- RETVAL_CHECK_OTHER_STATUSES -->
<CaspitInternalError>1403</CaspitInternalError>
```
→ AshStatus 4 = declined by credit company.

---

## Key Response Tags to Save

| Tag | Description |
|---|---|
| `ResultCode` | Caspit result. 0 = success. |
| `Status` | Shva status (simplified). 0 = success. |
| `AshStatus` | Shva detailed status. 0 = success. |
| `Uid` | 23-digit unique transaction ID. **Save this** — needed for void/cancel. Format: `YYMMDDHHMMSSTTTTTTTRRRC` |
| `AuthManpikNo` | Issuer authorization number |
| `Pan` | Masked card number |
| `CardName` | Card name (e.g. "Visa Gold") |
| `Manpik` | Issuer: `01`=Isracard, `02`=CAL, `06`=MAX, `00`=Tourist |
| `Brand` | Card brand: `1`=Mastercard, `2`=Visa, `3`=Diners, `4`=Amex, `5`=Isracard |
| `Amount` | Amount in agorot (echoed) |
| `TranType` | Transaction type (echoed) |
| `PanEntryMode` | Actual payment method: `00`=Magnetic, `40`=EMV chip, `04`=Contactless MSR, `05`=Contactless EMV, `50`=CNP |
| `DateTime` | `MMDDHHMMSS` format |
| `Xfield` | Your invoice number (echoed) |
| `RequestId` | Your request ID (echoed — use to match response to request) |
| `CaspitInternalError` | Internal debug code — log for support |
| `ReceiptMerchant` | Full merchant receipt text (XML `<Line>` elements) |
| `ReceiptCustomer` | Full customer receipt text (XML `<Line>` elements) |

---

## Common ResultCode Values

| Code | Constant | Meaning |
|---|---|---|
| `0` | SUCCESS | Transaction approved |
| `10003` | RETVAL_INCORRECT_TERMINAL_ID | Wrong terminal ID |
| `10022` | RETVAL_INCORRECT_ECR_NUMBER | Wrong ECR number |
| `10036` | RETVAL_XML_MISSING_TERMINAL_ID_TAG | Missing `<TerminalId>` |
| `10041` | RETVAL_ERROR_CONNECTING_TO_PINPAD | Cannot reach Pinpad |
| `10042` | RETVAL_XML_MISSING_REQUEST_ID_TAG | Missing `<RequestId>` |
| `10043` | RETVAL_CASPIT_WINDOWS_SERVICE_NOT_RESPONDING | Service not running (Windows only) |
| `10044` | RETVAL_USER_ABORTED_TRANSACTION | User pressed cancel on Pinpad |
| `10048` | RETVAL_CHECK_OTHER_STATUSES | Check `AshStatus` / `Status` for real error |
| `10050` | RETVAL_DOUBLE_TRANSACTION | Duplicate `Xfield` detected |
| `10053` | RETVAL_PINPAD_RETURNED_EMPTY_RESPONSE | Pinpad returned nothing |
| `10054` | RETVAL_ASHRAIT_INVALID_SETUP | Ashrait config error |
| `10100` | RETVAL_INVALID_PAN_ENTRY_MODE | Bad `PanEntryMode` value |
| `10101` | RETVAL_INVALID_MTI | Bad `Mti` value |
| `10102` | RETVAL_INVALID_X_FIELD | Bad `Xfield` value |
| `10028` | RETVAL_CANT_CONTINUE_J2 | Cannot continue from J2 |

---

## Common AshStatus Values

| Code | Meaning |
|---|---|
| `0` | Success |
| `4` | Declined by credit company |
| `443` | Original transaction not found (for void) — Uid mismatch or already transmitted |

---

## PanEntryMode in Response

| Value | Payment method |
|---|---|
| `00` | Magnetic swipe |
| `04` | Contactless MSR |
| `05` | Contactless EMV |
| `40` | EMV chip (contact) |
| `50` | Card not present (phone) |
| `51` | Signature |
| `80` | Fallback |

---

## Response XML skeleton

```xml
<?xml version="1.0"?>
<EMV_Output>
  <Command>1</Command>
  <RequestId>...</RequestId>
  <TerminalId>...</TerminalId>
  <ResultCode>0</ResultCode>
  <Status>0</Status>
  <AshStatus>0</AshStatus>
  <Mti>100</Mti>
  <Pan>000458XXXXXX9709</Pan>
  <PanEntryMode>40</PanEntryMode>
  <CardName>Visa Gold</CardName>
  <Manpik>02</Manpik>
  <Brand>2</Brand>
  <Amount>10000</Amount>
  <TranType>1</TranType>
  <CreditTerms>1</CreditTerms>
  <Currency>376</Currency>
  <Uid>17010913075308802640011</Uid>
  <AuthManpikNo>0000541</AuthManpikNo>
  <DateTime>0109130753</DateTime>
  <Xfield>20398049823</Xfield>
  <CaspitInternalError>0</CaspitInternalError>
  <ReceiptMerchant>
    <Line>...</Line>
  </ReceiptMerchant>
  <ReceiptCustomer>
    <Line>...</Line>
  </ReceiptCustomer>
</EMV_Output>
```
