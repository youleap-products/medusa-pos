## Switch Functions

* Enable the execution of transactions from multiple Pinpads using the same terminal number but different POS numbers, centralizing them under a single terminal number facing SHVA.
* Save transactions in a centralized and secure location.
* Return a token representing the credit card number for specific operations that do not require the physical card (e.g., refunds, charges).
* Ability to perform an online (E-commerce) transaction with the same terminal number without a physical card (not via the Pinpad).
* Generate transaction reports (for reconciliation with Back Office (BO) transactions) and mark transactions for deletion or freezing (not for transmission).
* Transmit transactions to SHVA for each terminal number based on a predefined schedule, business day, etc.
* Generate transmission reports for reconciliation and inquiries.

## Transaction Approval Request

*EMV / "*
*EMV*

## Transaction Reporting and End of Day

*EMV / "*
*EMV*

## Business Day Open/Close Process

* `Init`
* `at start of day`
* `Get Pinpad config`
* `Command 13`
* `UnsentTransactions != 0`
* `Send Tran to switch`
* `Command 10`, `SubCommand 12`, `ResultCode = 10025` -> `Retry or Stop activity`
* `DeleteTran File`
* `Command 10`, `SubCommand 13`, `ResultCode = 10024`
* `Yes / No`
* `parameters BListTime > 24 hours`
* `No 10019 and 10021 are not errors`
* `Call SHVA`
* `Command 10`, `SubCommand 6`, `ResultCode != 0` -> `Retry or Stop activity`
* `Yes Can Do Transactions`
* `No / Yes / No / No`
* `UnsentTransactions`
* `BListTime`

---

## Required POS Operations Facing the Pinpad

| Phase | Action | Purpose | Notes |
| :--- | :--- | :--- | :--- |
| **At Start of Day** | Configuration Check/Update<br>`Command 13` | Verify compatibility of terminal number and POS number against POS data. | Can update Pinpad config (e.g., double transaction checks, etc.). |
| | Update Blocked Cards & Parameters<br>`Command 6` | Update daily data from SHVA. | Mainly used for OFFLINE transactions. Can be performed automatically. |
| **During Sale** | Card Data Check (J2) (Optional)<br>`Command 1` | Check card details and credit options. | Can check customer club details via HASH. |
| | Perform Transaction (J4)<br>`Command 1` | Execute transaction facing SHVA via the switch. | Must print receipt in the sent format. The switch will return a token instead of a credit card. |
| | Query Transaction Status<br>(By POS Transaction ID)<br>`Command 12` | Inquire about the status of a transaction that was not received at the POS. | Must verify compatibility with request parameters (e.g., XFIELD, Amount, MTI, etc.). |
| | Update POS BO with Transaction Details (Not facing Pinpad) | Save transaction data including UID for inquiries and reconciliations. | UID will be used to compare transactions against the switch. |
| | Transmit Transaction to Switch<br>`Command 10`, `Subcommand 12` | Update the switch with the created transaction record. | The record will be reported to SHVA at end of day. Alternatively, can be done automatically right after the transaction via "switch send". |
| **At End of Day** | Transmit Transaction to Switch<br>`Command 10`, `Subcommand 12` | Verify that all Pinpad transactions were transmitted to the switch. | Used in case a "stuck" transaction record remains in the Pinpad and wasn't sent. |
| | Delete Transaction File from Pinpad<br>`Command 10`, `Subcommand 13` | Delete the transaction file for that specific business day. | A file can only be deleted if all its transactions were sent to the switch. Can be configured to delete automatically at night under these conditions. |
| **Maintenance**<br>(Dedicated Buttons) | Update Caspit Parameters<br>`Command 10`, `Subcommand 2` | Update the Pinpad with changes from Caspit (changing settings and application parameters). | |
| | Transmit Logs<br>`Command 10`, `Subcommand 3` | Document actions performed on the Pinpad (required for troubleshooting). | |
| | Pinpad Version Update<br>`Command 10`, `Subcommand 7` | Upgrade the Pinpad version. | Performed in coordination and upon request. |

---

## Required BO Operations Facing the Switch (At End of Day)

| Action | Purpose | Notes |
| :--- | :--- | :--- |
| **Get transaction list for terminal** | Perform comparison against the POS BO. | Uses UID for transaction identification. |
| **Freeze surplus transactions in switch** | Reconcile transactions between the switch and BO. | Frozen transactions will be treated as exceptions. |
| **Request transaction transmission for terminal** | Transmit transactions found to be matching. | Based on the business day sent in the transaction to the switch. |
| **Get transmission report** | Receive a transaction report with a SHVA transmission reference. | Used for credit reconciliations. |
| **Perform missing card transaction** | Perform transactions not via the Pinpad. | Charge / Cancel / Refund. |

---

## Additional Pinpad Capabilities

| Action | Purpose | Notes |
| :--- | :--- | :--- |
| **Card Data Check (J2)** | Check card details and credit options. | Example: Dining card details. |
| **"Continuation" Transaction (J4 after J2)** | Execute the transaction following the initial check. | No need to swipe the card again. |
| **Check/Update Configuration** | Receive device settings and update working configuration. | Can update Pinpad config (e.g., double transaction checks). |
| **Smart Swipe** | Ability to return Track 2 for a non-credit card. | Performed in response to J2 without needing a dedicated command (swipe). |
| **Idle Swipe** | Ability to return Track 2 for a non-credit card. | Sends the information to the POS without requiring any command. |
| **Query Tran.** | Query transaction status by POS transaction ID. | Inquire about the status of a transaction not received at the POS. |
| **Block Double Tran** | Block duplicate transactions. | Based on Amount, Card, and Transaction ID. |
| **Fetch Tran. File** | Retrieve the transaction file. | For reconciliation purposes with the POS. |
| **Signature** | Perform an on-screen signature. | For the credit transaction or any other purpose (e.g., customer club). |