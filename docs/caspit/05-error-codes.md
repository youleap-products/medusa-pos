# Caspit Error Codes Reference

**Source:** Caspit SmartRetail Solution v1.53  
Appendix A (ResultCode), Appendix H (Shva Status), Appendix I (Shva AshStatus), Appendix K (Internal Error Bases)

---

## Success condition (all three must be 0)

```
ResultCode=0 AND Status=0 AND AshStatus=0
```

---

## Appendix A — ResultCode (Caspit-level)

Non-transaction commands return only `<ResultCode>`. Transaction commands return all three.

| Code | Constant | Meaning |
|------|----------|---------|
| `0` | SUCCESS | OK |
| `10000` | RETVAL_TIMEOUT | Timeout |
| `10001` | RETVAL_AMOUNT_TOO_BIG | Amount exceeds maximum |
| `10002` | RETVAL_AMOUNT_TOO_SMALL | Amount below minimum |
| `10003` | RETVAL_INCORRECT_TERMINAL_ID | Wrong TerminalId |
| `10004` | RETVAL_ERROR_GETTING_TOKEN | J2 succeeded but token request failed (Switch) |
| `10005` | RETVAL_NO_LAST_TRAN_FILE | No TRAN file found |
| `10006` | RETVAL_CANT_FIND_REQUESTED_TRAN_FILE | Requested TRAN file not found |
| `10010` | RETVAL_NOT_RAV_SAPAK_TERMINAL | Not a RavSapak terminal |
| `10015` | RETVAL_SWITCH_BATCH_IS_TOO_OLD | Switch batch too old |
| `10016` | RETVAL_INVALID_CURRENCY_CODE | Invalid Currency value |
| `10017` | RETVAL_USER_PRESSED_ON_RED_KEY | User cancelled on pinpad |
| `10018` | RETVAL_INVALID_AUTHORIZATION_CODE_MANPIK | Invalid auth code (manpik) |
| `10019` | RETVAL_SWITCH_TRAN_FILE_NOTHING_TO_SEND | Nothing to send to Switch |
| `10020` | RETVAL_NO_PAPER_IN_PRINTER | No paper in printer |
| `10021` | RETVAL_SWITCH_TRAN_FILE_IS_EMPTY | Switch TRAN file empty |
| `10022` | RETVAL_INCORRECT_ECR_NUMBER | Wrong ECR/station number |
| `10023` | RETVAL_NO_STATIS_FILE_ON_POS | No STATIS file on POS |
| `10024` | RETVAL_SWITCH_TRAN_HAS_UNSENT_TRANSACTIONS | Unsent transactions in Switch batch |
| `10025` | RETVAL_SWITCH_TRANSACTIONS_SENT_FAILED | Failed to send Switch transactions |
| `10026` | RETVAL_TRAN_STEPS_LISTENER_NOT_WORKING | TranSteps listener not responding |
| `10027` | RETVAL_INVALID_MESSAGE_CODE | Invalid MessageCode in UI Command |
| `10028` | RETVAL_CANT_CONTINUE_J2 | Cannot continue J2 (card changed or PanEntryMode mismatch) |
| `10029` | RETVAL_INVALID_REQUEST_ID | Invalid RequestId |
| `10030` | RETVAL_SHVA_PARAMS_DELETION_FAILED | Shva params deletion failed |
| `10031` | RETVAL_BLACKLIST_DELETION_FAILED | Blacklist deletion failed |
| `10032` | RETVAL_TIMEOUT_EVENT_FROM_CASPIT_DLL | Timeout event from Caspit DLL |
| `10033` | RETVAL_SHVA_CALL_FAILED | Shva call failed |
| `10034` | RETVAL_REPORTS_SERVER_CALL_FAILED | Reports server call failed |
| `10035` | RETVAL_XML_INVALID_METHOD | Invalid XML method |
| `10036` | RETVAL_XML_MISSING_TERMINAL_ID_TAG | Missing `<TerminalId>` in request |
| `10037` | RETVAL_CERTIFICATES_SERVER_CALL_FAILED | Certificates server call failed |
| `10038` | RETVAL_SWITCH_CALL_FAILED | Switch call failed |
| `10039` | RETVAL_INVALID_TRAN_RECORD_NUMBER | Invalid TRAN record number |
| `10040` | RETVAL_FILE_CANNOT_BE_RETRIEVED | File not on whitelist or not found |
| `10041` | RETVAL_ERROR_CONNECTING_TO_PINPAD | Cannot reach Pinpad |
| `10042` | RETVAL_XML_MISSING_REQUEST_ID_TAG | Missing `<RequestId>` in request |
| `10043` | RETVAL_CASPIT_WINDOWS_SERVICE_NOT_RESPONDING | Windows service not running (Android: terminal not responding) |
| `10044` | RETVAL_USER_ABORTED_TRANSACTION | User pressed cancel on Pinpad |
| `10045` | RETVAL_TIMEOUT_CHECK_TRAN | Timeout checking transaction |
| `10046` | RETVAL_XML_MISSING_TIMEOUT_TAG | Missing `<TimeoutInSeconds>` in request |
| `10047` | RETVAL_XML_MISSING_INT_IN_TAG | Missing integer tag in request |
| `10048` | RETVAL_CHECK_OTHER_STATUSES | Real error is in AshStatus/Status — check those |
| `10049` | RETVAL_TRANSACTION_NOT_FOUND | Transaction not found (query by Xfield) |
| `10050` | RETVAL_DOUBLE_TRANSACTION | Duplicate Xfield detected |
| `10051` | RETVAL_BATCH_NUMBER_DOESNT_EXIST | Batch number not found |
| `10052` | RETVAL_INVALID_BLOCK_NUMBER_TO_RESUME | Invalid block number for resume |
| `10053` | RETVAL_PINPAD_RETURNED_EMPTY_RESPONSE | Pinpad returned empty response |
| `10054` | RETVAL_ASHRAIT_INVALID_SETUP | Ashrait configuration error |
| `10055` | RETVAL_NO_PING | No ping response |
| `10056` | RETVAL_UNSUPPORTED_GENERIC_COMMAND_CODE | Unsupported SubCommand value |
| `10057` | RETVAL_TRANSMIT_LOGS_FAILED | Log transmission failed |
| `10058` | RETVAL_NO_CONNECTION_TO_SHVA | No connection to Shva |
| `10059` | RETVAL_DELETE_LOGS_FAILED | Log deletion failed |
| `10060` | RETVAL_CASPIT_TECH_CENTER_FAILED | Caspit tech center call failed |
| `10061` | RETVAL_TERMINAL_REBOOT_FAILED | Terminal reboot failed |
| `10062` | RETVAL_STARTING_TMS_CALL_FAILED | TMS call failed to start |
| `10063` | RETVAL_CLEAN_COMMUNICATION_ENGINE_FAILED | Communication engine cleanup failed |
| `10064` | RETVAL_SETTING_DATE_TIME_FAILED | Setting date/time failed |
| `10065` | RETVAL_TRANSACTIONS_CENTER_CALL_FAILED | Transactions center call failed |
| `10066` | RETVAL_TRANSACTIONS_CENTER_TOGGLE_FAILED | Transactions center toggle failed |
| `10099` | RETVAL_UNKNOWN_ERROR | Unknown error |
| `10100` | RETVAL_INVALID_PAN_ENTRY_MODE | Invalid PanEntryMode value |
| `10101` | RETVAL_INVALID_MTI | Invalid Mti value |
| `10102` | RETVAL_INVALID_X_FIELD | Invalid Xfield (empty, too long, invalid chars) |
| `10103` | RETVAL_CANT_FIND_DEPOSIT_REPORT | Deposit report not found |
| `10104` | RETVAL_INVALID_SESSION_NUMBER_XML_TAG | Invalid Session-Number tag |
| `10105` | RETVAL_INVALID_DATE_XML_TAG | Invalid date tag |
| `10106` | RETVAL_NO_TOTAL_FILE | No TOTAL file |
| `10501` | RETVAL_TIMEOUT_WHILE_WAITING_FOR_SWIPE | Timeout waiting for swipe |
| `10502` | RETVAL_TIMEOUT_AFTER_FAILED_SWIPE_ATTEMPT | Timeout after failed swipe |
| `10503` | RETVAL_CANCEL_WITHOUT_SWIPING | User cancelled without swiping |
| `10504` | RETVAL_CANCEL_AFTER_FAILED_SWIPE_ATTEMPT | User cancelled after failed swipe |
| `11000` | RETVAL_CANNOT_SEND_OUT_CREDIT_CARDS | Cannot send out credit card data |
| `11001` | RETVAL_INVALID_CARD_SWIPE | Invalid card swipe |
| `11002` | RETVAL_FILE_BAD_RECORD | File contains a bad record |
| `12001` | RETVAL_INVALID_VAS_CARD | Invalid VAS card |
| `12003` | RETVAL_CONTINUE_WITH_GOOGLE | Continue with Google Pay flow |
| `12005` | RETVAL_CONTINUE_WITH_PAYMENT | Continue with normal payment |
| `12008` | RETVAL_NOT_ACTIVATED | VAS not activated |
| `12009` | RETVAL_OTHER_WALLET | Other wallet type |
| `≥90000` | Switch error | Switch returned error (Switch mode only) |

---

## Error handling decision tree (transactions)

```
AshStatus == 0?
  YES → ResultCode == 0? → SUCCESS
        ResultCode != 0  → Caspit-level error (see table above)
  NO  → AshStatus is primary error:
          4   = declined by credit company → show "Payment declined"
          3   = declined, try voice auth
          443 = original transaction not found (void failed, already transmitted?)
          421 = J2 mismatch (PanEntryMode or PAN) → restart
          504 = J2 mismatch on contactless → restart
        ResultCode == 10048 → always means "check AshStatus/Status"
```

---

## Appendix H — Shva Status codes

`<Status>` is a simplified Shva status. Always check `<AshStatus>` for detail.

| Code | Meaning |
|------|---------|
| `0000` | Approved |
| `1001` | Insert card |
| `1002` | Remove card |
| `1003` | Enter PIN |
| `1004` | Processing |
| `1005` | Approved — remove card |
| `1006` | Declined — remove card |
| `1007` | Card error — remove card |
| `1008` | Wrong PIN |
| `1009` | PIN blocked |
| `1010` | Card blocked |
| `1011` | Unsupported card |
| `1012` | Card communication error |
| `1013` | Last PIN try |
| `1014` | PIN OK |
| `1015` | Contactless: tap again |
| `1016` | Contactless: use chip |
| `1017` | Contactless: try another card |
| `1018` | Insert or swipe card |
| `1019` | Swipe card |
| `1020` | Enter card number |
| `1021` | Sign slip |
| `1022` | Amount OK? |
| `1023` | Please wait |
| `1024` | Error — try again |
| `1025` | Cashback amount |
| `1026` | Select application |
| `1027` | Application selected |
| `1028` | No applications |
| `1029` | Use magstripe |
| `1030` | Card not supported |
| `1031` | Processing offline |
| `1032` | Approved offline |
| `1033` | Declined offline |
| `1034` | Referral |
| `1035` | Voice auth |
| `1036` | Amount |
| `1037` | Cashier verify signature |
| `1038` | Declined |
| `1039` | Declined — expired |
| `1040` | Declined — stolen |
| `1041` | Declined — restricted |
| `1042` | Declined — invalid |
| `1043` | Declined — insufficient funds |
| `1044` | Declined — duplicate |
| `1045` | Declined — limit exceeded |
| `1046` | Declined — system error |
| `1047` | Approved partial |
| `1048` | Contactless limit |
| `1049` | Enter phone number |
| `1050` | Enter ID |
| `1051` | CVV2 |
| `1052` | Expiry date |
| `1053` | Try contactless |
| `1054` | Communication error |
| `1055` | Switch to contact |
| `1056` | Card OK |
| `1057` | No card |
| `1058` | Wrong card |
| `1059` | Generic card error |
| `1060` | Amount updated |
| `1061` | Cashback |
| `1062` | Partial approval |
| `1063` | Tip amount |
| `2000` | Applicative error |

---

## Appendix I — Shva AshStatus codes

**This is the most important error field for transaction failures.**

### Communication errors (000–042)
| Code | Meaning |
|------|---------|
| `000` | Success |
| `001` | Timeout connecting to Shva |
| `002` | Timeout receiving from Shva |
| `003` | Parity error |
| `004` | Buffer overflow |
| `005` | Transmission error |
| `006` | Line disconnected |
| `007` | Modem not responding |
| `008` | No dial tone |
| `009` | Busy signal |
| `010` | No answer |
| `011` | Invalid phone number |
| `012` | Handshake error |
| `013` | TCP connection refused |
| `014` | TCP timeout |
| `015` | TCP send error |
| `016` | TCP receive error |
| `017` | TCP connection dropped |
| `018` | SSL handshake error |
| `019` | DNS error |
| `020` | SSL certificate error |
| `021`–`042` | Additional communication errors |

### System file errors (051–089)
| Code | Meaning |
|------|---------|
| `051` | TOTAL file error |
| `052` | STATIS file error |
| `053` | TRAN file error |
| `054` | JENR file error |
| `055` | DATA file error |
| `056`–`089` | Other system file errors |

### Vector entry errors (101–123)
| Code | Meaning |
|------|---------|
| `101` | Invalid card number |
| `102` | Invalid expiry date |
| `103` | Invalid amount |
| `104` | Invalid terminal ID |
| `105` | Invalid transaction type |
| `106`–`123` | Other vector entry errors |

### Parameter file errors (141–152)
| Code | Meaning |
|------|---------|
| `141`–`152` | Parameter file read/write errors |

### System file data errors (182–193)
| Code | Meaning |
|------|---------|
| `182`–`193` | Data file corruption errors |

### Acquirer permissions (300–319)
| Code | Meaning |
|------|---------|
| `300` | Acquirer not permitted |
| `301`–`319` | Various acquirer permission errors |

### Issuer permissions (341–354)
| Code | Meaning |
|------|---------|
| `341`–`354` | Issuer permission errors |

### Terminal permissions (381–385)
| Code | Meaning |
|------|---------|
| `381`–`385` | Terminal permission errors |

### Application errors (401–512)
| Code | Meaning |
|------|---------|
| `401` | Transaction approved |
| `402` | Transaction declined |
| `403` | Referral — voice auth required |
| `404` | Original not found (void/J4) |
| `405` | Duplicate transaction |
| `406` | Amount limit exceeded |
| `407` | Card expired |
| `408` | Stolen card |
| `409` | Restricted card |
| `410` | Invalid card |
| `411` | Insufficient funds |
| `412` | PIN required |
| `413` | Invalid PIN |
| `414` | PIN blocked |
| `415` | Card blocked |
| `416` | Unsupported card |
| `417` | Unsupported transaction |
| `421` | J2 continuation error — PanEntryMode or PAN mismatch |
| `443` | Original transaction not found (void) — check OriginalUid; may be already transmitted |
| `504` | J2 continuation error — PAN mismatch on contactless |
| `505`–`512` | Other application errors |

### Tandem response errors (551–567, -98, -99)
| Code | Meaning |
|------|---------|
| `551`–`567` | Tandem host response errors |
| `-98` | Tandem timeout |
| `-99` | Tandem connection error |

### Pinpad errors (700–731)
| Code | Meaning |
|------|---------|
| `700` | Pinpad generic error |
| `701` | EMV kernel error |
| `702` | Card read error |
| `703` | Card removed during transaction |
| `704` | Contactless collision |
| `705`–`731` | Other pinpad hardware errors |

---

## Appendix K — Internal Error Base Values (C defines)

| Category | Base |
|----------|------|
| Communication errors | 0 |
| System file errors | 50 |
| Vector entry errors | 100 |
| Parameter file errors | 140 |
| System data errors | 180 |
| Acquirer permissions | 300 |
| Issuer permissions | 340 |
| Terminal permissions | 380 |
| Application errors | 400 |
| Tandem errors | 550 |
| Pinpad errors | 700 |
