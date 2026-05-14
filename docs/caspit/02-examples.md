# Caspit Transaction XML Examples

---

## Example 1 — Regular Charge (J4)

100 NIS charge, cardholder taps/swipes/inserts card.

```xml
<Request>
  <Command>001</Command>
  <RequestId>23049820984</RequestId>
  <TerminalId>0880264</TerminalId>
  <TermNo>001</TermNo>
  <TimeoutInSeconds>90</TimeoutInSeconds>
  <Mti>100</Mti>
  <CreditTerms>1</CreditTerms>
  <TranType>1</TranType>
  <Amount>10000</Amount>
  <Currency>376</Currency>
  <PanEntryMode>PinPad</PanEntryMode>
  <Xfield>20398049823</Xfield>
</Request>
```

Successful response key fields:
```xml
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<Uid>17010913075308802640011</Uid>
<AuthManpikNo>0000541</AuthManpikNo>
<Pan>000458XXXXXX9709</Pan>
<CardName>Visa Gold</CardName>
```

---

## Example 5 — Void / Cancel

Cancels an existing transaction that hasn't been transmitted to Shva yet.  
Requires the `Uid` from the original transaction response.

```xml
<Request>
  <Command>001</Command>
  <RequestId>23049820985</RequestId>
  <TerminalId>0880264</TerminalId>
  <TermNo>001</TermNo>
  <TimeoutInSeconds>90</TimeoutInSeconds>
  <Mti>400</Mti>
  <CreditTerms>1</CreditTerms>      <!-- same as original -->
  <TranType>01</TranType>           <!-- same as original -->
  <Amount>10000</Amount>            <!-- same as original -->
  <Currency>376</Currency>
  <OriginalUid>23929384738828374</OriginalUid>
  <Xfield>NEW_UNIQUE_XFIELD</Xfield>
</Request>
```

> **Cancel vs Refund:** Cancel requires the original transaction to be in the batch (not yet sent to Shva). Refund is a new transaction — no original needed.  
> If `OriginalUid` not found or mismatch: `AshStatus` = 443.

---

## Example 7 — Refund (Credit)

Independent refund — no link to original transaction.

```xml
<Request>
  <Command>001</Command>
  <RequestId>23049820986</RequestId>
  <TerminalId>0880264</TerminalId>
  <TermNo>001</TermNo>
  <TimeoutInSeconds>90</TimeoutInSeconds>
  <Mti>100</Mti>
  <CreditTerms>1</CreditTerms>
  <TranType>53</TranType>
  <Amount>10000</Amount>
  <Currency>376</Currency>
  <PanEntryMode>PinPad</PanEntryMode>
  <Xfield>GGG23942304938</Xfield>
</Request>
```

---

## Example 11 — J2 (Get Card Details) + J4 (Complete Charge)

Use J2 when you want to read the card first, show available credit terms to cashier, then complete the transaction.

### Step 1: Send J2

```xml
<Request>
  <Command>001</Command>
  <RequestId>J2_REQUEST_ID</RequestId>
  <TerminalId>0880264</TerminalId>
  <TermNo>001</TermNo>
  <TimeoutInSeconds>90</TimeoutInSeconds>
  <Mti>100</Mti>
  <CreditTerms>1</CreditTerms>
  <TranType>1</TranType>
  <Amount>10000</Amount>
  <Currency>376</Currency>
  <PanEntryMode>PinPad</PanEntryMode>
  <Xfield>J2_XFIELD</Xfield>
  <ParameterJ>2</ParameterJ>
  <AllowCardInsideAfter>1</AllowCardInsideAfter>
</Request>
```

J2 response (no receipt, includes card details + `PossibleCreditTerms`):
```xml
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<PanEntryMode>40</PanEntryMode>    <!-- save this value -->
<Pan>XXXXXXXXX1234</Pan>           <!-- save this value -->
<ParameterJ>2</ParameterJ>
<PossibleCreditTerms>...</PossibleCreditTerms>
```

### Step 2: Send J4 with J2 result

Use `PanEntryMode` and `Pan` values from J2 response.

```xml
<Request>
  <Command>001</Command>
  <RequestId>J4_REQUEST_ID</RequestId>
  <TerminalId>0880264</TerminalId>
  <TermNo>001</TermNo>
  <TimeoutInSeconds>90</TimeoutInSeconds>
  <Mti>100</Mti>
  <CreditTerms>1</CreditTerms>
  <TranType>1</TranType>
  <Amount>10000</Amount>
  <Currency>376</Currency>
  <PanEntryMode>40</PanEntryMode>          <!-- from J2 response -->
  <Pan>XXXXXXXXX1234</Pan>                 <!-- from J2 response -->
  <Xfield>J4_XFIELD</Xfield>              <!-- new unique xfield -->
  <AllowCardInsideBefore>1</AllowCardInsideBefore>
  <ContinueJ2>1</ContinueJ2>
  <ParameterJ>4</ParameterJ>
</Request>
```

> If J2 used contactless (`PanEntryMode` 04 or 05), no card-in-reader for J4 — just omit `AllowCardInsideBefore`.
