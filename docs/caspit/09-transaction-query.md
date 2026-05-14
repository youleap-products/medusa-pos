# Caspit — Transaction Query (Section 19)

**Command: 012**  
**Source:** Caspit SmartRetail Solution v1.53 §19

Query the pinpad for a specific past transaction by `<Xfield>` (invoice/voucher number), by `<Uid>`, or get the last transaction.

---

## Request

| Tag | Required | Notes |
|-----|----------|-------|
| `<Command>` | Required | `012` |
| `<TerminalId>` | Required | Terminal ID |
| `<TermNo>` | Required | Terminal number |
| `<RequestId>` | Optional | Unique request ID |
| `<Xfield>` | Required (or Uid) | Invoice/voucher number. Use `LAST` to get last transaction |
| `<Uid>` | Optional | 23-digit UID as alternative to Xfield |

```xml
<!-- Query by Xfield -->
<Request>
  <Command>012</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120000</RequestId>
  <Xfield>ECR303093</Xfield>
</Request>

<!-- Query last transaction -->
<Request>
  <Command>012</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120001</RequestId>
  <Xfield>LAST</Xfield>
</Request>

<!-- Query by UID -->
<Request>
  <Command>012</Command>
  <TerminalId>0880381</TerminalId>
  <TermNo>001</TermNo>
  <RequestId>20231201120002</RequestId>
  <Uid>17010913075308802640011</Uid>
</Request>
```

---

## Response (found)

Response contains the full EMV_Output transaction data:

```xml
<Response>
  <ResultCode>0</ResultCode>
  <Xfield>ECR303093</Xfield>
  <Uid>17010913075308802640011</Uid>
  <Amount>10000</Amount>
  <TranType>01</TranType>
  <CreditTerms>1</CreditTerms>
  <Mti>100</Mti>
  <AuthManpikNo>0000541</AuthManpikNo>
  <Pan>000458XXXXXX9709</Pan>
  <CardName>Visa Gold</CardName>
  <Manpik>02</Manpik>
  <Brand>2</Brand>
  <DateTime>0109130753</DateTime>
  <Currency>376</Currency>
  <AshStatus>0</AshStatus>
  <Status>0</Status>
  <!-- additional transaction fields -->
</Response>
```

### Response tags

| Tag | Description |
|-----|-------------|
| `ResultCode` | `0`=found, `10049`=not found, `10102`=invalid Xfield |
| `Uid` | 23-digit unique transaction ID |
| `Xfield` | The voucher number |
| `Amount` | Transaction amount in agorot |
| `TranType` | Transaction type (01=charge, 53=refund, etc.) |
| `Mti` | Message type indicator |
| `AuthManpikNo` | Authorization number from issuer |
| `Pan` | Masked card number (full PAN if `EnableFullPan=1`) |
| `CardName` | Card product name |
| `Manpik` | Issuer code |
| `Brand` | Card brand |
| `AshStatus` | Shva AshStatus of the transaction |
| `Status` | Shva Status of the transaction |

---

## Response (not found)

```xml
<Response>
  <ResultCode>10049</ResultCode>   <!-- TRANSACTION_NOT_FOUND -->
</Response>
```

---

## Error codes

| Code | Meaning |
|------|---------|
| `0` | Transaction found |
| `10049` | Transaction not found |
| `10102` | Invalid Xfield (empty, too long, invalid characters) |

---

## Use case: Recovery after disconnect

If app lost the response after sending a transaction:

```
1. Send Command 012 with the Xfield used in original transaction
2. ResultCode == 0 → transaction exists on pinpad → was processed (approved or declined)
3. ResultCode == 10049 → not found → likely failed or never reached pinpad
4. Check AshStatus in the response to determine if it was approved (AshStatus=0)
```

---

## Notes

- `<Xfield>LAST</Xfield>` added v1.8
- `<Uid>` as query alternative available from v1.30+
- This command only returns `<ResultCode>` as error indicator (but response body includes `<AshStatus>` and `<Status>` of the original transaction)
- Xfield must be unique per transaction — this is why query by Xfield works reliably
- Searches current batch only; transmitted transactions may not be queryable
