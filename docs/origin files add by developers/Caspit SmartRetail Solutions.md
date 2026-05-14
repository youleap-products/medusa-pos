










Caspit SmartRetail Solution


## Specification

## Version 1.53 Dec-2023







Document Version 1.53   Caspit SmartRetail Solution
## 2


## Contents
Document History ............................................................................................................................................................................. 6
Add to Appendix J a new chapter “Enable Transaction Steps vs FileSystemWatcher“ ...................................................................... 9
Continue J2 values range: “0”, “1”, “2” ........................................................................................................................................... 9
- Introduction ............................................................................................................................................................................ 12
- Audience ................................................................................................................................................................................. 13
- Topology (Caspit Internal) ....................................................................................................................................................... 14
- Telium Summary for the SmartRetail application (Caspit Internal) ......................................................................................... 15
- Protocol .................................................................................................................................................................................. 16
- Supported Devices (some examples)....................................................................................................................................... 18
- SmartRetail with a Switch ....................................................................................................................................................... 19
- The PC Side ............................................................................................................................................................................. 20
- Performing Transactions ......................................................................................................................................................... 21
9.1 The Request XML (INT_IN) ............................................................................................................................................... 21
9.2 XML Examples of transactions ......................................................................................................................................... 42
9.3 The Response XML (INT_OT) ............................................................................................................................................ 62
9.4 Receipt XML structure ..................................................................................................................................................... 85
9.5 Smart Swipe .................................................................................................................................................................... 89
- Retrieve TOTAL File ............................................................................................................................................................. 91
10.1 TOTAL Request ................................................................................................................................................................ 91
10.2 /HOST/TOTAL.ASH file format (Caspit Internal) ................................................................................................................ 93
10.3 Total Response ................................................................................................................................................................ 94
- Retrieve STATIS File ............................................................................................................................................................ 96
11.1 STATIS Request................................................................................................................................................................ 96
11.2 STATIS Response ............................................................................................................................................................. 97
- Retrieve TRAN File ............................................................................................................................................................ 100
12.1 TRAN Request ............................................................................................................................................................... 100
12.2 /HOST/TRAN.ASH (Caspit Internal)................................................................................................................................. 102
12.3 TRAN Response ............................................................................................................................................................. 102
12.4 Example of getting current TRAN ................................................................................................................................... 105
12.5 Example of getting a specific TRAN ................................................................................................................................ 107
- Retrieve JENR File ............................................................................................................................................................. 108
13.1 JENR File Request .......................................................................................................................................................... 109

Document Version 1.53   Caspit SmartRetail Solution
## 3

13.2 JENR File Format (Caspit Internal) .................................................................................................................................. 111
13.3 JENR File Response ........................................................................................................................................................ 111
- Retrieve DATA File ............................................................................................................................................................ 112
- Transmit Transactions to Shva .......................................................................................................................................... 113
15.1 Transmit Transactions Request ...................................................................................................................................... 113
15.2 Transmit Transactions Response .................................................................................................................................... 115
15.3 DATA File Request ......................................................................................................................................................... 117
15.4 DATA File Format (Caspit Internal) ................................................................................................................................. 118
15.5 DATA File Response ....................................................................................................................................................... 118
- Communication Test ......................................................................................................................................................... 119
16.1 Communication Test Request ........................................................................................................................................ 119
16.2 Communication Test Response ...................................................................................................................................... 123
17 . Pinpad Configuration ........................................................................................................................................................ 127
17.1 Pinpad Configuration Request ....................................................................................................................................... 127
17.2 Pinpad Configuration Response ..................................................................................................................................... 132
- Generic Command ............................................................................................................................................................ 140
18.1 Generic Command Request ........................................................................................................................................... 140
18.2 Generic Command Response ......................................................................................................................................... 142
19 . Transaction Query ............................................................................................................................................................ 145
19.1 Transaction Query Request............................................................................................................................................ 145
19.2 Transaction Query Response ......................................................................................................................................... 146
- Retrieve File ...................................................................................................................................................................... 149
20.1 Retrieve File Request ..................................................................................................................................................... 149
20.2 Retrieve File Response................................................................................................................................................... 150
20.3 Retrieve File White List .................................................................................................................................................. 151
21 . Swipe Command ............................................................................................................................................................... 153
21.1 Swipe Request ............................................................................................................................................................... 153
21.2 Swipe Response ............................................................................................................................................................ 154
- Retrieve Deposit Report.................................................................................................................................................... 157
22.1 Deposit Report Request ................................................................................................................................................. 157
22.2 Deposit Report Response .............................................................................................................................................. 158
- UI Command ..................................................................................................................................................................... 161
23.1 UI Command Request .................................................................................................................................................... 161
23.2 UI Command Response.................................................................................................................................................. 162

Document Version 1.53   Caspit SmartRetail Solution
## 4

23.3 List of messages ............................................................................................................................................................ 163
- QR Code Display / Scan Command .................................................................................................................................... 164
24.1 QR Code Display / Scan Command Request.................................................................................................................... 164
24.2 QR Code Display Command Response ............................................................................................................................ 165
- Delek Commands extension .............................................................................................................................................. 166
25.1 Delek J5 /J59 Command Request ................................................................................................................................... 166
25.2 Delek J5 Command Response ........................................................................................................................................ 167
25.3 Delek J49 Command Request......................................................................................................................................... 169
25.4 Delek J49 Command Response ...................................................................................................................................... 171
26 . Rav-Sapak Configuration ................................................................................................................................................... 172
27 . VAS of Apple and Google .................................................................................................................................................. 174
Appendix A – Result Codes ............................................................................................................................................................ 176
Appendix B - PTL Header ............................................................................................................................................................... 180
Appendix C – Commands Table ..................................................................................................................................................... 183
Appendix D – Glossary .................................................................................................................................................................. 184
Appendix E – SmartRetail Tester ................................................................................................................................................... 186
Appendix F – Caspit Payment Windows Service ............................................................................................................................ 187
Appendix F – Communication Problems ..................................................................................................................................... 187
Appendix F – Getting Windows Service Information ................................................................................................................... 188
Appendix F – Windows Service Config.xml .................................................................................................................................. 189
Appendix G – Idle Swipe................................................................................................................................................................ 191
Appendix H – Shva <Status> codes ................................................................................................................................................ 193
Appendix I – Shva <AshStatus> codes ........................................................................................................................................... 196
Appendix J – Transaction Steps ..................................................................................................................................................... 206
Explanation ................................................................................................................................................................................ 206
Enable Transaction Steps with Http ............................................................................................................................................ 206
Enable Transaction Steps vs FileSystemWatcher ......................................................................................................................... 206
Enable Transaction Steps vs TCP Listener ................................................................................................................................... 208
Disable Transaction Steps........................................................................................................................................................... 208
Abort ......................................................................................................................................................................................... 210
Table of steps ............................................................................................................................................................................ 210
Example ..................................................................................................................................................................................... 214
Appendix K – Various Tables ......................................................................................................................................................... 216
Caspit Internal Errors Table ........................................................................................................................................................ 216

Document Version 1.53   Caspit SmartRetail Solution
## 5

Appendix L – Beginner's Guide ...................................................................................................................................................... 222
Step 1 – Installation ................................................................................................................................................................... 222
Step 2 – Use the SmartRetail Tester ........................................................................................................................................... 222
Step 3 – Implement Communication Test ................................................................................................................................... 222
Step 4 – Implement Communication to Shva .............................................................................................................................. 224
Step 5 – Perform a Transaction .................................................................................................................................................. 225
Appendix M – Troubleshooting ..................................................................................................................................................... 227
Appendix N – FAQ ......................................................................................................................................................................... 231
Appendix O – CaspitPayment.dll ................................................................................................................................................... 232
Appendix P – PINPad connection over Broker ............................................................................................................................... 240




Document Version 1.53   Caspit SmartRetail Solution
## 6

## Document History
## AUTHOR  VERSION  DATE  DESCRIPTION
## Ran
## Ullmann
## 0.1  26/01/2016
- Document creation.
## Ran
## Ullmann
## 0.2 08/02/2016
- Continued to write spec.
## Ran
## Ullmann
## 0.3 15/02/2016
- Continued to write spec.
## Ran
## Ullmann
## 0.4 18/02/2016
## Ran
## Ullmann
## 0.5 15/03/2016
## Ran
## Ullmann
## 0.6 29/05/2016
## Taras
## Epikhin
## 0.7 30/05/2016
- Add Xml Tags into EMV_Output
## Ran
## Ullmann
## 0.8 14/06/2016
## Ran
## Ullmann
## 0.9 28/06/2016
- ResultCode table
## Ran
## Ullmann
## 1.0 03/11/2016
- New tags in INT_IN:
o Addendum2
o Addendum1Settl
o Addendum2Settl
o Addendum3Settl
o Addendum4Settl
o Addendum5Settl
o Zdata
o RequestId
o New usage for tag Addendum1. It will be used as the voucher
number (like field X from Ashrait 96)
- Changes in tag PanEntryMode
- TimeoutInSeconds tag must be implemented by the Pinpad.
- Transaction Query command
## Ran
## Ullmann
## 1.1 23/11/2016
- Continue of Transaction Query description
- Parts, which describe the inner working and inner flow of the transaction
between the SmartRetail and AshraitEMV, are colored with a light blue
shadow. I also added the words "Caspit Internal". Integrators can ignore
that "Caspit Internal" parts. Unless they are curious to learn the inner
stuff.
- Swipe request description
- We will use <Xfield> instead of <Addendum1> to hold the voucher
number. AshraitEMV will keep the <Xfield> value in one of the ISO fields.
## Ran 1.2 28/11/2016
- The transaction response XML will include the full text of the receipt in

Document Version 1.53   Caspit SmartRetail Solution
## 7

Ullmann Tags <ReceiptMerchant> and <ReceiptCustomer>. See response XML for
more details.
## • Retrieve File
## • Retrieve Deposit Report
## Ran
## Ullmann
## 1.3 30/11/2016
- More paragraphs marked as "Caspit Internal"
- Changed document name to "Caspit SmartRetail Solution"
- Making the document more "Integrator" friendly.
- Generic command 006 – Call Shva without sending transactions.
## • Appendix A – Result Codes
- Appendix B – PTL Header
- <UnsentTransactions> tag in Pinpad Configuration command response.
- Appendix C – Table of commands
## • Appendix D – Glossary
- <Session-Number> and <File-Number> in Transmit Transactions response
## Ran
## Ullmann
## 1.4 08/12/2016
- Example for <ReceiptMerchant> and <ReceiptCustomer>
- Example for <DepositReport>
- <EnableFullPAN> in Pinpad Configuration command
- Chapter 9.2 – XML examples of transactions. Use the examples to learn how to do various
transaction types.
## Ran
## Ullmann
## 1.5 15/12/2016
- <CardInside> tag in Communication Test response
## Ran
## Ullmann
## 1.6 19/12/2016
- <CaspitInternalError> tag in transaction response.
- More examples in chapter 9.2
- Appendix E – SmartRetail Tester
- <CardInside> tag also in Pinpad Configuration response
## • Appendix F – Caspit Payment Windows Service
## Ran
## Ullmann
## 1.7 25/12/2016
## • Appendix G – Idle Swipe
- Appendix H – Shva <Status> codes
- Appendix I – Shva <AshStatus> codes
- New tag <AllowCardInside> in transaction request
## Ran
## Ullmann
## 1.8 02/01/2017
- Appendix J – Pinpad steps table
- Transaction Query – LAST
## Ran
## Ullmann
## 1.9 05/01/2017
- I started adding some "Switch Support" notes.
## Ran
## Ullmann
## 1.10 08/01/2017
- I expanded the Retrieve TRAN command description.
- <Track2> tag in transaction request
## Ran
## Ullmann
## 1.11 08/01/2017
- Attribute "name" in <Line> tag in receipt
## Ran
## Ullmann
## 1.12 09/01/2017
- I added more examples in chapter 9.2
- New tag <AllowCardInsideBefore> in transaction request (it replaces tag <AllowCardInside>)
- New tag <AllowCardInsideAfter> in transaction request
## Ran
## Ullmann
## 1.13 18/01/2017
## • Appendix L – Beginner's Guide
## Ran
## Ullmann
## 1.14 19/01/2017
## • Appendix M – Troubleshooting
- I expanded the example about J2 (see chapter 9.2.11)
## Ran
## Ullmann
## 1.15 24/01/2017
- New Appendix N – FAQ
## Ran 1.16 29/01/2017
- More examples in chapter 9.2

Document Version 1.53   Caspit SmartRetail Solution
## 8

## Ullmann
## Ran
## Ullmann
## 1.17 05/02/2017
- I expanded Appendix J – Transaction Steps
## Ran
## Ullmann
## 1.18 20/02/2017
- <MustTranSteps> tag in Pinpad Configuration command
## Ran
## Ullmann
## 1.19 21/02/2017
- <CaspitInternalError> possible values. See Appendix K
- Examples for transactions with benefits (הטבות). See chapter 9.2
- Config.xml file in Appendix F
- New Appendix O – CaspitPayment.dll
## Ran
## Ullmann
## 1.20 27/02/2017
- <SwitchEnabled> tag in Pinpad Configuration response
## • Generic Command 012
## • Generic Command 013
## Ran
## Ullmann
## 1.21 12/03/2017
## • Generic Command 014
- New steps: 500 – 545
## Ran
## Ullmann
## 1.22 26/03/2017
- Abort transaction using the Transaction Steps mechanism. See Appendix J.
## Ran
## Ullmann
## 1.23 17/05/2017
- Minor changes
## Ran
## Ullmann
## 1.24 15/06/2017
- Changes in UI command
- <Field55> in transaction response
## • Mti 420
- New example related to Cancel J5 transaction
- New example related to Complete J5 transaction
## Ran
## Ullmann
## 1.25 02/10/2017
## • Typos
## Ran
## Ullmann
## 1.26 06/12/2017
- LifeStyle card support
- <ExtraInfo> - a new tag in transaction response. This tag will hold the LifeStyle response and
more stuff.
- <CardHash> - a new tag in transaction response
- <SwitchName> - a new tag in Pinpad Configuration response
- <SwitchId> - tag in Pinpad Configuration response
- <ShowErrorsOnPinpad> - a new tag in transaction request
- <PossibleCreditTerms> - tag in transaction response, relevant to J2.
## Ran
## Ullmann
## 1.27 19/12/2017
- I updated the J2 example in chapter 9.2 to include the <PossibleCreditTerms>
- I updated all examples in chapter 9.2 to include the new tags like <ExtraInfo> and
<CardHash>.
## Ran
## Ullmann
## 1.28 26/12/2017
## • Typos
## Ran
## Ullmann
## 1.29 22/01/2018
- I added English translation for parts written in Hebrew (I left the Hebrew text and added
English after the Hebrew text)
- New tag <SwitchSend>
- New tag <SwitchStatus>
- Tag <CardHash> will return also in Swipe command and in Idle Swipe
## Ran
## Ullmann
## 1.30 28/01/2018
- The RRN, in receipt text, has been moved to separate line (chapter 9.4)
- Hebrew and English description of result codes (see Appendix A)
## Ran
## Ullmann
## 1.31 31/01/2018
- New tag <SlipLang> - The language of the slip
## Michael 1.32 05/02/2018
- Appendix O was rewritten

Document Version 1.53   Caspit SmartRetail Solution
## 9

## Lobak
## Ran
## Ullmann
- >Xfield> was missing in the response. I added it.
## Ran
## Ullmann
## 1.33 13/02/2018
- New result code: RETVAL_SWITCH_BATCH_IS_TOO _OLD
- tag <BlockAutoSwitchBatchDelete> in Pinpad Configuration command.
## Ran
## Ullmann
## 1.34 26/02/2018
- New tag <PinpadLock> in Pinpad Configuration command.
## Ran
## Ullmann
## 1.35 28/05/2018
- I added documentation of <Mti> tag to transaction response. It was missing in the
document.
- In Pinpad Configuration command, I updated the correct default value of
<BlockDoubleTrans>. The correct default value in a new Pinpad is – 1 (Enabled)
## Ran
## Ullmann
## 1.36 14/06/2018
- New result codes:
## RETVAL_AMOUNT_TOO_BIG
## RETVAL_AMOUNT_TOO_SMALL
## RETVAL_ERROR_GETTING_TOKEN
- New tag <GetToken> in transaction request
## Arie
## Gleizer
## 1.37 26/06/2018
- Application version format updated
- The TimeoutInSeconds tag description updated.
## Michael
## Lobak
1.38 03/07/2018 Add to Appendix J a new chapter “Enable Transaction Steps vs
FileSystemWatcher“
## Michael
## Lobak
1.38 09/09/2018 Continue J2 values range: “0”, “1”, “2”
## Michael
## Lobak
1.38 09/09/2018 Following Response Class fields name changed:
from 'EnableTranSteps'   to 'EnableTransSteps';
from 'TranStepsAddress' to 'TransStepsAddress';
from 'MustTranSteps'      to 'MustTransSteps';
from 'EnableFullPAN'       to 'EnableFullPan'.
## Michael
## Lobak
1.39 09/12/2018 Added 3 public RequestTreatment deal functions:
## 1)
<summary>Get Signature Server (Cardo) Transaction ID</summary>
<param name="transactionDetails">DEE302292;...</param>
<param name="signatureVectorBlockData">
## 1023,1023,99;2;...</param>
<returns> return int status.
if status > 0 then It is the transaction id. It means everything is OK.
if status = 0 it is some kind of unknown error and we should try again.
if status < 0 CollectSignature returned with error </returns>
int GetSigServerTransactionId(string
transactionDetails, string signatureVectorBlockData);

## 2)
<summary>This function desirable to run before turning off the ECR application for
dispose, releasing all resources associated with the CaspitPayment.DLL in order to quickly
and properly start communication with the next ECR activation.</summary>
void OnEcrClosing();

## 3)
<summary>Make Jpeg File from Signature Vector BlockData</summary>

<param name="signatureVectorBlockData"></param>
## 1023,1023,592;101,561,65538,0;98,559,65538,0;100,558,65538,0;100,555,...>

Document Version 1.53   Caspit SmartRetail Solution
## 10


<param name="signatureJpjFilename"></param>
in case signatureJpjFilename is empty string the output Filename will be
C:\Users\USER_NAME\AppData\Roaming\CASPIT\CPS\Signature.jpg

## <returns>
## Ok                                         = 0,
Error codes:
ErrVectorDataIsEmpty                       = 21002,
ErrNoVectorPointsInVectorData              = 21003,
ErrInvalidHeaderOfVectorData               = 21004,
ErrMaximumXResolutionOfSignatureIsInvalid  = 21005,
ErrMaximumYResolutionOfSignatureIsInvalid  = 21006,
ErrInvalidNumberOfPointsInVectorDataHeader = 21007,
ErrInvalidPointInVectorData                = 21008,
ErrExceptionWhileSavingJpegFile            = 21009.
## </returns>
int MakeJpegFileFromSignatureVectorBlockData(
string signatureJpjFilename,
string signatureVectorBlockData);

## Arie
## Gleizer
## 1.39 25.12.2018
New Caspit TAG 260 PanEntryModeExt added
## Arie
## Gleizer
1.40 4.2.2019 Possible Currency for each credit term added in J2 response
## Arie
## Gleizer
1.41 3.3.2019 1. DCC support added
- Delayed payment
## Arie
## Gleizer
1.41 26.11.2019 QR Code Display Command added
## Arie
## Gleizer
## 1.42 27.4.2020
- <ReceiptPrint> Tag added in reponse to CR
- >DCCAuthorization> Tag added in PINPad configuration to declare DCC
support by CR
- <Commission> Tag added in response for DCC transaction
- <PosHash> upto 32 chars prefix to be used in SHA256 for MAX cards
- <BListTime> Tag added in PINPad configuration
- <DCC> Tag added in transaction response if DCC done
## Arie
## Gleizer
## 1.50 25.5.2021
- <PosHash>upto 32 chars suffix to be used in MD5 for CAL cards
## • Ashrait Delek Support Added
- Connection over Broker added
## Arie
## Gleizer
1.51 8.5.2022 Result code added: RETVAL_FILE_BAD_RECORD

## David
## Guetta
1.52 18.12.2022 Support XML Session-Number value LAST in retrieve Deposit report command
## David
## Guetta
1.52 18.12.2022 Support  XML  terminal  Id  value  0000000  in  send  switch  and  delete  tran  file
commands to be done for all trminal Id of RAV-SAPAK
## David
## Guetta
1.52 1.2.2023 Command 20, add option to scane QR by camera on supported device
## David
## Guetta
1.52 22. 2.2023 New pinpad configuration command 30 for RAV-SAPAK

Document Version 1.53   Caspit SmartRetail Solution
## 11

## David
## Guetta
1.52 22.2.2023 Pinpad STEP with Http
## David
## Guetta
1.52 22.2.2023 Updating DELEK XML parametrs
## David
## Guetta
1.53 1.6.2023 New XML for VAS
## Arie
## Gleizer
1.53 19.7.2023 Result code list defined for VAS
## David
## Guetta
1.53 10.12.2023 Free text for swipe, command 23



Document Version 1.53   Caspit SmartRetail Solution
## 12


## 1. Introduction
Caspit  SmartRetail  Solution is  a complete  set  of  advanced  technologies  that enables  the retailer  to  accept  all  types  of credit
cards,  including  EMV,  Contactless  and  magnetic.  The  solution  consists  of  a Pinpad  device,  applications  for  the  Pinpad and  a
software (API) for the PC.
The  Pinpad  software  is  made  of  a  couple  of  applications  and  the  two  most  important  applications  are  the  Ashrait  EMV
application and the SmartRetail application. Ashrait EMV application is the core element that does all the payment stuff and
implements  the  full  Ashrait EMV  protocol  and  specification. But  Ashrait  EMV  application  doesn't  know  how  to "speak"  with
ECRs.
The  SmartRetail  application  on  the  Pinpad  is  the  application  that  will  bridge  between  a  PC-based-ECR  and  the  Ashrait  EMV
application.  "Speaking"  with  the  outside  world  will  be  the  main  feature  of  the  SmartRetail  application  whether  the  outside
world will be the PC ECR, on one side, or the Switch, on the other side.
The SmartRetail application will provide services for two types of solutions:
- In  the  first  solution,  the  SmartRetail  application  will  be  used  by  standalone  ECRs  that  require  neither  Switch  nor  P2PE
(Point  to  Point  Encryption).  In  that  solution,  the  Pinpad  communicates  directly  with  Shva  for  transaction  authorization.
This  will  be  similar  to  the  Ashrait  96  Pinpad  solution  we  currently  have  in  Caspit.  In  this  solution  the  SmartRetail
application role is to bridge between the PC ECR and Ashrait EMV application. Ashrait EMV will get the transaction details
from SmartRetail and then Ashrait EMV will perform the full transaction and will return the result to SmartRetail.

- In the second solution, the SmartRetail application will do much more. This solution is intended for the big retail market
and  this  solution  includes  a  dedicated  Switch  and  a  P2PE  solution (Point-to-Point  Encryption).  So  the  SmartRetail
application still needs to bridge between the PC ECR and the Ashrait EMV application but it will also need to support the
Switch, meaning it will need to encrypt the authorization packet coming from Ashrait EMV, sends it to the Switch, gets an
answer from the Switch and sends the answer to Ashrait EMV (and then of course get the final answer from Ashrait and
sends it back to the PC ECR. The fine details will be described later). In this solution, the transaction authorization is done
using the Switch and not using Shva.
It  should  be  noted  that  the  SmartRetail  application  will  not  do  the  low  level  communication  with  the  PC  ECR.  The  actual
listening and communication with the external ECR  will be done by the Router Application. The Router application is another
application on the same device and it will get the packet from the ECR and will route it to the SmartRetail application.
The SmartRetail Application will run on all the Telium 2 family of devices and also on Telium 3 (Tetra).
The SmartRetail application will give the following features to the PC ECR:
- Perform all kind of credit card transactions (Contact, MSR, Contactless)
- Perform J2 and J4/J5 transactions
- Retrieve STATIS file (a summary file with all deposits done. Up to 99 deposits)
- Retrieve TOTAL file (like STATIS but only the last deposit)
- Retrieve TRAN file (a detailed file with all transactions in a specific deposit/batch)
- Retrieve JENR file
- Retrieve DATA file
- Retrieve deposit report (a detailed report with all transactions in a deposit/batch)
- Check status of transactions
- Check connection to Shva
- Retrieve Pinpad status and configuration

Document Version 1.53   Caspit SmartRetail Solution
## 13

## 2. Audience
This document is intended for the integrator of the ECR.
However, this document contains also some internal information for Caspit developers. The parts that are intended for the Caspit
developer are marked with the words "Caspit Internal" and I also added a blue light shadow (like this paragraph) to those parts.
The integrator of the PC ECR can ignore those parts.


Document Version 1.53   Caspit SmartRetail Solution
## 14

- Topology (Caspit Internal)
The following figure illustrates the internal configuration of a Pinpad which has the Router application, a SmartRetail application,
an Ashrait EMV application and other applications as well.  As you can see, the internal communication between the Router app
and  the  other  apps  is made  using  the IAC  protocol  (The  IAC  protocol  is  a secure mechanism  for  direct  communication  between
Telium  applications inside  the  Pinpad).  The  Pinpad  is  connected  to  a PC  ECR  (a  PC  which runs  an  ECR  software)  and  that  PC ECR
may  send various requests  to  the Pinpad.  For  example,  if  the PC ECR wants  to accept  a credit  card, it  will  send  a  request  to  the
Pinpad,  a  request  that  will  be  targeted  to  the  SmartRetail application. The request  will  arrive  to  the  Router  application  that  will
route it to the SmartRetail application.  Once the SmartRetail got the request, it will start handling the request as needed. At the
end of the transaction, the SmartRetail will return the response to the Router application which in turn will return the response to
the PC ECR.
Of course, the SmartRetail application itself is using the help of Ashrait EMV application to perform the actual credit transaction.

The flow of data looks like that:
PC ECR → Router App → SmartRetail App → AshraitEMV → SmartRetail App → Router App → PC ECR

And if you want to go even further, we can include also the  EPA (EMV App) and the CPA (Contactless App) to show the flow of a
contactless transaction:
PC ECR → Router → SmartRetail → AshraitEMV → EPA → CPA → EPA → AshraitEMV → SmartRetail → Router → PC ECR.

And here is the flow of data using the Switch:
PC ECR → Router App → SmartRetail App → Ashrait EMV → SmartRetail → Switch → SmartRetail → Ashrait EMV → SmartRetail
→ Router → PC ECR.

Document Version 1.53   Caspit SmartRetail Solution
## 15



- Telium Summary for the SmartRetail application (Caspit Internal)
Telium Application Type: 51042 (0xC762)
Full binary name: 8510420010 (for version 0.01.0)
Project name in IngeDev: SmartRetail
Name in Telium Manager F menu: Retail V.RR.D (for example Retail 0.01.0)
Telium SDK: Telium Plus with latest version of SDK.
Diagnostics App ID: T23
TID filename: 51042.TID
The SmartRetail application will support the following features:
It will not receive MSR events when in idle.
It will not get keyboard events when in idle.
It will support PCL and/or Ethernet communication.
It will have a menu that will be described later.
It will keep a log file of all packets going through it and of all transactions.
It will support P2PE
It will support the Switch


Document Version 1.53   Caspit SmartRetail Solution
## 16

## 5. Protocol
The  protocol  between  the PC  ECR  and  the  SmartRetail  application  will  be based  on XML. To  perform  a  payment  transaction  we
will use almost the same XML that is described in Shva Mefitzim-EMV document with some extra XML tags that will be required
by the special features that the SmartRetail application provides.
The ECR should use a simple XML. The following XML features SHOULD NOT BE USED:
- Don't use empty elements like <TranType/>, instead use <TranType></TranType>
- Don't use attributes
Before  the  XML  string,  the ECR must  send  the  PTL  header  (see  Appendix  B),  which  is  a  bunch  of characters  that  tells  the Pinpad
the destination of the XML. But if the ECR is using the CaspitPayment.dll from Caspit then the ECR doesn't need to deal with  the
PTL header because the CaspitPaymet.dll will take care of it. Only if the ECR is working directly with the Caspit Payment Windows
Service, without using the CaspitPayment.dll, then the ECR will have to add the PTL header by itself.

## Caspit Internal
The  SmartRetail  will  parse  the  XML  and  will  convert  the  XML  tags  into TLV  tags  that  Ashrait EMV  understands.  Ashrait EMV  will
handle the transaction and will return a response, in TLV tags, back to SmartRetail. SmartRetail will convert the TLV tags back to
XML tags and will return the response back to the PC ECR.
I  will  mention  once  more  that  between  the  PC  ECR  and  the  SmartRetail  application  there  is  another  application,  the  Router
application,  which  is making  it  possible  for  the PC ECR  and  the  SmartRetail  to exchange  data.  But  I will  not  mention  the  Router
application every time. Just remember that it is there.
I will give two examples of a transaction flow just to give a sense of how it will look.
Here is the flow of a standard transaction between the PC ECR and the Pinpad (without Switch and P2PE support)
- The PC ECR builds an XML string with the transaction details.
- The  PC  ECR  sends  the  XML  string  to  the  Pinpad  (probably  with  the  help  of  a  Dll  or  with  the  help  of  a  Windows  Service
provided by Caspit)
- The XML string arrives to the Pinpad and is intercepted by the Router application.
- The Router application routes the XML string (using IAC) to the SmartRetail application.
- The SmartRetail application parses the XML.
- The SmartRetail makes some checks on the XML data
- The SmartRetail converts the XML data to TLV data.
- The SmartRetail sends the TLV data to Ashrait EMV application (using IAC)
- Ashrait EMV application handles the transaction and communicates with Shva if needed.
- Ashrait EMV application returns a TLV response back to SmartRetail application (using IAC)
- SmartRetail converts the TLV to XML.
- SmartRetail returns the XML to the Router application (using IAC)
- The Router application returns the XML response to the PC RCR
- End of transaction
And here is the flow of a standard P2PE transaction with the Switch.
- The PC ECR builds an XML string with the transaction details.
- The PC ECR sends the XML string to the Pinpad (probably with the help of a Dll or a Windows Service provided by Caspit)
- The XML string arrives to the Pinpad and is caught by the Router application.
- The Router application routes the XML string (using IAC) to the SmartRetail application.
- The SmartRetail makes some checks on the XML data
- The SmartRetail converts the XML data to TLV data

Document Version 1.53   Caspit SmartRetail Solution
## 17

- The SmartRetail sends the TLV data to Ashrait EMV application
- Ashrait EMV starts the transaction and builds the authorization packet (with encrypted track2).
- Ashrait EMV sends the authorization packet to SmartRetail
- SmartRetail builds the ISO8583 packet required for the Switch
- SmartRetail sends the ISO8583 packet to the Switch
- The Switch returns an answer to SmartRetail.
- SmartRetail sends the answer back to Ashrait EMV application.
- Ashrait EMV finishes the transaction and returns a response to SmartRetail
- SmartRetail converts the response to XML and send it back to the PC ECR (through the Router application).


Document Version 1.53   Caspit SmartRetail Solution
## 18

- Supported Devices (some examples)
- iPP350

- Lane5000/Lane8000

## 3. Link2500

- iCMP




Document Version 1.53   Caspit SmartRetail Solution
## 19

- SmartRetail with a Switch
Some retailers may choose to use a Switch to act as a gateway  between the Pinpad and Shva and to aggregate the transactions.
Throughout this document, I marked with Switch Support the parts (or the differences) that are relevant to a Switch. Therefore,
you can search for "Switch Support" to find all those parts.
The main points of difference between the Switch mode and the normal mode (non-switch mode) are:
- With the Switch, transactions are not kept in the Pinpad. They are kept in the Switch.
- The Switch may return a token in the transaction response.
- Using a Switch, the Transmit Transactions command has a different meaning.

The following commands are irrelevant when using a Switch
- Retrieve TOTAL file
- Retrieve STATIS file
## • Retrieve Deposit Report
- Retrieve TRAN File



Document Version 1.53   Caspit SmartRetail Solution
## 20

- The PC Side
Let's take the PC side for a moment and have a look at what we need to have on the PC in order for this solution to work.
The supported Windows versions are 7 and 10 (both 32bits and 64bits).
It depends on how the Pinpad is connected to the PC.
Using a USB
First, the Ingenico driver must be installed
And then a Windows Service will be installed on Windows (this Windows Service is developed by Caspit).
A Pinpad with USB cable must be connected to the PC.
The  Windows  Service must  be  configured  to  the correct  USB  port.  The  Windows  Service must  run. It  listens  to TCP connections
coming from the ECR software.
Caspit will provide a DLL (CaspitPayment.dll) to the ECR, so the ECR may use this DLL to communicate with the Windows Service.

Using RS232 (serial)
For RS232, it is the same as USB, except you don’t need to install the Ingenico driver.
A Pinpad with RS232 must be connected to the PC.

Note that the ECR may ignore the CaspitPayment.dll and "speaks" directly with the Windows Service. It depends on how the ECR
developer prefers to work. If the ECR doesn't use the DLL from Caspit then the ECR must add the PTL header at the beginning of
the XML sent to the Windows Service. See Appendix B for explanation about the PTL Header.

## Ethernet Connection
The Caspit Windows Service must be installed.
The ECR software will use a DLL to send and receive the XML to and from the Pinpad.
However, the ECR may ignore the DLL and speaks directly with the Windows Service. It depends on how the ECR developer prefers
to work. If the ECR doesn't use the DLL from Caspit then the ECR must add the PTL Header at the beginning of the XML sent to the
Windows Service. See Appendix B for explanation about the PTL Header.


Document Version 1.53   Caspit SmartRetail Solution
## 21

## 9. Performing Transactions
The most used feature of the Pinpad is obviously to perform credit card transactions. Every transaction always starts with the ECR
and if the selected payment method is a credit card then the ECR will turn to the Pinpad to perform the credit card transaction.
The ECR can use the Pinpad to do as many credit card transactions as needed during the day.
At the end of each day, the ECR  usually does an end-of-day procedure, as any ECR should do. One of the steps that the ECR must
do  during  the  end-of-day  procedure  is  to  command  the  Pinpad  to  transmit  its transactions  to  Shva.  See  chapter  15  for  the
command to transmit transaction to Shva.
This chapter will explain about performing transactions.
See chapter 9.2 for XML examples for various types of transactions. You can learn from these examples.
9.1 The Request XML (INT_IN)
The  following  XML  shows  all  the  possible XML  tags  that can  exist  in  a transaction request  XML.  Note  that  in  real life there  is  no
transaction  that  actually  uses  all  these  tags  at  once  and  most  of  the  transactions  will  use  only  a  few  tags.  We  will  see  a  few
examples below.
To actually send the XML to the Pinpad, the PC must be prepared with the installation of a Windows Service developed by Caspit
(unless  the  ECR  is  android  based,  which  requires  a  different  method).  And  the  XML  must  be  prefixed  by  a  PTL  header  (see
Appendix  B)  and  then  the  XML  string  will  be  sent  to  the  Windows  Service by TCP  socket. The  Windows  service is responsible  to
send the XML to the Pinpad and to get the response back from the Pinpad.
<Request>
<Command>001</Command>
<RequestId>29482980983</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>30</TimeoutInSeconds>
<SapakMutavNo></SapakMutavNo>
<Mti>100</Mti>
<Eci></Eci>
<CavvUcaf></CavvUcaf>
<Xid></Xid>
<CapDpa></CapDpa>
<CashbackAmount></CashbackAmount>
<Tip></Tip>
<IpayCode>-1</IpayCode>
<IpayAmount></IpayAmount>
<IpayNumber></IpayNumber>
<IpayPercent></IpayPercent>
<OfferCode></OfferCode>
<GiftCode></GiftCode>
<ProductCode></ProductCode>
<ConversionAmount></ConversionAmount>
<ConversionRate></ConversionRate>
<ConversionCurrency></ConversionCurrency>
<GasolineType>0</GasolineType>
<GasolineLiter></GasolineLiter>
<OilLiter></OilLiter>
<OilAmount></OilAmount>
<Speedometer></Speedometer>
<CarNumber></CarNumber>
<ServiceAmount></ServiceAmount>

Document Version 1.53   Caspit SmartRetail Solution
## 22

<Zip></Zip>
<Address></Address>
<City></City>
<StndOrdrNo></StndOrdrNo>
<StndOrdrTotalNo></StndOrdrTotalNo>
<StndOrdrTotalSum></StndOrdrTotalSum>
<StndOrdrUniqueRef></StndOrdrUniqueRef>
<Commission></Commission>
<StndOrdrFreq></StndOrdrFreq>
<Cellular></Cellular>
<CardSeqNumber></CardSeqNumber>
<Otp></Otp>
<FirstPayment></FirstPayment>
<NotFirstPayment></NotFirstPayment>
<NoPayments></NoPayments>
<IndexPayment>0</IndexPayment>
<OriginalUid></OriginalUid>
<OriginalTranDate></OriginalTranDate>
<OriginalTranTime></OriginalTranTime>
<OriginalAmount></OriginalAmount>
<OriginalAuthorizedAmount></OriginalAuthorizedAmount>
<OriginalAuthNum></OriginalAuthNum>
<OriginalAuthSolekNum></OriginalAuthSolekNum>
<OriginalAuthorizationCodeManpik>0</OriginalAuthorizationCodeManpik>
<OriginalAuthorizationCodeSolek>0</OriginalAuthorizationCodeSolek>
<OriginalLinkIncrAuth></OriginalLinkIncrAuth>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<AshReasonCredit>0</AshReasonCredit>
<AuthorizationCodeSolek>0</AuthorizationCodeSolek>
<AuthorizationCodeManpik>0</AuthorizationCodeManpik>
<Addendum1></Addendum1>
<Addendum2></Addendum2>
<AddendumSettl></AddendumSettl>
<Amount>987</Amount>
<AuthorizationNo></AuthorizationNo>
<Currency>376</Currency>
<ClubNumber></ClubNumber>
<ParameterJ>0</ParameterJ>
<Cvv2></Cvv2>
<Id></Id>
<DeferMonths></DeferMonths>
<DueDate></DueDate>
<Rrn></Rrn>
<SpecialProjectCode></SpecialProjectCode>
<SpecialProjectInfo1></SpecialProjectInfo1>
<SelfServiceTrans>0</SelfServiceTrans>
<PanEntryMode>PinPad</PanEntryMode>
>Zdata></Zdata>
<Xfield>209420394</Xfield>
<AllowCardInsideBefore></AllowCardInsideBefore>
<AllowCardInsideAfter></AllowCardInsideAfter>
<Track2></Track2>
<ContinueJ2></ContinueJ2>

Document Version 1.53   Caspit SmartRetail Solution
## 23

<SkipDoubleTranCheck></SkipDoubleTranCheck>
<ShowErrorsOnPinpad></ShowErrorsOnPinpad>
<SwitchSend></SwitchSend>
<GetToken></GetToken>
<PosHash></PosHash>
<Tidluk>1</Tidluk>
</Request>

Tag name Description Matching TLV tag
(Caspit Internal)
<Request> The  opening  tag  of  the  request  XML.  This  tag  will  exists
always.
## N/A
## Command
## הפקודה .  תגית  זו  תמיד  תופיע.  לביצוע  עסקה,  קוד  פקודה
## הוא 001 .
Command. This  tag  is  mandatory. To  perform  transaction  use
## Command 001.

## 001
RequestId
## כלשהו של הבקשה. מזהה
## הוא יחזור גם בתשובה.
## הקופה  יכולה  להשתמש  בו  על  מנת  לוודא  שהתשובה
## מתאימה לבקשה.
Request  Id.  The  same  Id  should  return  in  the  response.  The
ECR  should  use  it  to  verify  that  the  response  belongs  to  the
correct request.

## 051
TerminalId
## . תגית זו תמיד תופיע.מספר מסוף
## מספר  המסוף  נבדק  בכל  שלבי  העסקה.  הוא  ייבדק  גם
## ב
SmartRetailוגם ב Ashrait EMV .
Terminal Id. Mandatory tag. The terminal id is checked during
the transaction.
## 006
TermNo
## עד  מספר קופה.  3  וספרות אשר יועבר  לקובץ חיובים כחלק
## של  מספר  עסקה.  כעיקרון  משמש  לעבודה  ברשת  על  מנת
## להבטיח ייחודיות של מספר עסקה בקובץ חיובים, אשר נוצר
## עמדות) שונות. \מתחנות עבודה (קופות

Station number. 3 digits.
This  number  is  usefull  when  you  have  multiple  pinpads  with
same  terminal  id  and  you  need  to  distinguish  between  the
devices.

## 040

Document Version 1.53   Caspit SmartRetail Solution
## 24

Tag name Description Matching TLV tag
(Caspit Internal)
TimeoutInSeconds
## מתין .  משך  הזמן  המירבי  שבו  המסוף  יטיימאאוט  (בשניות)
## ה יכול להיות בהמתנה לכרטיס (קרבה,  .  לתגובה של הקונהז
## חכם או פס מגנטי) או הקלדה (מספר כרטיס או
## CVV  .)  אם
## חלף הזמן הזה אז המסוף יחזיר את השליטה לקופה והעסקה
## תופסק.
Timeout in seconds. The maximum timeout that the Pinpad
will wait for human activity.

## 005
SapakMutavNo
## רב מוטב  \מספר רב ספק
This tag is currently not supported in the request.
## 086
## Mti
## קוד המסר:
## 100 עסקה רגילה –
## 400עסקת ביטול –
## 420ביטול בקשה לאישור ללא עסקה (ביטול  – J5 .)
100 – Regular transation
400 – Void transaction
420 – Void Pre authorized transaction (void J5)
## 087
## Eci
## רמת האבטחה של עסקת אינטרנט
## 1 עסקת אינטרנט ללא שדה חתימה  –
## 2  –  עסקת  אינטרנט.  לספק  יש  תוכנה  לCAVV/UCAF  אבל
## המנפיק לא רשום לתוכנית
## 3-  עסקת  אינטרנט  עם  שדה  חתימה  CAVV/UCAF  שנבדקה
## בהצלחה

This tag is currently not supported in the request.
## 088
CavvUcaf
## Secure  Code  ויזה בעסקאות בסחר אלקטרוני \של מסטרכרד
## בהתאם ליכולת בית העסק לספק את הנתון.

This tag is currently not supported in the request.
## 089
## Xid
## לכרטיסי ויזה בשיטה 3
This tag is currently not supported in the request.
## 090
CapDpa
קוד אימות cap/dpa  בעסקה טלפונית או עסקת אינטרנט
This tag is currently not supported in the request.
## 091
CashbackAmount
## סכום המזומן
The    cashback    amount    when    performing    a    cashback
transaction
## 092

Document Version 1.53   Caspit SmartRetail Solution
## 25

Tag name Description Matching TLV tag
(Caspit Internal)
## Tip
## סכום התשר
This tag is currently not supported in the request.
## 093
IpayCode
## קוד אמצעי התשלום
## 00  –   מטבע
## 01   כוכבים  –
## 02   נקודות –
## 03  –  מועדון
For "Benefits" support. This is payment method
## 00 – Currency
## 01 – Stars (miles)
## 02 – Points
## 03 - Club
## 094
IpayAmount
## \סכום הנחה   הטענה
For "Benefits" support. This is the amount of charge/discount
## 095
IpayNumber
## מספר יחידות
For "Benefits" support. This is the number of units
## 096
IpayPercent
## אחוז הנחה בהטבה
For "Benefits" support. This is the discount percent.
## 097
OfferCode
## קוד מבצע
This tag is currently not supported in the request.
## 098
GiftCode
## קוד מתנה
This tag is currently not supported in the request.
## 099
ProductCode
## קוד מוצר
This tag is currently not supported in the request.
## 100
ConversionAmount
## סכום  לאחר  המרה,  במאיות,  אפסים  משמאל,  ללא  נקודה
## עשרונית

This tag is currently not supported in the request.
## 101
ConversionRate
## שער ההמרה של סכום העסקה
This tag is currently not supported in the request.
## 102
ConversionCurrency
## מטבע ההמרה (קוד מטבע  ISOשאליו בוצעה ההמרה)
This tag is currently not supported in the request.
## 103

Document Version 1.53   Caspit SmartRetail Solution
## 26

Tag name Description Matching TLV tag
(Caspit Internal)
GasolineType
## סוג דלק
## 01  אוקטן  –91
## 02  אוקטן  –96
## 03  אוקטן  –95 נטול עופרת
## 04   סולר –
## 05   אופנועים –
## 06   בנזין צבאי –
## 07   סולר צבאי –
## 08   נפט  –
## 09   סוגי דלק אחרים –
## 10  אוקטן  –91 נטול עופרת
## 11  אוקטן  –98
## 12אוקטן  -98 נטול עופרת
## 14   סולר נטול עופרת  –
## 36   גז פחממי  –
## 37  גז אוראה  –
This tag is currently not support in the request.
## 104
GasolineLiter
## נקודה עשרוניתכמות הדלק במאיות ליטרים, ללא
This tag is currently not supported in the request.
## 105
OilLiter
## כמות שמן  בתדלוק במאיות ליטרים, ללא נקודה עשרונית
This tag is currently not supported in the request.
## 106
OilAmount
## סכום באגורות בגין שמן, ללא נקודה עשרונית
This tag is currently not supported in the request.
## 107
## Speedometer
## ספידומטר (מד מרחק)
This tag is currently not supported in the request.
## 108
CarNumber
## מספר רכב
This tag is currently not supported in the request.
## 109
ServiceAmount
## באגורות, ללא נקודה עשרונית סה"כ דמי שירות לתדלוק,
This tag is currently not supported in the request.
## 110
## Zip
## מיקוד
Zip code
## 111

Document Version 1.53   Caspit SmartRetail Solution
## 27

Tag name Description Matching TLV tag
(Caspit Internal)
## Address
## רחוב ומספר בית
This tag is currently not supported in the request.
## 112
## City
## עיר
This tag is currently not supported in the request.
## 113
StndOrdrNo
## מספר תשלום תורן בעסקה עם הוראת קבע
This tag is currently not supported in the request.
## 114
StndOrdrTotalNo
## סה"כ מספר תשלומים בעסקה עם הוראת קבע
This tag is currently not supported in the request.
## 115
StndOrdrTotalSum
## סה"כ סכום התשלומים במאיות, אפסים מובילים, ללא נקודה
## עשרונית בעסקה עם הוראת קבע

This tag is currently not supported in the request.
## 116
StndOrdrUniqueRef
## אסמכתא פנימית של ב"ע בעסקה עם הוראת קבע
This tag is currently not supported in the request.
## 117
## Commission
## עמלת  בית  עסק  במאיות,  אפסים  מובילים,  ללא  נקודה
## עשרונית, בעסקה עם הוראת קבע

This tag is currently not supported in the request.
## 118
StndOrdrFreq
## תדירות התשלומים, בעסקה עם הוראת קבע
This tag is currently not supported in the request.
## 119
## Cellular
## מספר סלולארי
This tag is currently not supported in the request.
## 120
CardSeqNumber
## מספר  סידורי  של  הכרטיס,  מפריד  בין  כרטיסים  בעלי  PAN
## זהה

This tag is currently not supported in the request.
## 121
## Otp
## סלולאריתסיסמא חד פעמית בעסקה
This tag is currently not supported in the request.
## 122
FirstPayment
## סכום  תשלום  ראשון  במאיות,  אפסים  מובילים,  ללא  נקודה
## עשרונית

For   installments   support.  This  is   the   amount   of   the   first
installment.

## 123
NotFirstPayment
## תשלומים,  במאיות,  אפסים  סכום  תשלום  קבוע  בעסקת
## מובילים, ללא נקודה עשרונית.

For  installments  support.  This  is  the  amount  of  each  of  the
rest installments.

## 124

Document Version 1.53   Caspit SmartRetail Solution
## 28

Tag name Description Matching TLV tag
(Caspit Internal)
IndexPayment
## \הצמדה לדולרמדד
## 1 צמוד למדד –
## 2צמוד לדולר  –
0 – No index
1 – Madad index
2 – Dollar index
## 125
NoPayments
## מספר  תשלומים  בעסקאות  תשלומים  ללא  תשלום  ראשון
## (ערכים:
## 0-999(
For  installments  support.  This  is  number  of  installments,  not
including the first installment.
## 126
OriginalUid
## מספר מזהה עסקת מקור
The Original  Uid. To  be  used  when  making  a  void  transaction
## (cancellation).

## 127
OriginalTranDate
## תאריך עסקת מקור
This tag is currently not supported in the request.
## 128
OriginalTranTime
## זמן עסקת המקור
This tag is currently not supported in the request.
## 129
OriginalAmount
## סכום עסקת המקור
The   Original   Amount.   To   be   used   when   cancelling   a   J5
authorization.

## 130
OriginalAuthorizedAmount
## סכום מאושר בתשובה לבקשה לאישור
This tag is currently not supported in the request.
## 131
OriginalAuthNum
## מספר אישור מנפיק של עסקת מקור
This tag is currently not supported in the request.
## 132
OriginalAuthSolekNum
## מספר אישור סולק של עסקת מקור
This tag is currently not supported in the request.
## 133

Document Version 1.53   Caspit SmartRetail Solution
## 29

Tag name Description Matching TLV tag
(Caspit Internal)
OriginalAuthorizationCodeManpik
## מאשר עסקת מקור מנפיק
## 0 עסקה ללא מספר אישור מנפיק –
## 1 אושר ע"י המנפיק –
## 2 דחייה ע"י המנפיק  –
## 3 אושר ע"י שב"א בשם המנפיק –
## 4 דחייה ע"י שב"א בשם המנפיק –
## 5 אושר ע" המענה הקולי –
## 6 דחייה ע"י המענה הקולי –
7אישור  – offline ע"י כרטיס חכם
## 8לא ניתן לבצע התקשרות –אושר ע"י כרטיס חכם  –
This tag is currently not supported in the request.
## 134
OriginalAuthorizationCodeSolek
## מאשר עסקת מקור סולק
## 0 עסקה ללא מספר אישור סולק  –
## 1 אישור ע"י הסולק  –
## 2 דחייה ע"י הסולק –
## 3אישור ע"י שבא בשירות  – STIP לסולק
## 4דחייה ע"י שבא בשירות  – STIP לסולק
## 5 אושר ע"י המענה הקולי –
## 6 דחייה ע"י המענה הקולי –
## 7  –  אושר ע"י החברה הסולקת באמצעות בקשה לאישור ללא
## עסקה

This tag is currently not supported in the request.
## 135
OriginalLinkIncrAuth
## קישור לבקשת מקור באישור מצטבר
This tag is currently not supported in the request.
## 136

Document Version 1.53   Caspit SmartRetail Solution
## 30

Tag name Description Matching TLV tag
(Caspit Internal)
PanEntryMode
## התג הזה מודיע לפינפד איך רוצים לקבל את נתוני הכרטיס.
## הערך של התג הזה תלוי אם העסקה היא:
## • עסקת J2
## • עסקת J4 רגילה
## • עסקת J4לאחר   J2
## עסקת J2או עסקת   J4 רגילה
## על עסקת  אם מדובר  J2  או  על עסקת  J4  רגילה   (כלומר  לא   בוצע  J2   לפני
## ה
## J4קיימות ) אז  3 אפשרויות:
"PinPad"   -  מגנטי, חכם  או  קירבה.  הביצוע  בפועל  של  העסקה  הוא  זה
## זאת ברירת המחדל.  שיקבע את צורת הקלט.
## 50  –  ינפד יבקש לקבל את פרטי הכרטיס ויהיה צורך עסקה טלפונית. הפ
## ל הכרטיס בעזרת מקשי להקליד את מספר כרטיס האשראי ואת  התוקף ש
## הפינפד.
## 51  –  פינפד יבקש לקבל את פרטי הכרטיס ויהיה  עסקת חתימה בלבד . ה
## הקליד את מספר כרטיס האשראי ואת התוקף של הכרטיס בעזרת צורך ל
## מקשי הפינפד.   (זה דומה  לעסקה טלפונית אבל בעסקת חתימה הכרטיס
## צריך להיות נוכח).

אם התג לא קיים, אז זה כאילו כתוב או כל ערך אחר,  PinPad
## ב  שבתשובה  לעסקה,  לתג  זה  יש  יותר  ערכים  אפשריים,  מאחר  שימו  ל
## ת הביצוע.  אם  מבקשים  בפועל  שבתשובתו הפינפד מדווח מה  היתה  צור
## עסקה טלפונית (
## 50) או עסקת חתימה (51) אז בתשובה יחזור  50  או  51  ,
## ה  טלפונית בהתאמה,  כי  הפינפד  לא  ישנה  את  אופן  הביצוע  עבור  עסק
## ועסקת חתימה.  אבל אם מבקשים "
PinPad " אז יחזור ערך אחר.
## למשל, אם  בבקשת העסקה  ביקשנו  " Pinpad" והעסקה בוצעה עם כרטיס
## חכם, אז בתשובה בשדה זה הערך
## 40
## עסקת השלמה  :J4לאחר   J2
## אם מדובר בעסקה שהיא עסקה השלמה לאחר ביצוע  J2  אז השדה הזה
## חייב  להכיל  את  הערך  שחזר  בתשובה  של
## J2,  אחרת  הפינפד  ידחה את
## ביצוע עסקת ההשלמה.

This tag tells the Pinpad how we want to accept the payment.
The value of this tag depends on  the type of transaction:
- A J2 transaction
- A regular J4 transaction
- A J4 after J2
A J2 or regular J4
If we are doing a J2 or a regular J4 transaction (i.e. there was not J2 before
the J4) then there are 3 possible values for the Pan Entry Mode:
"Pinpad" – this means that the Pinpad is responsible to the payment method.
All three payment methods are possible: MSR, Chip and Contactless. The
"Pinpad" is the default value for this tag.
50 – Card not present transaction (CNP). The Pinpad will ask the cardholder to
enter the PAN (card number) and the expiration date of the card.
51 – Signature transaction. Card is present in the transaction but the
transaction is done by entering the PAN (card number) and the expiration
date of the card.
Pay attention, that in the transaction response, this tag has move possible
values, because in the response, the Pinpad tells us what was the actual
payment method that was used. For example, if the PanEntryMode in the
request was "Pinpad", and the cardholder used the chip, then the
PanEntryMode in the response will be "40".

A completion transaction: J4 after J2
If the transaction is a completion transaction after doing J2 then this tag must
contain the value that returned in the J2 response.
## 138

Document Version 1.53   Caspit SmartRetail Solution
## 31

Tag name Description Matching TLV tag
(Caspit Internal)
CreditTerms
## סוג אשראי
## 1 אשראי רגיל –
## 2\עדיף\אמקסקרדיט\ישראקרדיט – 30+
## 3 חיוב מיידי –
## 6 קרדיט  –
## 8 תשלומים  –
## Credit Terms
## 1 - Regular
2 – Special: IsraCredit, AmexCredit, Adif
## 3 – Immediate
## 6 – Credit
## 8 - Installments
## 139

Document Version 1.53   Caspit SmartRetail Solution
## 32

Tag name Description Matching TLV tag
(Caspit Internal)
TranType
## סוג עסקה
## 01   עסקת חיוב –
## 02   עסקת פריקה  –
## 03   עסקת חיוב מאולצת  –
## 06  עסקת   –cashback
## 07   עסקת מזומן  –
## 11   עסקה עם הוראת קבע  –
## 30   בירור יתרה  –
## 53   עסקת זיכוי –
## 55   עסקת טעינה  –
## 99  קבלת מידע –
## Tran Type
## 01 – Regular
## 02 – Discharge
## 03 – Forced
## 06 – Cashback
## 07 – Cash
## 11 – Recurring
30 – Check balance
## 53 – Refund
## 55 – Topup (charge)
99 – Get info
## 140
AshReasonCredit
## סיבה לעסקת זכות
## 41  –   זיכוי מיוחד
## 42  –   זיכוי עסקת מימון
## 43  –  זיכוי בגין העברה מחשבון לחשבון
This tag is currently not supported in the request.
## 141

Document Version 1.53   Caspit SmartRetail Solution
## 33

Tag name Description Matching TLV tag
(Caspit Internal)
AuthorizationCodeSolek
## מקור אישור סולק
## 0 עסקה ללא מספר אישור סולק  –
## 1 אישור ע"י הסולק  -
## 2דחייה ע"י הסו – לק
## 3אישור ע"י שבא בשירות  – STIP לסולק
## 4-  דחייה ע"י שבא בשירות STIP לסולק
## 5 אושר ע"י המענה הקולי –
## 6 דחייה ע"י מענה קולי –
## 7  –  אושר ע"י החברה הסולקת באמצעות בקשה לאישור ללא
## עסקה

This tag is currently not supported in the request.
## 142
AuthorizationCodeManpik
## מקור אישור מנפיק
## 0 עסקה ללא מספר אישור מנפיק –
## 1 אושר ע"י המנפיק –
## 2 דחייה ע"י המנפיק  –
## 3אושר ע"י שב"א בשירות  – STIP
## 4דחייה ע"י שב"א בשירות  – STIP
## 5 אושר ע"י המענה הקולי –
## 6 דחייה ע"י המענה הקולי –
## 7אישור אופליין ע"י כרטיס חכם –
Authorization code from Issuer
0 – Transaction without authorization number
1 – Authorized by issuer
2 – Declined by issuer
3 – Authorized by Shva using STIP
4 – Declined by Shva using STIP
5 – Authorized by voice
6 – Declined by voice
7 – Offline authorization using chip
## 143
## Addendum1
## נתונים מיוחדים. שדה להוספת טקסט חופשי
Special data
## 144

Document Version 1.53   Caspit SmartRetail Solution
## 34

Tag name Description Matching TLV tag
(Caspit Internal)
## Addendum2
## נתונים מיוחדים. שדה להוספת טקסט חופשי
Special data
## 204
AddendumSettl
## מהמסוף  הנרשם  בעסקה  (נתוני  צי  רכב טקסט  חופשי
## ותדלוק/רכישות   שהתבצעו/נסיעות/תחום   הלינה/השכרת
## רכב/בידור/בילוי/נתוני    עסקה    שיסוכמו    עם    בית
## העסק/משלוחים/פוליסת ביטוח)
## אורך תוכן התג יכול להיות מקסימום 1180   תווים.
## בהתאם לאורך התוכן, התוכן יחולק ל(4  שדות  ISO.  חלוקה זו
## תבוצע ע"י הפינפד. הקופה תשלח את כל התוכן ביחד).

Free text that is saved with the transaction record.
The maximum lenth is 1180.
(Depending on the value length, the content may be split into
4 separate ISO field. This split is done by the  Pinpad. The ECR
sends the value in a single part).

205  (ISO     field
## 104)

206  (ISO     field
## 118)

207  (ISO     field
## 122)

208  (ISO     field
## 123)
ExpirationDate
## תאריך תוקף הכרטיס במבנה YYMM. חיוב להכניס את השדה
## בעסקה טלפונית.
This tag is currently not supported in the request.
## 145
## Amount
## סכום  באגורות.  אורך  השדה  משתנה  עד  12  פוזיציות.  אין
## לרשום נקודה עשרונית לאחר השלמים.
The  amount  in  cents.  Without  decimal  dot.  Maximum  12
digits.

## 146
AuthorizationNo
## מספר אישור (אופציונלי)
## השדה  מופיע  כאשר  בוצעה  התקשרות  אוטומטית  או
## באמצעות שיחה טלפונית רגילה לחברות האשראי, והתקבל
## מספר  אישור  לעסקה.  השדה  אלפא  נומרי  (רווח  אפשרי).
## השדה יכיל מספר אישור באורך מירבי של
## 7  תווים, אותיות,
## מספרים ותווים מיוחדים. השדה יועבר כשהוא מיושר לימין.

Authorization number
If  the  merchant  did  a  voice  authorization  then  this  tag  will
hold the authorization number that was given by the issuer.
Maximum 7 characters. Alphanumeric.
## 147

Document Version 1.53   Caspit SmartRetail Solution
## 35

Tag name Description Matching TLV tag
(Caspit Internal)
## Currency
## קוד מטבע. קוד נומרי בהתאם לטבלת קודי מטבע ISO8583 .
## קודים שכיחים:
## 376 – שקל
## 840 דולר  –
## 978יורו  –
Currency code
376 – NIS (New Israeli Shekel)
## 840 – USD
## 978 - EUR
## 148
ClubNumber
## קוד תחום מועדון.
## לעסקאות טלפוניות או חתימה בלבד.  –מספר מועדון
## לישראכרט:  מספר  המועדון  (באורך  4  פוז')  בכרטיס  נמצא
## בערוץ
## 2.
## לכאל וללאומיקארד: מספר המועדון מוגדר בפוז' 1-  6   משמאל
## למספר הכרטיס.

This tag is currently not supported in the request.
## 149




Document Version 1.53   Caspit SmartRetail Solution
## 36

Tag name Description Matching TLV tag
(Caspit Internal)
ParameterJ
## אופן הפעלה –
## 2  –  בדיקה בלבד של נתוני העסקה. הבדיקה תתבצע ברמת
## הפינפד,  ללא  יציאה  לבקשה  לאישור  וללא  רישום  עסקה
## בקובץ התנועות. נוצר
## XML  תשובה בלבד. במיוחד כשמדובר
## באפליקציה של קופה, מומלץ לבצע את ההפעלה הראשונה
## של הממשק עם פרמטר
## J2  –  לצורך קביעת חברת האשראי
## מנפיקת  הכרטיס,  כך שניתן יהיה להקרין  את סוגי  האשראי
## הקיימים של אותה חברה בלבד, ואז ההפעלה השניה תהיה
## לצורך  חיוב  (ללא  הפרמטר
## J  .)ראו  דוגמא  והסבר  מפורט
## בסעיף
## 9.2.11
4זאת ברירת המחדל. אם התג  – <ParameterJ>לא נשלח אז
## הכוונה לערך
4 (גם ערך אפס ב ParameterJיטופל כמו   4)
## 5  –  בקשה  לאישור  ללא  עסקה.  אופציה  זו  נועדה  לעסקים
## כגון: חברות להשכרת רכב, בתי מלון וכדומה. בשלב הראשון
## מבצעים  בקשה  לאישור  לצורך  בדיקת  תקפות  הכרטיס
## והעסקה  מול  חברת  האשראי  ולקבלת  מספר  אישור  (גם
## במקרים שהתשובה לבקשה הינה חיובית, העסקה לא תרשם
## בקובץ
## TRAN). העסקה תבוצע בשלב מאוחר יותר כאשר ידוע
## סכום העסקה המדוייק.
## 6  –  בקשה  לאישור  ביוזמת הקמעונאי.  זאת אופציה  נוספת
## שבה  המשתמש  יכול  ליזום  התקשרות  לחברות  האשראי
## לצורך  קבלת  מספר  אישור.  במקרה  של  תשובה  חיובית,
## העסקה תרשם בקובץ ה
## TRAN .אפשרות זו לא נתמכת עדיין.
## 49  השלמת עסקת  –J5
Mode of operation
2 –  Get  card  details  (J2).  This  mode  just  checks  the  card  and
doesn’t  perform  a  real  transaction  and  doesn't  write  the
transaction in the transactions batch file.  After getting the J2
response, the ECR may complete the transaction by sending a
J4  request.  Refer  to  chapter  9.2.11  to  see  a  sample  and  an
extended explanation.
4 –   Real   transaction   (J4).   This   is   the   real   transaction.   If
successful it will be written in the transactions batch file.
5 –  Pre  authorization  (J5).  This  mode  of  operation  is  used
mainly   in   hotels,   card   rental   and   petrol   stations.   The
transaction  goes  online  to  get  an  authorization  number  but
the  transaction  is  not  a  real  transaction  and  it  is  not  kept  in
the transactions batch. The real transaction can be completed
in  future  time  using  the  authorization  number  that  has  been
received.
6 – Not supported yet.
## 49 – Complete J5
## 150

Document Version 1.53   Caspit SmartRetail Solution
## 37

Tag name Description Matching TLV tag
(Caspit Internal)
## Cvv2
## תוכן שדה Cvv2
This tag is currently not supported in the request.
## 151
## Id
## מספר תעודת הזהות, מיושר לימין עם אפסים מובילים
This tag is currently not supported in the request.
## 152
DeferMonths
## מספר חודשי דחייה (1-12)
This tag is currently not supported in the request.
## 153
DueDate
## מועד חיוב הלקוח  YYMM
This tag is currently not supported in the request.
## 154
## Rrn
## מזהה  עסקה  ייחודי  שמוקצה  ע"י  החברה  המאשרת  את
## הבקשה לאישור
This tag is currently not supported in the request.
## 155
SpecialProjectCode
## מספר פרוייקט מיוחד
This tag is currently not supported in the request.
## 156
SpecialProjectInfo1
## נתונים לפרוייקט מיוחד
This tag is currently not supported in the request.
## 157
SelfServiceTrans
## ציון לעסקה בשירות עצמי
## 0 עסקה שאינה בשירות עצמי –
## 1עסקה בשירות עצמי  –
This tag is currently not supported in the request.
## 158
## Xfield
## מספר השובר (או מספר החשבונית) של הקופה למקרה שיש
## רק תשלום אשראי אחד. במקרה של יותר מתשלום אחד, יש
## להוסיף  למספר  חשבונית  ספרה  נוספת  שונה  לכל  תשלום.
## זהה לשדה
## X  מאשראית  96. זהו שדה חובה .  הקופה  חייבת
## להעביר  ערך  ייחודי  לכל  עסקת  תשלום. הפינפד בודק אם
## שייך  לעסקה  קודמת,  ואם  כן  אזי  יחזיר  הודעה  של הערך
## עסקה כפולה/נעשתה.
## חיפוש  עסקאות,  ע"י  Transaction  Query,  מתבסס  על  הערך
## של
## Xfield. כך שאם הערך לא יהיה ייחודי, חיפוש עסקאות לא
## יעבוד תקין.
This tag is mandatory.
This is the ECR voucher number (or ECR invoice number). The
ECR must send a unique value for each transaction.
Quering  transaction,  using  the  Transaction  Query  command,
is based on the Xfield value.
## 212
The  X  value  will
eventually be put
in   ISO   field   126
## B2

Document Version 1.53   Caspit SmartRetail Solution
## 38

Tag name Description Matching TLV tag
(Caspit Internal)
AllowCardInsideBefore
0 – Default.  Right  before  starting  a  new  transaction,  the
Pinpad  will  check if  there  is  a  card  inserted  in  the  smart  card
reader.  If  there  is  a  card  inserted,  the  Pinpad  will  ask  the
cardholder to remove the card, and only after removal of the
card,  the  Pinpad  will  start  the  transaction  and  will  ask  the
cardholder to insert a card. This is done to prevent the case of
starting  a  transaction  with  a  card  that  was  forgotten  in  the
card reader from previous transaction.
1 – When starting a new transaction, the Pinpad will start the
transaction  even  if  there  is  a  card  already  in  the  smart  card
reader. This can be useful in the case of a J2 transaction. After
a  J2  usually  comes  J4  and  we  would  like  the  cardholder  to
leave  the  card  inside  the  card  reader.  We  do  not  want  that
the cardholder will need to insert his card twice.

## 216
AllowCardInsideAfter
0 – Default. At the end of transaction, before returning the
response XML to the ECR, the Pinpad will wait until the
cardholder remove his card. Only after removal of the card,
the Pinpad will return the response XML to the ECR. It means
that while the card is inside, the "control" of the transaction is
still in the hands of the Pinpad.
1 – At the end of the transaction, the Pinpad will return the
response XML to the ECR, not waiting for the removal of the
card. It is up to the ECR to check if there is a card still inside
and to do something about it. The ECR can check if there is a
card inside by using the Communication Test command and
then use the UI Command to ask the cardholder to remove
the card.
## 221
## Track2
The Pinpad will never send out the full track2 data of a credit
card.
But the ECR can send to the Pinpad a track2 data to be used in
the transaction.
If this tag <Track2> exists then the Pinpad will not ask to
swipe/present/tap card. The Pinpad will use the <Track2>
value and will perform a magnetic transaction.
Only magnetic transaction can be done like that.
Of course, if the <Track2> value is invalid or if the service code
in the track2 data requires that the smart card will be used,
then the Pinpad will reject this transaction.

## 65

Document Version 1.53   Caspit SmartRetail Solution
## 39

Tag name Description Matching TLV tag
(Caspit Internal)
ContinueJ2
This tag should be used only after a J2 transaction. Only if the
ECR wants to continue  J4/J5 transaction that has started with
## J2.
0 –  Default.  If  ContinueJ2  is  0  or  if  ContinueJ2  tag  does  not
exist at all, then there
is nothing to do.
1 – This transaction is a continuation of a J2 transaction.
2 –  This  transaction  is  a  continuation  of  a  J2  transaction
without Amount checking.

## 224
SkipDoubleTranCheck
Using the Pinpad Configuration command, you can configure
the Pinpad to block double transaction (see chapter 17 and
<BlockDoubleTrans> tag).
This tag can be used to override that configuration, but only
for this specific transaction.
The possible values are:
0 – No override will be done. If Pinpad is configured to block
double transactions, then the check for a double transaction
will be done. If the Pinpad is NOT configured to block double
transactions, then no check will be done
1 – The Pinpad will not check for double transactions, even if
the Pinpad is configured to check for double transactions.

## 237
ShowErrorsOnPinpad
Default is 0.
0 – In case of an error during transaction (e.g. "Invalid Credit
Card"), the Pinpad will not show the error on the Pinpad
screen. Instead the Pinpad will just return the error code in
the response to the ECR.
1 – The Pinpad will display the error on the Pinpad screen, for
a few seconds, before returning the response to the ECR.

## 203
SwitchSend
This tag is relevant only when using Switch
0 –  Default.  If  this  tag  is  missing  then  this  is  the  default.
Pinpad will NOT send the transaction record after performing
the transaction. To send the record, the ECR must use Generic
command with sub command 012.
1 – The  Pinpad  will  send  the  transaction  record  to  the  Switch
immediately   after   performing   the   transaction.   This   will
happen before the Pinpad returns the response to the ECR. It
is  like  the Pinpad  is calling Generic command  012  after every
transaction. If there are some records that haven’t been sent
to  the  Switch,  they  will  all  be  sent  to  the  Switch,  not  just  the
current transaction.

## 254

Document Version 1.53   Caspit SmartRetail Solution
## 40

Tag name Description Matching TLV tag
(Caspit Internal)
GetToken
## Switch Support
The <GetToken> tag goes together with
<ParameterJ>2</ParameterJ>. Usually, a J2 command just
checks the card in offline mode. But using <GetToken> the
ECR can ask the Pinpad to get a token, from the Switch, even
when doing J2.

The <GetToken> tag will have no effect if used with a
<ParameterJ> different than 2.
0 – Default. The Pinpad will NOT ask for token. The J2 will be
the regular, offine mode, J2.
1 – The Pinpad will go online during J2 command to get a
token. The token will return, as usuall, in tag
<AddendumSettl>.
## Notes
The first thing the Pinpad will always do is the standard J2
flow, no matter what is the value of <GetToken>. A
<GetToken>1</GetToken> just adds a token request at the
end of the standard J2. Because we added another step to the
J2, the ECR should carefully check the result code of the J2. It
is possible that the J2 completed successfully, except for the
token request. So, the ECR will have to decide if it wants to
continue the transaction (J4/J5) without token or if it wants to
abort the transaction and try again the J2.
Relevant result codes in response:
RETVAL_ERROR_GETTING_TOKEN -  It means the J2
completed successfully but the token request failed. Probably
because of communication error.
<ResultCode> >= 900000. This is a Switch error code. It means
the J2 completed successfully and the token request has
arrived to the Switch, but the Switch returned an error.

## 258

Document Version 1.53   Caspit SmartRetail Solution
## 41

Tag name Description Matching TLV tag
(Caspit Internal)
PanEntryModeExt
## יך רוצים לקבל את נתוני הכרטיס , כאשר כל שיטה מיוצגת  התג הזה מודיע לפינפד א
## ע"י ביט אחד מסויים:
## 00001  –  קה  טלפונית.  הפינפד  יבקש  לקבל  את  פרטי  הכרטיס  ויהיה  צורך עס
## ד את מספר כרטיס האשראי ואת התוקף של הכרטיס בעזרת מקשי הפינפד. להקלי
## 00010  –  קת חתימה בלבד. הפינפד יבקש לקבל את פרטי הכרטיס ויהיה צורך עס
## כרטיס האשראי ואת התוקף של הכרטיס בעזרת מקשי הפינפד.  להקליד את מספר
## עסקה טלפונית אבל בעסקת חתימה הכרטיס צריך להיות נוכח). (זה דומה ל

## 00100עסקת פס מגנטי בלבד.  –
## 01000עסקת כרטיס חכם (צ'יפ) בלבד.  –
## 10000עסקת כרטיס מגע בלבד.  –

## הערך של התג הזה תלוי אם העסקה היא:
## • עסקת J2
## • עסקת J4 רגילה
## • עסקת J4  לאחר J2
## עסקת J2או עסקת  J4 רגילה
## אם מדובר על עסקת  J2  או על  עסקת  J4  רגילה (כלומר לא בוצע  J2   לפני ה J4) אז
## קיימות
## 3 אפשרויות:
## 11100  -   קירבה. הביצוע בפועל של העסקה הוא זה שיקבע את צורת  מגנטי, חכם או
## הקלט. זאת ברירת המחדל.
## 00001 עסקה טלפונית  –
## 00010עסקת חתימה בלבד.  –
## כל ערך אחר, או אם התג לא קיים, אז זה כאילו כתוב 11100
## שימו לב שבתשובתו הפינפד מדווח מה בפועל היתה צורת הביצוע.
## עסקת השלמה: J4  לאחר J2
## אם מדובר בעסקה שהיא עסקה השלמה לאחר ביצוע  J2  אז השדה הזה חייב להכיל
## את הערך שחזר בתשובה של
## J2 , אחרת הפינפד ידחה את ביצוע עסקת ההשלמה.

This tag tells the Pinpad how we want to accept the payment. Each type of transaction is
represented by one bit only:
00001 – Card not present transaction (CNP). The Pinpad will ask the cardholder to enter
the PAN (card number) and the expiration date of the card.
00010 – Signature transaction. Card is present in the transaction but the transaction is
done by entering the PAN (card number) and the expiration date of the card.
00100 – Magnetic swipe transaction.
01000 – Smart Card transaction (Chip).
10000 – Smart Card transaction (Contactless).

The value of this tag depends on  the type of transaction:
- A J2 transaction
- A regular J4 transaction
- A J4 after J2
A J2 or regular J4
If we are doing a J2 or a regular J4 transaction (i.e. there was not J2 before the J4) then
there are 3 possible values for the Pan Entry Mode:
11100 – this means that the Pinpad is responsible to the payment method. All three
payment methods are possible: MSR, Chip and Contactless. This is the default value for
this tag.
00001 – Card not present transaction (CNP).
00010 – Signature transaction.

Pay attention, that in the transaction response, the Pinpad tells us what was the actual
payment method that was used.

A completion transaction: J4 after J2
If the transaction is a completion transaction after doing J2 then this tag must contain
the value that returned in the J2 response.

## 260
PosHash
<PosHash> upto 32 chars prefix to be used in SHA256 for MAX
cards,  or upto 32 chars suffix to be used in MD5 for CAL cards

## Tidluk
Parameter that indicates fuelling transaction

Document Version 1.53   Caspit SmartRetail Solution
## 42

Tag name Description Matching TLV tag
(Caspit Internal)
</Request>

## N/A

9.2 XML Examples of transactions
You should use the SmartRetail tester and the following examples to learn how to perform various transactions.
- Regular Transaction. The most basic transaction.
Amount is 100 NIS (10000 Agorot).
The request XML (INT_IN):
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>

>TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>  (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
</Request>

A successful response will look similar to that:
<EMV_Output>
<Command>1</Command>
<TerminalId>0880264</TerminalId>
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<Mti>100</Mti>
<Pan>0004580289999999709</Pan>
<PanEntryMode>40</PanEntryMode>
<CardName>הזיו בהז         </CardName>
<Manpik>2</Manpik>
<Brand>2</Brand>
<Solek>1</Solek>
<CardType>001</CardType>

Document Version 1.53   Caspit SmartRetail Solution
## 43

<spType>0</spType>
<Amount>10000</Amount>
<TranType>1</TranType>
<CreditTerms>1</CreditTerms>
<Currency>376</Currency>
<FileNo>02</FileNo>
<TermNo>001</TermNo>
<TermSeq>003</TermSeq>
<TerminalName>EMV TEST CASPIT</TerminalName>
<Retailer>0880264012</Retailer>
<ComRetailerNum>0071506</ComRetailerNum>
<DateTime>0109130753</DateTime>
<ResponseId>0</ResponseId>
<ResponseCvv2>0</ResponseCvv2>
<ResponseAvs>0</ResponseAvs>
<AuthCodeManpik>0</AuthCodeManpik>
<AuthCodeSolek>0</AuthCodeSolek>
<Uid>17010913075308802640011</Uid>
<parameterJ>0</parameterJ>
<appVersion>8510330084</appVersion>
<CardSeqNumber>01</CardSeqNumber>
## <AID>A0000000031010</AID>
## <TSI>E800</TSI>
<VerifiedByPIN>1</VerifiedByPIN>
## <ATC>001B</ATC>
## <TVR>0080000000</TVR>
<ExtraInfo></ExtraInfo>
<CardHash></CardHash>
<RequestId>20170109130703</RequestId>
Here will come the text of the receipts. I do not show it here in this example. See chapter 9.4 for an example of the receipt text.
</EMV_Output>

If all you do is a simple regular transaction then your XML will always be like that, and you will need to change only the <Amount>.
<Request>
<Command>001</Command>

Document Version 1.53   Caspit SmartRetail Solution
## 44

<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>

>TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>          </Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
</Request>

- Payments Transaction. 100 NIS in 4 payments.
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>8</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<NoPayments>3</NoPayments> (this number doesn't include the first payment)
<FirstPayment>2500</FirstPayment>
<NotFirstPayment>2500</NotFirstPayment>
<Xfield>3409583598TTTT</Xfield>
</Request>
- Cashback Transaction (בתמורתה מחויב בעל הכרטיס באשראי ומקבל סכום נוסף במזומןעסקה ש)
Here we just add the tag <CashbackAmount>
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>06</TranType>
<Amount>
10000</Amount>

Document Version 1.53   Caspit SmartRetail Solution
## 45

<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<CashbackAmount>5000</CashbackAmount>
<Xfield>GGG23942304938</Xfield>
</Request>

- Cash Transaction (בצעת בכרטיס ישראלי או תייר ובתמורתה מקבל בעל הכרטיס מזומן בלבדעסקת חיוב המת)
Note the difference between Cash and Cashback.
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>07</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>GGG23942304938</Xfield>
</Request>



Document Version 1.53   Caspit SmartRetail Solution
## 46

- Cancel Transaction, aka void transaction (עסקה המבטלת עסקה שנתוניה קיימים בקובץ התנועות במסוף)
For each transaction, the Pinpad keeps the Uid of the transaction. That Uid is used to identify the transaction we wish to cancel.
The  ECR,  on  its  side,  must  keep  the  Uid  of  the  original  transaction  and  to  use  it  when  the  merchant  would  like  to  cancel  the
transaction.
It is possible to cancel transactions only if they were not transmitted to Shva.
It is important  to  understand  the  difference  between  a "Cancel"  transaction and a "Refund"  transaction.  A "Refund"  transaction
(sometimes  called  a  "credit"  transaction)  is  a new  transaction  that  is not  related  to  the  original  transaction.  If  you  did  a  regular
debit transaction and then you made a refund transaction to the same card number and the same transaction details then at the
end, the terminal will have two transactions: the first is the regular debit transaction and the second is the refund transaction. The
cardholder  will  not  be  charged,  though  in  some  cases  he  will  see  the  two  transactions  (debit  and  refund)  in  his  monthly
statement. In most cases you can do a refund transaction even if there is no original debit transaction. A refund transaction is NOT
limited to the same day of the original transaction; it can be done on another day.
A "Cancel" transaction (also valled a "void" transaction) must have an original transaction that is the "target" of the cancelation. If
you  did  a  regular  debit  transaction  and  the  transaction  has  not  been  sent  to  Shva  yet,  then  you  can  perform  a  "Cancel"
transaction  that  will  actually  cancel  the  original  transaction.  The  original  transaction  and  the  cancelation  transaction  will  both
exist in the TRAN file and will both be transmitted to Shva.
In  Ashrait  EMV  (as  opposed  to  Ashrait  96)  you  can  cancel  any  of  the  transactions  that  exist  in  the  TRAN  file,  not  just  the  last
transaction.
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>400</Mti>
<CreditTerms>1</CreditTerms>  (must be the same as in the original transaction)
<TranType>01</TranType>    (must be the same as in the original transaction)
<Amount>
10000</Amount>    (must be the same as in the original transaction)
<Currency>376</Currency>    (must be the same as in the original transaction)
<OriginalUid>23929384738828374</OriginalUid> (must be the same Uid from the original transaction).
<Xfield>GGG23942304938</Xfield> (must be a new value of Xfield. Not the original Xfield from the original transaction)
</Request>

The  Pinpad  will  search  the  <OriginalUid>  in  the  transaction  batch.  If  found,  the  Pinpad  will  compare  also  the  following  tags:
<CreditTerms>, <TranType>, <Amount>, <Currency>.
If the <OriginalUid> wasn't found in the transaction batch or if there is no perfect match between the original transaction and the
XML values then the cancellation cannot continue. In that case AshStatus will be 443.
Note  that  if  the  original  transaction  was  made  by  online  authorization  then  the  cancelation  will  also  require  an  online
authorization. And if there is a communication problem then the cancellation cannot be done.
The response will include the tags: <OriginalTranDate>, <OriginalTranTime>, <OriginalAmount>
And depending on the entity that authorized the original transaction, issuer (manpik) or acquirer (solek):
<OriginalAuthNum>, <OriginalAuthorizationCodeManpik>

Document Version 1.53   Caspit SmartRetail Solution
## 47

## Or
<OriginalAuthSolekNum>, <OriginalAuthorizationCodeSolek>
- Authorized transaction, using an authorization number (עם מספר אישורעסקה )
If  a  transaction  is  declined  with  AshStatus  003,  it  is  possible  to  call the  credit  company  to  get  an  authorization  number.  The
merchant is supposed to call to the credit company support center to get an authorization number for the transaction.
After getting an authorization number, the ECR can redo the transaction with an authorization number.
In this example you can see that we get authorization number 1234567, which we put in tag <AuthorizationNo>.
You also need to send tag <AuthorizationCodeManpik> with value 5.
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>01</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>GGG23942304938</Xfield>
<AuthorizationCodeManpik>5</AuthorizationCodeManpik>
<AuthorizationNo>1234567</AuthorizationNo>
</Request>

- Regular Refund transaction (זכות\עסקת זיכוי)
Tran Type is 53
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>53</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>GGG23942304938</Xfield>
</Request>

Document Version 1.53   Caspit SmartRetail Solution
## 48



## 8. Get Balance (בירור יתרה)
Amount must be 100.
TranType is 30
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>30</TranType>
<Amount>
100</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>GGG23942304938</Xfield>
</Request>
The response will include the tag <DspBalance> and <AddDspBalance>

- Forced transaction (עסקה מאולצת)
In a forced transaction, the merchant takes responsibility for the transaction. The Pinpad will not go online for authorization.

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>03</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>GGG23942304938</Xfield>
</Request>


Document Version 1.53   Caspit SmartRetail Solution
## 49

- Topup transaction (ת טעינהעסק)
A topup transaction is loading funds into a giftcard.
Tran Type should be 55.

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>
55</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>GGG23942304938</Xfield>
</Request>

Beside the regular tags in the response, you might get two other tags: <DspBalance> and <AddDspBalance>.
See the response XML tags table to learn more about these tags.
Also, in the customer receipt text XML you will two lines with a "Balance" attribute.
Like this:
<Line name="Balance">      סיטרכה תרתי םוכס</Line>
<Line name="Balance">                748.88</Line>



Document Version 1.53   Caspit SmartRetail Solution
## 50

## 11. J2 – Get Card Details (פרטי כרטיס)
Some integrators like to perform a J2 before every actual transaction.
J2 is also called Get Card Details, and you do it by adding the tag <ParameterJ>2</ParameterJ> to the payment request XML.

The J2 main features are:
- The Pinpad will not perform a real transaction.
- The cardholder will not be charged.
- Transaction is not saved in the Pinpad
- No communication to Shva is done.

The Pinpad will just read the card details and return the response to the ECR (if a smart card is used,  the cardholder will not
have to enter the PIN code in this stage. The PIN will be asked later, if and when the transaction is completed with J4).
The  Pinpad  can  decline  the  J2  transaction  from  various  reasons.  The  regular  Ashrait  logic  is  performed  during  the  J2
transaction  so  any  of  Ashrait errors may  return. If  the  Pinpad  declined the  J2  transaction then  there is  no  need  to  continue
with the completion transaction (the J4/J5).
If the Pinpad approved the J2 transaction then the ECR can examine the card details from the response and decide if it wants
to    proceed    with    the    completion    transaction.    If    yes,    the    ECR    will    make    the    completion    transaction    with
<ParameterJ>4</ParameterJ>.
The completion transaction must be done with the same payment method (PanEntryMode) as the J2 transaction response.

Here  is  the  request  for  the  J2  transaction.  This  example  is  for  a  regular  transaction,  but  any  type  of  transaction  and  credit
terms can be used in the J2 transaction.

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount> (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
<ParameterJ>2</ParameterJ>
<AllowCardInsideAfter>1</AllowCardInsideAfter>
</Request>

Notice the <ParameterJ>2</ParameterJ> tag that is used to tell the Pinpad that this is a J2 transaction.

Notice  the <AllowCardInsideAfter>1</AllowCardInsideAfter>  tag.  This  tag  tells  the  Pinpad  to NOT  ask  the  cardholder  to
remove the card after J2 is performed. If the ECR will not send the <AllowCardInsideAfter> tag or if the value of the tag will be
zero  then  the  Pinpad  will  ask  the  cardholder  to  remove  the  card  at  the  end  of  the  J2  transaction.  Of  course,  all  this  card
removal issue is relevant only to J2 that is done using a smart card (chip card).

The response XML of the J2 transaction will be similar to the regular payment transaction response, but without the receipt
text parts.

Document Version 1.53   Caspit SmartRetail Solution
## 51

The response will also include the tag <PossibleCreditTerms>. The ECR can parse this tag a display to the cashier the available
credit terms to complete the transaction.
The response will also include the tag <PossibleCurrency>. The ECR can parse this tag and display to the cashier the availabl e
currency to complete the transaction.

Normally, after J2, the ECR will send the actual transaction. This time with <ParameterJ>4</ParameterJ>.
The continuation of the J2 to the actual transaction varies according to the payment method (pan entry mode).
The ECR should parse the <PanEntryMode> tag that came back in the J2 response and act accordingly.

Continue J2 after using a smart card
The response of the J2 transaction that was done by a smart card (by the chip) will look like that
<EMV_Output>
<Command>001</Command>
<AshStatus>0</AshStatus>
<Status>0</Status>
<ResultCode>0</ResultCode>
## ...
<PanEntryMode>40</PanEntryMode>  (smart card)
<Pan>XXXXXXXX1234</Pan>
<ParameterJ>2</ParameterJ>
<PossibleCreditTerms></PossibleCreditTerms>
<CardHash></CardHash>
<ExtraInfo></ExtraInfo>
## ......
</EMV_Output>

If the J2 was done with a smart card then the actual transaction (the completion of the transaction, the J4) still needs the card
inside because during the actual transaction, the PIN (secret code) is checked against the card. The request of the J4 will be
like that:

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>  (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>40</PanEntryMode>
<Xfield>20398049823</Xfield>
<AllowCardInsideBefore>1</AllowCardInsideBefore>
<Pan>XXXXXXXXX1234</Pan>
<ContinueJ2>1</ContinueJ2>
<ParameterJ>4</ParameterJ>
</Request>

Notice   the <AllowCardInsideBefore>1</AllowCardInsideBefore>   tag.   This   tag   tells   the   Pinpad   to   allow   starting   the
transaction  when  there  is  a  card  inserted.  Without  this  tag,  if  a  card  is  already  inserted,  the  Pinpad  will  ask  to  remove  it
before  starting  the  transactions.  The  usage  of  <AllowCardInsideBefore>  tag and  <AllowCardInsideAfter>  tag  gives  us  the

Document Version 1.53   Caspit SmartRetail Solution
## 52

option to  perfrom  the  J2  and  then  the  actual  transaction without  the  need  to remove  and  insert the  card  between  the  two
phases. Thus, making the payment experience easier for the cardholder.

Notice  also  the  <PanEntryMode>40</PanEntryMode>  in  the  J4  transaction  request.  Because  the  J2  was  a  smart  card
transaction, the Pinpad returned <PanEntryMode>40</PanEntryMode> in the J2 response XML. If the ECR wants to continue
the transaction, it must send also <PanEntryMode>40</PanEntryMode> in the J4 transaction request.

Notice also the <Pan> tag. It must have the same value of the <Pan> tag from the J2 response XML. That way the Pinpad will
make sure that the card from the J4 transaction is the same card from the J2 transaction.

Notice also the <ContinueJ2> tag, that tell the Pinpad that this is a continuation of a J2 transaction.

If after the J2, the ECR decides to NOT continue with the transaction, and if the card is still inside the Pinpad then the ECR can
check if the card is still inside using the Pinpad Configuration command and then use the UI command to ask the cardholder
to remove the card.

The continuation  of  the  J2 is  valid  only for  the last  J2. You cannot  do  other  transactions with  the Pinpad  after  doing  J2  and
then decide to do the J4 transaction. The J4 transaction must come directly after the J2.

If    the    Pinpad    can    not    continue    the    J2    transaction,    the    Pinpad    will    return    with    Result    code    10028
## (RETVAL_CANT_CONTINUE_J2)

Continue J2 after using a magnetic card
The response of the J2 transaction will look like that:
<EMV_Output>
<Command>001</Command>
<AshStatus>0</AshStatus>
<Status>0</Status>
<ResultCode>0</ResultCode>
## ...
<PanEntryMode>00</PanEntryMode> (Magnetic card)
<Pan>XXXXXXXX1234</Pan>
<ParameterJ>2</ParameterJ>
<PossibleCreditTerms></PossibleCreditTerms>
<CardHash></CardHash>
<ExtraInfo></ExtraInfo>
## ......
</EMV_Output>

If  the  J2  was  done  with  a magnetic card,  we  do  not  want  to  ask  the cardholder  to  swipe  again  his  credit  card,  so  the actual
transaction request will be like that:
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>  (Amount is in agorot)

Document Version 1.53   Caspit SmartRetail Solution
## 53

<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>00</PanEntryMode> (Magnetic card)
<Pan>XXXXXXXXX1234</Pan>
<ContinueJ2>1</ContinueJ2>
<ParameterJ>4</ParameterJ>
<Xfield>20398049823</Xfield>
</Request>

Notice  the  <PanEntryMode>00</PanEntryMode>  tag  which  tells  the  Pinpad  to  do  the J4  transaction  using  a  magnetic  card.
Notice  also the  <Pan>  tag which  must  be  with the  same  value  of  the  <Pan>  tag  that  the  ECR  got  from  the  J2  response  XML.
That  way  the  Pinpad  will  know  that  the  J4  transaction  must  be  done  with  the  same  magnetic  stripe  data  that  was  swiped
during the J2 phase. This will prevent the cardholder from swiping his credit card twice.

Notice also the <ContinueJ2> tag that tells the Pinpad that this is a continuation of a J2 transaction.

The continuation of the J2 is valid only for the last J2. You cannot do other transactions with the Pinpad after the J2 and then
decide to do the actual transaction. The J4 transaction must come directly after the J2.

Continue J2 after using a contactless card
The response of the J2 transaction will look like that:
<EMV_Output>
<Command>001</Command>
<AshStatus>0</AshStatus>
<Status>0</Status>
<ResultCode>0</ResultCode>
## ...
<PanEntryMode>05</PanEntryMode> (Contactless)
<Pan>XXXXXXXX1234</Pan>
<ParameterJ>2</ParameterJ>
<PossibleCreditTerms></PossibleCreditTerms>
<CardHash></CardHash>
<ExtraInfo></ExtraInfo>
## ......
</EMV_Output>

The request of the actual transaction will be like that:

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>  (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>05</PanEntryMode>
<Pan>XXXXXXXXX1234</Pan>
<ContinueJ2>1</ContinueJ2>

Document Version 1.53   Caspit SmartRetail Solution
## 54

<ParameterJ>4</ParameterJ>
<Xfield>20398049823</Xfield>
</Request>

The <PanEntryMode> should be the same <PanEntryMode> that was in the J2 transaction response XML (it will not always be
- There are 4 different pan entry modes for contactless. See the possible values in the table in chapter 9.3).
<Pan> must be the same value as it came in the J2 transaction response XML.
<ContinueJ2> must also exist.
If the <Amount> is different, the cardholder will be asked to present his card again.



Document Version 1.53   Caspit SmartRetail Solution
## 55

Continue J2 logic diagram



## No
## Is Same
CardNumber(Mask) &
TranType &
PanEntryMode
## Yes
## NO
Complete as J2
## Yes
## Start J2
MSR or
Signature or
## Phone
## Error
ResultCode = 10028
AshStatus = 421
## Status = 1053
## End
## Is Smart Card
Card inside or
## Insert Card
## Yes
## Is Same
## PAN
## NO
Complete as J2
## Yes
## End
## Contactless
## Is Same
## Amount
Complete as J2
## Yes
## End
## Is
## Continue J2 == 2
## Get Card
## No
## No
## Is
## Amount <
MaxClessAmount
## Yes
## NO
## End
## Complete
## Yes
## Error
ResultCode = 10028
AshStatus = 504
## Status = 1053

Document Version 1.53   Caspit SmartRetail Solution
## 56


- J5 – Pre authorization (בקשה לאישור ללא עסקה)
Use <ParameterJ>5</ParameterJ> to perform a pre authorization transaction.

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>  (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
<ParameterJ>5</ParameterJ>
</Request>

- Topup Magnetic Transaction. The Track2 comes from an external MSR.
The request XML (INT_IN):
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>

>TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>55</TranType>
<Amount>
10000</Amount>  (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
<Track2>4580458045804580=1218203934827394928937</Track2>
</Request>



Document Version 1.53   Caspit SmartRetail Solution
## 57

## 14. Discharge (פריקה)
Discharge transaction is for giftcards only.
The amount of the discharge must be equal to the total balance of the giftcard. Before doing a  discharge, the merchant must do a
balance transaction to get the balance of the giftcard. Then he will use that balance for the amount of the discharge transaction.
Tran Type is 2.

<Request>
<Command>001</Command>
<TerminalId>0880265</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>2</TranType>
<Amount>5000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<AuthorizationCodeManpik>1</AuthorizationCodeManpik>
<Currency>376</Currency>
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<RequestId>20170201141951</RequestId>
</Request>

- A topup transaction with benefits (הטבות)
The benefits feature of Ashrait EMV is a complex issue.  The usage of benefits may be different between different merchants
because it depends on the financial agreement between the merchant and his credit company. I will show some examples of
using  benefits.  There  are  4  XML  tags  that  are  relevant  to  benefits,  but  not  all  of  them  are  used  all  the  time.  The  tags  are:
<IpayNumber>, <IpayCode>,  <IpayAmount>, <IpayPercent>.

So, here is a topup transaction with points (the benefit in this case are the points).
<Request>
<Command>001</Command>
<TerminalId>0880265</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>55</TranType>
<Amount>5000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<Currency>376</Currency>
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<IpayNumber>3</IpayNumber>
<IpayCode>1</IpayCode>
<RequestId>20170201141951</RequestId>
</Request>

The response receipt text will include the text:
<Line name="Benefit">     :מספר  יחידות  הטבה</Line>
<Line name="Benefit">                     3</Line>


Document Version 1.53   Caspit SmartRetail Solution
## 58


If you sent the wrong <IpayCode>, like that example:
<Request>
<Command>001</Command>
<TerminalId>0880265</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>55</TranType>
<Amount>5000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<Currency>376</Currency>
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<IpayNumber>3</IpayNumber>
<IpayCode>3</IpayCode>   (sending IpayCode 3 instead of 1)
<RequestId>20170201141951</RequestId>
</Request>
You will get the following response:
<EMV_Output>
<Command>1</Command>
<TerminalId>0880265</TerminalId>
<ResultCode>10048</ResultCode>
<Status>1038</Status>
<AshStatus>313</AshStatus>
<XField>1234567890</XField>
<RequestId>20170201141951</RequestId>
</EMV_Output>


Document Version 1.53   Caspit SmartRetail Solution
## 59

- A regular transaction with points benefit
<Request>
<Command>001</Command>
<TerminalId>0880265</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>1</TranType>
<Amount>3000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<AuthorizationCodeManpik>1</AuthorizationCodeManpik>
<Currency>376</Currency>
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<IpayAmount>2000</IpayAmount>
<IpayNumber>10</IpayNumber>
<IpayCode>1</IpayCode>
<RequestId>20170201141951</RequestId>
</Request>

The response receipt text will include the following text:
<Line name="Benefit">             :סכום נטו</Line>
<Line name="Benefit">                 10.00</Line>
<Line name="Benefit">      :סכום  הנחה  בקניה </Line>
<Line name="Benefit">                 20.00</Line>
<Line name="Benefit">     :מספר  יחידות  הטבה</Line>
<Line name="Benefit">                    10</Line>

- A regular transaction with a discount benefit  (discount by amount)
<Request>
<Command>001</Command>
<TerminalId>0880265</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>1</TranType>
<Amount>4000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<AuthorizationCodeManpik>1</AuthorizationCodeManpik>
<Currency>376</Currency>
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<IpayAmount>2000</IpayAmount>
<IpayNumber>0</IpayNumber>
<IpayCode>0</IpayCode>
<RequestId>20170201141951</RequestId>
</Request>

The response XML receipt text will include the following lines:
<Line name="Benefit">             :סכום נטו</Line>
<Line name="Benefit">                 20.00</Line>
<Line name="Benefit">      :סכום הנחה בקניה </Line>

Document Version 1.53   Caspit SmartRetail Solution
## 60

<Line name="Benefit">                 20.00</Line>
<Line name="Benefit">      :אחוז הנחה בהטבה</Line>
<Line name="Benefit">                 50.00</Line>
- A regular transaction with a discount benefit  (discount by percent)
<Request>
<Command>001</Command>
<TerminalId>0880265</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>1</TranType>
<Amount>5000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<AuthorizationCodeManpik>1</AuthorizationCodeManpik>
<Currency>376</Currency>
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<IpayPercent>30</IpayPercent>
<IpayNumber>0</IpayNumber>
<IpayCode>0</IpayCode>
<RequestId>20170201141951</RequestId>
</Request>

The response XML receipt text will include the following text:
<Line name="Benefit">             :סכום נטו</Line>
<Line name="Benefit">                 49.85</Line>
<Line name="Benefit">      :סכום הנחה בקניה </Line>
<Line name="Benefit">                  0.15</Line>
<Line name="Benefit">      :אחוז הנחה בהטבה</Line>
<Line name="Benefit">                  0.30</Line>

- Cancel J5 – Cancel Pre authorization (ביטול בקשה לאישור ללא עסקה)
If you want to cancel a J5, you need to:
## Send Mti 420
Send the original amount in tag <OriginalAmount>
Send the original Uid in tag <OriginalUid>
Send value 7 in tag <OriginalAuthorizationCodeManpik>

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>420</Mti>
<OriginalAmount>
10000</OriginalAmount>
<OriginalUid>23458934759823579387</OriginalUid>
<OriginalAuthorizationCodeManpik>7</OriginalAuthorizationCodeManpik>
<Xfield>20398049823</Xfield>
<ParameterJ>5</ParameterJ>
</Request>


Document Version 1.53   Caspit SmartRetail Solution
## 61

- Complete J5 – Complete Pre authorization (עסקת השלמה לבקשת אישור ללא עסקה)
If you want to complete the transactions that was preauthorized, you need to:
## Send Mti 100
Send the original amount in tag <OriginalAmount>
Send the original Uid in tag <OriginalUid>
Send value 7 in tag <OriginalAuthorizationCodeManpik>
Send <ParameterJ>49</ParameterJ>

## Example:

<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<OriginalAmount>
10000</OriginalAmount>
<OriginalUid>23458934759823579387</OriginalUid>
<OriginalAuthorizationCodeManpik>7</OriginalAuthorizationCodeManpik>
<Xfield>20398049823</Xfield>
<ParameterJ>49</ParameterJ>
</Request>


Document Version 1.53   Caspit SmartRetail Solution
## 62

9.3 The Response XML (INT_OT)
The following XML shows all the possible XML tags that may appear in the response XML. However, in most transactions, only part
of the XML tags will appear in the response. Only the relevant XML tags.
On a successful transaction, the response XML will include also the full receipt text. The two parts of the receipt will be in the XML
– the part that belong to the merchant and the second part that is supposed to be handed to the customer. The ECR may use that
receipt text to print the receipt, or the ECR may choose to ignore the receipt text and to design and print its own style of receipt.
Although the receipt of the merchant and the receipt of the customer are very similar, they still may have small differences  and so
we decided to give the full text of them both in tag groups <ReceiptMerchant> and <ReceiptCustomer>.
See section 9.4 for the structure of the receipt XML parts.
<?xml version="1.0"?>
<EMV_Output>
<Command></Command>
<RequestId>230492039</RequestId>
<TerminalId></TerminalId>
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<Mti>100</Mti>
<Pan>1234567890123456</Pan>
<PanEntryMode>40</PanEntryMode>
<CardName></
מסטרקרד זהבCardName>
<Manpik>01</Manpik>
<Brand>01</Brand>
<Solek>01</Solek>
<CardType>111</CardType>
<SpType>DEFAULT</SpType>
<Amount>000000001234</Amount>
<TranType>01</TranType>
<CreditTerms>1</CreditTerms>
<Currency>376</Currency>
<CurrencyName/>
<FileNo>17</FileNo>
<TermNo>001</TermNo>
<TermSeq>001</TermSeq>
<TerminalName>test emv 700</TerminalName>
<Retailer>0880700014</Retailer>
<ComRetailerNum>0071506</ComRetailerNum>
<HostVersion>ABS10</HostVersion>
<DateTime>0420102003</DateTime>
<ResponseId/>
<ResponseCvv2>0</ResponseCvv2>
<ResponseAvs>0</ResponseAvs>
<AuthManpikNo>0000541</AuthManpikNo>
<AuthCodeManpik>1</AuthCodeManpik>
<AuthSolekNo/>
<AuthCodeSolek>0</AuthCodeSolek>
<FirstPayment/>
<NotFirstPayment/>
<NoPayment><NoPayment/>

Document Version 1.53   Caspit SmartRetail Solution
## 63

<Uid>15042010200308807003502</Uid>
<Rrn>511010000541</Rrn>
<TelAuthAbility/>
<TelNoCom/>
<Tip/>
<IpayAmount/>
<IpayNumber/>
<IpayPercent/>
<Cashback/>
## <TVR>0080008000</TVR>
<AddendumSettl/>
<IndxPayment>0</IndxPayment>
<Authorizedamount/>
<Addendum1/>
<Addendum2/>
<ParameterJ>0</ParameterJ>
<AddDspBalance/>
<DspBalance/>
<ZData/>
<Track2/>
<Atc/>
<CardSeqNumber/>
## <AID>A0000000031010</AID>
## <TSI/>
## <ARC/>
<VerifiedByPIN>0</VerifiedByPIN>
<AppVersion>ABS000089w</AppVersion>
<Xfield>39439849</Xfield>
<CaspitInternalError>0</CaspitInternalError>
<PinpadStep></PinpadStep>
<Token></Token>
<SwitchStatus></SwitchStatus>
<CardInside></CardInside>
<Field55></Field55>
<ExtraInfo></ExtraInfo>
<CardHash></CardHash>
<PossibleCreditTerms>
<OfflineSupport>1</OfflineSupport>
<OnlineReason>decode</OnlineReason>
<OfflineAmount>300</OfflineAmount>
<J5Support>1</J5Support>
<SlipLang>
<ReceiptMerchant>
<Line> Text </Line>
## ...
## ...
</ReceiptMerchant>

<ReceiptCustomer>
<Line> Text </Line>
## ...
## ...
</ReceiptCustomer>
</EMV_Output>


Document Version 1.53   Caspit SmartRetail Solution
## 64

Understanding the status of the transaction

There are 3 "status" tags that might come back in the response XML. They are:
- <ResultCode>
- <Status>
- <AshStatus>

<Status> and <AshStatus> will have values as specified in Shva mefizim-EMV document (see Appendix 1 of mefizim-EMV
document). <Status> and <AshStatus> will always "go" together. They will both be zero or both be non-zero.
As explained in Shva document, the <Status> value is a simplification of the <AshStatus> value.
In the SmartRetail solution we decided to give both <Status> and <AshStatus>

- The <Status> codes can be seen also in Appendix H in this document.
- The <AshStatus> codes can be seen also in Appendix I in this document.
- <ResultCode> will have status codes that belong to Caspit. See Appendix A.  We tried to stick to Shva statuses, but
because SmartRetail has much more features than Shva Ashrait PC, we had to add the <ResultCode> tag that will hold
error codes that are special for Caspit.

A successful (approved) transaction is identified by a response XML in which all 3 "status" tags are zeros. Like that:

<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>

In case of error, you should first look at <AshStatus>. If <AshStatus> is not zero then you can look at Appendix I and get the
description of the error.
If <AshStatus> and <Status> are zero then you need to look at <ResultCode> and consider that error code.

Actually, there is a fourth tag, named <CaspitInternalError> that will hold the internal error code of Caspit. This value can be used
by Caspit support to identify problems in the field.

This complexity of status tags exists only in the Transaction response. All other commands of SmartRetail (like STATIS request,
communication test, Pinpad configuration, etc) have only the <ResultCode> tag.

## Example

For example, if the credit company declined the transaction then the following tags will be in the response:

<Status>1038</Status>
<AshStatus>4</AshStatus>
<ResultCode>10048</ResultCode>  (RETVAL_CHECK_OTHER_STATUSES)
<CaspitInternalError>1403</CaspitInternalError>

The ECR must check first the <AshStatus> tag, the value is 4 and according to Shva mefizim EMV document the meaning of
AshStatus 4 is that the transaction has been declined.

When the ECR keeps the transaction response, I recommend that it keeps all these "status" tags in its database, it can be used for
future inquires.

Document Version 1.53   Caspit SmartRetail Solution
## 65




Table of tags in transaction response XML (INT_OT)
Tag name Description Matching TLV tag
(Caspit Internal)
<EMV_Output>
## Command
## פקודה
## Command
Should be the same as in the request
## 001
RequestId
## בקשה.מזהה
## כמו בבקשה.  אמור לחזור עם אותו ערך
Should be the same as in the request
## 051
TerminalId
## מספר מסוף
## Terminal Id
Should be the same as in the request
## 006

Document Version 1.53   Caspit SmartRetail Solution
## 66

Tag name Description Matching TLV tag
(Caspit Internal)
ResultCode Relevant result codes:
## 0 – Success
## 10003 – RETVAL_INCORRECT_TERMINAL_ID
## 10022 – RETVAL_INCORRECT_ECR_NUMBER
## 10036 – RETVAL_XML_MISSING_TERMINAL_ID_TAG
## 10041 – RETVAL_ERROR_CONNECTING_TO_PINPAD
## 10042 – RETVAL_XML_MISSING_REQUEST_ID_TAG
## 10043 – RETVAL_CASPIT_WINDOWS_SERVICE_NOT_RESPONDING
## 10044 – RETVAL_USER_ABORTED_TRANSACTION
## 10048 – RETVAL_CHECK_OTHER_STATUSES
## 10050 – RETVAL_DOUBLE_TRANSACTION
## 10053 – RETVAL_PINPAD_RETURNED_EMPTY_RESPONSE
## 10054 – RETVAL_ASHRAIT_INVALID_SETUP
## 10100 – RETVAL_INVALID_PAN_ENTRY_MODE
## 10101 – RETVAL_INVALID_MTI
## 10102 – RETVAL_INVALID_X_FIELD

Other result codes may arrive; see Appendix A for a full list of result
codes

## Status
## סטטוס.
## ראה נספח Hבמסמך זה  לתיאור הסטטוסים האפשריים
Status of transaction
See appendix H for all possible values
## 159
AshStatus
## קודי פירוט שגיאה.
## קוד פירוט על הודעות השגיאה בשדה Status .
## ראה נספח Iבמסמך זה לתיאור הסטטוסים האפשריים
Another status for transaction
See appendix I for all possible values
## 160

Document Version 1.53   Caspit SmartRetail Solution
## 67

Tag name Description Matching TLV tag
(Caspit Internal)
## Mti
## קוד המסר:
## 100 עסקה רגילה –
## 400עסקת ביטול –
## 420ביטול בקשה לאישור ללא עסקה (ביטול  – J5 .)
100 – Regular transation
400 – Void transaction
420 – Void Pre authorized transaction (void J5)
## 087
## Pan
## ממוסך. מספר כרטיס אשראי. אפסים מובילים.
Card number. With leading zeros. Masked.
## 162
PanEntryMode
## מקור נתוני הכרטיס.
Pan Entry mode

00  –  מגנטי  (Magnetic)
04  – Contactless MSR
05  – Contactless EMV
06  – Mobile Contactless MSR
07  – Mobile Contactless EMV
10  –  ( מספר טלפון ניידCellphone number )
40  –  EMV contact
50  ( טלפונית –Card not present )
51  –  ( חתימה בלבדSignature)
52  ( אינטרנט –Internet )
80  – fallback
81  –  Empty candidate list
## 138
CardName
## שם כרטיס
Card name
## 163

Document Version 1.53   Caspit SmartRetail Solution
## 68

Tag name Description Matching TLV tag
(Caspit Internal)
## Manpik
## מנפיק
## ערכים אפשריים:
## 00  –   תייר
## 01   ישראכרט –
## 02   כ.א.ל –
## 06  –  מקס
## Issuer
## 00 – Tourist
## 01 – Isracard
## 02 – CAL
## 06 – MAX
## 165

Document Version 1.53   Caspit SmartRetail Solution
## 69

Tag name Description Matching TLV tag
(Caspit Internal)
## Brand
## מותג .
## ערכים אפשריים:
## 0כרטיס פרטי של חברה מנפיקה ( – PL)
## 1 מסטרכרד -
## 2 ויזה  –
## 3 דיינרס  –
## 4 אמקס  –
## 5 מותג ישראכרט  –
## 6 – JCB
7 –Discover
## 8מאסטרו –
## Brand
0 – Private label of issuer
## 1 - Mastercard
## 2 – Visa
## 3 – Diners
## 4 – Amex
## 5 – Isracard
## 6 – JCB
## 7 – Discover
## 8 - Maestro
## 166
## Solek
## סולק
## מספר החברה הסולקת את העסקה
## 1 ישראכרט -
## 2 כ.א.ל  –
## 6מקס  –
## Acquirer
## 1 - Isracard
## 2 – CAL
## 3 – MAX
## 167

Document Version 1.53   Caspit SmartRetail Solution
## 70

Tag name Description Matching TLV tag
(Caspit Internal)
CardType
## סוג כרטיס
## Card Type
## 168
SpType
## סוג כרטיס מיוחד
## 00   ברירת מחדל  –
## 01   כרטיס חיוב מיידי –
## 70  –   מועדון
## 03   כרטיס דלק –
## 04   כרטיס דואלי  –
## 74   דואלי מועדון  –
## 73   דלק מועדון –
## 76  –   מועדון נטען
## 06   נטען –
## 08   דלקן –
## 99   כרטיס תייר–
Special card type
## 00 – Default
## 01 – Immediate
## 70 – Club
03 – Petrol card
04 – Dual card
74 – Dual club
75 – Petrol club
76 – Clube chrageable
## 06 – Chrageable
## 08 – Petrol
99 – Tourist card
## 169
## Amount
## באגורותסכום
Amount in cents (agorot)
## 146

Document Version 1.53   Caspit SmartRetail Solution
## 71

Tag name Description Matching TLV tag
(Caspit Internal)
TranType
## סוג עסקה
## 01   עסקת חיוב –
## 02   עסקת פריקה  –
## 03   עסקת חיוב מאולצת  –
## 06  עסקת   –cashback
## 07   עסקת מזומן  –
## 11   עסקה עם הוראות קבע  –
## 30   בירור יתרה  –
## 53   עסקת זיכוי –
## 55  עסקת טעינה  –
Transaction type
## 01 – Debit
## 02 – Discharge
## 03 – Forced
## 06 – Cashback
## 07 – Cash
## 11 – Recurring
30 – Get balance
## 53 – Refund
## 55 - Topup
## 140

Document Version 1.53   Caspit SmartRetail Solution
## 72

Tag name Description Matching TLV tag
(Caspit Internal)
CreditTerms
## סוג אשראי
## 1 אשראי רגיל –
## 2ישראקרדיט/אמקסקרדיט/עדיף/ – 30+
## 3 חיוב מיידי –
## 6 קרדיט  –
## 8תשלומים  –
## Credit Terms
## 1 - Regular
2 – Isracredit/AmexCredit/Adif/30+
## 3 – Immediate
## 6 – Credit
## 8 – Installments
## 139
## Currency
## קוד מטבע
## קוד נומרי בהתאם לטבלת קודי מטבע ISO8583 .
## קודים שכיחים:
## 376 – שקל
## 840 דולר  –
## 978יורו  –
Currency code according to ISO8583
## 376 – NIS
## 840 – USD
## 978 - EUR
## 148
CurrencyName
## שם קוד מטבע  ISO
## 170
FileNo
## הפינפד.המנוהל ע"י העסקאות מספר קובץ
## מספר הקובץ גדל באחד בכל פעם שמשדרים עסקאות לשב"א.
## מספר הקובץ נע מ1עד   99. לאחר מכן הוא חוזר ל1 .
## במסוף חדש מספר הקובץ מתחיל ב1 .
The file number of the transactions batch.
The file number increases at the end of each day
The valid file numbers are from 1 to 99 in cyclic method.
A new terminal starts with file number 1.
## 016

Document Version 1.53   Caspit SmartRetail Solution
## 73

Tag name Description Matching TLV tag
(Caspit Internal)
TermNo
## עמדה\תחנה\מספר קופה .
## ברירת המחדל היא 001 .
## ניתן לשנות את מספר הקופה בתפריט הפינפד.
Should be the same as in the request
## 040
TermSeq
## העסקאות. קובץשל העסקה בתוך מספר סודר
Transaction sequence inside the transactions batch
## 171
TerminalName
## כפי שהתקבל בפרמטרים משב"א  שם המסוף
The terminal name as received from the main switch
## 172
## Retailer
## ארוך.  מספר מסוף
## משמש להזדהות המסוף מול המחשב המרכזי
## מספר המסוף הארוך הוא באורך של 10ספרות.
The long terminal Id.
## 173
ComRetailerNum
## מספר ספק בחברה הסולקת
Business number
## 174
HostVersion
## מספר גירסה של המחשב בשב"א
## 175
DateTime
## תאריך וזמן
## זמן העיסקה בפורמט MMDDHHMMSS
Date/time of the transaction in MMDDHHMMSS format
## 176
ResponseId
## תשובה לבדיקה ת"ז
## 0 לא הוכנס –
## 1 הוכנס ותקין –
## 2 לא תקין  –
## 3נבדקלא  –
The response for ID check
0 – Not entered
## 1 - Valid
## 2 – Invalid
## 3 – Not Checked
## 177

Document Version 1.53   Caspit SmartRetail Solution
## 74

Tag name Description Matching TLV tag
(Caspit Internal)
ResponseCvv2
## תשובה לבדיקת CVV2
## 0 לא הוכנס –
## 1 הוכנס ותקין –
## 2 לא תקין  –
## 3לא נבדק –
The response for CVV2 check
0 – Not entered
## 1 - Valid
## 2 – Invalid
3 – Not checked
## 178
ResponseAvs
## תשובה לבדיקת כתובת
## 0   לא הוכנס  –
## 1 הוכנס ותקין –
## 2 לא תקין  –
## 3לא נבדק –
This field is irrelevant currently.
## 180
AuthManpikNo
## מספר אישור מנפיק
Issuer authorization number
## 181

Document Version 1.53   Caspit SmartRetail Solution
## 75

Tag name Description Matching TLV tag
(Caspit Internal)
AuthCodeManpik
## הגורם שסיפק תשובה כמנפיק
## 0 עסקה ללא מספר אישור מנפיק –
## 1 אושר ע"י המנפיק –
## 2 דחייה ע"י המנפיק  –
## 3אושר ע"י שב"א בשירות  – STIP
## 4דחייה ע"י שב"א בשירות  – STIP
## 5 אושר ע"י המענה הקולי –
## 6 דחייה ע"י המענה הקולי –
7אישור  – offline ע"י כרטיס חכם
## 8לא ניתן לבצע התקשרות –אושר ע"י כרטיס חכם  –
The source for the issuer authorization
0 – A transaction without authorization number
1 – Authorized by issuer
2 – Declined by issuer
3 – Authorized by Shva
4 – Declined by Shva
5 – Authorized by voice
6 – Declined by voice
7 – Authorized Offline by chip
8 – Authorized by chip – not communication possible
## 143
AuthSolekNo
## מספר אישור סולק
## השדה יועבר כשהוא מיושר לימין
Authorization number from acquirer
## 182

Document Version 1.53   Caspit SmartRetail Solution
## 76

Tag name Description Matching TLV tag
(Caspit Internal)
AuthCodeSolek
## הגורם שסיפק תשובה כסולק
## 0   עסקה ללא מספר אישור סולק –
## 1 אישור ע"י הסולק  –
## 2 דחייה ע"י הסולק –
## 3אישור ע"י שב"א בשירות  – STIP לסולק
## 4דחייה ע"י שב"א בשירות  – STIP לסולק
## 5 אושר ע"י המענה הקולי –
## 6 דחייה ע"י מענה קולי –
## 7אושר ע"י החברה הסולקת באמצעות בקשה לאישור ללא עסקה –
The source for the acquirer authorization
0 – The transaction has no authorization number from acquirer
1 – Authorized by acquirer
2 – Declined by acquirer
3 – Authorized by Shva
4 – Declined by Shva
5 – Authorized by voice
6 – Declined by voice
7 – Atuhorized by acquirer for pre authorization
## 142
FirstPayment
## נקודה עשרוניתסכום תשלום ראשון במאיות, אפסים מובילים, ללא
First installment amount. With leading zeros. Without decimal point.
## 123
NotFirstPayment
## סכום  תשלום  קבוע  בעסקת  תשלומים,  במאיות,  אפסים מובילים, ללא
## נקודה עשרונית

Not first installment. With leading zeros.  Without decimal point.
## 124
NoPayment
## מספר תשלומים בעסקת תשלומים, ללא תשלום ראשון.
## ערכים: 0 -999
Number of installments. Excluding the first installment.
Value can be 0 - 999
## 126

Document Version 1.53   Caspit SmartRetail Solution
## 77

Tag name Description Matching TLV tag
(Caspit Internal)
## Uid
## מזהה עסקה.
## המספר ילווה את העסקה בכל מחזור חייה.
הUidהוא מספר בן  23ספרות. המורכב מהשדות הבאים:
## YYMMDDHHMMSSTTTTTTTRRRC
## :  חותמת זמןYYMMDDHHMMSS
## מספר מסוף: TTTTTTT
## קופהמספר  :RRR
## ספרת ביקורת: C
## Unique Id.
The Uid is a 23 digits number.
## YYMMDDHHMMSSTTTTTTTRRRC
Time stamp:  YYMMDDHHMMSS
Terminal Id: TTTTTTT
ECR number: RRR
## Checksum: C
## 183
## Rrn
## המאשרת.  מזהה עסקה מהחברה
## מזהה עסקה ייחודי שמוקצה ע"י החברה המאשרת את הבקשה.
Transaction Id from the body that authorized the transaction
## 155
TelNoCom
## מספר טלפון של החברה הסולקת.
Phone number of the acquirer
## 184
TelAuthAbility
## אינדיקציה האם ניתן להקליד מספר אישור מראש לעסקה מסוג זה
## 0 לא ניתן להקליד מספר אישור מראש.  –
## 1ניתן להקליד מספר אישור מראש.  –
The field is irrelevant currently.

## Tip
## תשר במאיות, אפסים מובילים, ללא נקודה עשרונית
The field is irrelevant currently.
## 093
IpayAmount
## סכום הנחה בהטבות במאיות, ללא נקודה עשרונית
Benefit amount
## 095
IpayNumber
## מספר יחידות בהטבה
Benefit units
## 096

Document Version 1.53   Caspit SmartRetail Solution
## 78

Tag name Description Matching TLV tag
(Caspit Internal)
IpayPercent
## אחוז  הנחה  בהטבה.  השדה  יועבר  במאיות,  ללא  נקוד  עשרונית,  עם
## אפסים מובילים.
## לדוגמא: 1.54% יועבר כ 0154.
Benefit percent
## 097
CashBack
סכום  המזומן  בעסקת  cashback  במאיות,  אפסים  מובילים, ללא  נקודה
## עשרונית

The   amount  for   Cashback   transaction.   With   leading  zeros.   Without
decimal point.

## 092
## TVR
## תוצאת בדיקות המסוף
EMV field – Terminal Verification results
## 186
AddendumSettl
## שדה להוספת נתונים ברשומת העסקה
Additional information that may return in the response. The content may
be specific for each customer.


IndxPayment
## הצמדה לדולר/מדד.
## שימוש בעסקאות תשלומים או קרדיט
## 125
AuthorizedAmount
## סכום עסקה מאושר בתשובה לבקשה לאישור
The field is irrelevant currently.

## Addendum1
## שדה  להוספת  טקסט  חופשי  בין  המסוף  לחברה  המקבלת  ובתשובה
## למסוף

Free text field

## Addendum2
## שדה  להוספת  טקסט  חופשיי  בין  המסוף  לחברה  המקבלת  ובתשובה
## למסוף
Free text field

ParameterJ Same as in the request 150

Document Version 1.53   Caspit SmartRetail Solution
## 79

Tag name Description Matching TLV tag
(Caspit Internal)
AddDspBalance
## הוראות תצוגה לכרטיס נטען.
## הנחיות  לטיפול  בהודעה  הנשלחת  מהחברה  שמחזירה  את  היתרה
## בתשובה לבקשה לאישור בשדה
DspBalance .
## יכיל אחד מהערכים הבאים:
1יש להקרין את המסר המופיע בשדה  – DspBalance ולהדפיסו בפתקית
2הקרנה בלבד של המסר המופיע בשדה  – DspBalance
3הדפסה על הפתקית של המסר המופיע בשדה  – DspBalance
Display instructions for gift card
1 – Display the DspBalance message and print it on the receipt
2 – Only display the DspBalance message
3 – Only print the DspBalance message
## 187
DspBalance
## שדה  להוספת  טקסט  חופשי  המכיל  יתרה  בתשובה  מחברת  האשראי
## .למסוף (אפשרי לכל סוגי העסקאות)
## שימו לב שהשדה יכיל טקסט בסגנון של:
## "יתרת הכרטיס היא: 230.40"
## בתשובה משב"א. הטקסט לא קבוע.ככה הטקסט מגיע
## אם הקופה צריכה רק את הסכום, אז הקופה תצטרך לפרסר את הטקסט
## ולהוציא מתוכו את הסכום.
A message from credit company about the balance of the giftcard
## 188
ZData
## ערך שדה כמו Zבאשראית  96
## Field Z

## Track2
## בעסקאות בהן הכרטיס נוכחמידע הנקרא מהכרטיס  .
## המידע יהיה ממוסך.
## Masked Track2
## 065
Atc EMV tag - Application Transaction Counter 189
CardSeqNumber EMV tag - Card Sequence Number (CSN) 121
## AID
## זיהוי יישום בשבב
## -בעסקה חכמה יודפס בHEX
EMV tag – Application Id
## 199
## TSI
## תג 9Bבשדה  55בלבד. בעסקה חכמה .
EMV tag – Transaction Status Information
## 200

Document Version 1.53   Caspit SmartRetail Solution
## 80

Tag name Description Matching TLV tag
(Caspit Internal)
## ARC
## תג A8בשדה  55בלבד. בעסקה חכמה  .
EMV tag – Application Response Code
## 201
VerifiedByPIN
## ערך 1או  0 . ניתן לשימוש עבור הדפסת פתקית
## 1  –  –חכמה בה נבדק קוד סודי  מאושרת  עסקה    על פי מפרטי  PP  סעיף
## 3.7.6
יש להדפיס משפט "Verified by PIN "   בתחתית של קבלה
0אין להדפיס  – “Verified by PIN”
Instruction about printing "Verified by PIN" on the receipt
1 –  The  PIN  was  verified.  You  need  to  print  "Verified  by  PIN"  on  the
receipt.
0 – The PIN was not verified. Don't print "Verified by PIN"
## 202
AppVersion
## גרסת התוכנה כפי שיש להדפיס על הקבלה
Application version of the Ashrait EMV
## 210
## Xfield
## מספר  השובר  (או  מספר  החשבונית)  של  הקופה.  זהה  לשדה  X
## מאשראית  96 .
This is the ECR voucher number (or ECR invoice number).
This value should be the same as in the request
## 212
The X value will
eventually be put
in ISO field 126 B2
CaspitInternalError
## קוד שגיאה פנימי של כספיט.
Internal error code of Caspit
## 022
PinpadStep The last step (state) of the Pinpad.
See Appendix J for a list of steps.
The ECR can  use  this  information  to  know  better where  the  transaction
failed (if it failed).

## 217
Token Switch Support – Relevant only when using a Switch
The Switch may return a token that the ECR will keep.
Tokens will not always be supported, so this tag may be empty or will
not exist at all.

## 218

Document Version 1.53   Caspit SmartRetail Solution
## 81

Tag name Description Matching TLV tag
(Caspit Internal)
SwitchStatus Switch Support – Relevant only when using a Switch
This tag gives extra information about the transaction record with regard
to the Switch. This tag DOES NOT say anything about the success or
failure of the transaction.
Possible values:
0 – Everything is OK. Transaction record was sent to the Switch
1 – Transaction record was NOT sent to the Switch. Transaction may
have been successful, but the record was not sent to the Switch.
If the request was done with <SwitchSend>0</SwitchSend> then you will
always get this <SwitchStatus>1</SwitchStatus>.
If the request was done with <SwitchSend>1</SwitchSend> and you got
<SwitchStatus>1</SwitchStatus>, it may mean that a) transaction failed
so there was not need to send the record to the Switch or b) transaction
was successful but, for some reason, the transaction record was not sent
to the switch. If you use <SwitchSend>1</SwitchSend> in every request
then the unsent records will be sent on the following transaction (or you
may use Generic command with sub command 012 to send the records).

Do not use the <SwitchStatus> tag as an indicator to the status (success
or failure) of the transaction. The status of the transaction must be
derived as explained in the beginning of this chapter. The <SwitchStatus>
tag just give some extra information with regard to the Switch.

## 219
CardInside 0 – No card inside
1 – Card inside contact reader
This   is   an   important   issue.   With   EMV,   it   is   very   common   for   the
cardholder  to  forget  his  card  inside  the  Pinpad.  The  ECR  should  always
check if the card is still inside and alert the merchant about it.

## 220
Field55 EMV field 55.
A field with many EMV related information about the transaction


Document Version 1.53   Caspit SmartRetail Solution
## 82

Tag name Description Matching TLV tag
(Caspit Internal)
ExtraInfo Extra information about the transaction.
For example, for LifeStyle support, this field will contain the following
string:
LifeStyleCheck=X
Where X can be:
## 0 – Undetermined
1 – LifeStyle Single
2 – LifeStyle Multi

For example, the tag will look like that:
<ExtraInfo>LifeStyleCheck=1</ExtraInfo>
## 251
CardHash MD5 or Sha256 Hash result on the card number (the PAN) and PosHash. 252

Document Version 1.53   Caspit SmartRetail Solution
## 83

Tag name Description Matching TLV tag
(Caspit Internal)
PossibleCreditTerms This tag is relevant to J2 response only.
The J2 response will include all the possible credit terms that are
available to the credit card that was used. The possible credit terms are
selected by Ashrait EMV logic that takes into account the amount, credit
card issuer, acquirer, transaction types and more factors.
The ECR can then display all the possible credit terms and the cashier can
select one of the credit terms to be used in the J4 completion of the
transaction.
The format of the tag's value is like that:
<PossibleCreditTerms>
<CreditTerm Code="1" Avail="True" MinPayments="0"
MaxPayments="0"/>
<CreditTerm Code="2" Avail="False" MinPayments="0"
MaxPayments="0"/>
<CreditTerm Code="3" Avail="False" MinPayments="0"
MaxPayments="0"/>
<CreditTerm Code="6" Avail="True" MinPayments="4"
MaxPayments="20"/>
<CreditTerm Code="8" Avail="True" MinPayments="2"
MaxPayments="30"/>
</PossibleCreditTerms>
The attributes are:
"Avail" – if "True" then this credit term is available. If "False" then this
credit term is no available.
"MinPayments" – if "0" then payments are not allowed. If bigger than
zero then it is the minimum number of payments (installments) allowed.
"MaxPayments" – if "0" then payments are not allowed. If bigger than
zero then it is the maximum number of payments (installments) allowed.
The credit term codes are the valid credit terms of Ashrait EMV.
## סוג אשראי
## 1 אשראי רגיל –
## 2ישראקרדיט/אמקסקרדיט/עדיף/ – 30+
## 3 חיוב מיידי –
## 6 קרדיט  –
## 8תשלומים  –
Credit terms
## 1 - Regular
2 – Isracredit/AmexCredit/Adif/30+
## 3 – Immediate
## 6 – Credit
## 8 - Installments
## 253

Document Version 1.53   Caspit SmartRetail Solution
## 84

Tag name Description Matching TLV tag
(Caspit Internal)
PossibleCurrency This tag is relevant to J2 response only.
The J2 response will include all the possible currency for each available
credit term.
The ECR can then display all the possible currency for selected credit
term and the cashier can select one of the currency to be used in the J4
completion of the transaction.
The format of the tag's value is like that:

<PossibleCurrencyCreditTerm> Code="5" CurrencyCode1="376" Currency1="NIS"
Index1="0" CurrencyCode2="840" Currency1="USD" Index1="1"
</PossibleCurrencyCreditTerm>
<PossibleCurrencyCreditTerm> Code="2" Code1="376" Currency1="NIS" Index1="0"
Currency2="USD" </PossibleCurrencyCreditTerm>
## 259
SlipLang The language of the slip

"iw_IL" – Hebrew
"en_US" - English
## 255
ReceiptMerchant
## קבוצת  XML  זאת תכיל את כל שורות הקבלה. קבלה אשר מיועדת לבית
## העסק.
## לפרטים. סעיף הבאראו
This XML group will contain all the lines of the merchant receipt
## N/A
ReceiptCustomer
## קבוצת  XML  זאת  תכיל  את  כל  שורות  הקבלה.  קבלה  אשר  מיועדת
## ללקוח.
## לפרטים סעיף הבאראו
This XML group will contain all the lines of the customer receipt
## N/A
DCC Is DCC transaction done
ConversionAmount The DCC offered/foreign amount. Foreign Amount from Acquirer/DCC
provider
## 101
ConversionRate The DCC offer exchange rate.  102
ConversionCurrency CHC offered by  Acquirer/DCC provider 103
OfferValidity The DCC offer validity in hours 262
MarginRate The DCC margin rate 263
CurrencyAlphaCode The DCC currency alpha code 264
ExchangeRateTime The DCC exchange rate time stamp 265
ConversionProvider The DCC conversion provider 266

Document Version 1.53   Caspit SmartRetail Solution
## 85

Tag name Description Matching TLV tag
(Caspit Internal)
Commission The DCC commission 267
DeferMonths Delayed payment in months 153
DueDate The date YYMMDD of customer charge. 154
ReceiptPrint
## תג באורך 2ספרות  XY , המציין האם נדרש להדפיס פיתקית .
## X  האם נדרש להדפיס פיתקית בית העסק –
## Y-  האם נדרש להדפיס פיתקית לקוח
## אם הערך 1אזי להדפיס . אם הערך  0 אזי לא להדפיס

OfflineSupport
Dose shva parameters enable offline transaction for the card
OnlineReason
Why offline transaction not supported for the card
OfflineAmount
shva parameters offline amount for the card
J5Support
Dose shva parameters enable J5/J59 transaction for the card

9.4 Receipt XML structure
- The structure
The  structure  of  the  XML  is  very  simple.  We  have  only  one  tag  <Line>,  which  will  be  used  for  each  line  of  the  receipt.  In  some
lines, we will add the "name" attribute with a value that will make the line more meaningful. The same attribute value can exist in
more than one line.

XML template with the "name" attribute:
<ReceiptMerchant>
<Line name="value">     Text of line   </Line>
<Line name="value">     Text of line </Line>
</ReceiptMerchant>
<ReceiptCustomer>
Same structure as ReceiptMerchant
</ReceiptCustomer>
The Hebrew characters will be encoded with ISO8859-8.

- Possible values for the "name" attribute
## Value Hebrew Meaning English Meaning
## Merchant
## שם בית העסק
The name of the merchant

Document Version 1.53   Caspit SmartRetail Solution
## 86

## Value Hebrew Meaning English Meaning
TerminalId
## מספר מסוף
## Terminal Id
SWVersion
## מספר גרסת תוכנה בשב"א
Software version
BusinessNumber
## מספר ספק בחברת אשראי
Business number
TranDateTime
## זמן ביצוע העסקה
Transaction date and time
PrintDateTime
## זמן הדפסת הקבלה
Print date and time
CardName
## שם כרטיס
Card name
CardNumber
## מספר כרטיס
Card number (PAN)
## Voucher
## מספר שובר
Transaction voucher
TranType
## סוג עסקה
Tran type
AuthNumber
## מספר אישור
Authorization number (if exists)
PanEntryMode
## אופן ביצוע
Pan entry mode
CreditTerms
## תנאי אשראי
Credit terms
## Amount
## סכום
## Amount
## Currency
## מטבע
## Currency
## Uid
## מזהה עסקה
## Uid
## EMV
## נתוני EMV
Some EMV details
## Aid
## מזהה אפליקציה על כרטיס חכם
## Chip Application Id
## RRN
## מספר עסקה אצל הסולק
Acquirer transaction number
## Verified
## ההודעה שהעסקה אומתה ע"י קוד סודי
"Verified by PIN" message
## Signature
## מקום לחתימת הלקוח
Signature placeholder
## Phone
## מקום לרישום הטלפון
Phone number placeholder
## Payments
## נתוני עסקת תשלומים
Details about installments
## Balance
## (לכרטיס גיפטקארד) נתוני יתרת הכרטיס
Details about card balance
## Copy
## ההודעה על העתק ללקוח
A message that this is a another copy of the
receipt

## Goodbye
## הודעת תודה ללקוח
A thank you message to the customer
## Empty
## שורה ריקה
An empty line
PreAuth
## הודעה של אישור מוקדם
A message that this transaction is a pre
authorization transasction

## Benefit
## נתוני הטבה
Details about benefits

- Example with the "name" attribute
The merchant receipt: the receipt that must be kept by the merchant. It may contain the full PAN (card number) or just the last 4
digits of the PAN (it depends on a parameter).

Document Version 1.53   Caspit SmartRetail Solution
## 87

<ReceiptMerchant>
<Line name="Merchant">המכולת של שמוליק</Line>
<Line name="Empty"></Line>
<Line name="TerminalId">מס. כספיט: 0880023</Line>
<Line name="SWVersion">CST000078T תוכנה:</Line>
<Line name="BusinessNumber">מספר עסק: 0300012</Line>
<Line name="Empty"></Line>
<Line name="DateTime">11/12/16  10:16</Line>
<Line name="Empty"></Line>
<Line name="CardName">ויזה רגיל</Line>
<Line name="CardNumber"> Card number </Line> (Full PAN or partial PAN. Depends on a parameter).
<Line name="Voucher">מס' שובר:  31001001</Line>
<Line name="TranType">עסקה: חובה</Line>
<Line name="AuthNumber">0778164  חברה</Line>
<Line name="PanEntryMode">ביצוע: חכם</Line>
<Line name="CreditTerms">אשראי: רגיל</Line>
<Line name="Amount">סכום עיסקה:</Line>
<Line name="Amount"> 1.00ש"ח  </Line>
<Line name="Currency">מטבע: ש"ח</Line>
<Line name="Uid">UID:16121110162408800236240</Line>
<Line name="Aid">AID:A00000000031010</Line>
<Line name="RRN">RRN:502211772</Line>
<Line name="EMV">ATC:0033, CSN:01, TSI:F800, ARC:3030</Line>
<Line name="EMV">TVR:0080001000</Line>
<Line name="Verified">Verified by PIN</Line>
<Line name="Empty"></Line>
<Line name="Signature">________________חתימה</Line>
<Line name="Empty"></Line>
<Line name="Phone">________________טלפון</Line>
</ReceiptMerchant>

Document Version 1.53   Caspit SmartRetail Solution
## 88


The customer receipt: the receipt that is given to the customer. It will contain a masked PAN (card number). Only the last 4  digits of
the PAN (the card number) will be visible.
<ReceiptCustomer>
<Line name="Merchant">המכולת של שמוליק</Line>
<Line name="Empty"></Line>
<Line name="TerminalId">מס. כספיט: 0880023</Line>
<Line name="SWVersion">CST000078T תוכנה:</Line>
<Line name="BusinessNumber">מספר עסק: 0300012</Line>
<Line name="Empty"></Line>
<Line name="DateTime">11/12/16  10:16</Line>
<Line name="Empty"></Line>
<Line name="CardName">ויזה רגיל</Line>
<Line name="CardNumber"> Last of 4 digits of card number </Line> (Partial PAN. Last 4 digits).
<Line name="Voucher">מס' שובר:  31001001</Line>
<Line name="TranType">עסקה: חובה</Line>
<Line name="AuthNumber">0778164  חברה</Line>
<Line name="PanEntryMode">ביצוע: חכם</Line>
<Line name="CreditTerms">אשראי: רגיל</Line>
<Line name="Amount">סכום עיסקה:</Line>
<Line name="Amount"> 1.00ש"ח  </Line>
<Line name="Currency">מטבע: ש"ח</Line>
<Line name="Uid">UID:16121110162408800236240</Line>
<Line name="EMV">RRN:502211772,ATC:0033, CSN:01, TSI:F800, ARC:3030</Line>
<Line name="EMV">, TVR:0080001000,AID:A00000000031010</Line>
<Line name="Verified">Verified by PIN</Line>
<Line name="Copy">*** עותק ללקוח ***</Line>
<Line name="Goodbye">תודה ולהתראות</Line>
</ReceiptCustomer>


Document Version 1.53   Caspit SmartRetail Solution
## 89

## 9.5 Smart Swipe
There are three "Swipe" features in the Pinpad, some may find it a bit confusing, and so I will summarize them here:
- The Swipe Command is described in chapter 21. It is a command that is initiated by the PC.
- The Smart Swipe is a feature that changes a transaction request into a Swipe response. It is described here.
- The Idle Swipe is a feature that allows swiping cards while the Pinpad is in idle mode. See Appendix G.
Smart Swipe can be enabled/disabled using the Pinpad configuration command (using the <EnableSmartSwipe> tag)
<Request>
<Command>013</Command> (Pinpad Configuration)
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<EnableSmartSwipe>1</EnableSmartSwipe>
<RequestId>20160216155540</RequestId>
</Request>
The purpose of Smart Swipe is that if the ECR tells the Pinpad to start a transaction, and the cardholder swiped a card that is NOT
a credit card, the Pinpad will not return an error saying that card is unknown. Instead of returning an error, the Pinpad will change
the response to that of Swipe command response.
Some  retailers  need  this  option.  They  want  to  start  a  transaction,  but then,  if  the  cardholder  swipes  his  loyalty  card  (club  card)
then  the  details  of  the  loyalty  card  will  return  to  the  ECR.  The  ECR  will  do  what  it  needs  to  do  with  the  loyalty  card  detail s,
sometimes giving a discount to the cardholder, and then the ECR will start again the transaction, possibly with a lower price due
to the discount.
The Smart  Swipe feature  helps  the  merchant.  Instead  of  supporting  two  commands  to  handle  different  cards,  the  Swipe
Command  and  the  Payment  Command,  the  merchant  will  have  to  support  only the  Payment  Command.  The  merchant  will  not
have  to  select  the  appropriate  command  according  to  the  card  in  the hand  of  the  cardholder.  Smart  Swipe  handles  all  types  of
cards, whether credit cards or non-credit cards, thus making the life of the merchant easier.
## Example
The  ECR  sends  the  following  XML,  to  perform  a  regular  transaction.  The  ECR  doesn't  care  if  the  cardholder  is  going  to  swipe  a
credit card or a non-credit card.
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
<TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>
10000</Amount>
<Currency>376</Currency>
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
</Request>

Document Version 1.53   Caspit SmartRetail Solution
## 90

If the cardholder swiped a valid credit card then the response will be the regular command 001 response.
If The cardholder swipes a loyalty card (a non credit card), the response depends on the <EnableSmartSwipe> parameter.
If Smart Swipe is disabled the response XML will be something like that (the AshStatus may be different):
<EMV_Output>
<AshStatus>12</AshStatus>  (כרטיס לא מורשה במסוף)
## ...
More tags may exist in the response
## ...
</EMV_Output>

But if Smart Swipe is enabled then the Pinpad will return the track2 of the card, like this:
<Response>
<Command>023</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>23049820984</RequestId>
<Track2>45804580458045802302983042948093</Track2>
</Response>
The ECR needs to identify the response, according to the Command (023) and parse it accordingly.

Document Version 1.53   Caspit SmartRetail Solution
## 91

- Retrieve TOTAL File
The  TOTAL  file  contains  data  about  (and  only)  the last  deposit  to  Shva.  It  is  in  XML  format,  as  described  in  Shva  Mefizim-EMV
document. It is the same XML format as in STATIS (you can see the XML format also here in chapter 10.2).
The ECR can parse the TOTAL response and then print the summary of the last deposit. Pay attention that the TOTAL file (as well
as the STATIS file) contain only a summary of the transactions. There is no detailed information about each transaction.
Instead of using the TOTAL file, you can use the Retrieve Deposit Report to get the deposit report that was created by Shva.  See
the chapter about Deposit Report.
## Switch Support
When using a Switch, the TOTAL file is irrelevant because transactions are not kept in the Pinpad and the Pinpad is not responsible
for making the deposit, therefore it is not possible to ask the Pinpad for the last deposit when working with as Switch.

10.1 TOTAL Request
<Request>
<Command>005</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216134455</RequestId>
</Request>

Caspit Internal (This part is intended for Caspit developers)
Command flow:
- When SmartRetail gets this request XML, it will:
o Delete the TOTAL.ASH file from the HOST folder (if it exists)
o Convert the XML to TLV
o Then it will send the TLV to Ashrait EMV (using IAC).
- Ashrait EMV will prepare the TOTAL.ASH file in the HOST folder and will return the control to SmartRetail. The TOTAL.ASH
file is a XML file (see Ashrait EMV spec for more details).
- SmartRetail will:
o Read the TOTAL.ASH file from the HOST folder
o Parse the first line of TOTAL.ASH and make sure that the RequestId from the first line is the same RequestId that
was sent to Ashrait EMV in TLV 051.
o Build  the  response  XML.  SmartRetail  just  needs  to  read  the  TOTAL.ASH  file  and  insert  the  file  text  into  the
response XML (discarding the first line of the file that contains the RequestId). SmartRetail doesn't need to parse
the TOTAL.ASH file. It will just concatenate it to the response XML.
- SmartRetail will return the response XML back to the PC ECR.

Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)

Document Version 1.53   Caspit SmartRetail Solution
## 92

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה.לבקשת קובץ   TOTAL, מספר הפקודה היא  005
The command number for TOTAL request is 005
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 040
RequestId
## מזהה בקשה
## Request Id
## 051
Request Closing tag of the request XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 93

10.2 /HOST/TOTAL.ASH file format (Caspit Internal)
20160215164322     (this is the first line that contains the RequestId)
<StaticObj>
<Date>2015-02-25 13:55:06</Date>
<Session-Number>4449948</Session-Number> (אסמכתא של שב"א)
<File-Number>19</File-Number> (Batch number, מספר קובץ)
<File-Open-Date>2015-02-25 00:00:00</File-Open-Date>
<All-Debit-Num-Recs>2</All-Debit-Num-Recs> (כמות עסקאות חיוב)
<All-Debit-Sums>2000</All-Debit-Sums> (סכום עסקאות חיוב)
<All-Credit-Num-Recs>0</All-Credit-Num-Recs>
<All-Credit-Sums>0</All-Credit-Sums>
<Solek-List>
<Solek id="1">   (The <Solek> element will repeat for each solek)
<Currency-Sums-List>
<Currency Code="376"> (The <Currency> element will repeat for each currency)
<Debit-Num-Recs>2</Debit-Num-Recs>
<Debit-Sums>2000</Debit-Sums>
<Credit-Num-Recs>0</Credit-Num-Recs>
<Credit-Sums>0</Credit-Sums>
</Currency>
</Currency-Sums-List>
</Solek>
</Solek-List>
</StaticObj>



Document Version 1.53   Caspit SmartRetail Solution
## 94

## 10.3 Total Response
<Response>
<Command>005</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216134455</RequestId>
<ResultCode>0</ResultCode>
(All the <StaticObj> element, until </StaticObj> is read from the TOTAL.ASH file)
<StaticObj>
<Date>2015-02-25 13:55:06</Date>
<Session-Number>4449948</Session-Number> (אסמכתא של שב"א)
<File-Number>19</File-Number>  (מספר קובץ)
<File-Open-Date>2015-02-25 00:00:00</File-Open-Date>
<All-Debit-Num-Recs>2</All-Debit-Num-Recs> (כמות כללית עסקאות חיוב)
<All-Debit-Sums>2000</All-Debit-Sums>   (סכום כללי עסקאות חיוב)
<All-Credit-Num-Recs>0</All-Credit-Num-Recs>   (כמות כללית עסקאות זיכוי)
<All-Credit-Sums>0</All-Credit-Sums> (סכום כללי עסקאות זיכוי)
<Solek-List>
<Solek id="1">   (The <Solek> element will repeat for each solek)
<Currency-Sums-List>
<Currency Code="376"> (The <Currency> element will repeat for each currency)
<Debit-Num-Recs>2</Debit-Num-Recs>
<Debit-Sums>2000</Debit-Sums>
<Credit-Num-Recs>0</Credit-Num-Recs>
<Credit-Sums>0</Credit-Sums>
</Currency>
</Currency-Sums-List>
</Solek>
</Solek-List>
</StaticObj>
</Response>

Response XML tags (the tags that are above the <StatisObj> element)

Document Version 1.53   Caspit SmartRetail Solution
## 95

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה.לבקשת קובץ   TOTAL, מספר הפקודה היא  005
Should be the same as in the request
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
ResultCode 0 – Success
10106 – No TOTAL file
See Appendix A for other result codes

## 010
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 96

- Retrieve STATIS File
The STATIS file is a XML file that contains data about all the deposits that the Pinpad did. The Pinpad will keep up to 99 deposits in
history and so the Pinpad may have up to 99 STATIS records.
## Switch Support
When using a Switch, the STATIS file is irrelevant because transactions are not kept in the Pinpad.

11.1 STATIS Request
<Request>
<Command>014</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<CurrentRecord>000</CurrentRecord>
<RequestId>20160215173042</RequestId>
</Request>

Caspit Internal – This part is intended for Caspit Developers.
Command flow:
- SmartRetail will check if <CurrentRecord> is 0 (zero). If it is zero then SmartRetail will:
o Delete STATIS.ASH file if it exists in the HOST folder
o Convert the XML to TLV
o Send the TLV to Ashrait EMV.
- Ashrait EMV  will  prepare  the  STATIS.ASH  file  in  the  HOST  folder  and will  return  to  SmartRetail. The  STATIS.ASH  file is a
XML file. See Ashrait EMV spec for more details. But you can see it also in the STATIS response down below. It is the same
XML from TOTAL request but it repeats for each deposit that the Pinpad has  data about. If the Pinpad has, for example,
73 deposits in history, then the element <StatisObj> will repeat for 73 times inside the STATIS.ASH file.
- The first line of the STATIS.ASH will contain the RequestId.
- If the <CurrentRecord> is not 0 (zero) then there is no need to speak with Ashrait EMV, because the STATIS.ASH should
already be in the HOST folder (of course we must check that it exists in the HOST folder, but I don't get into this details).
- SmartRetail will read the STATIS.ASH file from the HOST folder and will build the response XML.
- SmartRetail must compare the RequestId from the request XML with the RequestId from the first line of the STATIS.ASH
file. They must be identical.
- The response XML will contain only one <StatisObj> each time. It means that the PC ECR will need to continue requesting
for the rest of the STATIS records.
- SmartRetail will return the response XML back to the PC ECR.

Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)

Document Version 1.53   Caspit SmartRetail Solution
## 97

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה.לבקשת קובץ  STATIS, מספר הפקודה היא 014
The command for SSTATIS request is 014
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 040
CurrentRecord
## רשומת STATIS מבוקשת.
## הערכים האפשריים הם  01  –  99 .
## אבל בבקשה הראשונה צריך לשלוח ערך  00  כדי להודיע לפינפד שרוצים
## להתחיל לקבל קובץ
## STATIS
The request STATUS record.
The possible value are 01-99
But on the first request, the ECR must send 00 to tell the Pinpad that we
want to start getting the STATIS file.

## 190
RequestId The request Id must be the same during all the STATIS retrieval session. 051
Request Closing tag of the request XML N/A
11.2 STATIS Response
<Response>
<Command>014</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<CurrentRecord>01</CurrentRecord>
<NumberOfRecords>73</NumberOfRecords>
<RequestId>20160215173042</RequestId>
<ResultCode>0</ResultCode>
(All the <StaticObj> element, until </StaticObj) is read from the TOTAL.ASH file)
<StaticObj>
<Date>2015-02-25 13:55:06</Date>
<Session-Number>4449948</Session-Number>
<File-Number>19</File-Number>
<File-Open-Date>2015-02-25 00:00:00</File-Open-Date>

Document Version 1.53   Caspit SmartRetail Solution
## 98

<All-Debit-Num-Recs>2</All-Debit-Num-Recs>
<All-Debit-Sums>2000</All-Debit-Sums>
<All-Credit-Num-Recs>0</All-Credit-Num-Recs>
<All-Credit-Sums>0</All-Credit-Sums>
<Solek-List>
<Solek id="1">   (The <Solek> element will repeat for each solek)
<Currency-Sums-List>
<Currency Code="376"> (The <Currency> element will repeat for each currency)
<Debit-Num-Recs>2</Debit-Num-Recs>
<Debit-Sums>2000</Debit-Sums>
<Credit-Num-Recs>0</Credit-Num-Recs>
<Credit-Sums>0</Credit-Sums>
<Currency/>
<Currency-Sums-List/>
<Solek/>
<Solek-List/>
<StaticObj/>
</Response>

Response XML tags, above the <StatisObj> element:
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה.לבקשת קובץ  STATIS, מספר הפקודה היא 014
Should be the same as in the request
## 001
TerminalId
## מסוףמספר
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040

Document Version 1.53   Caspit SmartRetail Solution
## 99

Tag name Description Matching TLV tag
(Caspit internal)
CurrentRecord
## שימו לב שמספר הרשומה לא חייב להיות חופף  מספר הרשומה הנוכחית.
## למספר הקובץ של שב"א
## כפי שהוא מופיע בXML. יתכן בהחלט שברשומה
## מספר 1 ,יהיה קובץ מספר 54 .
The current record number. Pay attention that the record number doesn't
match the Shva file number. It is possible that in record number 1, there
will be the data of file number 54.

## 190
NumberOfRecords
## מספר הרשומות הקיימות בקובץ הSTATIS  .
The number of records exist in the STATIS file.
The STATIS file can hold up to 99 records, which are deleted and replaced
in cyclic method.
## 191
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
ResultCode See Appendix A
## 010
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 100

- Retrieve TRAN File
- The TRAN file is a binary file that contains data about all the transactions that exist in a specific deposit.
- The TRAN file is kept in the secure memory of the Pinpad.
- The Pinpad keeps the TRAN files of the last 99 deposits. Older TRANS are deleted in a cyclic manner.
- The current TRAN can also be retrieved. The current is the TRAN that holds the transactions before they are transmitted
to Shva.
- Some retailers like to get the current TRAN before transmitting it to Shva. They go over all the transactions and compare
them  to  the  transactions  saved  in  the  ECR  database.  If  there  is  a  need,  they  may  decide  to  cancel  one  or  more
transactions. It is  possible  to  cancel  a  transaction  using its Uid,  so if you  find  one  or more  transactions  in  the TRAN file
that  you  would  like  to  cancel,  you  can  parse  the  Uid  of  these  transactions  and  send  cancellation  requests  for  each
transaction you want to cancel.
- Some retailers also like to retrieve all the transactions from the TRAN file, after transmission to Shva, because they need
to compare between the records of the ECR and the actual records in the Pinpad.
- Each record in the TRAN file is formatted according to appendix 1 in Shva document (ashEMV_appx). In a nutshell, each
record has a header and then the rest of the record is in ISO8583. The PC ECR will need to be able to parse ISO8583.
- Because we use XML and the records are in binary format, each record will be encoded in Base64 encoding.
- Caspit will provide an ISO8580 parser and a Base64 decoder in the DLL.
- When you retrieve a TRAN, the original stays in the Pinpad. It is not deleted.

## Switch Support
When using a Switch, the TRAN file is irrelevant because transactions are not kept in the Pinpad

12.1 TRAN Request
<Request>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>26</FileNo>
<CurrentRecord>000</CurrentRecord>
<RecordsPerRequest>5</RecordsPerRequest>
<RequestId>20160215174522</RequestId> (this same RequestId must repeat for the whole session)
</Request>

Caspit Internal – This part is intended for Caspit developers.
Command flow:
- If the <CurrentRecord> is 0 (zero) then SmartRetail will:
o Convert the XML to TLV and then it will send the TLV to Ashrait EMV.
o Ashrait EMV will prepare the TRAN.ASH file in the HOST folder and will return to SmartRetail.
o The  TRAN.ASH  file  is  a  text  file  with  a  line  for  each  transaction  that  exists  in  the  deposit  (each  deposit  is
identified by a batch number/file number). See Ashrait EMV spec for more details.

Document Version 1.53   Caspit SmartRetail Solution
## 101

o Ashrait EMV will put the RequestId as the first line of the TRAN.ASH file
- If  the  <CurrentRecord> is  not  0  (zero)  then  there  is  no  need  to  speak  with  Ashrait  EMV,  because  the TRAN.ASH  should
already be in the HOST folder.
- SmartRetail  will  read  the  TRAN.ASH  file  from  the  HOST  folder  and  will  build  the  response  XML.  The  response  XML  will
contain one ore more records in each response. It means that the PC ECR will need to continue requesting for the rest of
the TRAN records.
- SmartRetail will return the response XML back to the PC ECR.
Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number.
To get TRAN, use command number 007
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## עמדה \תחנה\מספר קופה
Station number (ECR number)
## 040
FileNo
## מספר קובץ TRANאפשריים . ערכים 00-99
## 00  –  מציין את העסקאות הקיימות במכשיר שעדיין לא שודרו לשב"א
The file number. Possible values are 00 – 99
Use 00 to get the transaction in the current file.
## 016
CurrentRecord
## רשומה מבוקשת. הערכים האפשריים הם  001  – 999 .
## חובהאבל  בבקשה  הראשונה    לשלוח  ערך  000  כדי  להודיע  לפינפד
## שרוצים להתחיל לקבל קובץ
## TRAN
The requested record number. The possible values are 001 – 999
But  at  first,  you  must  send  000  to  tell  the  Pinpad  that  we  want  to  start
getting the TRAN file.

## 191

Document Version 1.53   Caspit SmartRetail Solution
## 102

Tag name Description Matching TLV tag
(Caspit internal)
RecordsPerRequest
- Default is 1
- Max value: 5
- If value is more than 5 then the Pinpad will make it 5.
- If value is less that 1, the Pinpad will make it 1.
- This tag set the number of records that will return in the response for
each request.
- For example, if the TRAN has 50 transactions (i.e. records) then the
ECR can ask to get one record for each request, so a total number of 50
requests (and responses) must be done to retrieve the complete TRAN.
- But the ECR may choose to get 5 records for each request and thus the
total number of requests will be reduced to 10.
- Another example, if the <CurrentRecord> is 6 and the
<RecordsPerRequest> is 5 then the ECR is asking to get 5 records
starting from record 6.
- If the ECR requests 5 records but only 3 records are left in the TRAN file
then the Pinpad will return only 3 records.
- The maximum number of 5 records is imposed because of the Pinpad
buffer constraints.


RequestId
The same identical request Id must be used for all the session of
TRAN retrieval. i.e. if the TRAN retrieval requires more than one
request (and this is mostly the case) then all subsequent request
will use the same request Id.
## 051
Request Closing tag of the request XML N/A
12.2 /HOST/TRAN.ASH (Caspit Internal)
TODO: Add description of TRAN file
12.3 TRAN Response
<Response>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>26</FileNo>
<RecordFrom>001</RecordFrom>
<RecordTo>005</RecordTo>
<TotalNumberOfRecords>73</TotalNumberOfRecords>
<Record> record text in Base64 </Record>
<Record> another record text in Base64</Record>
<Record> another record text in Base64</Record>

Document Version 1.53   Caspit SmartRetail Solution
## 103

<Record> another record text in Base64</Record>
<Record> another record text in Base64</Record>
<Base64>Yes</Base64>
<ResultCode>0</ResultCode>
<RequestId>20160215174522</RequestId>
</Response>

Response XML tags
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה.לבקשת קובץ   TRAN, מספר הפקודה היא  007
Should be the same as in the request
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
RecordFrom The records in the response are starting from this record number
## (including)
The first record is number 1.
## 190
RecordTo The records in the response are ending in this record number (including)
TotalNumberOfRecords
## מספר הרשומות הקיימות בקובץ ה TRAN  .
The total number of records that exist in the TRAN file
## 191
Record The transaction details in ISO8583 format.
The record will be encoded in Base64 (depending on tag <Base64>)
## N/A
Record This tag can repeat 5 times
Base64 Yes – Records are encoded in Base64
No – Records are NOT encoded in Base64

ResultCode 0 – Success
## 10006 - RETVAL_CANT_FIND_REQUESTED_TRAN_FILE
## 10039 - RETVAL_INVALID_TRAN_RECORD_NUMBER
## Else, See Appendix A
## 010
RequestId Must be the same as in the request 051

Document Version 1.53   Caspit SmartRetail Solution
## 104

Tag name Description Matching TLV tag
(Caspit internal)
Response Closing tag of the response XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 105

12.4 Example of getting current TRAN
PC sends the following request:
<Request>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>00</FileNo>    (FileNo is 00 for current TRAN)
<CurrentRecord>000</CurrentRecord> (Current record must be 000 for the first request)
<RecordsPerRequest>5</RecordsPerRequest>
<RequestId>20160215174522</RequestId> (Same request id will be used for all the session of TRAN retrieval).
</Request>

Lets' assume the Pinpad has a current TRAN with 8 transactions that have not been transmitted to Shva.
Pinpad responds with first 5 records from the current TRAN:
<Response>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>00</FileNo>
<RecordFrom>001</RecordFrom>
<RecordTo>005</RecordTo>
<TotalNumberOfRecords>8</TotalNumberOfRecords>
<Record> A5FFAE234534645798735333AE23459586BBC9D0A5FFAE23459586BBC9D0 </Record>
<Record> A5FFAE23459586BBC9D0A5FFAE23459582424242424234586BBC9D0 </Record>
<Record> A5F23423BBC9D0A5FFAE23459586BBC9D0A5FFAE23459586BBC9D0 </Record>
<Record> A5FFAE23459586BB2342424234234239586BBC9D0A5FFAE23459586BBC9D0 </Record>
<Record> A5FFAE23459586BBC9D0A5FFAE234567567567567567567575759586BB3454D0 </Record>
<Base64>Yes</Base64>
<ResultCode>0</ResultCode>
<RequestId>20160215174522</RequestId>
</Response>

In the response we can see that we got the first 5 records and that there are a total of 8 records
(<TotalNumberOfRecords>8</TotalNumberOfRecords>)

Document Version 1.53   Caspit SmartRetail Solution
## 106

We have 5 times the <Record> tag.
The ECR will do the following for each <Record> tag in the response:
- The <Record> comes encoded with a Base64 encoding. So the ECR must decode the <Record>. Caspit DLL includes a
method to decode Base64.
- The result of the Base64 decoding is a binary byte array. This array is in ISO8583 format.
- The Caspit DLL have a method to parse ISO8583. The ECR may use this method to parse the record.
- The Caspit DLL method will return a map object with all the ISO8583 fields.
- The ECR may save this map.
- The ECR now moves to the next <Record> and handle it also, and so on until all <Record> tags are parsed
After all 5 <Record> tags are parsed, the ECR can send a request to the Pinpad asking to get the remaining records.
Here is the request:
<Request>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>00</FileNo>    (FileNo is 00 for current TRAN)
<CurrentRecord>006</CurrentRecord> (start from record 6)
<RecordsPerRequest>5</RecordsPerRequest>
<RequestId>20160215174522</RequestId> (same request Id)
</Request>

The response of the Pinpad will be like that:
<Response>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>00</FileNo>
<RecordFrom>006</RecordFrom>
<RecordTo>008</RecordTo>
<TotalNumberOfRecords>8</TotalNumberOfRecords>
<Record> A5FFAE2345346457694563453BBC9D0A5FFAE23459586BBC9D0 </Record>
<Record> A5FFAE23459586BBC9D0A5FFAE234564563223423424234586BBC9D0 </Record>
<Record> A5F23423BBC9D0A34536576853C9D0A5FFAE23459586BBC9D0 </Record>
<Base64>Yes</Base64>
<ResultCode>0</ResultCode>

Document Version 1.53   Caspit SmartRetail Solution
## 107

<RequestId>20160215174522</RequestId>
</Response>

Again, the ECR will do the following for each <Record> tag in the response:
- The <Record> comes encoded with a Base64 encoding. So the ECR must decode the <Record>. Caspit DLL includes a
method to decode Base64.
- The result of the Base64 decoding is a binary byte array. This array is in ISO8583 format.
- The Caspit DLL have a method to parse ISO8583. The ECR may use this method to parse the record.
- The Caspit DLL method will return a map object with all the ISO8583 fields.
- The ECR may save this map.
- The ECR now moves to the next <Record> and handle it also, and so on until all <Record> tags are parsed
This concludes the retrieval of 8 record from the current TRAN.
Of course, if the TRAN had more records, then more requests and responses would be needed to get the entire TRAN.

12.5 Example of getting a specific TRAN
To  get  a  specific  TRAN,  the  flow  is  almost  the  same,  you  just  need  to  put the  specific  TRAN  number  in  the  <FileNo>  tag.  In  the
following example, I ask to get TRAN number 43. I show here just the request.
<Request>
<Command>007</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<FileNo>43</FileNo>
<CurrentRecord>000</CurrentRecord> (Current record must be 000 for the first request)
<RecordsPerRequest>5</RecordsPerRequest>
<RequestId>20160315174522</RequestId> (Same request id will be used for all the session of TRAN retrieval).
</Request>

If you don't know the TRAN number, you can use the STATIS request to get the STATIS file. The STATIS file contains the list of all the
TRANs that exist in the Pinpad. If you find what you are looking for in the STATIS file, you can get the TRAN number from there and
then use it with the Retrieve TRAN command.

Document Version 1.53   Caspit SmartRetail Solution
## 108

- Retrieve JENR File
The  JENR  file is  a  text file  that  contains  mostly  the  last communication  details  and fields  that  specify  the  time  and  generation  of
the data retrieved from Shva.
SmartRetail  will  support  the  same  JENR  file  format  that  is described  in  Shva  Mefizim-EMV  document (see  that  document).  All  of
the JENR file data will arrive in XML tag <JENR>. Actually the JENR will be one long record.
JENR file format:
## הערות מקום יחסי מס' תווים   שם השדה

## 1 10
## מספר מסוף

## 11 4
## דור חסומים בטנדם
## YYYYMMDD
## 15 8
## תאריך פרמטרים כלליים
## YYYYMMDD
## 23 8
## תאריך פרמטרים לכרטיסים ישראלים
## YYYYMMDD
## 31 8
## תאריך פרמטרים לתיירים
## YYYYMMDD
## 39 8
## תאריך תקפים לישראכרט
## YYYYMMDD
## 47 8
## תאריך תקפים לכ.א.ל
## YYYYMMDD
## 80 תווים
## 55 8  *10
## תאריך תקפים למנפיקים עתידיים
## YYYYMMDD
## 135 8
## תאריך מועדון ישראכרט
## YYYYMMDD
## 143 8
## תאריך מועדון לאומי קארד
## YYYYMMDD
## 151 8
## תאריך מועדון כ.א.ל
## לא בשימוש
## 159 8
## תאריך פרמטרים של מסופי דלק
## YYYYMMDD
## 167 8 תאריך תקרות לכרטיסי PL
## YYYYMMDD
## 175 8 תאריך תקרות לשיטה 0לכרטיסים ישראלים שאינם  PL
## YYYYMMDD
## 183 8 תאריך תקרות לשיטה 1לכרטיסים ישראלים שאינם  PL
## YYYYMMDD
## 191 8
## תאריך תקרות לכרטיסי תייר

## 199 4
## ווקטורי ישראכרט דור

## 203 4
## דור ווקטורי כ.א.ל

## 207 4
## דור ווקטורי לאומי קארד

## 211 4
## דור ווקטורים כלליים

## 215 4
## דור ווקטור 90

## 219 4
## דור ווקטורים למנפיקים עתידיים
## 0 שידור מהתחלה –
## 1 המשך שידור קובץ מלא  –
## 223 1
## קוד המשך שידור קובץ חסומים

Document Version 1.53   Caspit SmartRetail Solution
## 109

## 2  –  המשך  שידור  קובץ
## ביטולים
## 3  –  המשך  שידור  קובץ
## תוספות

13.1 JENR File Request
<Request>
<Command>002</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216153432</RequestId>
</Request>

Caspit Internal – This part is intended for Caspit developers.
Command flow:
- If SmartRetail gets this request XML, it will convert the XML to TLV and then it will send the TLV to Ashrait EMV.
- Ashrait EMV will prepare the JENR.ASH file in the HOST folder and will return to SmartRetail. The JENR.ASH file is a plain
text file. On the first line of JENR.ASH file, Ashrait EMV will put the RequestId.
- SmartRetail will read the JENR.ASH file from the HOST folder and will build the response XML.
- SmartRetail will validate that the RequestId on the first line of the file is the same RequestId from the request.
- SmartRetail  just  needs  to  read  the  JENR.ASH  file  and  insert  the  file  text into  the  response  XML  (without  the  first  line).
SmartRetail doesn't need to parse the JENR.ASH file.
- SmartRetail will return the response XML back to the PC ECR.

Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה.לבקשת קובץ  JENR, מספר הפקודה היא 002
The command for JENR file is 002
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 040
RequestId
## בקשה מזהה
## Request Id
## 051

Document Version 1.53   Caspit SmartRetail Solution
## 110

Tag name Description Matching TLV tag
(Caspit internal)
Request Closing tag of the request XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 111

13.2 JENR File Format (Caspit Internal)
20160216153432    (first line is the RequestId)
(The JENR line. 224 characters long)
13.3 JENR File Response
<Response>
<Command>002</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>20160216153432</RequestId>
<JENR> here will be the text of the JENR file. It is 224 characters long </JENR>
</Response>

Response XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה.לבקשת קובץ  JENR, מספר הפקודה היא 002
Should be the same as in the request
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
ResultCode See Appendix A 010
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
JENR The text of the JENR file
224 characters long
## N/A
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 112

- Retrieve DATA File
The DATA file is a text file that keeps information about some important details.
SmartRetails supports the same DATA file format that is described in Shva Mefizim-EMV document (see that document).
All of the DATA file data will arrive in XML tag <DATA>. So actually, the DATA file is a one long string.
DATA file format:



Document Version 1.53   Caspit SmartRetail Solution
## 113

- Transmit Transactions to Shva
The PC ECR can request the Pinpad to transmit all transaction to Shva.
By  default,  the  PinPad  keeps  all  transactions  in  its  secure  memory.  Transactions  are  kept  until  the  ECR  decides  to  transmit  the
transactions  to  Shva.  If  the  ECR  does  not  tell  the  Pinpad  to  transmit  the transactions,  the  transactions  will  accumulate  in  the
Pinpad indefinitely. In most cases, the ECR tells the Pinpad to transmit the transactions during the ECR end-of-day procedure.
However,  the  Pinpad  can  be  configured  to  send  the  transactions  automatically every  day.  That  way,  you  can  be  sure  that  the
transactions are safely transmitted to Shva. However, using the automatic feature, you lose the synchronization between the ECR
end-of-day process and the Pinpad end-of-day.
During the call to Shva, not only the transactions are sent to Shva, but the Pinpad also gets updated parameters and an updated
black list.

After transmitting the transactions, the ECR may use one or more of the following features:
- Get Total file to see the summary of transactions
- Get Deposit Report to see (and print) the summary report that was created by Shva
- Get TRAN file (record after record) to get the full details of all the transactions
- Using or not using these features, it all depends on the requirements of the ECR.

## Switch Support
If  the  Pinpad  is  working  with  a  Switch  then  this  command,  Transmit  Transactions  to  Shva,  will  have  a  different  meaning.  It  wi ll
mostly be useless, unless some transactions are stuck in the Pinpad and there is a need to send them manually to the Switch.
In  a  regular  flow  with  the  Switch,  transactions  will  be  kept  in  the  Switch,  but  it  is  possible,  that  because  of  a  communicati on
problem between the Pinpad and the Switch, transactions will be authorized offline by the Pinpad.  Usually, when communication
is restored, the Pinpad will automatically send the transactions, that were authorized offline, to the Switch.  But to make sure that
there are no "stuck" transactions in the Pinpad, the ECR may call this command.
## 15.1 Transmit Transactions Request
<Request>
<Command>006</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
</Request>

Caspit Internal – This part is intended for Caspit developers.
Command flow:
- SmartRetail will convert the XML to TLV and then it will send the TLV to Ashrait EMV.
- Ashrait  EMV  will  call  Shva  and  will  transmit  all  transaction  to Shva.  During  the  call,  Ashrait  will  update  also  the
parameters and black list.
- Ashrait will prepare the DATA.ASH file in the HOST folder and will return to SmartRetail. The DATA.ASH file is a plain text
file. It is the same DATA.ASH file that is created during DATA file request command.

Document Version 1.53   Caspit SmartRetail Solution
## 114

- SmartRetail will read the DATA.ASH file from the HOST folder and will build the response XML. SmartRetail just needs to
read  the  DATA.ASH  file and  insert  the  file  text into  the response XML. SmartRetail doesn't need  to  parse  the  DATA.ASH
file.
- SmartRetail will return the response XML back to the PC ECR.

Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה.לביצוע שידור לשב"א, מספר הפקודה היא  006
The command to Transmit transaction is 006
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 040
RequestId
## מזהה בקשה
## Request Id
## 051
Request Closing tag of the request XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 115

## 15.2 Transmit Transactions Response
<Response>
<Command>006</Command>
<TerminalId>0880264</TerminalId>
<ResultCode>0</ResultCode>
<Session-Number>29238392</Session-Number>
<File-Number>17</File-Number>
<Date>YYYY-MM-DD</Date>
<RequestId>20160216155540</RequestId>
<DATA> here will be the text of the DATA file. It is 47 characters long </DATA>
</Response>

The ECR should keep the <Session-Number>, <File-Number> and <Date> tags for future use.
These tags (<Session-Number>, <File-Number> and <Date>) will exist in the response XML only if transactions were sent to Shva.

## Switch Support
If using a Switch, the response will not include the following tags:
- <Session-Number>
- <File-Number>
- <Date>
## • <DATA>

Response XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה.לביצוע שידור לשב"א, מספר הפקודה היא  006
Should be the same as in the request
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040

Document Version 1.53   Caspit SmartRetail Solution
## 116

Tag name Description Matching TLV tag
(Caspit internal)
ResultCode Relevant result codes:
## 0 – Success
## 10003 – RETVAL_INCORRECT_TERMINAL_ID
10022 – RETVAL_INCORRECT_ECR_NUMBER (<TermNo> tag)
## 10036 – RETVAL_XML_MISSING_TERMINAL_ID_TAG

Other result codes may arrive. Refer to Appendix A.
## 010
Session-Number If transactions were sent successfully, the <Session-Number> will hold
the Asmachta from Shva (it is the reference of the deposit).
This tag will exist in the response XML only if there were transactions
sent to Shva.
## 015
File-Number If transactions were sent successfully, then <File-Number> will hold the
batch/file number of the transactions batch.
This tag will exist in the response XML only if there were transactions
sent to Shva.
## 016
Date If transactions were sent successfully, then <Date> will hold the current
date.
Format: YYYY-MM-DD
This tag will exist in the response XML only if there were transactions
sent to Shva.
## 213
RequestId Must be the same as in the request.

DATA The text of the DATA file
47 characters long
The value of this tag
will be taken from file
## DATA.ASH
Response Closing tag of the response XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 117

15.3 DATA File Request
<Request>
<Command>008</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216154920</RequestId>
</Request>

Caspit Internal – This part is intended for Caspit developers.
Command flow:
- If SmartRetail gets this request XML, it will convert the XML to TLV and then it will send the TLV to Ashrait EMV.
- Ashrait EMV will prepare the DATA.ASH file in the HOST folder and will return to SmartRetail.
- The DATA.ASH file is a plain text file. Ashrait EMV will add the RequestId on the first line of the file.
- SmartRetail will read the DATA.ASH file from the HOST folder and will build the response XML. SmartRetail just needs to
read  the  DATA.ASH  file  and  insert  the  file  text  into  the  response  XML (without  the  first  line,  which  is  the  RequestId).
SmartRetail doesn't need to parse the DATA.ASH file.
- SmartRetail will return the response XML back to the PC ECR.

Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה.לבקשת קובץ  DATA, מספר הפקודה היא 008
The command file DATA file request is 008
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 040
RequestId
## מזהה בקשה
## Request Id
## 051
Request Closing tag of the request XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 118


15.4 DATA File Format (Caspit Internal)
20160216154920   (first line is the RequestId)
(The DATA line. 47 characters long)

15.5 DATA File Response
<Response>
<Command>008</Command>
<TerminalId>0880264</TerminalId>
<ResultCode>0</ResultCode>
<RequestId>20160216154920</RequestId>
<DATA> here will be the text of the DATA file. It is 47 characters long </DATA>
</Response>

Response XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה.לבקשת קובץ  DATA, מספר הפקודה היא 008
Should be the same as in the request
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
ResultCode See Appendix A 010
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
DATA The text of the DATA file
47 characters long
## N/A
Response Closing tag of the response XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 119

## 16. Communication Test
The PC ECR can  make communication tests to test the connection to the Pinpad itself and also to test  the various hosts that the
Pinpad uses.
Use this command to check if the ECR is configured with the correct Terminal Id and TermNo (ECR number/station number).
## 16.1 Communication Test Request
<Request>
<Command>003</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<CheckShva>1</CheckShva>
<CheckSwitch>0</CheckSwitch>
<CheckCaspitHost>0</CheckCaspitHost>
<CheckTMS>0</CheckTMS>
<CheckCertServer>0</CheckCertServer>
<CheckReportServer>0</CheckReportServer>
<CheckFTP>0</CheckFTP>
<TimeoutInSeconds>10</TimeoutInSeconds>
<RequestId>20160216155540</RequestId>
</Request>

If you just want to test the connection to the Pinpad (and check if there is card inside the reader) then you can send the command
like this:
<Request>
<Command>003</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
</Request>


Caspit Internal – This part is intended for Caspit developers.
Command flow:
- SmartRetail will convert the XML to TLV and then it will send the TLV to Ashrait EMV.
- Ashrait EMV will:

Document Version 1.53   Caspit SmartRetail Solution
## 120

o If  <CheckShva>  is  1  then  Ashrait EMV  will  perform  a  communication  test all  the way  to  Shva.  Ashrait  EMV will
just open a TCP socket to see if the connection is OK. There is no need to send/receive anything from Shva. If the
connection to Shva requires SSL, then the check will include a complete connection (including the SSL).
o Check the status of the EPA application (Contact EMV application)
o Check the status of the CPA application (Contactless application)
o Ashrait EMV must consider the Timeout and return the control to SmartRetail if timeout expired.
o If <CheckSwitch> is 1 then AshraitEMV will also perform a communication test all the way to the Switch. This will
be possible only if AshraitEMV is working in Switch mode. Only the connection stage will be tested. There is no
need to do any parameters session with the Switch. This feature is not ready yet
o If  <CheckCaspitHost>  is  1  then  AshraitEMV will  also  perform  a  communication  test  all  the  way  to  Caspit  Host
(the  technicians'  center).  Only  the  connection  stage  will  be  tested.  There  is  no need  to  do  any  parameters
session.
o If  <CheckTMS>  is  1  then  AshraitEMV will  also  perform  a  communication  test  all  the  way  to  the  TMS.  Only  the
connection  stage  will  be  tested.  Note  that  AshraitEMV will not  start  the  regular  function  that  performs  a  full
TMS communication. Ashrait EMV just need to open a TCP socket to the TMS server.
o If <CheckCertServer> is 1 then AshraitEMV will also perform a communication test all the way to the cert server.
Only the connection stage will be tested. No certificate update will be done. This feature is not ready yet.
o If <CheckReportServer> is 1 (and if we have a report server) then AshraitEMV will also perform a communication
test  all  the  way  to  the report  server. Only  the connection  stage  will  be  tested. No report request will  be  done.
This feature is not ready yet.
- SmartRetail will return the response XML back to the PC ECR.

Request XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה., מספר הפקודה היא לבדיקת תקשורת 006
The command for communication test is 006
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר תחנה). \(מספר עמדה  מספר קופה
Station number/ECR number
## 040
CheckShva 0 – Don't check connection to Shva.
1 – Check connection to Shva. Only the connection step is checked (TCP
connection and SSL handshake). No parameters or transactions are sent.
So this check doesn't tell us if the Terminal Id is configured correctly in
## Shva.
If you want to make a full communication to Shva (including transactions
and parameters) then you need to call the Transmit Transaction
## Command.
If you want to make a partial communication to Shva (only parameters
without transactions) then you need to use the Generic Command.
## 194

Document Version 1.53   Caspit SmartRetail Solution
## 121

Tag name Description Matching TLV tag
(Caspit internal)
CheckSwitch 0 –Don't check connection to the Switch.
1 – Check connection to the Switch. Only the connection step is checked
(TCP connection and SSL handshake). This check doesn't tell use if the
Terminal Id is configured in the Switch.
Relevant only when using a Switch. This option is not ready yet.
If you want to make a full parameters call to the Switch, then you need to
use the Generic Command.

## 225

CheckCaspitHost 0 – Don't check connection to Caspit
1 – Check connection to Caspit technician server. Only the connection
step is checked (TCP connection and SSL handshake).
If you want to make a full parameters call to Caspit tech center, then you
need to use the Generic Command
## 226

CheckTMS 0 – Don't check connection to the TMS (Terminal Management System)
1 – Check connection to the TMS. Only the connection step is checked
(TCP connection and SSL handshake). No downloads will be done.
If you want to make a full call to the TMS (including getting upgrades, if
available), then you need to use the Generic Command
## 227

CheckCertServer 0 – Don't check the certificates server.
1 – Check the certificates server. Only the connection step is checked
(TCP connection and SSL handshake). No certificate will be downloaded.
Relevant only when using a certificates server. This option is not ready
yet
If you want to make a full call to the certificates server, including getting
new certificates, then you need to use the Generic Command
## 232
CheckReportServer 0 – Don't check the reports server
1 – Check the reports server. Only the connection step is checked (TCP
connection and SSL handshake).
Relevant only when using a reports server. This option is not ready yet.
If you want to make a full call to the reports server, including getting a
report, then you need to use the Generic Command
## 233
CheckFTP 0 – Don't check the FTP server
1 – Check the FTP server. Only the connection is checked (TCP
connection). NO files will be sent.
If you want to make a full call to the FTP server, including sending the log
files, then you need to use the Generic Command
## 228
TimeoutInSeconds Timeout value for the entire communication test. The SmartRetail must
return a response within the requested timeout period.
## 005

Document Version 1.53   Caspit SmartRetail Solution
## 122

Tag name Description Matching TLV tag
(Caspit internal)
RequestId
## מזהה בקשה
## Request Id
## 051
Request Closing tag of the request XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 123

## 16.2 Communication Test Response
<Response>
<Command>003</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<SerialNumber>30303PP3039393</SerialNumber>
<SmartRetailVersion>4872830001</SoftwareVersion>
<AshraitEMVVersion>5959590040</AshraitEMVVersion>
<EPAVersion>33939392122</EPAVersion>
<CPAVersion>20202022020</CPAVersion>
<RouterVersion>30303030303</RouterVersion>
<SDKVersion>9.22.0</SDKVersion>
<ResultCode>0</ResultCode>
<ShvaCommStatus>1</ShvaCommStatus>
<SwitchCommStatus>9</SwitchCommStatus>
<CaspitCommStatus>9</CaspitCommStatus>
<TMSCommStatus>9</TMSCommStatus>
<CertServerStatus>9</CertServerStatus>
<ReportServerStatus>9</ReportServerStatus>
<FTPServerStatus>9</CheckFTPStatus>
<ContactStatus>1</ContactStatus>
<ContactlessStatus>1</ContactlessStatus>
<CardInside>0</CardInside>
<RequestId>20160216155540</RequestId>
</Response>

Response XML tags:
Tag name Description Matching TLV tag
(Caspit intenral)
Response The opening tag of the response XML N/A
## Command
## פקודה., מספר הפקודה היא  לבדיקת תקשורת 003
Should be the same as in the request
## 001

Document Version 1.53   Caspit SmartRetail Solution
## 124

Tag name Description Matching TLV tag
(Caspit intenral)
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
SerialNumber Serial number of the Pinpad N/A
There is no TLV tag
because it will be
done locally by
SmartRetail
SmartRetailVersion Software version of SmartRetail app N/A
There is no TLV tag
because it will be
done locally by
SmartRetail
AshraitEMVVersion Software version of Ashrait EMV 013
EPAVersion Software version of EPA (Pinpad EMV Contact application)
This is another application on the Pinpad that takes part in the EMV
transaction.

## 192
CPAVersion Software version of CPA (Pinpad Contactless application)
This is another application on the Pinpad that takes part in the EMV
transaction.

## 193
RouterVersion Software version of the Router application
This is an application on the Pinpad that is responsible to route packets
between applications and the ECR.
## TODO
SDKVersion SDK version of the Pinpad N/A
There is no TLV tag
because it will be
done locally by
SmartRetail
ResultCode See Appendix A

ShvaCommStatus 0 – Connection error
1 – Connection OK
9 – Not checked
## 195

Document Version 1.53   Caspit SmartRetail Solution
## 125

Tag name Description Matching TLV tag
(Caspit intenral)
SwitchCommStatus 0 – Connection error
1 – Connection OK
9 – Not checked
This feature is not ready yet
## 229

CaspitCommStatus 0 – Connection error
1 – Connection OK
9 – Not checked
## 230
TMSCommStatus 0 – Connection error
1 – Connection OK
9 – Not checked
## 231
CertServerStatus 0 – Connection error
1 – Connection OK
9 – Not checked
This feature is not ready yet
## 234
ReportServerStatus 0 – Connection error
1 – Connection OK
9 – Not checked
This feature is not ready yet
## 235
FTPServerStatus 0 – Connection error
1 – Connection OK
9 – Not checked
## 236
ContactStatus 0 – Smart card reader is not OK
1 – Smart card reader is Ok
2 – No Smart card reader device
## 196
ContactlessStatus 0 – Contactless reader is not OK
1 – Contactless reader is OK
2 – No Contactless reader
## 197
CardInside 0 – No card inside
1 – Card inside contact reader
This is an important issue. With EMV, it is very common for the
cardholder to forget his card inside the Pinpad. The ECR should always
check if the card is still inside and alert the merchant about it.

## 220

Document Version 1.53   Caspit SmartRetail Solution
## 126

Tag name Description Matching TLV tag
(Caspit intenral)
RequestId
## מזהה עסקה
Should be the same as in the request
## 051
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 127

## 17. Pinpad Configuration
Using  the  Pinpad  configuration command  the  ECR  can  set various  parameters  of  the  Pinpad. The response  XML  will  include  also
many interesting information about the Pinpad hardware and software.

## 17.1 Pinpad Configuration Request
<Request>
<Command>013</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ShvaTime>HHMM</ShvaTime>
<ShvaTimerType>0</ShvaTimerType>
<EnableIdleSwipe>1</EnableIdleSwipe>
<EnableSmartSwipe>1</EnableSmartSwipe>
<BlockDoubleTrans>1</BlockDoubleTrans>
<AccessControl>0</AccessControl>
<EnableFullPAN>0</EnableFullPAN>
<IdleSwipeAddress>192.168.0.1/1200</IdleSwipeAddress>
<EnableTranSteps>0</EnableTranSteps>
<TranStepsAddress>192.168.0.1/1200</TranStepsAddress>
<MustTranSteps>0</MustTranSteps>
<BlockAutoSwitchBatchDelete>0</BlockAutoSwitchBatchDelete >
<PinpadLock>0</PinpadLock>
<RequestId>20160216155540</RequestId>
</Request>


If you just want to get the configuration and not to set anything then you can use a shorter XML request:
<Request>
<Command>013</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
</Request>

If the ECR doesn't know the terminal id of the Pinpad, it can send an even shorter XML request:
<Request>

Document Version 1.53   Caspit SmartRetail Solution
## 128

<Command>013</Command>
<RequestId>20160216155540</RequestId>
</Request>

Without a terminal id, the ECR cannot change the configuration of the Pinpad but the response will be the same response of the
## Pinpad Configuration.

The request tags
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודה.להגדרת פינפד, מספר הפקודה היא  013
The command for Pinpad Configuration is 013
## 001
TerminalId
## מספר מסוף
To  change  a  Pinpad configuration  you must  supply  the  correct  terminal id.
If  you  don't  supply  the  correct  terminal  id  then  the  parameters  you  set  in
the configuration request will not be accepted by the Pinpad.
## 006
TermNo
## מספר קופה
To change a Pinpad configuration you must supply the correct TermNo (aka
station number/ECR number). If you don't supply the correct TermNo then
the parameters you set in the configuration request will not be accepted by
the Pinpad.
## 040
ShvaTime
## שעת התקשרות לשב"א. רלוונטי רק אם הפינפד מתקשר אוטומטית
## לשב"א (ולא על פי פקודה מהקופה) ורק אם סוג טיימר שב"א מוגדר כ
## 2 .
## פורמט: HHMM
The time to call Shva.
## 035

Document Version 1.53   Caspit SmartRetail Solution
## 129

Tag name Description Matching TLV tag
(Caspit internal)
ShvaTimerType
## סוג טיימר לשב"א.
## 0אין טיימר. התקשורת לשב"א תתבצע רק לפי פקודה מהקופה. –  אם
## הקופה לא תפעיל את פקודת התקשורת לשב"א (פקודה מספר
## 006, ראה
## פרק
## 15), אז העסקאות יישארו בפינפד. יש גם אפשרות להפעיל את
## לגרום לחוסר  התקשורת לשב"א מתוך תפריט הפינפד, אבל זה עלול
## סנכרון בין סגירת היום החשבונאית של הקופה לבין שידור עסקאות
## האשראי, מה שחלק מהקופות לא אוהבות שקורה.
## 1תקשורת לשב"א תהיה אוטומטית ויזומה על ידי  טיימר פעיל.  – ה
## הזמן לתקשורת לשב"א יהיה לפי הזמן שהתקבל בפרמטרים הפינפד. ו
## ן שגם עם טיימר פעיל,  ניתן לפנות לשב"א ולקבוע זמן אחר. משב"א.כמוב
## הקופה עדיין יכולה לשלוח פקודה לביצוע תקשורת.
## 2תקשורת לשב"א תהיה אוטומטית ויזומה על ידי  טיימר פעיל.  – ה
## הזמן לתקשורת לשב"א יהיה לפי הזמן שהוגדר בתגית הפינפד.
ShvaTime  .
## הפינפד יתעלם מהזמן שנקבע בפרמטרים שהגיעו משב"א.


## ברירת המחדל  היא   בפינפד חדש0אף . כלומר בפינפד שלא קיבל עדיין
## פקודת
## Configuration, סוג הטיימר יהיה 0 (אין טיימר).
## השימוש הנפוץ הוא ברירת המחדל (0, אין טיימר).
0 – Not timer. Communication to Shva will be done only using a command
from the ECR.
1 – Timer is on. Automatic call to Shva will be made according to the
schedule that was received in the parameters from Shva
2 – Timer is on. Automatic call to Shva will be made according to the
schedule that was received in tag ShvaTime.

## 198
EnableIdleSwipe 0 – Idle swipe is disabled
1 – Idle swipe is enabled
You need to set also the <IdleSwipeAddress>
See Appendix G for a full description of the Idle Swipe.
## N/A
It  is  done  locally
in  SmartRetail. No
need   to   send   to
Ashrait EMV
EnableSmartSwipe 0 – Smart swipe is disabled
1 – Smart swipe is enabled. If you start a transaction and the pinpad is
waiting for a card. If a card is swiped and the card is not recognized as a
credit card then the pinpad will not perform a transaction but it will return
a response suitable for Swipe Command (command number 023)

The default in a new Pinpad is 0. Meaning, in a Pinpad that didn't get any
Pinpad configuration command, the Smart Swipe is disabled.
See chapter 9.5 for a full description of Smart Swipe.
## 083

Document Version 1.53   Caspit SmartRetail Solution
## 130

Tag name Description Matching TLV tag
(Caspit internal)
BlockDoubleTrans 0 – Block double transaction is disabled
1 – Block double transaction is enabled. The pinpad will refuse the
transaction if the same card number, same amount and same voucher
number are used as in the last transaction.
The default in a new Pinpad is 1. Meaning, in a Pinpad that didn't get any
Pinpad configuration command, the Block Double Transaction feature is
enabled.
The ECR can temporarily override this block, for a specific transaction, by
sending the tag <SkipDoubleTranCheck>1</SkipDoubleTranCheck> in the
transaction request.
## 084
AccessControl 0 – Access control is disabled.
1  – Access control is enabled. Entering to SmartRetail application will
require the user to enter a password or to swipe a technician card.

The default in a new Pinpad is 0. Meaning, in a Pinpad that didn't get any
Pinpad configuration command, the Access Control will be disabled.

## N/A
EnableFullPAN 0 – Full PAN is disabled. The Pinpad will never send out the full PAN of a
credit card. The PAN will always be masked. The PAN will be masked in the
transaction response XML, in the receipt XML, in the TRAN record.
## Everywhere.
1 – Full PAN is enabled. The transaction response will be sent with the full
PAN visible. The full PAN will be in the <Pan> tag and also in the
<ReceiptMerchant> receipt text. The PAN will still be masked in the TRAN
record.
The default in a new Pinpad is 0. Meaning, in a Pinpad that didn't get any
Pinpad configuration command, The full PAN will be disabled.

## 215
IdleSwipeAddress The IP address and the port number of the listener for the Idle Swipe data.
## Format:
## XXX.XXX.XXX.XXX/YYYYY
YYYYY is the port number.
For example:
## 192.168.0.1/1200
See appendix G for a full description of Idle Swipe


Document Version 1.53   Caspit SmartRetail Solution
## 131

Tag name Description Matching TLV tag
(Caspit internal)
EnableTranSteps This tag enable/disable the transaction steps
0 – Transaction steps are disabled
1 – Transaction steps are enabled. The Pinpad will update the PC about the
current step of the transaction.
The ECR is responsible to set up a TCP listener
See Appendix J for a full description of Transaction Steps
## 222
TranStepsAddress The IP address and the port number of the listener for the transaction
steps.
## Format:
## XXX.XXX.XXX.XXX/YYYYY
YYYYY is the port number
For example:
## 192.168.0.1/24321
See Appendix J for a full description of Transaction Steps
## 223
MustTranSteps This flag can make the transaction steps mandatory.
0 – If transaction steps are enabled, but the listener is not working, the
Pinpad will continue with the transaction.
1 – If transaction steps are enabled, but the listener is not working, the
Pinpad will stop the transaction with result code 10026.

## 242
BlockAutoSwitchBatchDelete Switch Support
0 – Default value. If the Switch batch is empty, the Switch batch will be
deleted automatically on midnight.
1 – Switch batch will not be deleted automatically. The ECR will be
responsible to delete the Switch batch using Generic Command sub
command 013.

## 256
PinpadLock 0 – Pinpad is not locked.
1 – Pinpad is locked. It will not be possible to enter the system menu or the
application menu.
The Pinpad lock can be configured also from the Pinpad menu.
## 257
RequestId
## מזהה בקשה
## 051
DCCAuthorization Dynamic Curency Change (DCC) version, starts with 1, supported by CR 268
BListTime Date/Time of black list file
Request Closing tag of the request XML N/A



Document Version 1.53   Caspit SmartRetail Solution
## 132

## 17.2 Pinpad Configuration Response
<Response>
<Command>013</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<SerialNumber>30303PP3039393</SerialNumber>
<PartNumber>WERWERE</PartNumber>
<SmartRetailVersion>4872830001</SoftwareVersion>
<AshraitEMVVersion>5959590040</AshraitEMVVersion>
<EPAVersion>33939392122</EPAVersion>
<CPAVersion>20202022020</CPAVersion>
<SDKVersion>9.22.0</SDKVersion>
<ResultCode>0</ResultCode>
<ShvaTime>HHMM</ShvaTime>
<ShvaTimerType>0</ShvaTimerType>
<CommType>1</CommType>
<ShvaAddress>255.255.255.255/9000</ShvaAddress>
<SwitchAddress1>255.255.255.255/9000</SwitchAddress1>
<SwitchAddress2>255.255.255.255/9000</SwitchAddress2>
<CaspitAddress>255.255.255.255/9000</CaspitAddress>
<TMSAddress>255.255.255.255/9000</TMSAddress>
<ReportServerAddress>255.255.255.255/9000</ReportServerAddress>
<CertServerAddress>255.255.255.255/9000</CertServerAddress>
<LogServerAddress>255.255.255.255/9000</LogServerAddress>
<DateTime>YYYYMMDDHHMMSS</DateTime>
<EnableIdleSwipe>1</EnableIdleSwipe>
<ShvaBusinessName>Caspit Test</ShvaBusinessName>
<ShvaVersion>CST00000033T</ShvaVersion>
<EnableSmartSwipe>1</EnableSmartSwipe>
<BlockDoubleTrans>1</BlockDoubleTrans>
<SetupDateTime>YYYYMMDDHHMMSS</SetupDateTime>
<LastTranDateTime>YYYYMMDDHHMMSS</LastTranDateTime>
<LastShvaDateTime>YYYYMMDDHHMMSS</LastShvaDateTime>
<LastSwitchDateTime>YYYYMMDDHHMMSS</LastSwitchDateTime>

Document Version 1.53   Caspit SmartRetail Solution
## 133

<LastCaspitDateTime>YYYYMMDDHHMMSS</LastCaspitDateTime>
<LastTMSDateTime>YYYYMMDDHHMMSS</LastTMSDateTime>
<AccessControl>0</AccessControl>
<RequestId>20160216155540</RequestId>
<AshraitSSL>1</AshraitSSL>
<UnsentTransactions>0</UnsentTransactions>
<CardInside>0</CardInside>
<BlacklistStatus>0</BlacklistStatus>
<ShvaParamStatus>0</ShvaParamStatus>
<IdleSwipeAddress>192.168.0.1/1200</IdleSwipeAddress>
<EnableFullPan>0</EnableFullPan>
< EnableTransSteps >0</EnableTransSteps >
<MustTransSteps>0</MustTransSteps>
<TransStepsAddress>192.168.0.1/24321</TransStepsAddress>
<SwitchEnabled>0</SwitchEnabled>
<CardEntryTimeout>60</CardEntryTimeout>
<PinEntryTimeout>90</PinEntryTimeout>
<SwitchName>CreditGuard</SwitchName>
<SwitchId>1</SwitchId>
<BlockAutoSwitchBatchDelete>0</BlockAutoSwitchBatchDelete>
<PinpadLock>0</PinpadLock>
</Response>

Response XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## פקודה., מספר הפקודה היא להגדרת פינפד 013
Should be the same as in the request
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה (מספר תחנה  \מספר עמדה)
Should be the same as in the request
## 040

Document Version 1.53   Caspit SmartRetail Solution
## 134

Tag name Description Matching TLV tag
(Caspit internal)
SerialNumber Serial number (S/N) of the Pinpad
The serial number can also be seen on the back of the Pinpad.
This is a read-only tag.
## N/A
PartNumber Part Number (P/N) of the Pinpad
This is a read-only tag.
## N/A
SmartRetailVersion Software version of SmartRetail app
This is a read-only tag.
## N/A
AshraitEMVVersion Software version of Ashrait EMV app
This is a read-only tag.

EPAVersion Software version of EPA (Pinpad EMV Contact application)
This is a read-only tag.

CPAVersion Software version of CPA (Pinpad Contactless application)
This is a read-only tag.

SDKVersion SDK version of the Pinpad
This is a read-only tag.
## N/A
ResultCode  0 – Success
## See Appendix A
## 010
ShvaTime
## שעת התקשרות לשב"א. רלוונטי רק אם הפינפד מתקשר אוטומטית
## מהקופה) ורק אם סוג טיימר שב"א מוגדר כלשב"א (ולא על פי פקודה 2 .
The time to call Shva.
## 035

Document Version 1.53   Caspit SmartRetail Solution
## 135

Tag name Description Matching TLV tag
(Caspit internal)
ShvaTimerType
## סוג טיימר לשב"א.
## 0אין טיימר. התקשורת לשב"א תתבצע רק לפי פקודה מהקופה. –  אם
## הקופה לא תפעיל את פקודת התקשורת לשב"א (פקודה מספר
## 006  ,
## ראה פרק
## 15בפינפד. יש גם אפשרות להפעיל ), אז העסקאות יישארו
## התקשורת לשב"א מתוך תפריט הפינפד, אבל זה עלול לגרום לחוסר  את
## סנכרון בין סגירת היום החשבונאית של הקופה לבין שידור עסקאות
## האשראי, מה שחלק מהקופות לא אוהבות שקורה.
## 1יימר פעיל. התקשורת לשב"א תהיה אוטומטית ויזומה על ידי   – ט
## הפינפד. והזמן לתקשורת לשב"א יהיה לפי הזמן שהתקבל בפרמטרים
## משב"א. ניתן לפנות לשב"א ולקבוע זמן אחר. כמובן שגם עם טיימר
## פעיל, הקופה עדיין יכולה לשלוח פקודה לביצוע תקשורת.
## 2יימר פעיל. התקשורת לשב"א תהיה אוטומטית ויזומה על ידי   – ט
## הפינפד. הזמן לתקשורת לשב"א יהיה לפי הזמן שהוגדר בתגית
ShvaTime. הפינפד יתעלם מהזמן שנקבע בפרמטרים שהגיעו משב"א.

## ברירת המחדל  בפינפד חדש היא  0. כלומר בפינפד שלא קיבל עדיין אף
## פקודת
## Configuration, סוג הטיימר יהיה 0 (אין טיימר).
## השימוש הנפוץ הוא ברירת המחדל (0, אין טיימר).
0 – Not timer. Communication to Shva will be done only using a
command from the ECR.
1 – Timer is on. Automatic call to Shva will be made according to the
schedule that was received in the parameters from Shva
2 – Timer is on. Automatic call to Shva will be made according to the
schedule that was received in tag ShvaTime.
## 198
CommType


ShvaAddresss The IP address of Shva server
SwitchAddress1 For Switch support Only
The IP address of the Switch server (can be URL)
## N/A
SwitchAddress2 support onlyFor Switch
The backup IP address of the Switch server (can be URL)
## N/A
CaspitAddress The IP address of the Technician server N/A
TMSAddress The IP address of the TMS server N/A
ReportServerAddress The IP address of the report server (can be URL).
Only if a report server is being used.
## N/A
CertServerAddress The IP address of the certificates server (can be URL)
Only if a certificates server is being used.
## N/A

Document Version 1.53   Caspit SmartRetail Solution
## 136

Tag name Description Matching TLV tag
(Caspit internal)
LogServerAddress The IP address of the log server (can be URL) N/A
DateTime The current date time stamp of the Pinpad N/A
EnableIdleSwipe 0 – Idle swipe is disabled
1 – Idle swipe is enabled
See request for explanation.
## N/A
ShvaBusinessName The name of the business as received from Shva (in the parameters from
## Shva)

ShvaVersion The version of the Ashrait EMV application as it is sent to Shva.
EnableSmartSwipe 0 – Smart swipe is disabled
1 – Smart swipe is enabled. If you start a transaction and the pinpad is
waiting for a card. If a card is swiped and the card is not recognized as a
credit card then the pinpad will not perform a transaction but it will
return a response suitable for "swipe only" command.

## 083
BlockDoubleTrans 0 – Block double transaction is disabled
1 – Block double transaction is enabled. The pinpad will refuse the
transaction if the same card number, same amount and same voucher
number are used as in the last transaction.
## 084
SetupDateTime The time stamp of when the Ashrait EMV setup was done
## (YYYYMMDDHHNNSS)
Ashrait EMV must keep this information in the params file.
## N/A
LastTranDateTime The time stamp of the last transaction made N/A
LastShvaDateTime The time stamp of the last Shva communication
LastSwitchDateTime The time stamp of the last Switch communication (FFU) N/A
LastCaspitDateTime The time stamp of the last Caspit communication (to the Technician
## Server)
## N/A
LastTMSDateTime The time stamp of the last TMS communication N/A
AccessControl 0 – Access control is disabled.
1 – Access control is enabled. Entering to SmartRetail application will
require the user to enter a password or to swipe a technician card.

## N/A
RequestId Must be the same value as in the request
AshraitSSL 0 – Ashrait EMV is not using SSL
1 – Ashrait EMV is using SSL


Document Version 1.53   Caspit SmartRetail Solution
## 137

Tag name Description Matching TLV tag
(Caspit internal)
UnsentTransactions If there are unsent transactions in the memory of the Pinpad then this tag
will return the number of unsent transactions. If there are no transactions
in the memory, then this tag will return zero.
## 214
EnableFullPan 0 – Full PAN is disabled. The Pinpad will never send out the full PAN of a
credit card. The PAN will always be masked. The PAN will be masked in
the transaction response XML, in the receipt XML, in the TRAN record.
## Everywhere.
1 – Full PAN is enabled. The transaction response will be sent with the full
PAN visible. The full PAN will be in the <Pan> tag and also in the
<ReceiptMerchant> receipt text. The PAN will still be masked in the TRAN
record.
The default in a new Pinpad is 0. Meaning, in a Pinpad that didn't get any
Pinpad configuration command, The full PAN will be disabled.
## 215
CardInside 0 – No card inside
1 – Card inside contact reader
This is an important issue. With EMV, it is very common for the
cardholder to forget his card inside the Pinpad. The ECR should always
check if the card is still inside and alert the merchant about it.
## 220
BlacklistStatus 0 – Everything is OK with the black list
1 – There is a problem with the black list. The ECR may start a
communication to Shva to get again the black list. If the ECR doesn't want
to transmit the transactions, it can use the Generic Command with sub
command 006, to call Shva and get blacklist, but without sending the
transactions
## 246
ShvaParamStatus 0 – Everything is OK with the Shva parameters
1 – There is a problem with Shva parameters. The may start a
communication to Shva to get again he parameters. If the ECR doesn't
want to transmit the transactions, which may exist in the Pinpad, it can
use the Generic Command with sub command 006, to call Shva and get
the Shva parameters.
## 247
EnableTransSteps 0 – Transaction steps are disabled
1 – Transaction steps are enabled. The Pinpad will update the PC about
the current step of the transaction.
The ECR is responsible to set up a TCP listener.
## 222

Document Version 1.53   Caspit SmartRetail Solution
## 138

Tag name Description Matching TLV tag
(Caspit internal)
TransStepsAddress
The IP address and the port number of the listener for the transaction
steps.
## Format:
## XXX.XXX.XXX.XXX/YYYYY
YYYYY is the port number
For example:
## 192.168.0.1/24321
## 223
MustTransSteps This flag can make the transaction steps mandatory.
0 – If transaction steps are enabled, but the listener is not working, the
Pinpad will continue with the transaction.
1 – If transaction steps are enabled, but the listener is not working, the
Pinpad will stop the transaction with result code 10026.
## 242
SwitchEnabled 0 – Switch is disabled
1 – Switch is enabled. The Pinpad is using a Switch to authorize the
transactions.
This is a read-only tag. The Switch flag is set during the Pinpad setup
wizard.
## 243
CardEntryTimeout The timeout in seconds to wait for the cardholder to swipe/tap/insert his
card.
This value is set by Shva and the Pinpad get this value during the daily call
to Shva.
This is a read-only tag.
The ECR should consider this timeout value when it waits for the
transaction to end.
## 244
PinEntryTimeout The timeout in seconds to wait for the cardholder to enter his PIN.
This value is set by Shva and the Pinpad get this value during the daily call
to Shva.
This is a read-only tag
The ECR should consider this timeout value when it waits for the
transaction to end. Together with the previous timeout (the
CardEntryTimeout) the total time of the transaction can be
CardEntryTimeout + PinEntryTimeout.
## 245
SwitchName Switch Support
The name of the Switch
## 249

Document Version 1.53   Caspit SmartRetail Solution
## 139

Tag name Description Matching TLV tag
(Caspit internal)
SwitchId Switch Support
The ID of Switch.
## 250
BlockAutoSwitchBatchDelete Switch Support
0 – Default value. If the Switch batch is empty, the Switch batch will be
deleted automatically on midnight.
1 – Switch batch will not be deleted automatically. The ECR will be
responsible to delete the Switch batch using Generic Command sub
command 013.
## 256
PinpadLock 0 – Pinpad is not locked.
1 – Pinpad is locked. It will not be possible to enter the system menu or
the application menu.
The Pinpad lock can be configured also from the Pinpad menu.
## 257
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 140

## 18. Generic Command
As the name suggests, this command is used to perform various tasks (sub commands).
## 18.1 Generic Command Request
<Request>
<Command>010</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<SubCommand>001</SubCommand>
<Address>192.168.1.1</Address>
<RequestId>20160216155540</RequestId>
</Request>

Caspit Internal (This part is intended for Caspit developers)
Command flow:
- When Terminal Id is 0000000 (RAV SAPAK), it will:
o verify that the sub command is 12 or 13, otherwise error
o verify that the terminal is RAV SAPAK
o transmit unsent transactions to switch (12) or delete tran file (13), for all terminal Ids
o return success if all succeeded (0,10019,10021), otherwise error 10025 for 12 or 10024 for 13
o return all failed terminals

Ashrait EMV will prepare the TOTAL.ASH file in the HOST folder and will return the control to SmartRetail. The TOTAL.ASH
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
## Command
## פקודהמספר .
## לפקודת ג'נרית, מספר הפקודה היא 010
The command number for Generic Command is 010
## 001
TerminalId
## מספר מסוף  או 0000000במקרה של תת פקודות  12/13   במקרה של רב ספק
Terminal id or 000000 for sub commands 12/13 in case of RAV-SAPAK
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 40
SubCommand
001 – Call Switch parameters. If Switch is supported, SmartRetail will call
the Switch to get parameters. Our current Switch doesn't support
parameters so This feature is not ready yet
002 – Call Caspit Technician server. Ashrait EMV will call the Caspit
technician server to get parameters. Note that Ashrait EMV has an
automatic timer that calls Caspit Technician server every night. This
## 238

Document Version 1.53   Caspit SmartRetail Solution
## 141

Tag name Description Matching TLV tag
(Caspit internal)
command can be used if another call is necessary.
003 – Send logs to FTP. Ashrait EMV will connect to an FTP server and will
upload the logs. Note that Ashrait EMV can be configured (using the Ashrait
EMV menu) to send the logs automatically every night.
004 – Call certificates server. If a certificates server is supported,
SmartRetail will call the certificates server to obtain a new certificate. This
feature is not ready yet.
005 – Call reports server. If a reports server is supported, Ashrait EMV will
call the reports server to get a report. This feature is not ready yet.

006 – Call Shva. WITHOUT TRANSMITTING TRANSACTIONS. But get
updated parameters and updated black list. If you want to call Shva to send
the transactions then you should use the Transmit Transactions Command
(chapter 15). If you just want to test the connection to Shva, you should
use the Communication Test Command.
007 – Call TMS (Terminal Management System). This call may take time.
The Pinpad will return a response immediately saying that it got the
request and then the Pinpad will start the TMS call. If a new software
version exists for the Pinpad then the Pinpad will download the new
version and will install it. The ECR can wait a few minutes and then start to
poll the Pinpad in order to check if the Pinpad is back online. The Pinpad
may a reboot itself during the call to the TMS. This is normal behavior. The
ECR can use the Communication Test Command to poll the Pinpad
008 – Restart Pinpad (reboot). The Pinpad will return a response
immediately saying that it got the request and then the Pinpad will restart
itself. The ECR can wait a few seconds and then start to poll the Pinpad in
order to check if the Pinpad is back online. The ECR can use the
Communication Test Command to poll the Pinpad.
009 – Ping address. The Pinpad will try to ping the address from the tag
<Address>
010 – Delete Shva parameters. After deletion of Shva parameters, the ECR
must tell the Pinpad to call Shva to get new Shva parameters. It is not
possible to do transactions without Shva parameters.
011 – Delete Shva black list. After deletion of Shva black list, the ECR must
tell the Pinpad to call Shva to get new Shva black list.
## Switch Support
012 – If Switch is supported. Call the Switch and notify the Switch about all
the transactions records that were not notified.
The Switch is accumulating these transaction records in the Switch
database (transactions are still NOT sent to Shva).
The Pinpad TRAN file will NOT be deleted after this command. It will remain
as it is and new transactions will continue to accumulate in the same

Document Version 1.53   Caspit SmartRetail Solution
## 142

Tag name Description Matching TLV tag
(Caspit internal)
Pinpad TRAN file.
The ECR may call this command after every transaction or after a couple of
transaction. It is up to the ECR to decide.
013 – If Switch is supported. Delete the current Pinpad TRAN file. The
Pinpad TRAN file can be deleted only if the Switch was notified about all
transactions. If not all transactions are notified, the ECR will need to use
Generic Command 012 to notify the Switch about the unnotified
transactions and then try again Generic Command 013.
The Pinpad will not do all of this automatically. It is up to the ECR to handle
this situation of unnotified transaction.
Note that there is also an automatic timer event that deletes the TRAN on a
predefined hour. This generic command 013 is used in case there is a need
to delete the TRAN now and not to wait for the automatic timer event.
014 – If Switch is supported. The Pinpad will call the Switch and will tell the
Switch to transmit all accumulated transactions to Shva. Pay attention that
this is a Switch operation. The Switch is the one that transmits the
transactions, the Pinpad just tells the Switch to do it now.
You should spend some time for a better understanding of the difference
between Generic Command 012 and Generic Command 014. It is very
important to understand the difference.
015 – Abort J2 transaction. This sub command tells the Pinpad that the
transaction that started with J2 (see explanation of J2 in chapter 9.2) will
not be completed.
If a J2 transaction was performed with the smart card (with the chip) then
the Pinpad will display "Do not remove card" while waiting for J4 to
complete the transaction. But if the ECR decided to NOT complete the
transaction then we want to tell the Pinpad that it should not wait anymore
for J4 and that the card can be removed.
Address IP Address.
Relevant to sub command 009 - Ping

RequestId
## הקופה תייצר את המזהה הזה (למשל תאריך ושעה). אותו  מזהה בקשה .
## זהה אמור לחזור בתשובה, וכך ניתן לוודא שהתשובה מתאימה לבקשה. מ

## Request Id
## N/A
Request Closing tag of the request XML N/A

## 18.2 Generic Command Response
<Response>
<Command>010</Command>
<TerminalId>0880264</TerminalId>

Document Version 1.53   Caspit SmartRetail Solution
## 143

<TermNo>001</TermNo>
<SubCommand>001</SubCommand>
<ResultCode>000</ResultCode>
<RequestId>20160216155540</RequestId>
</Response>

RAV SAPAK (error response)
<Response>
<Command>010</Command>
<TerminalId>0000000</TerminalId>
<TermNo>001</TermNo>
<SubCommand>001</SubCommand>
<ResultCode>10025</ResultCode>  for subcommand 12 or 10024 for subcommand 13
<RequestId>20160216155540</RequestId>
<FailedTerminal>0880264,0880269</FailedTerminal>
</Response>


Response XML tags:
Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## , מספר הפקודה היא לפקודה ג'נרית010
Should be the same as in the request
## N/A
TerminalId
## מספר מסוף
Should be the same as in the request
## N/A
TermNo
## מספר קופה
Should be the same as in the request
## N/A
SubCommand Should be the same as in the request N/A
ResultCode Relevant result codes:
## 0 – Success
If the sub command is invalid:
## 10056 - RETVAL_UNSUPPORTED_GENERIC_COMMAND_CODE
## N/A

Document Version 1.53   Caspit SmartRetail Solution
## 144

Tag name Description Matching TLV tag
(Caspit internal)
For sub command 001:
## 10038 - RETVAL_SWITCH_CALL_FAILED
For sub command 002:
## 10060 - RETVAL_CASPIT_TECH_CENTER_FAILED
For sub command 003:
## 10057 - RETVAL_TRANSMIT_LOGS_FAILED
For sub command 004:
## 10037 - RETVAL_CERTIFICATES_SERVER_CALL_FAILED
For sub command 005:
## 10034 - RETVAL_REPORTS_SERVER_CALL_FAILED
For sub command 006:
## 10033 - RETVAL_SHVA_CALL_FAILED
For sub command 007:
## 10062 - RETVAL_STARTING_TMS_CALL_FAILED
For sub command 008:
## 10061 - RETVAL_TERMINAL_REBOOT_FAILED
For sub command 009:
## 10055 - RETVAL_NO_PING
For sub command 010:
## 10030 - RETVAL_SHVA_PARAMETERS_DELETION_FAILED
For sub command 011:
## 10031 - RETVAL_SHVA_BLACKLIST_DELETION_FAILED
For sub command 012:
## 10025 - RETVAL_SWITCH_TRANSACTIONS_SENT_FAILED
## 10021 - RETVAL_SWITCH_TRAN_FILE_IS_EMPTY
## 10019 - RETVAL_SWITCH_TRAN_FILE_NOTHING_TO_SEND
For sub command 013:
## 10024 - RETVAL_SWITCH_TRAN_HAS_UNSENT_TRANSACTIONS
For other result codes, see Appendix A
RequestId Should be the same as in the request N/A
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 145

## 19. Transaction Query
The PC ECR can query the Pinpad about the transactions made on the same day. Transaction query will be possible as long as the
transactions batch is not transmitted to Shva.
Transaction Query is useful for times when the status of a transaction is unknown. For example, if the ECR didn't get the response
of the transaction and the ECR doesn't know if the transaction was approved or not.
Transaction Query is based on the XML tag <Xfield>. For those of you that are familiar with Ashrait 96, the <Xfield> has the  same
meaning  as  the  X  tag  in  the  Ashrait  96  INT_IN  string.  Every  transaction  the  ECR  starts  must  include  the  XML  tag  <Xfield>.  The
<Xfield>  value  is  made  by  the  ECR.  Usually,  the  <Xfield>  will  be  the  ECR  voucher  number  (or  transaction  id,  invoice  number,  or
whatever you want to call it). The <Xfield> must be unique for each transaction in the ECR. However, the Pinpad  doesn't enforce
this  uniqueness,  the  Pinpad  will  allow  transactions  to  have  the  same  <Xfield>.  But  if  the  <Xfield>  will  NOT  be  unique,  the
Transaction  Query  will  not  function  properly,  because  the  Transaction  Query  will  return  the  first  result  that  it  finds,  the  f irst
transaction record that matches this <Xfield>.
## 19.1 Transaction Query Request
To query a transaction using a specific <Xfield>
<Request>
<Command>012</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
<Xfield>ECR303093</Xfield>
</Request>

To query the last transaction in the TRAN
<Request>
<Command>012</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
<Xfield>LAST</Xfield>
</Request>


Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A

Document Version 1.53   Caspit SmartRetail Solution
## 146

Tag name Description Matching TLV tag
(Caspit internal)
## Command
## פקודהמספר .
## , מספר הפקודה היא לשאילתת עסקה012
The command number for Transaction Query is 012
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר קופה
Station number (ECR number)
## 040
RequestId
## מזהה בקשה
## Request Id
## 051
## Xfield
## מספר \מספר עסקהבחלק מהקופות זה נקרא מספר השובר של הקופה (
## חשבונית)
## ריות הקופה לשלוח מספר שובר ייחודי עבור כל עסקה. מספר השובר  באח
## טטוס  לבדוק אתיכולה הקופה נשמר ביחד עם פרטי עסקת האשראי וכך ס
## העסקה ולשחזר את פרטיה.

## ניתן גם לשלוח את המילה "LAST" והפינפד יחזיר את העסקה האחרונה
## שרשומה לו בקובץ
## TRAN .
<Xfield>LAST</Xfield>
## 144
## Uid
## מספר מזהה עסקת מקור
## השדה הזא הוא אופציונלי ומופיע רק כאשר Xfield לא נשלח.
The  Original  Uid  from  Shva  is  used  to  query  transaction.  This  field is
optional and exist only if Xfield is missing.

## 127



Request Closing tag of the request XML N/A

## 19.2 Transaction Query Response
If the transaction is found, the response XML will include an inner XML that will be the full XML of the transaction response.  If the
found transaction was a successful transaction then the response XML will include also the receipt text.
For example:

<Response>
<Command>012</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>

Document Version 1.53   Caspit SmartRetail Solution
## 147

<RequestId>20160216155540</RequestId>
<Xfield>ECR303093</Xfield>
<EMV_Output>
## ...
...     (Here will come the complete response XML of the transaction)
## ...
## ...
<ReceiptMerchant>
Here will come the text lines of the merchant receipt
</ReceiptMerchant>
<ReceiptCustomer>
Here will come the text lines of the customer receipt
</ReceiptCustomer>
</EMV_Output>
</Response>


If the transaction cannot be found, then the response will be like that:
<Response>
<Command>012</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>10049</ResultCode>
<RequestId>20160216155540</RequestId>
<Xfield>ECR303093</Xfield>
</Response>

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the response XML N/A
## Command
## מספר פקודה.
## לשאילתת עסקה, מספר הפקודה היא 012
Should be the same as in the request
## 001

Document Version 1.53   Caspit SmartRetail Solution
## 148

Tag name Description Matching TLV tag
(Caspit internal)
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
EMV_Output


ResultCode 0 – Success
10049 - RETVAL_TRANSACTION_NOT_FOUND (the Pinpad searched for a
transaction with this <Xfield> but didn't find any matching transaction. It
is possible that the transaction has already been sent to Shva and so it
cannot be queried. Also, it is possible that the transaction has failed and
was not written in the TRAN file).
10102 - RETVAL_INVALID_X_FIELD (<Xfield> tag is missing)
See Appendix A for more result codes.
## N/A
RequestId Should be the same as in the request N/A
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 149

## 20. Retrieve File
This feature is not ready yet
- The ECR can retrieve files from the Pinpad. These files will mostly be log files (text files) but some files may be binary files.
- The Pinpad will read a block of data from the file (according to the BlockSize tag), the Pinpad will encode the block with
Base64 and return the encoded result to the ECR in tag BlockData.
- The ECR needs to decode BlockData using Base64 and keep the decoded block in a file.
- Then the ECR will ask for the next block of data.
- There  will  be  a  white  list  of  files  that  are  allowed  to  be  retrieved.  The  requested  filename  will  be  checked  against  that
white list  and only if it  is  on  the  white list  then  the ECR will  get  that file.  For  security  reasons,  the white  list  cannot  be
changed. It is hardcoded.
- The white list can be seen below.
- Caspit will provide a feature, in the DLL, to decode Base64.
- The file retrieval session will most likely consists of many Retrieve File Requests and Retrieve File Responses until the ful l
file is retrieved.

## 20.1 Retrieve File Request
<Request>
<Command>016</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<Filename>EPA.LOG</Filename>
<BlockNumber>1</BlockNumber>
<BlockSize>1024</BlockSize>
<RequestId>20160216155540</RequestId>
</Request>

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number.
For Retrieve File command, the command number is 016
## 001
TerminalId
## מספר מסוף
## 006
TermNo
## מספר קופה
## 040
RequestId
## מזהה בקשה
## 051
Filename The filename that the ECR wants to retrieve.
The filename will be checked against a white list of files.

BlockNumber Block numbers starts with 1.

Document Version 1.53   Caspit SmartRetail Solution
## 150

Tag name Description Matching TLV tag
(Caspit internal)
BlockSize The BlockSize is the size of data before encoding it to Base64.
Obviously, after encoding the size will be larger.
## Default: 1024
## Maximum: 4096

Request Closing tag of the request XML N/A


## 20.2 Retrieve File Response
<Response>
<Command>016</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>20160216155540</RequestId>
<BlockNumber>1</BlockNumber>
<BlockSize>1024</BlockSize>
<MoreBlocks>Yes</MoreBlocks>
<BlockData>In Base64 endcoding </BlockData>
<Base64>Yes</Base64>
</Response>

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A
Command Command number.
For Retrieve File command, the command number is 016
## 001
TerminalId
## מסוף מספר
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
RequestId
## מזהה בקשה
Should be the same as in the request
## 051

Document Version 1.53   Caspit SmartRetail Solution
## 151

Tag name Description Matching TLV tag
(Caspit internal)
ResultCode 0 – Success
10040 - RETVAL_FILE_CANNOT_BE_RETRIEVED (this error will happen if the
file cannot be found in the Pinpad or if it is not in the white list of files)
## 10052 - RETVAL_INVALID_BLOCK_NUMBER_TO_RESUME
Other result codes may arrive.
## See Appendix A
## 010
BlockNumber Should be the same as in the request 064
BlockSize
The size of data before base64 encoding. If it is the last block then it might
be less than the block size of the request.
After decoding the <BlockData>, the ECR should check that the decoded
size is equal to the <BlockSize>
## 065
MoreBlocks Yes – there are more blocks read in the file
No – no more blocks in the file

If <MoreBlocks> is Yes then the ECR will increment the <BlockNumber> and
will call again the Retrieve File command.
## 066
BlockData The block data of the file (could be In Base64 encoding)
Base64 Some files may not need to be encoded by Base64, so this tag will tell the
ECR if the BlockData is encoded by Base64 or not.
The decision if to encode in Base64 (or not encode) is made by the Pinpad.
Yes – BlockData is encoded by Base64
No – BlockData is not encoded.

Response Closing tag of the response XML N/A

## 20.3 Retrieve File White List
The next table lists the currently supported files that can be retrieved using this command.
## Filename Description
ASH_EMV.LOG Main log file of Ashrait EMV application
ASH_EMV.LG0 Previous log file of Ashrait EMV
EPA.LOG Main log file of the EPA application (EMV Contact application)
EPA.LG0 Previous log file of the EPA application (EMV Contact application)
CPA.LOG Main log file of the CPA application (EMV Contactless application)
CPA.LG0 Previous log file of the CPA application (EMV Contactless application)

Document Version 1.53   Caspit SmartRetail Solution
## 152

## Filename Description
SMART_RET.LOG Main log file of the SmartRetail application
SMART_RET.LG0 Previous log file of the SmartRetail application



Document Version 1.53   Caspit SmartRetail Solution
## 153

## 21. Swipe Command
The PC ECR can use the Pinpad as a simple Magnetic Stripe Reader (MSR). This can be useful if there is a need to read a non credit
card.  If a non credit card is swiped, the Pinpad will response with the magnetic data.  However, if the card is identified as a credit
card then the Pinpad will return with an error.
Examples for non-credit-cards: Loyalty club card, timeclock card, employee card, technician card, etc.
The command also enable the user to enter number by keypad.
There are three "Swipe" features in the Pinpad, some may find it a bit confusing, and so I will summarize them here:
- The Swipe Command is described here, in this chapter. It is a command that is initiated by the PC.
- The Smart Swipe is a feature that changes a transaction request into a Swipe response. See chapter 9.5.
- The Idle Swipe is a feature that allows swiping cards while the Pinpad is in idle mode. See Appendix G.
In default, a message "please swipe a card or enter number" is displayed.
Incace ECR sends Tag Line1 and/or Line2 it will replace the default message.

## Caspit Internal
The Swipe command will be done by SmartRetail. Ashrait EMV doesn't need to take part in this command.
Algorithm for detecting credit cards
A magnetic card is identified as a credit card, if the track2 data includes the "=" character and if there are 11 to 19 digits before
the "=".
For special cards, we will add special handling (like Praxell cards).
To  support  Praxell card,  if  the card  is  identified  as a credit card,  SmartRetail  will make  another  validation  and  it  will check  if  the
Track2  data  contains  the  following  string "=1962". If  this  string  exists  in  the Track2  data  then  this  card is  a  Praxell  card  and  the
Track2 can be sent out.
## 21.1 Swipe Request
<Request>
<Command>023</Command>
<TimeoutInSeconds>30</TimeoutInSeconds>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<Line1>8OAg5Pfs4y/pIDQg8fT45fo=</Line1>
<Line2>4Of45fDl+iD57CD6LuY=</Line2>
<RequestId>20230912173747</RequestId>
</Request>

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A

Document Version 1.53   Caspit SmartRetail Solution
## 154

Tag name Description Matching TLV tag
(Caspit internal)
Command Command number.
For Swipe command, the command number is 023
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number
## 040
TimeoutInSeconds Timeout in seconds.
If tag doesn't exist then a default timeout of 30 seconds will be used.
## 005
Line1  20 characters Base 64 (Hebrew iso8859-8 encoding) - optional
Line2  20 characters Base 64 (Hebrew iso8859-8 encoding) - optional
RequestId
## מזהה בקשה
## 051
Request Closing tag of the request XML N/A


## 21.2 Swipe Response
Successful swipe of a non-credit card.
<Response>
<Command>023</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>20160216155540</RequestId>
<Track1>23093809348503</Track1>
<Track2>45804580458045802302983042948093</Track2>
<Track3>30958309583095304593840</Track3>
<PanEntryMode>0</PanEntryMode>
</Response>

(Not all the <trackX> tags will be filled. It depends on the specific card.)




Document Version 1.53   Caspit SmartRetail Solution
## 155

If the swiped card is identified as a credit card, the response will be like this:
<Response>
<Command>023</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>11000</ResultCode>
<RequestId>20160216155540</RequestId>
<CardHash>2F9A8B7C2F9A8B7C2F9A8B7C2F9A8B7C</CardHash>
<PanEntryMode>0</PanEntryMode>
</Response>

If keypad is used to enter number, the response will be like this:
<Response>
<Command>23</Command>
<TerminalId>0883073</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>20231210162435</RequestId>
<Track2>1234</Track2>
<PanEntryMode>51</PanEntryMode>
</Response>

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A
Command Command number.
For Swipe command, the command number is 023
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה  מספר עמדה) \(מספר תחנה
Station number/ECR number
## 040
RequestId
## מזהה בקשה
Should be the same as in the request
## 051

Document Version 1.53   Caspit SmartRetail Solution
## 156

Tag name Description Matching TLV tag
(Caspit internal)
ResultCode Relevant result codes:
## 0 -  Success
## 10003 – RETVAL_INCORRECT_TERMINAL_ID
## 10022 – RETVAL_INCORRECT_ECR_NUMBER
## 10036 – RETVAL_XML_MISSING_TERMINAL_ID_TAG
## 11000 - RETVAL_CANNOT_SEND_OUT_CREDIT_CARDS

For other result codes, see Appendix A
## 010
Track1 Track1 data, if exists 064
Track2 Track2 data, if exists, or number from keypad entry 065
Track3 Track3 data, if exists 066
CardHash MD5 of the card number.
The hash is relevant to valid credit cards.
There will be no hash for non-credit cards.

PanEntryMode 0 for card swipe, 51 for keypad entry
Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 157

## 22. Retrieve Deposit Report
- The deposit report is received from Shva. The report is not made by the Pinpad.
- If the ECR wants, it can request the deposit report from the Pinpad and print it in the ECR printer.
- The input for the deposit report request is the Session-Number (Asmachta number) and the date of the deposit.
- The Pinpad may need to perform a communication to Shva to get the deposit report, because only the last deposit report is
kept in the Pinpad.
- The deposit report is NOT a detailed report. You will not find there the details of every single transaction. The report is a
summary of all the transactions. The summary is grouped by card types and transaction types. If you need a detailed report,
have a look at Retrieve Tran File command.
## Switch Support
When using a Switch, the Deposit Repot is irrelevant because transactions are not kept in the Pinpad.
Caspit Internal (This part is intended for Caspit developers)
Command flow:
- If XML Session-Number valu is LAST:
o The valus of Session-Number and Date to be sent to SHVA shell be taken from last Transmit transaction to SHVA
respons

## 22.1 Deposit Report Request
<Request>
<Command>015</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
<Session-Number>29238392</Session-Number>
<Date>2016-11-27</Date>
</Request>

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number.
For Depsit Report, the command number is 015
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040

Document Version 1.53   Caspit SmartRetail Solution
## 158

Tag name Description Matching TLV tag
(Caspit internal)
Session-Number
## כפי שהתקבל בתשובת ה  מספר אסמכתא של שב"אTOTAL  או הSTATIS .
## או ערך LAST
The session number from Shva or LAST
## 015
## Date
## תאריך אסמכתא.
## כפי שהתקבל בתשובת ה TOTAL  או הSTATIS .
## YYYY-MM-DD
The date of the deposit
## 213
RequestId
## מזהה בקשה
## Request Id
## 051
Request Closing tag of the request XML N/A

## 22.2 Deposit Report Response
<Response>
<Command>015</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>20160216155540</RequestId>
<Session-Number>29238392</Session-Number>
<Date>2016-11-27</Date>
<DepositReport>
<Line> Text Text Text </Line>
<Line> Text Text Text </Line>
## .....
## .....
More lines will come here
## ....
## ....
</DepositReport>
</Response>


Document Version 1.53   Caspit SmartRetail Solution
## 159

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A
Command Command number.
For Deposit Report, the command number is 015
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר קופה
Should be the same as in the request
## 040
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
ResultCode 0 – Success
## 10003 – RETVAL_INCORRECT_TERMINAL_ID
## 10022 – RETVAL_INCORRECT_ECR_NUMBER
## 10036 – RETVAL_XML_MISSING_TERMINAL_ID_TAG
10103 – Error. Cannot find deposit report
## (RETVAL_CANT_FIND_DEPOSIT_REPORT)
10104 – Error. <Session-Number> tag is missing or invalid
## (RETVAL_INVALID_SESSION_NUMBER_XML_TAG)
10105 – Error. <Date> tag is missing or invalid
## (RETVAL_INVALID_DATE_XML_TAG)
## Other – See Appendix A
## 010
Session-Number The response value must be identical to the request 015
Date The response value must be identical to the request 213
DepositReport XML Group that will contain all the lines of the deposit report.
<DepositReport>
<Line> Text Text Text </Line>
<Line> Text Text Text </Line>
## .......
<DepositReport>

The Hebrew characters will be encoded with ISO8859-8.
The Pinpad should be configured in Shva as having a 80mm printer.

Response Closing tag of the response XML N/A


Document Version 1.53   Caspit SmartRetail Solution
## 160

Example of deposit report:
<DepositReport>
<Line> המכולת של שמוליק</Line>
<Line>מספר מסוף:  0880023</Line>
<Line>תאריך: 11/12/2016 </Line>
<Line>שעה: 10:16</Line>
<Line></Line>
<Line>מספר עסק ישראכרט</Line>
<Line>0071506</Line>
<Line>מספר עסק כאל</Line>
<Line>7007245</Line>
<Line>מספר עסק לאומיקארד</Line>
<Line>0300012</Line>
<Line>מספר קובץ: 30 </Line>
<Line>אסמכתה: 05017766 </Line>
<Line>====================</Line>
<Line>סה"כ שקל חובה</Line>
<Line>0004      10.00</Line>
<Line>סה"כ שקל זכות </Line>
<Line>0002      3.00</Line>
<Line> ..............................</Line>
<Line>===============</Line>
<Line>סה"כ סולק לאומי קארד</Line>
<Line>===============</Line>
<Line>לאומי קארד שקל חובה </Line>
<Line>0004     10.00</Line>
<Line>===============</Line>
<Line>ויזה     שקל חובה </Line>
<Line>0004         10.00<Line>
</DepositReport>

Document Version 1.53   Caspit SmartRetail Solution
## 161

- UI Command
The UI Command is not implemented yet.
- The ECR can use the UI command to display some messages on the Pinpad screen.
- There is a predefined list of messages that can be displayed. You can see this list in paragraph 23.3, below.
- Some of the messages will be displayed on the Pinpad screen until timeout or until key press.
- But some messages, the ones with "Remove Card", will also wait until timeout or until card removal.
- It is possible to add the waiting for card removal for all messages by using the tag <WaitCardRemoval>
23.1 UI Command Request
<Request>
<Command>019</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
<MessageCode>001</MessageCode>
<WaitCardRemoval>1</WaitCardRemoval>
<WaitForKey>1</WaitForKey>
<TimeoutInSeconds>5</TimeoutInSeconds>
<Language>iw_IL</Language>
</Request>

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number.
For UI command, the command number is 019
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
MessageCode The code of the message to display. The code must be taken from the list of
predefined messages. You can see the list below.

## 239

Document Version 1.53   Caspit SmartRetail Solution
## 162

Tag name Description Matching TLV tag
(Caspit internal)
WaitCardRemoval 0 – The Pinpad will NOT wait for card removal, unless the message code
has a "build in" wait for card, like message code 001.
1 – The Pinpad will add the line "Please Remove Card" in the lower line of
the screen and will wait for card removal (If the message code has a "build
in" wait for card, like message code 001, then this tag will have no effect,
because waiting for card removal is already implied by message code 001).
Pay attention that if you ask to wait for card removal, but there is no card
inside, then the message that you want to display (like "Tran Success") will
not be displayed at all, because the Pinpad will sense that there is no card
inside and will decide not to wait and not to show the message at all.
## 241
WaitForKey 0 – The Pinpad will not accept any key press during the UI command. So
timeout or card removal will be the only way to exit this command.
1 – The Pinpad will accept the RED key during the UI command. Pressing
the RED key will abort the UI command. Of course, timeout or card removal
will also exit the UI command.
## 248
TimeoutInSeconds
How many seconds to display the message or how many seconds to wait
for card removal

## 005
Language "iw_IL" – Hebrew
"en_US" - English
## 240
RequestId
## מזהה בקשה
## 051
Request Closing tag of the request XML N/A

23.2 UI Command Response
<Response>
<Command>019</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<MessageCode></MessageCode>
<RequestId>20160216155540</RequestId>
<CardInside>0</CardInside>
</Response>

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A

Document Version 1.53   Caspit SmartRetail Solution
## 163

Tag name Description Matching TLV tag
(Caspit internal)
Command Command number.
For UI command, the command number is 019
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
ResultCode 0 – Success
## 10003 – RETVAL_INCORRECT_TERMINAL_ID
## 10022 – RETVAL_INCORRECT_ECR_NUMBER
## 10036 – RETVAL_XML_MISSING_TERMINAL_ID_TAG
## 10027 – RETVAL_INVALID_MESSAGE_CODE
## 10017 - RETVAL_USER_PRESSED_ON_RED_KEY
## Other – See Appendix A
## 010
MessageCode Should be the same as in the request 239
CardInside 0 – No card inside
1 – Card inside contact reader
The ECR should examine this tag and see if the card is still inside. If it is
inside, the ECR may alert the cashier or ask again to remove the card.
## 220
Response Closing tag of the response XML N/A

23.3 List of messages
## Message
## Code
## Explanation Hebrew Text English Text
## 001
The ECR will display the message and will wait until
card remove or until timeout
## העסקה אושרה
## נא הוצא כרטיס
## Transaction
## Approved
## Remove Card
## 002
The ECR will display the message and will wait until
card remove or until timeout

## העסקה לא אושרה
## נא הוצא כרטיס
## Transaction Declined
## Remove Card
## 009
The ECR will display the message and will wait until
card remove or until timeout
## נא הוצא כרטיס
Remove card
## 013
The ECR will display the message and will wait until
timeout or key press
## כרטיס לא תקין
Card error

Document Version 1.53   Caspit SmartRetail Solution
## 164

## Message
## Code
## Explanation Hebrew Text English Text
## 014
The ECR will display the message and will wait until
timeout or key press

## כרטיס לא נתמך
Unrecognized card
## 016
The ECR will display the message and will wait until
timeout or key press

## העסקה אושרה
## Transaction
## Approved
## 017
The ECR will display the message and will wait until
timeout or key press

## העסקה לא אושרה
## Transaction Declined
## 022
The ECR will display the message and will wait until
timeout or key press
## מספר כרטיס שגוי
Invalid card number
## 024
The ECR will display the message and will wait until
timeout or key press
## כרטיס לא בתוקף
Card expired
## 032
The ECR will display the message and will wait until
timeout or key press
## מועדון לא תקין כרטיס
Invalid Loyalty card
## 033
The ECR will display the message and will wait until
timeout or key press
## לא תקין  מתנה כרטיס
## Invalid Giftcard


- QR Code Display / Scan Command
## Caspit Internal:
The Display QR Code Command will response immediately to ECR and will display the QR until getting any other command, or it
will wait for a given time out or until Break key pressed or until Break command received with Step response.
The same command, without QR data, will be used to Scan QR by camera. In this case the response will wait till reading the QR
or till a given time out or until Break key pressed or until Break command received with Step response.
24.1 QR Code Display / Scan Command Request
<Request>
<Command>020</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
<QrCode>1236543957395790573294574329573945</QrCode>
<TimeoutInSeconds>30</TimeoutInSeconds>
</Request>

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A

Document Version 1.53   Caspit SmartRetail Solution
## 165

Tag name Description Matching TLV tag
(Caspit internal)
Command Command number.
For QR code display command, the command number is 020
## 001
TerminalId
## מספר מסוף
## Terminal Id
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
QrCode The QR code to display.
This Tag should not be sent for Scanning QR by camera
## 239
TimeoutInSeconds How many seconds to display the message or how many seconds to wait
for card removal

## 005
RequestId
## מזהה בקשה
## 051
Request Closing tag of the request XML N/A

24.2 QR Code Display Command Response
<Response>
<Command>020</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<QrCode>1236543957395790573294574329573945</QrCode>
<RequestId>20160216155540</RequestId>
</Response>

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A
Command Command number.
For QR code display command, the command number is 020
## 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040

Document Version 1.53   Caspit SmartRetail Solution
## 166

Tag name Description Matching TLV tag
(Caspit internal)
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
ResultCode 0 – Success
## 10003 – RETVAL_INCORRECT_TERMINAL_ID
## 10022 – RETVAL_INCORRECT_ECR_NUMBER
## 10036 – RETVAL_XML_MISSING_TERMINAL_ID_TAG
## 10027 – RETVAL_INVALID_QR_CODE
## 10017 - RETVAL_USER_PRESSED_ON_RED_KEY
## Other – See Appendix A
## 010
QrCode This Tag will be recived only when Scanning QR by camera 239
Response Closing tag of the response XML N/A

- Delek Commands extension
## Caspit Internal:
The Payment session in Dlek is performed in two parts (phaseRequest2 = 1)
- The first part is J59 request with amount that was agreed between the credit card company and the delek company
- The secomd part is J49 to update obligo and registering the transaction.
- Unlike J5, J59 can be approved offline upto card offline amount
- J5 with parameter Tidluk is equels to J59
25.1 Delek J5 /J59 Command Request

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number. For J5/J59 the command number is 001 001
RequestId
## מזהה בקשה
## 051
TerminalId
## מספר מסוף
## 006
TermNo
## מספר עמדה) \(מספר תחנה קופהמספר
Station number/ECR number.
## 040
TimeoutInSeconds How many seconds to display the message or how many seconds to wait
for card removal

## 005
## Mti 100

Document Version 1.53   Caspit SmartRetail Solution
## 167

Tag name Description Matching TLV tag
(Caspit internal)
CreditTerms
## 1
TranType
## 1
## Amount
The fixed amount that was agreed between the credit card company and
delek company


## Currency
## 376
PanEntryMode
pinpad
Xfield ECR transaction id
ParameterJ The value is 5 to perform a pre authorization transaction
Tidluk Indication for fuelling transaction
Request Closing tag of the request XML N/A


<Request>
<Command>001</Command>
<TerminalId>0880349</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>1</TranType>
<Amount>50000</Amount>
<Currency>376</Currency>
<TermNo>1</TermNo>
<PanEntryMode>40</PanEntryMode>
<XField>0880349</XField>
<CreditTerms>1</CreditTerms>
<AddendumSettl>{"IF REQUIRED"}</AddendumSettl>
<RequestId>20211005105800</RequestId>
<Pan>0004557449999990233</Pan>
<AllowCardInsideBefore>1</AllowCardInsideBefore>
<Tidluk>1</Tidluk>
<ParameterJ>5</ParameterJ>
<ContinueJ2>1</ContinueJ2> optional (if J2 was used before)
</Request>




## 25.2 Delek J5 Command Response

Tag name Description Matching TLV tag
(Caspit internal)

Document Version 1.53   Caspit SmartRetail Solution
## 168

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A
Command Command number. For J5 the command number is 001 001
TerminalId
## מספר מסוף
Should be the same as in the request
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
RequestId
## מזהה בקשה
Should be the same as in the request
## 051
ResultCode 0 – Success. (See Appendix A) 010
AuthorizedAmount The authorized amount for processing
amount The amount in the request
AuthorizatinNo The authorizarion number from issuer
RRN Unique number for transaction if approved
TwoPhaseRequest The value is 1 if online obligo update is supported
## Uid


Response Closing tag of the response XML N/A

<EMV_Output>
<Command>1</Command>
<TerminalId>0880349</TerminalId>
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<CardHash>B7C6A4A6F3524875C476FA0F5ACD46D7</CardHash>
<Mti>100</Mti>
<CardName>בהז הזיו        </CardName>
<CardType>041</CardType>
<Currency>376</Currency>
<DateTime>1005151842</DateTime>
<AuthManpikNo>4646913</AuthManpikNo>
<AuthCodeManpik>1</AuthCodeManpik>
<Rrn>127815646913</Rrn>
<TranType>1</TranType>
<CreditTerms>1</CreditTerms>
<Amount>50000</Amount>
<AuthorizedAmount>35000</AuthorizedAmount>
<TwoPhaseRequest >1</TwoPhaseRequest >
<Pan>0004557449999990233</Pan>
<PanEntryMode>40</PanEntryMode>
<Manpik>1</Manpik>

Document Version 1.53   Caspit SmartRetail Solution
## 169

<Brand>2</Brand>
<Solek>1</Solek>
<Uid>21100515184208803490011</Uid>
<spType>0</spType>
<Xfield>08802650012110</Xfield>
<RequestId>20211005151911</RequestId>
<Tidluk>1</Tidluk>
<ParameterJ>5</ParameterJ>




## 25.3 Delek J49 Command Request
## Caspit Internal:
The fuel filling done untill AuthorizedAmount is reached, or tank is full, the minimum of both.
The obligo is updated and the transaction is registered.

Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number. For J5 the command number is 001 001
RequestId
## מזהה בקשה
## 051
TerminalId
## מספר מסוף
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
## Mti 100
OriginalAmount
The fixed amount that was agreed between the credit card company and
delek company from the first step

## Amount
The real amount
OriginalUid Uid from first step
Xfield ECR transaction id
Tidluk Indication for fuelling transaction
SwitchSend Value 1 for immediate send of transaction record to the GW
ParameterJ The value is 49 for final charge completion

Document Version 1.53   Caspit SmartRetail Solution
## 170

Tag name Description Matching TLV tag
(Caspit internal)
GasolineType
GasolineLiter
OilLiter
OilAmount
## Speedometer
CarNumber
ServiceAmount
Fuelling parametrs
Request Closing tag of the request XML N/A

<Request>
<Command>001</Command>
<TerminalId>0880349</TerminalId>
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TermNo>1</TermNo>
<XField>0880349510</XField>
<OriginalUid>21100515184208803490011</OriginalUid>
<OriginalAmount>50000</OriginalAmount>
<Tidluk>1</Tidluk>
<Amount>23500</Amount>
<SwitchSend>1</SwitchSend>
<GasolineType>02</GasolineType>
<GasolineLiter>00533</GasolineLiter>
<OilLiter>051</OilLiter>
<OilAmount>0007345</OilAmount>
<Speedometer>095248</Speedometer>
<CarNumber>36912401</CarNumber>
<ServiceAmount>0001250</ServiceAmount>
<RequestId>20211005152000</RequestId>
<ParameterJ>49</ParameterJ>
</Request>


Document Version 1.53   Caspit SmartRetail Solution
## 171

## 25.4 Delek J49 Command Response
## Caspit Internal:
The transaction verified that it was approved and the AuthManpikNo from first step will be received.
If fuel was not filled at all, the reversal transaction will be sent as following:
- The MTI is 420
- The Amount is fixed amount fro first step or approved amount
- The OriginalAuthorizationCodeManpik is value from first response
- The RRN is value from first step
- The OriginalAuthNum is value from first step
- The OriginalAuthorizationCodeManpik is approval issuer

<EMV_Output>
<Command>1</Command>
<TerminalId>0880349</TerminalId>
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<CardHash>B7C6A4A6F3524875C476FA0F5ACD46D7</CardHash>
<Mti>100</Mti>
<CardName>בהז הזיו        </CardName>
<Currency>376</Currency>
<DateTime>1005151842</DateTime>
<AuthManpikNo>4646913</AuthManpikNo>
<AuthCodeManpik>7</AuthCodeManpik>
<Rrn>127815646913</Rrn>
<TranType>1</TranType>
<CreditTerms>1</CreditTerms>
<Amount>35000</Amount>
<Pan>0004557449999990233</Pan>
<PanEntryMode>40</PanEntryMode>
<Manpik>1</Manpik>
<Brand>2</Brand>
<Solek>1</Solek>
<Uid>21100515184208803490011</Uid>
<spType>0</spType>
<GasolineType>02</ GasolineType>

Document Version 1.53   Caspit SmartRetail Solution
## 172

<GasolineLiter>00533</ GasolineLiter>
<OilLiter>051</OilLiter>
<OilAmount>0007345</OilAmount>
<Speedometer>095248</Speedometer>
<CarNumber>36912401</CarNumber>
<ServiceAmount>0001250</ServiceAmount>
<Xfield>08802650012110</Xfield>
<RequestId>20211005151911</RequestId>
<ParameterJ>49</ParameterJ>
<EMV_Output>


- Rav-Sapak Configuration

This command will provid the status of all terminals under RavSapak terminal
## Caspit Internal:
The request XML will include only the command number.
Send this request to non-RAV SAPAK terminal will reply with an error
Terminals that are defined in device but not exsist in CTEM RavSapak new list, will be shown in Not Active list
Terminal will not be shown in Not Active list if Tran file is empty (all trans were sent and deleted by command ot time event)


Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number. For RAV SAPAK the command number is 030 001
RequestId
## מזהה בקשה
## 051

<Request>
<Command>030</Command>
<RequestId>20230215173741</RequestId>
</Request>

The response XML will include information about the Pinpad terminals.

Document Version 1.53   Caspit SmartRetail Solution
## 173

Tag name Description Matching TLV tag
(Caspit internal)
RavSapak Rav Sapak terminal Id N/A
sp
## Sapak - מספר סידורי רץ של ספק
## מקרה של ספק המקבץ כמה מסופים (ספליט) לכל המסופים יהיה אותו ערך  ב

tr
## Unsent Transactions - כמות עסקאות שלא שודרו למתג או לשב"א

as
## Session Number - בשידור לשב"א (ללא מתג)מספר אסמכת

xxxxxxx terminal Id
NotActive List of terminals that exsist on device but not in CTEM

<Response>
<Command>30</Command>
<ResultCode>0</ResultCode>
<RequestId>20230215173741</RequestId>
<RavSapak>0880264</RavSapak>
<Term sp="nn" tr="yyy" as="zzzzz">xxxxxxx </Term>
<Term sp="nn" tr="yyy" as="zzzzz">xxxxxxx </Term>
<Term sp="nn" tr="yyy" as="zzzzz">xxxxxxx </Term>
<NotActive>
<Term sp="nn" tr="yyy" as="zzzzz">xxxxxxx </Term>
</NotActive>
</Response>




Document Version 1.53   Caspit SmartRetail Solution
## 174

- VAS of Apple and Google

This command is used for reading information of loyalty card, from Apple and Google wallets
Caspit internal:
The reading will be performed according to the parameters sent in XML, if no parameters have been sent to a certain wallet, do
not try to read this wallet
Since it is not known which wallet will be used, a Google wallet will be read first, and if no answer was received, try to read from
an Apple wallet
The read will be made if the VAS service is configured in the CTEM profile for the terminal
Tag name Description Matching TLV tag
(Caspit internal)
Request The opening tag of the request XML N/A
Command Command number. For VAS the command number is 026 001
RequestId
## מזהה בקשה
## 051
TerminalId
## מספר מסוף
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
TimeoutInSeconds How  many  seconds  to  display  the  message  or  how  many  seconds  to  wait
for card removal

## 005
AppleMerchantId Apple merchant Id

AppleUrl url for registration to apple wallet loyalty - optional

GoogleMerchantId Google Collector ID

GoogleUrl url for registration to google wallet loyalty - optional




<Request>
<Command>026</Command>
<TerminalId>0880340</TerminalId>
<TermNo>001</TermNo>
<RequestId>20230507153012</RequestId>
<TimeoutInSeconds>30</TimeoutInSeconds>
<AppleMerchantId >pass.xxx.com </AppleMerchantId >
<AppleUrl>paz.co.il</AppleUrl>
<GoogleMerchantId >2147483647</GoogleMerchantId >
<GoogleUrl>xxx.co.il</GoogleUrl>
</Request>

Document Version 1.53   Caspit SmartRetail Solution
## 175

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the request XML N/A
Command Command number. For VAS the command number is 026 001
RequestId
## מזהה בקשה
## 051
TerminalId
## מספר מסוף
## 006
TermNo
## מספר עמדה) \(מספר תחנה מספר קופה
Station number/ECR number.
## 040
ResultCode The following result codes will be returned:
SUCCESS 0 , where errors
## 10000- TIMEOUT
## 10044- USER_ABORT
## 12001- CARD_READ_ERROR
## 12003- CONTINUE_WITH_GOOGLE
## 12005- CONTINUE_WITH_PAYMENT
## 12008- NOT_ACTIVATED
## 12009- OTHER_WALLET

## Coupon
Raw Card information

MerchantId Apple or Google merchant Id

Wallet Type of wallet, Apple or Google

CouponType Type of card read from wallet: loyalty, gift etc.




Example of Apple loyalty card

<Response>
<Command>25</Command>
<TerminalId>0880340</TerminalId>
<TermNo>001</TermNo>
<ResultCode>0</ResultCode>
<RequestId>20230507153012</RequestId>
<Coupon> 0003554082,7670005286067</Coupon>
<CouponType>Loyalty</CouponType>
<MerchantId >pass.xxx.com</MerchantId >
<Wallet>Apple</Wallet>
</Response>

Document Version 1.53   Caspit SmartRetail Solution
## 176

## Appendix A – Result Codes
This is the list of result codes that can come back in the tag <ResultCode>.
As I mentioned before, the Caspit SmartRetail solution has much more features than the standard "Shva" Ashrait PC solution, and so
I needed many more error codes. Because I didn't want to change the Shva error codes (Status and AshStatus) I had to create
another tag.
For more information about each result code, refer to Appendix M – Troubleshooting. There I will try to elaborate on each code and
how to fix it.
Also, you should try and search the specific result code in this document. You may find additional information in the relevant
command that caused this result code.
## Code Define English Hebrew
0 RETVAL_SUCCESS Success
## הצלחה
10000 RETVAL_TIMEOUT Timeout
## טיימאאוט
10001 RETVAL_AMOUNT_TOO_BIG Amount too big
## סכום גדול מדי
10002 RETVAL_AMOUNT_TOO_SMALL Amount too small
## סכום קטן מדי
10003 RETVAL_INCORRECT_TERMINAL_ID Incorrect Terminal
## מספר מסוף שגוי
10004 RETVAL_ERROR_GETTING_TOKEN Error getting token
## שגיאה בקבלת טוקן
10005 RETVAL_NO_LAST_TRAN_FILE No last TRAN file
## אין קובץ TRANאחרון
10006 RETVAL_CANT_FIND_REQUESTED_TRAN_FILE Can't find requested TRAN
file
## לא ניתן למצוא קובץ TRAN
## 10007

## 10008

## 10009

## 10010 RETVAL_NOT_RAV_SAPAK_TERMINAL

## 10011

## 10012

## 10013

## 10014

10015 RETVAL_SWITCH_BATCH_IS_TOO_OLD Switch batch is too old.
Make sure to transmit all
transaction to the batch
and to delete the batch
## קובץ עסקאות מתג ישן
## מדי. יש לשדר עסקאות
## למתג ולמחוק את הקובץ
10016 RETVAL_INVALID_CURRENCY_CODE Invalid currency code
## מטבע שגוי קוד
10017 RETVAL_USER_PRESSED_ON_RED_KEY User pressed on red key
## משתמש לחץ על כפתור
## אדום


Document Version 1.53   Caspit SmartRetail Solution
## 177

## Code Define English Hebrew
## 10018
## RETVAL_INVALID_AUTHORIZATION_CODE_MANPIK
Invalid authorization code
manpik
## ערך לא תקין בשדה
AuthorizationCodeManpik
## 10019 RETVAL_SWITCH_TRAN_FILE_NOTHING_TO_SEN
## D
No records to send from
Switch TRAN file
## אין רשומות לשליחה
## בקובץ
## TRANשל מתג
10020 RETVAL_NO_PAPER_IN_PRINTER No paper in printer
## חסר נייר במדפסת
10021 RETVAL_SWITCH_TRAN_FILE_IS_EMPTY Switch TRAN file is empty
## קובץ TRAN –של מתג
## ריק

10022 RETVAL_INCORRECT_ECR_NUMBER Incorrect ECR number
## מספר קופה שגוי
10023 RETVAL_NO_STATIS_FILE_ON_POS No STATIS file on Pinpad
## אין קובץ STATIS
## 10024
## RETVAL_SWITCH_TRAN_HAS_UNSENT_TRANSACTIONS
There are unsent
transactions in the Switch
## TRAN
## ישנן רשומות שלא נשלחו
## בקובץ
## TRAN של מתג
10025 RETVAL_SWITCH_TRANSACTIONS_SENT_FAILED Failure in sending Switch
transactions
## כשלון בשליחה של
## רשומות של מתג

10026 RETVAL_TRAN_STEPS_LISTENER_NOT_WORKING Transaction-steps-listener
is not working
## מאזין שלבים אינו פעיל
10027 RETVAL_INVALID_MESSAGE_CODE Invalid message code
## קוד הודעה שגוי
10028 RETVAL_CANT_CONTINUE_J2 Can't continue a J2
transaction
## לא ניתן להמשיך J2
10029 RETVAL_INVALID_REQUEST_ID Invalid request Id
## מזהה בקשה שגוי
10030 RETVAL_SHVA_PARAMETERS_DELETION_FAILED Failure when trying to
delete Shva parameters
## כשלון במחיקת פרמטרים
## של שב"א
10031 RETVAL_SHVA_BLACKLIST_DELETION_FAILED Failure when trying to
delete Shva blacklist
## כשלון במחיקת רשימת
## חסומים של שב"א
10032 RETVAL_TIMEOUT_EVENT_FROM_CASPIT_DLL Timeout event from Caspit
## DLL
## הDLLהחזיר טיימאאוט
10033 RETVAL_SHVA_CALL_FAILED Shva communication
failed
## כשלון בתקשורת לשב"א
10034 RETVAL_REPORTS_SERVER_CALL_FAILED Failure to call reports
server
## כשלון בתקשורת לשרת
## דוחות

10035 RETVAL_XML_INVALID_METHOD Invalid method in XML
## מתודה שגויה
10036 RETVAL_XML_MISSING_TERMINAL_ID_TAG Missing terminal Id tag in
## XML
## חסר תג   Terminal Id
10037 RETVAL_CERTIFICATES_SERVER_CALL_FAILED Failure calling certificates
server
## כשלון בתקשורת לשרת
## סרטיפיקטים
10038 RETVAL_SWITCH_CALL_FAILED Failure calling the Switch
## כשלון בתקשורת למתג

Document Version 1.53   Caspit SmartRetail Solution
## 178

## Code Define English Hebrew
10039 RETVAL_INVALID_TRAN_RECORD_NUMBER Invalid TRAN record
number
## מספר רשומה שגוי
10040 RETVAL_FILE_CANNOT_BE_RETRIEVED File cannot be retrieved
## לא ניתן לאחזר קובץ
10041 RETVAL_ERROR_CONNECTING_TO_PINPAD Error connecting to Pinpad
## שגיאה בהתחברות
## לפינפד

10042 RETVAL_XML_MISSING_REQUEST_ID_TAG Missing request Id tag in
## XML
## חסר תג Request Id
## 10043
## RETVAL_CASPIT_WINDOWS_SERVICE_NOT_RESPONDING
Windows service not
responding
## Windows Service לא מגיב
10044 RETVAL_USER_ABORTED_TRANSACTION User aborted transaction
## משתמש ביטל את העסקה
10045 RETVAL_TIMEOUT_CHECK_TRAN Timeout. You should check
the status of the last
transaction
## לבדוק את  טיימאאוט. יש
## את העסקה האחרונה כי
## הסטטוס שלה לא ברור
10046 RETVAL_XML_MISSING_TIMEOUT_TAG Missing timeout tag in
## XML
חסר תג Timeout in
seconds
10047 RETVAL_XML_MISSING_INT_IN_TAG Missing INT_IN tag in XML
## חסר תג INT_IN
10048 RETVAL_CHECK_OTHER_STATUSES Unknown error. You
should check other
statuses
## שגיאה לא ברורה. יש
## לבדוק שדות סטטוסים
## אחרים
10049 RETVAL_TRANSACTION_NOT_FOUND Transaciton not found
## עסקה לא נמצאה
10050 RETVAL_DOUBLE_TRANSACTION Double transaction
## עסקה כפולהזוהתה
10051 RETVAL_BATCH_NUMBER_DOESNT_EXIST Batch number doesn't
exist
## מספר קובץ לא קיים
10052 RETVAL_INVALID_BLOCK_NUMBER_TO_RESUME Invalid block number to
resume
## לא ניתן להמשיך מבלוק
## זה

10053 RETVAL_PINPAD_RETURNED_EMPTY_RESPONSE Pinpad returned empty
response
## פינפד החזיר תשובה
## ריקה
10054 RETVAL_ASHRAIT_INVALID_SETUP Invalid setup in Ashrait
## הקמה לא תקינה של
## אשראית
10055 RETVAL_NO_PING No Ping
## אין פינג
## 10056
## RETVAL_UNSUPPORTED_GENERIC_COMMAND_CODE
Unsupported generic
command code
## קוד פקודה כללית לא
## נתמך

10057 RETVAL_TRANSMIT_LOGS_FAILED Failure transmitting logs
## כשלון בשידור לוגים
10058 RETVAL_NO_CONNECTION_TO_SHVA No connection to Shva
## אין חיבור לשב"א
10059 RETVAL_DELETE_LOGS_FAILED Failure deleting logs
## כשלון במחיקת לוגים
10060 RETVAL_CASPIT_TECH_CENTER_FAILED Failure calling technician
## כשלון בתקשורת למרכז

Document Version 1.53   Caspit SmartRetail Solution
## 179

## Code Define English Hebrew
center
## טכנאים של כספיט
10061 RETVAL_TERMINAL_REBOOT_FAILED Terminal reboot failed
כשלון בביצוע reboot
10062 RETVAL_STARTING_TMS_CALL_FAILED TMS call failed
## כשלון בביצוע תקשורת
## למרכז טעינות תוכנה
## 10063
## RETVAL_CLEAN_COMMUNICATION_ENGINE_FAILED
Failure cleaning
communication engine
## כשלון בניקוי מנוע
## תקשורת

10064 RETVAL_SETTING_DATE_TIME_FAILED Failure setting date and
time
## כשלון בעדכון שעון
10065 RETVAL_TRANSACTIONS_CENTER_CALL_FAILED Transaction center call
failed
## כשלון בתקשורת למרכז
## טרנזקציות של כספיט

## 10066 RETVAL_TRANSACTIONS_CENTER_TOGGLE_FAILE
## D
Transaction center toggle
failed
## כשלון בהפעלת שירות
## מרכז טרנזקציות
10099 RETVAL_UNKNOWN_ERROR Unknown error
## שגיאה לא ברורה
10100 RETVAL_INVALID_PAN_ENTRY_MODE Invalid PanEntryMode
ערך שגוי בPanEntryMode
10101 RETVAL_INVALID_MTI Invalid MTI
## ערך שגוי בMTI
10102 RETVAL_INVALID_X_FIELD Invalid Xfield
ערך שגוי בXfield
10103 RETVAL_CANT_FIND_DEPOSIT_REPORT Can't find deposit report
## לא ניתן למצוא דוח
## הפקדה
10104 RETVAL_INVALID_SESSION_NUMBER_XML_TAG Invalid session number
מספר session שגוי
10105 RETVAL_INVALID_DATE_XML_TAG Invalid date XML tag
## תאריך שגוי
10106 RETVAL_NO_TOTAL_FILE No TOTAL file
## קובץ TOTALלא קיים
10501 RETVAL_TIMEOUT_WHILE_WAITING_FOR_SWIPE Timeout while waiting for
card
## ארע טיימאאוט בזמן
## המתנה לכרטיס
## 10502
## RETVAL_TIMEOUT_AFTER_FAILED_SWIPE_ATTEMPT
Timeout while waiting for
card after a filed attempt
## ארע טיימאאוט בזמן
## המתנה לכרטיס לאחר
## ניסיון כושל אחד לפחות
## להעביר כרטיס

10503 RETVAL_CANCEL_WITHOUT_SWIPING User cancel the
transaction before
presenting card
## המשתמש ביטל את
## לפני העברת   העסקה
## כרטיס

## 10504 RETVAL_CANCEL_AFTER_FAILED_SWIPE_ATTEMP
## T
User cancel the
transaction after failed
attempt of presenting card
## המשתמש ביטל את
## העסקה לאחר לפחות
## ניסיון כושל אחד להעביר
## כרטיס



11000 RETVAL_CANNOT_SEND_OUT_CREDIT_CARDS Pinpad cannot send out
## לא ניתן להוציא מספרי

Document Version 1.53   Caspit SmartRetail Solution
## 180

## Code Define English Hebrew
credit card details
## כרטיס אשראי מהפינפד
11001 RETVAL_INVALID_CARD_SWIPE Invalid card swipe
## העברת כרטיס שגויה
11002 RETVAL_FILE_BAD_RECORD Invalid record in file
## רשומה לא תקינה בקובץ
12001 RETVAL_INVALID_VAS_CARD Card read error

## 12002

12003 RETVAL_CONTINUE_WITH_GOOGLE  Continue with google

## 12004

12005 RETVAL_CONTINUE_WITH_PAYMENT Continue with payment

## 12006

## 12007

12008 RETVAL_NOT_ACTIVATED Not activated

12009 RETVAL_OTHER_WALLET Other wallet



## >=90000
## 0
Switch error Switch error
## תקלת מתג

Appendix B - PTL Header
The XML string that is sent from the ECR to the Pinpad must be prefixed with a PTL header. If the ECR uses also the DLL from
Caspit then the DLL will take care of adding the PTL header. However, if the ECR doesn't use the DLL from Caspit then the ECR
must add the PTL header by itself.
Because the Pinpad can support multiple applications, the Pinpad needs the PTL header so it can know which application to
route the XML to.
Pay  attention,  the  PTL  header  exists  only  on  the  way  from  the  ECR  to  the  Pinpad.  On  the  way  back,
from the Pinpad to the ECR, there is NO need for a PTL header.

- Generic Packet format:

PTL Header (16 bytes) Packet Body
^PTL!00#<LLLL><TT><FF> Data  in  length  LLLL  hex.  This  data  can  include  anything,  even  binary  data.    But  in  our
case, the packet body will be the XML string.

- Packet  example:  Sending  387  bytes  from  the ECR  to  the  Ashrait EMV  application. The  total  packet from  the  ECR  to  the
Pinpad will be 387 bytes of data + 16 bytes of header.


Document Version 1.53   Caspit SmartRetail Solution
## 181

Packet Header (16 bytes) Packet Body
## ^PTL!00#01835102
Target  =  51  (Ashrait  EMV
application)
Source = 02 (The ECR)
387 bytes of XML data (0x0183h = 387d).

<Request>
## ....
</Request>


- The PTL header format in details:
Constant string LLLL TT FF
^PTL!00# Length   of   packet   body   (4
bytes). In HEX.
Target   host/app   code
(2 bytes)
From  host/app  code  (2
bytes)

- The length of the packet will be represented in ASCII HEX, here are a few examples:
- 0001 – Packet body length is 1 bytes (minimum packet length)
- FFF0 – Packet body length is 65520 bytes (which is the maximum packet length)
- 01BA – Packet body length is 442 bytes.



Document Version 1.53   Caspit SmartRetail Solution
## 182

- The following table show the current host/app codes used with PTL header. More codes will be added in the future as we
develop more applications for the Pinpad.
Host/App
## Code
## Destination Telium Application
type
(Caspit Internal)
00 The Router application 51037
01 Not used N/A
## 02 ECR N/A
## 03 Caspit Payment Windows Service
51 Ashrait EMV app 51033
52  SmartRetail app 51042
53 Caspit ATM app 51032
54 Customer Display app 51039
55 Contactless application (obsolete) 51025
56 Signature Capture app 51045


Document Version 1.53   Caspit SmartRetail Solution
## 183

## Appendix C – Commands Table

## Command Description
001 Payment transaction
002 Get JENR file
003 Communication test
## 004 FFU
005 Get Total file
006 Transmit transactions to Shva
007 Get TRAN file
008 Get DATA file
## 009 FFU
010 Generic command
## 011 FFU
012 Transaction query
013 Pinpad configuration
## 014 Get Statis
015 Get deposit report
016 Retrieve file
## 017 FFU
## 018 FFU
019 UI Command
## 020 FFU
## 021 FFU
## 022 FFU
023 Swipe request


Document Version 1.53   Caspit SmartRetail Solution
## 184

## Appendix D – Glossary
## Term Description
Ashrait EMV app An application on the Pinpad. This is the core application that does all the EMV stuff.
CPA Contactless   Payment   Application –   The   application   on   the   Pinpad   that   handles   the
contactless transaction
ECR Electronic Cash Register
## קופה ממוחשבת
EMV The all ecosystem that deals with smart cards
An Acronym for: Europay MasterCard Visa
EPA EMV  Payment  Application –  The  application  on  the  Pinpad  that  handles  the  contact
transaction
Ingenico The world leading manufacturer of payment devices
MSR Magnetic Swipe Reader
## קורא פס מגנטי
PAN Personal Account Number. The full credit card number (4580....)
## מספר כרטיס אשראי
PCL Payment Communication Layer
A software/hardware layer that creates the channel that enables the ECR to communicate
with the Pinpad and enables the Pinpad to use the ECR machine as a tunnel to the outside
world.
The PCL component is developed by Ingenico
PIN Personal Identification Number. The secret code of the credit card.
## קוד סודי
Pinpad A  device  that  accepts  all  kind  of  cards:  magnetic,  contact  and  contactless, and  then
performs the transaction.
Router app An application on the Pinpad that routes the request packets, that comes from the ECR, to
the right applications. And then routes back the response to the ECR.
Shva ABS – Automatic Banking Systems. The main payment switch of Israel.
## –שב"א   שירותי בנק אוטומטיים
SmartRetail app An application on the Pinpad that gives the ECR - the API to control the Pinpad
Switch A server that will "stand" between the Pinpad and Shva and will be responsible for passing
all   the   communication   going   between   the   Pinpad   and   Shva.   The   Switch   will also
accumulate all the transactions by himself, instead of the Pinpad.

## מתג אשראי
Telium A family of Pinpads. It includes the following Pinpad models: iPP320, iPP350, iSC250, iCMP,
iSMP

Document Version 1.53   Caspit SmartRetail Solution
## 185

## Term Description
Tetra A   family   of   Pinpads.   It   includes   the   following   Pinpad   models:   Lane5000,   Lane7000,
## Lane8000.
TMS Terminal  Management  System.  A  system  that  takes  care  of  software  downloads  and
updates for the Pinpads. The Pinpad will call the TMS every night to check for updates.

## שרת טעינות תוכנה


Document Version 1.53   Caspit SmartRetail Solution
## 186

Appendix E – SmartRetail Tester
The SmartRetail Tester is a Windows application written in VB.NET.
The Tester is using the CaspitPayment.dll
This tester gives you the option to test all the features of the Pinpad SmartRetail application and with the help of the tester, you
can  learn  the  correct  XML  that  is  needed  to  perform  EMV  transactions  and  how to  perform  other  commands  and  use  all  the
features of the SmartRetail application.
Caspit can provide the full source code of the tester.
TODO: add screenshot of Tester

Document Version 1.53   Caspit SmartRetail Solution
## 187

## Appendix F – Caspit Payment Windows Service
If your ECR is Windows based, then you will be using the Caspit  Payment Windows Service. This Windows service is encapsulating
the PCL component that enables the communication between Windows and the Pinpad. The Windows service is another "link" in
the communication chain between the ECR software and the SmartRetail application on the Pinpad.
If you are using Android OS or iOS then you will need to handle the PCL by yourself.
This appendix is relevant only to Windows based ECR that uses the Caspit Payment Windows Service.
The Caspit Payment Service is supported on Windows 7 and Windows 10 (XP is not supported)
The Caspit Payment Service has a TCP listener that waits for data coming from the ECR. Once the Service got the data, the Ser vice
will send it to the Pinpad.
The ECR can work in two ways:
Using a DLL
The DLL is developed by Caspit and it is written in C#.
What the DLL does is simply handling the TCP communication for the ECR. In addition, beside communication, the DLL gives you
the option to work with a .NET Object and properties instead of writing and parsing XMLs.
Using a DLL, the flow of transaction will look like this:
ECR → DLL → Windows Service → Pinpad → Windows Service → DLL → ECR

Without a DLL
If you prefer to work without the DLL, it is your choice.
Without  the DLL,  the  ECR  will  be responsible to  handle  the  communication  between  the  ECR  and  the  Caspit Payment Service.  If
you are not using the DLL, you must use the PTL header before any XML string that you send to the Caspit Payment Service (see
Appendix B about the PTL header).
ECR → Windows Service → Pinpad → Pinpad → Windows Service → ECR

## Appendix F – Communication Problems

- No matter  if  the  ECR is  using  a  DLL  or  not  using  a DLL, if the  Caspit Payment  Service  cannot connect  to  the  Pinpad  then  the
Service will return the following XML (this XML will be created by the Service)
<Response>
<ResultCode>10041</ResultCode> (RETVAL_ERROR_CONNECTING_TO_PINPAD)
</Response>

- If the ECR is using the Caspit DLL and the Caspit DLL cannot connect to the Caspit Payment Service, then the DLL will return
the following XML (this XML will be created by the DLL)
<Response>
<ResultCode>10043</ResultCode>     (RETVAL_CASPIT_WINDOWS_SERVICE_NOT_RESPONDING)

Document Version 1.53   Caspit SmartRetail Solution
## 188

</Response>

- If  the  ECR  is  NOT  using  the  Caspit  DLL,  then  it  is  the  responsibility  of  the  ECR  to  handle  the  TCP  connection  to  the  Caspit
Payment  Service.  And  if  the  Service  is  not  running  or  the  Service doesn't  answer  then  the  ECR  will  have  to  handle  these
problems. Just to make things clear, the part that is in the responsibility of the ECR is just the part that is relevant to the TCP
socket creation and connection. If the TCP connection has been established and there is a problem between the Service and
the Pinpad then the Service will return the XML (with result code 10041) as described above.

- If, for some reason, the Pinpad returned an empty response, the Service will return the following XML
<Response>
<ResultCode>10053</ResultCode>   (RETVAL_PINPAD_RETURNED_EMPTY_RESPONSE)
</Response>

- If a timeout event happended in the Caspit DLL, the DLL will return the following XML:
<Response>
<ResultCode>10032</ResultCode> (RETVAL_TIMEOUT_EVENT_FROM_CASPIT_DLL)
</Response>

## Appendix F – Getting Windows Service Information

If the Windows Service is working, the ECR can get some information about the Service.
The ECR needs to send an XML that is targeted at the Windows Service, the AppCode in the PTL header will be 03.

<Request>
<Command>GetInfo</Command>
</Request>

The response will be:

<Response>
<Command>GetInfo</Command>
<ServiceVersion>1.0.5</ServiceVersion>
<PCLVersion>2.10</PCLVersion>
<SerialPortName>COM5</SerialPortName>
<TimeoutSocket>30</TimeoutSocket>

Document Version 1.53   Caspit SmartRetail Solution
## 189

<PCLStatus>1</PCLStatus>
<IPPort>6656</IPPort>
<LogEnabled>true</LogEnabled>
<ArchiveDays>10</ArchiveDays>
</Response>

Tag name Description Matching TLV tag
(Caspit internal)
Response The opening tag of the Response XML N/A
Command GetInfo 001
ServiceVersion The version of the Caspit Payment Windows Service software 006
PCLVersion The version of the PCL component from Ingenico 040
SerialPortName Like
## COM1
## 051
TimeoutSocket
PCLStatus 0 – PCL is not connected
1 – PCL is connected.
## 010
IPPort


LogEnabled


ArchiveDays


Response Closing tag of the response XML N/A

## Appendix F – Windows Service Config.xml
<?xml version="1.0" encoding="utf-8" ?>
<Configuration>
<Settings id="Service">
<SerialPortName>COM5</SerialPortName>
<!--Possible Communication Types: 0 - Bluetooth, 1 - USB, 2 - RS232 -->
<CommunicationType>1</CommunicationType>
<IPAddress></IPAddress>
<IPPort>6656</IPPort>
<TimeoutSocket>30</TimeoutSocket>

Document Version 1.53   Caspit SmartRetail Solution
## 190

</Settings>
<Settings id="Logger">
<IsEnabled>true</IsEnabled>
<IPAddress></IPAddress>
<IPPort>0</IPPort>
<SendLogByTCP>false</SendLogByTCP>
<ArchiveDays>10</ArchiveDays>
</Settings>
</Configuration>

Document Version 1.53   Caspit SmartRetail Solution
## 191

## Appendix G – Idle Swipe
There are three "Swipe" features in the Pinpad, some may find it a bit confusing, and so I will summarize them here:
- The Swipe Command is described in chapter 21. It is a command that is initiated by the PC.
- The Smart Swipe is a feature that changes a transaction request into a Swipe response. See chapter 9.5.
- The Idle Swipe is a feature that allows swiping cards while the Pinpad is in idle mode. It is described here.
Idle  Swipe  refers  to  the  feature  of the  Pinpad  to  read magnetic  cards not during  the transaction,  but while  the  Pinpad  is  in idle
state (some people refer to Idle Swipe as "passive swipe"). Although we have the Swipe Command (chapter 21) that enables the
ECR  to  ask  for  a  magnetic  swipe,  the  Swipe  Command  is  initiated  by the  ECR.  But  some  retailers  require  the  ability  to  read
magnetic  cards  without  the  initiation  of  the  ECR.  They  need  it  because  their  ECR  business  logic  is  based  on  a  simple  MSR
(magnetic stripe reader) and they don't wish to change all their normal business logic.
While  the  Pinpad  is  not  doing  anything  (i.e.  not  in  the  middle  of  a transaction),  we  say  that  it  is  in  idle  state.  A  cardholder  can
swipe his magnetic card and the card track2 data will be sent to the ECR. The ECR can do whatever it needs to do with that data.
Note that the Pinpad will not send out track2 data that is identified as a credit card. Only non-credit card data will be sent out to
the ECR. This is the same behavior as in the Swipe Command, and it is mandatory because of PCI regulations.
TCP Listener
Because the Pinpad and the ECR are using TCP/IP to communicate with each other (even with USB connection, there is a layer of
TCP/IP on top of the USB later), the only way to send the track2 data is by using TCP. Therefore, the ECR must keep a TCP listener
opened all the time. Once a card is swipe, the Pinpad will open a TCP socket to the IP of the ECR and then the Pinpad will se nd the
track2 data to the ECR. After sending the data, the Pinpad will close the TCP connection. I would like to emphasize this point: the
TCP connection between the Pinpad and the ECR will NOT stay opened all the time. It will be opened and then closed for each idle
swipe that is done. The USB connection has a limited bandwidth for the TCP layer and we cannot leave the TCP connection all the
time. Otherwise,  it  will interrupt  the  other Pinpad  communication  needs.  Pay  attention  that  the TCP connection is  always  done
from the Pinpad to the ECR and not the other way around. The Pinpad does not have a TCP listener on his side.
One  possible  way  of  using  the  Idle  Swipe  is  by  developing  the  TCP  listener  as  a  small  application,  running  on  the  PC,  and  that
listener can catch the Idle Swipe event (XML), parse the XML and then send the track2 data as a keyboard input. This will enable
the ECR software to keep its normal way of getting magnetic card data, for example, loyalty cards or employee cards.
You need to use the Pinpad Configuration command to enable/disable the Idle Swipe.
Following is an example of a Pinpad Configuration command with only the relevant tags to enable the Idle Swipe.
<Request>
<Command>013</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<EnableIdleSwipe>1</EnableIdleSwipe>
<IdleSwipeAddress>192.168.0.1/1200</IdleSwipeAddress>
<RequestId>20160216155540</RequestId>
</Request>
(I don't show here the response of the Pinpad Configuration command)
The data sent by the Pinpad, on an Idle Swipe event, will be the same XML that is sent in the Swipe Command response. The ECR
does not respond to the Idle Swipe XML that is coming from the Pinpad.
The Idle Swipe TCP communication is a one way direction (from the Pinpad to the ECR).

Document Version 1.53   Caspit SmartRetail Solution
## 192

<Response>
<Command>023</Command>
<ResultCode>0</ResultCode>
<Track1>23093809348503</Track1> (if exists)
<Track2>45804580458045802302983042948093</Track2>
<Track3>30958309583095304593840</Track3> (if exists)
</Response>

If the swiped card is identified as a credit card, the response will be like this:
<Response>
<Command>023</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<ResultCode>11000</ResultCode>
<RequestId>20160216155540</RequestId>
<CardHash>2F9A8B7C2F9A8B7C2F9A8B7C2F9A8B7C</CardHash>
</Response>


Document Version 1.53   Caspit SmartRetail Solution
## 193

Appendix H – Shva <Status> codes
Copied from Appendix 1 of Shva mefizim EMV document.
## Status Hebrew Description English Description
## 0000
## מאושר
## Approved
## 1001
## הצג כרטיס \הכנס\העבר
Swipe/Insert/Present card
## 1002
## הצג כרטיס \העבר
Swipe/Present card
## 1003
## הכנס כרטיס \העבר
Swipe/Insert card
## 1004
## הכנס כרטיס לקורא חכם
Insert card into card reader
## 1005
## הצג כרטיס \הכנס
Insert/Present card
## 1006
## הצג כרטיס
Present card
## 1007
## נא הוצא כרטיס
Please remove card
## 1008
## העבר שנית
Swipe again
## 1009
## השתמש בקורא פס מגנטי
Use magnetic reader
## 1010
## בכרטיסהמסוף לא רשאי לבצע עיסקאות
The terminal is not allowed to perform transactions in
this card

## 1011
## אנא המתן השאר כרטיס
Please wait. Leave card.
## 1012
## כרטיס לא תקין
Card invalid
## 1013
## כרטיס לא נתמך
Card not supported
## 1014
## קיימות עסקאות ישנות. בצע שידור
Old transactions. Call Shva
## 1015
## קובץ חסום לא מעודכן. בצע שידור
Old black list. Call Shva
## 1016
## כרטיס לא מורשה לסוג אשראי
Card not allowed for this credit term
## 1017
## אין הרשאה לסוג מטבע
No permission for this currency
## 1018
## מספר כרטיס שגוי
Invalid card number
## 1019
## הכרטיס לא מורשה במסוף
Card is not allowed in this terminal
## 1020
## כרטיס לא מורשה לסוג העסקה
Card is not allowed for this transaction type
## 1021
## הכרטיס מחוץ לתחום
Card out of limit
## 1022
## קוד מועדון לא בתחום
Club code out of limit
## 1023
## מנפיק לא קיים
Issuer doesn't exist
## 1024
## מותג לא קיים
Brand doesn't exist
## 1025
## מספר רכב לא תקין
Invalid card license plate
## 1026
## כרטיס לא בתוקף
Card expired
## 1027
## נא הקלד נתונים נוספים
Please enter additional data
## 1028
## הקש 3הכרטיסספרות אחרונות בגב
Enter 3 digits from back of the card
## 1029
## הקש 4ספרות מודפסות בכרטיס
Enter 4 digits from back of the card

Document Version 1.53   Caspit SmartRetail Solution
## 194

## Status Hebrew Description English Description
## 1030
## נא הקש ת.ז. כולל ספרת ביקורת
Enter ID
## 1031
## ת.ז. שגויה
Invalid ID
## 1032
## ת.ז. שגויה נסה שנית
Invalid ID. Try again.
## 1033
## כתובת לקוחנא הקש
Enter customer address
## 1034
## לאלץ או להתקשר
Force or call
## 1035
## הקשה F1 לבקשת אישור
Press F1 to authorize
## 1036
## התקשר לחברת אשראי
Call the credit company
## 1037
## מאושר, הוצא כרטיס
Approved. Remove card.
## 1038
## העסקה לא אושרה
## Declined
## 1039
## דחייה. תקלה בתקשורת
Declined. Communication problem.
## 1040
דחה עסקה cvv2   או ת.ז. שגוי
Declined. Wrong CVV2 or ID
## 1041
## דחייה. כרטיס לא משוייך לרשת
Declined. Card doesn't belong to network
## 1042
דחה עסקה. cavv/ucaf שגוי
Declined. Invalid cavv/ucaf
## 1043
## דחה עסקה. כתובת שגויה
Declined. Invalid address
## 1044
## כרטיס גנוב. החרם
Stolen card
## 1045
## כרטיס חסום
Blocked card
## 1046
## כרטיס מזוייף. החרם
Forged card
## 1047
## דחה בקשה. קוד יתרה שגוי
Declined. Invalid balance code
## 1048
## בנק'/כוכבים/מיילים/הטבה אחרת דחה עסקה. חוסר
Declined. Missing benefit
## 1049
## ממתין לאישור. השאר כרטיס
Please wait. Leave card
## 1050
## העסקה אושרה. הוצא כרטיס
Approved. Remove card
## 1051
## נא הקלד מס' אישור קולי שהתקבל מחברת האשראי
Please enter authorization number
## 1052
## מהדורת תוכנה שגויה
Invalid software version
## 1053
## נתוני עסקה שגויים
Invalid transaction details
## 1054
## מסוף לא ביצע הקמה
Terminal was not setup
## 1055
## כרטיס לא ניתמך, קוד שרות
Card not supported because of service code
## 1056
## סולק לא קיים
Acquirer doesn't exist
## 1057
## סט פרמטרים שגוי
Invalid parameters set
## 1059
## דחייה, כרטיס נטען
Declined, gift card
## 1060
## נתוני עסקת הטבה שגויים
Invalid benefit details
## 1061
## אין הרשאה לביצוע עסקה
No permission for transaction
## 1062
## נא הקש מיקוד הלקוח
Please enter zip code
## 1063
## מזהה שגוי
Invalid identification

Document Version 1.53   Caspit SmartRetail Solution
## 195

## Status Hebrew Description English Description
## 2000
## שגיאה אפליקטיבית
Applicative error


Document Version 1.53   Caspit SmartRetail Solution
## 196

Appendix I – Shva <AshStatus> codes
Copied from Appendix 1 of Shva mefizim EMV document.
## Status Hebrew Description English Description

## בתקשורת קודי שגיאה המתקבלים
Error codes that come during communication
## 000
## מאושר
## Approved
## 001
## כרטיס חסום
Blocked card
## 002
## גנוב החרם כרטיס
Stolen card
## 003
## התקשר לחברת האשראי
Call credit company
## 004
## העסקה לא אושרה
## Declined
## 005
## כרטיס מזוייף החרם
Forged card
## 006
דחה עסקה cvv2/id  שגוי
Declined. Invalid cvv2/id
## 007
דחה עסקה cavv/ucaf שגוי
Declined. Invalid cavv/ucaf
## 008
דחה עסקה avs שגוי
Declined. Invalid AVS
## 009
## נתק בתקשורת  –דחייה
Declined. Communication problem.
## 010
## אישור חלקי
Partial approval
## 011
## עסקה:  חוסר  בנקודות/כוכבים/מיילים/הטבה  דחה
## אחרת
Declined. Missing benefit.
## 012
## הכרטיס לא מורשה במסוף
Card not allowed
## 013
## דחה בקשה. קוד יתרה שגוי
Declined. Invalid balance code
## 014
## דחייה. כרטיס לא משוייך לרשת
## Declined.
## 015
## דחה עסקה: הכרטיס אינו בתוקף
Declined. Card expired
## 016
## אין הרשאה לסוג מטבע  –דחייה
Declined. Currency not permitted
## 017
## אין הרשאה לסוג אשראי בעסקה  –דחייה
Declined. Credit term not permitted
## 026
דחה עסקה id  שגוי
## Declined. Invalid Id
## 041
## ישנה חובת יציאה לשאילתא בגין תקרה בלבד לעסקה
עם פרמטר j2
It is mandatory to go online because of ceiling-only for J2
## 042
## ישנה  חובת  יציאה  לשאילתא  לא  רק  בגין  תקרה,
## לעסקה עם פרמטר J2
It is mandatory to go online not only because of ceiling



## בקבצי מערכת חוסר
System files missing
## 051
## חסר קובץ ווקטור 1
File vector 1 is missing
## 052
## חסר קובץ ווקטור 4
File vector 4 is missing
## 053
## חסר קובץ ווקטור 6
File vector 6 is missing
## 055
## חסר קובץ ווקטור 11
File vector 11 is missing

Document Version 1.53   Caspit SmartRetail Solution
## 197

## Status Hebrew Description English Description
## 056
## חסר קובץ ווקטור 12
File vector 12 is missing
## 057
## חסר קובץ ווקטור 15
File vector 15 is missing
## 058
## חסר קובץ ווקטור 18
File vector 18 is missin
## 059
## חסר קובץ ווקטור 31
File vector 31 is missing
## 060
## חסר קובץ ווקטור 34
File vector 34 is missing
## 061
## חסר קובץ ווקטור 41
File vector 41 is missing
## 062
## חסר קובץ ווקטור 44
File vector 44 is missing
## 063
## חסר קובץ ווקטור 64
File vector 64 is missing
## 064
## חסר קובץ ווקטור 80
File vector 80 is missing
## 065
## חסר קובץ ווקטור 81
File vector 81 is missing
## 066
## חסר קובץ ווקטור 82
File vector 82 is missing
## 067
## חסר קובץ ווקטור 83
File vector 83 is missing
## 068
## חסר קובץ ווקטור 90
File vector 90 is missing
## 069
## חסר קובץ ווקטור 91
File vector 91 is missing
## 070
## חסר קובץ ווקטור 92
File vector 92 is missing
## 071
## חסר קובץ ווקטור 93
File vector 93 is missing
## 073
## חסר קובץ PARAM_3_1
File PARAM_3_1 is missing
## 074
## חסר קובץ PARAM_3_2
File PARAM_3_2 is missing
## 075
## חסר קובץ PARAM_3_3
File PARAM_3_3 is missing
## 076
## חסר קובץ PARAM_3_4
File PARAM _3_4 is missing
## 077
## חסר קובץ PARAM_361
File PARAM_361 is missing
## 078
## חסר קובץ PARAM_363
File PARAM_363 is missing
## 079
## חסר קובץ PARAM_364
File PARAM_364 is missing
## 080
## חסר קובץ PARAM_61
File PARAM_61 is missing
## 081
## חסר קובץ PARAM_62
File PARAM_62 is missing
## 082
## חסר קובץ PARAM_63
File PARAM_63 is missing
## 083
## חסר קובץ CEIL_41
File CEIL_41 is missing
## 084
## חסר קובץ CEIL_42
File CEIL_42 is missing
## 085
## חסר קובץ CEIL_43
File CEIL_43 is missing
## 086
## חסר קובץ CEIL_44
File CEIL_44 is missing
## 087
## חסר קובץ DATA
File DATA is missing
## 088
## חסר קובץ JENR
File JENR is missing

Document Version 1.53   Caspit SmartRetail Solution
## 198

## Status Hebrew Description English Description
## 089
## חסר קובץ Start
File Start is missing



## חוסר כניסה מתאימה בקבצי הוקטורים
Entry missing in vector files
## 101
## חסרה כניסה בוקטור 1
Entry is missing in vector 1
## 103
## חסרה כניסה בוקטור 4
Entry is missing in vector 4
## 104
## חסרה כניסה בוקטור 6
Entry is missing in vector 6
## 106
## חסרה כניסה בוקטור 11
Entry is missing in vector 11
## 107
## חסרה כניסה בוקטור 12
Entry is missing in vector 12
## 108
## חסרה כניסה בוקטור 15
Entry is missing in vector 15
## 110
## כניסה בוקטור חסרה 18
Entry is missing in vector 18
## 111
## חסרה כניסה בוקטור 31
Entry is missing in vector 31
## 112
## חסרה כניסה בוקטור 34
Entry is missing in vector 34
## 113
## חסרה כניסה בוקטור 41
Entry is missing in vector 41
## 114
## חסרה כניסה בוקטור 44
Entry is missing in vector 44
## 116
## חסרה כניסה בוקטור 64
Entry is missing in vector 64
## 117
## חסרה כניסה בוקטור 81
Entry is missing in vector 81
## 118
## חסרה כניסה בוקטור 82
Entry is missing in vector 82
## 119
## חסרה כניסה בוקטור 83
Entry is missing in vector 83
## 120
## חסרה כניסה בוקטור 90
Entry is missing in vector 90
## 121
## חסרה כניסה בוקטור 91
Entry is missing in vector 91
## 122
## חסרה כניסה בוקטור 92
Entry is missing in vector 92
## 123
## חסרה כניסה בוקטור 93
Entry is missing in vector 93



## הפרמטרים חוסר כניסה מתאימה בקבצי
Entry missing in parameter files
## 141
## חסרה כניסה מתאימה בקובץ פרמטרים 3.2
Entry is missing in parameter file 3.2
## 142
## חסרה כניסה מתאימה בקובץ פרמטרים 3.3
Entry is missing in parameter file 3.3
## 143
## חסרה כניסה בקובץ תחומי מועדון 3.6.1
Entry is missing in club range file 3.6.1
## 144
## חסרה כניסה בקובץ תחומי מועדון 3.6.3
Entry is missing in club range file 3.6.3
## 145
## חסרה כניסה בקובץ תחומי מועדון 3.6.4
Entry is missing in club range file 3.6.4
## 146
## חסרה כניסה בקובץ תקרות לכרטיסי PL 4.1
Entry is missing in ceiling file for PL cards 4.1
## 147
## חסרה  כניסה  בקובץ  תקרות  לכרטיסים  ישראלים
## שאינם
## PL  שיטה 0 4.2
Entry is missing in ceiling file for Israeli cards which are not PL.
## Method 0 4.2

## 148
## חסרה  כניסה  בקובץ  תקרות  לכרטיסים  ישראלים
## שאינם  PL  שיטה 1 4.3
Entry is missing in ceiling file for Israeli cards which are not PL.
## Method 1 4.3


Document Version 1.53   Caspit SmartRetail Solution
## 199

## Status Hebrew Description English Description
## 149
## חסרה כניסה בקובץ תקרות לכרטיסי תייר 4.4
Entry is missing in Ceiling file for tourist cards 4.4
## 150
## ישראכרט  –חסרה כניסה בקובץ כרטיסים תקפים
Entry is missing in valid cards file – Isracard
## 151
## כאל  –חסרה כניסה בקובץ כרטיסים תקפים
Entry is missing in valid cards file – Cal
## 152
## מנפיק עתידי  –חסרה כניסה בקובץ כרטיסים תקפים
Entry is missing in valid cards file – Future issuer



## שגיאות בערכי נתוני קבצי מערכת
Errors in system files
## 182
## שגיאה בערכי וקטור 4
Error in vector 4
## 183
## שגיאה בערכי וקטור 6/12
Error in vector 6/12
## 186
## שגיאה בערכי וקטור 18
Error in vector 18
## 187
## שגיאה בערכי וקטור 34
Error in vector 34
## 188
## שגיאה בערכי וקטור 64
Error in vector 64
## 190
## שגיאה בערכי וקטור 90
Error in vector 90
## 191
## נתונים לא תקינים בוקטור הרשאות מנפיק
Invalid data in issuer permissions vector
## 192
## נתונים לא ולידים בסט הפרמטרים
Invalid data in parameters set
## 193
## נתונים לא ולידים בקובץ פרמטרים ברמת מסוף
Invalid data in terminal parameters file



## הרשאות סולק
Acquirer permissions
## 300
## הרשאת סולק  –אין הרשאה לסוג עסקה
No permission for transaction type
## 301
## הרשאת סולק  –אין הרשאה למטבע
No permission for currency
## 303
## אין  הרשאת  סולק  לביצוע  עסקה  כאשר  הכרטיס  לא
## נוכח
No permission for card not present transaction
## 304
## הרשאת סולק  –אין הרשאה לאשראי
No permission for credit
## 308
## הרשאת סולק  –אין הרשאה להצמדה
No permission for index
## 309
## אין הרשאת סולק לאשראי במועד קבוע
No permission for recurring payment
## 310
## אין הרשאה להקלדת מספר אישור מראש
No permission for authorized transaction
## 311
## אין הרשאה לבצע עסקאות לקוד שרות 587
No permission for service code 587
## 312
## סולק לאשראי דחוי אין הרשאת
No permission for delayed credit
## 313
## אין הרשאת סולק להטבות
No permission for benefits
## 314
## אין הרשאת סולק למבצעים
No permission for sales
## 315
## אין הרשאת סולק לקוד מבצע ספציפי
No permission for specific sale code
## 316
## לעסקת טעינה אין הרשאת סולק
No permission for charge transaction
## 317
## אין  הרשאת  סולק  לטעינה/פריקה  בקוד  אמצעי
## התשלום בשילוב קוד מטבע
No permission for to charge/discharge with that currency
## 318
## אין הרשאת סולק למטבע בסוג אשראי זה
No permission for that currency with that credit term

Document Version 1.53   Caspit SmartRetail Solution
## 200

## Status Hebrew Description English Description
## 319
## אין הרשאת סולק לטיפ
No permission for tip



## הרשאות מנפיק
Issuer permissions
## 341
## הרשאת מנפיק  –אין הרשאה לעסקה
No permission for transaction
## 342
## הרשאת מנפיק  –אין הרשאה למטבע
No permission for currency
## 343
## לביצוע עסקה כאשר הכרטיס לא  אין הרשאת מנפיק
## נוכח
No permission for card not present transaction
## 344
## הרשאת מנפיק –אין הרשאה לאשראי
No permission for credit
## 348
## אין הרשאה לביצוע אישור בקשה יזומה ע"י קמעונאי
No permission for must authorized transaction
## 349
## אין  הרשאה  מתאימה  לביצוע  בקשה  לאישור  ללא
## עסקה J5
No permission for pre authorization
## 350
## אין הרשאת מנפיק להטבות
No permission for benefits
## 351
## אין הרשאת מנפיק לאשראי דחוי
No permission for delayed credit
## 352
## אין הרשאת מנפיק לעסקת טעינה
No permission for charge transaction
## 353
## אין  הרשאת  מנפיק  לטעינה/פריקה  בקוד  אמצעי
## התשלום
No permission for charge/discharge with that credit term
## 354
## אין הרשאת מנפיק למטבע בסוג אשראי זה
No permission for that currency with that credit term



## מסוף הרשאות
Terminal permissions
## 381
אין הרשאה לבצע עסקת  contactless מעל סכום מרבי
No permission for contactless above this amount
## 382
## במסוף המוגדר כשרות עצמי ניתן לבצע רק עסקאות
## בשירות עצמי
Only  self  service  transaction  can  be  done  in  a  self  service
terminal

## 384
## חסר מספר ספק/מוטב  –ספק/מוטב -מסוף מוגדר כרב
Missing rav-sapak/mutav number
## 385
## במסוף המוגדר כמסוף סחר אלקטרוני חובה להעביר
eci
Missing ECI



## שגיאות אפליקטיביות
Application errors
## 401
## מספר התשלומים  גדול מערך שדה מספר תשלומים
## מקסימלי
Number of installments is above the maximum
## 402
## מספר  התשלומים  קטן  מערך  שדה  מספר  תשלומים
## מינימלי
Number of installments is below the minimum
## 403
## סכום העסקה קטן מערך שדה סכום מינימלי לתשלום
The amount is below the minimum amount
## 404
## מספר תשלומיםלא הוזן שדה
Missing number of installments
## 405
## חסר נתון סכום תשלום ראשון/קבוע
Missing first installment amount or other installments amount
## 406
## סה"כ  סכום  העסקה  שונה  מסכום  תשלום  ראשון  +
## סכום תשלום קבוע * מספר תשלומים
The    total    number    of    transaction    doesn't    match    the
installments details


Document Version 1.53   Caspit SmartRetail Solution
## 201

## Status Hebrew Description English Description
## 408
## ערוץ 2-קצר מ 37 תווים
Track2 is shorter than 37 characters
## 410
דחיה מסיבת dcode
Decline because of dcode
## 414
## בעסקה עם חיוב בתאריך קבוע הוכנס תאריך מאוחר
## משנה מבצוע העיסקה
Invalid date in recurring transaction
## 415
## הוזנו נתונים לא תקינים
Invalid data
## 416
## תאריך תוקף לא במבנה תקין
Expiration date format is invalid
## 417
## מספר מסוף אינו תקין
Invalid terminal id
## 418
## חסרים פרמטרים חיוניים
Missing essential parameters
## 419
שגיאה בעברת מאפיין clientInputPan
Invalid clientInputPan
## 420
## –מספר  כרטיס  לא  ולידי    במצב  של  הזנת  ערוץ  2
## בעסקה ללא כרטיס נוכח
Invalid card number
## 421
## נתונים לא ולידים –שגיאה כללי
Invalid data
## 422
## שגיאה בבנית מסר ISO
Error building ISO message
## 424
## לא נומרישדה
Field is not numeric
## 425
## רשומה כפולה
Double record
## 426
## הסכום הוגדל לאחר ביצוע בדיקות אשראית
Amount was incremented after performing payment
application logic

## 428
## חסר קוד שרות בכרטיס
Missing service code in card
## 429
## כרטיסים תקפים כרטיס אינו תקף לפי קובץ
Card expired according to valid cards file
## 431
## שגיאה כללית
General error
## 432
## אין הרשאה להעברת כרטיס דרך קורא מגנטי
MSR is not allowed
## 433
חיוב להעביר ב- PinPad
Must use Pinpad
## 434
-אסור להעביר כרטיס במכשיר ה PinPad
Pinpad is not allowed
## 435
## המכשיר לא מוגדר להעברת כרטיס מגנטי CTL
The device is not configured for Magnetic Contactless
## 436
## המכשיר לא מוגדר להעברת כרטיס  EMV CTL
The device is not configured for EMV Contactless
## 439
## אין הרשאה לסוג אשראי לפי סוג עסקה
Credit term is not allowed for that transaction type
## 440
## כרטיס תייר אינו מורשה לסוג אשראי זה
Tourist card is not allowed for this credit term
## 441
## –אין הרשאה לביצוע סוג עסקה    כרטיס קיים בוקטור
## 80
No permission for transaction type – Card exists in vector 80
## 442
## אין לבצע Stand-in תלאימו    אישור לסולק זה
Can't perform Stand-in
## 443
## –לא ניתן לבצע עסקת ביטול    כרטיס לא נמצא בקובץ
## תנועות הקיים במסוף
Can't void transaction – Card doesn't exist in TRAN file
## 445
## בכרטיס  חיוב  מיידי  ניתן  לבצע  אשראי  חיוב  מיידי
## בלבד
Immediate card can be used only with credit term immediate
## 447
## מספר כרטיס שגוי
Invalid card number

Document Version 1.53   Caspit SmartRetail Solution
## 202

## Status Hebrew Description English Description
## 448
## חיוב להקליד כתובת לקוח (מיקוד, מספר בית ועיר)
Must enter AVS
## 449
## חיוב להקליד מיקוד
Must enter ZIP
## 450
## קוד מבצע מחוץ לתחום, צ"ל בתחום 1 – 12
Sale code out of range. Must be between 1 – 12
## 451
## שגיאה במהלך בנית רשומת עסקה
Error while building transaction record
## 452
## בעסקת  טעינה/פריקה/בירור  יתרה  חיוב  להזין  שדה
## קוד אמצעי תשלום
Must enter payment method code
## 453
## אין אפשרות לבטל עסקה פריקה 7.9.3
It is not possible to void a discharge transaction
## 455
## לא  ניתן  לבצע  עסקת  חיוב  מאולצת  כאשר  נדרשת
## בקשה לאישור (למעט תקרות)
Cannot force transaction when authorization is needed
## 456
## קוד תשובה 'החרם כרטיס  נמצא  בקובץ תנועות עם
## כרטיס'
Card is insideTRAN file with response code "Confiscate card"
## 457
## בכרטיס   חיוב   מיידי   מותרת   עסקת   חיוב
## רגילה/זיכוי/ביטול
Immediate card – Only debit/refund and void are possible
## 458
## קוד מועדון לא בתחום
Club code out of range
## 472
## בעסקת חיוב עם מזומן חיוב להזין סכום במזומן
Must enter cash amount in a cashback transaction
## 473
## בעסקה חיוב עם מזומן סכום המזומן צריך להיות קטן
## מסכום העסקה
In  a  cashback  transaction,  the  cash  amount  must  be  lower
than transaction amount

## 474
## עסקת איתחול בהוראת קבע מחייבת פרמטר J5
Must use J5 for initializing a recurring transaction
## 475
## ת אחד מהשדות: מספר תשלומים עסקת ה"ק מחייב
## או סכום כולל
Must   input   number   of   installments   or   total   amount   for
recurring transaction

## 476
## מחייבת שדה מספר תשלום עסקת תורן בהוראת קבע
Current  installment  in  recurring  transaction  must  have  field
current installment number

## 477
## עסקת תורן  בהוראת קבע מחייבת מספר מזהה של
## עסקת איתחול
Current   installment   in   recurring   transaction   must   have   id
number of the initializiation transaction

## 478
## עסקת תורן  בהוראת קבע מחייבת מספר אישור של
## עסקת איתחול
Current    installment   in    recurring    transaction    must    have
authorization number of initialization transaction
## 479
## עסקת תורן בהוראת קבע מחייבת שדות תאריך וזמן
## עסקת איתחול
Current  installment  in  recurring  transaction  must  have  date
and time of initialization transaction

## 480
## חסר שדה מאשר עסקת מקור
Missing field original authorization
## 481
## חסר  שדה  מספר  יחידות  כאשר  העסקה  מתבצעת
## בקוד אמצעי תשלום השונה ממטבע
Missing   field   number   of   units   when   transaction   is   done
without currency

## 482
## בכרטיס     נטען     מותרת     עסקת     חיוב
## רגילה/זיכוי/ביטול/פריקה/טעינה/בירור יתרה
A  giftcard  can  be  used  with  the  following  transaction  types:
regular, refund, discharge, topup and balance

## 483
## במסוף דלק חיוב להזין מספר  עסקה עם כרטיס דלק
## רכב
Must  enter  card  license  plate number  when  doing transaction
in a petrol terminal

## 484
## מספר רכב המוקלד שונה ממספר הרכב הצרוב ע"ג
## -הפס  המגנטי/מספר  בנק  שונה  מ
## 012/ספרות
## -שמאליות של מהפסר הסניף שונה מ44
Invalid license plate number

Document Version 1.53   Caspit SmartRetail Solution
## 203

## Status Hebrew Description English Description
## 485
## –מספר רכב קצר מ    6  ספרות/שונה ממספר הרכב
## המופיע  ע"ג  ערוץ  2  (פוזיציה  34  בערוץ  2)  כרטיס
## מאפיין דלק של לאומי קארד
Invalid license plate number
## 486
## ישנה חובת הקלדת קריאת מונה (פוזיציה  30  בערוץ
## 2 ) כרטיס מאפיין דלק של לאומי קארד
Must enter speedometer
## 487
## רק  במסוף  המוגדר  כדלק  דו  שלבי  ניתן  להשתמש
## בעדכון אובליגו
You  can  perform  an  obligo  update  only  in  a  two-phase  petrol
terminal

## 489
## בכרטיס דלקן מותרת עסקת חיוב רגילה בלבד (עסקת
## ביטול אסורה)
Only regular debit is allowed with petrol card
## 490
## בכרטיסי  דלק/דלקן/דלק  מועדון  ניתן  לבצע  עסקאות
## רק במסופי דלק
Petrol cards can be used only with petrol terminals
## 491
## עסקה הכוללת המרה חייבת להכיל את הכל השדות
conversion_currency_51, conversion_amount_06,
conversion_rate_09
A transaction with conversion must include the following fields
## 492
## אין המרה על עסקאות שקל/דולר
No covfersion on NIS/Dollar transaction
## 493
## בעסקה הכוללת הטבה חיוב שיהיו רק אחד מהשדות
## הבאים: סכום הנחה/מספר יחידות/ % ההנחה
A  transaction  with  benefit  must  include  one  of  the  following
fields:    discount    amount,    number    of    units    or    discount
percentage

## 494
## מספר מסוף שונה
Different terminal id
## 495
אין הרשאת  fallback
Fallback is not allowed
## 496
## לא   ניתן   להצמיד   אשראי   השונה   מאשראי
## קרדיט/תשלום
Cannot  link  credit-term  which  is  different  than  "Credit  with
installments"

## 497
## לא ניתן להצמיד לדולר/מדד במטבע השונה משקל
Cannot  link  to  dollar/index  in  a  currency  which  is  different
than Nis

## 498
## כרטיס ישראכרט מקומי הספרטור צ"ל בפוזיציה 18
Local Isracard card. The separator must be in position 18
## 500
## העסקה הופסקה ע"י המשתמש
Transaction aborted by user
## 504
## חוסר  התאמה  בין  שדה  מקור  נתוני  הכרטיס  לשדה
## מספר כרטיס
Pan entry mode and card number are incompatible
## 505
## ערך לא חוקי בשדה סוג עסקה
Invalid transaction type
## 506
ערך לא חוקי בשדה  eci
Invalid ECI
## 507
## סכום העסקה בפועל גבוה מהסכום המאושר
Transaction amount is bigger than authorized amount
## 512
## לא ניתן להכניס אישור שהתקבל ממענה קולי לעסקה
## זו
You can't use void authorization number with this transaction



## שגיאות אפליקטיביות בתשובה המתקבלת
## מהטנדם

## 551
## מסר תשובה אינו מתאים למסר הבקשה
Response message is incompatible with request message
## 552
## שגיאה בשדה 55
Error in field 55

Document Version 1.53   Caspit SmartRetail Solution
## 204

## Status Hebrew Description English Description
## 553
## התקבלה שגיאה מהטנדם
Error from Tandem
## 554
במסר התשובה חסר שדה mmc_18
Response is missing field mmc_18
## 555
במסר התשובה חסר שדה response_code_25
Response is missing field response_code_25
## 556
במסר התשובה חסר שדה rrn_37
Response is missing field rrn_37
## 557
במסר התשובה חסר שדה comp_retailer_num_42
Response is missing field comp_retailer_num_42
## 558
במסר התשובה חסר שדה auth_code_43
Response is missing field auth_code_43
## 559
במסר התשובה חסר שדה  f39_response_39
Response is missing field f39_response_39
## 560
במסר התשובה חסר שדה authorization_no_38
Response is missing field authorization_no_38
## 561
## שדה  חסר/ריק התשובה במסר
additional_data_48.solek_auth_no
Response is missing field additional_data_48.solek_auth_no
## 562
## במסר    התשובה    חסר    אחד    מהשדות
conversion_amount_08, conversion_rate_09,
conversion_currency_51

Response  is  missing  one  of  these  fields:  conversion_rate_09,
conversion_amount_08, conversion_currency_51

## 563
## ערך השדה  אינו מתאים למספרי האישור שהתקבלו
auth_code_43
Field value is incompatible with field auth_code_43
## 564
## שדה  חסר/ריק התשובה במסר
additional_amounts54.cashback_amount
Response is missing field
additional_amounts54.cashback_amount

## 565
## איהתאמה בין שדה -25לשדה  43
Incompatibility between fields 25 and 43
## 566
## שלבי  יש  חובה  -במסוף  המוגדר  כתומך  בדלק  דו
## להחזיר שדות
## 90,119
Field 90 and 119 must return in a two-phases petrol terminal
## 567
## שדות  25,127  לא  תקינים  במסר  עידכון  אובליגו
## שלבי -במסוף המוגדר כדלק דו
Fields 25,127 are invalid in a two-phases petrol terminal
## -98 ERROR_IN_NEG_FILE ERROR_IN_NEG_FILE
## -99
## שגיאה כללית
General error



-שגיאות המתקבלות מהPinPad
## 700
עסקה נדחתה ע"י מכשיר PinPad
Transaction rejected by Pinpad
## 701
שגיאה במכשיר  PinPad
Error in Pinpad
## 702
יציאת com  לא תקינה
Invalid COM port
## 703
## עסקה נכשלה
Transaction failed
## 704
## עסקה בוטלה
Transaction cancelled
## 705
## עסקה הופסקה ע"י המשתמש
Transaction aborted by user
## 706
## זמן המתנה ארוך מדי
Wait time is too long
## 707
## משתמש הוציא כרטיס לפני סיום ביצוע העסקה
Cardholder removed his card before transaction end
708 PINPAD_UserRetriesExceeded PINPAD_UserRetriesExceeded

Document Version 1.53   Caspit SmartRetail Solution
## 205

## Status Hebrew Description English Description
709 PINPAD_PINPadTimeout PINPAD_PINPadTimeout
## 710
## תקלת תקשורת עם מכשיר
Communication error with Pinpad
711 PINPAD_PINPadMessageError PINPAD_PINPadMessageError
712 PINPAD_PINPadNotInitialized PINPAD_PINPadNotInitialized
713 PINPAD_PINPadCardReaderError PINPAD_PINPadCardReaderError
714 PINPAD_ReaderTimeout PINPAD_ReaderTimeout
715 PINPAD_ReaderCommsError PINPAD_ReaderCommsError
716 PINPAD_ReaderMessageError PINPAD_ReaderMessageError
717 PINPAD_HostMessageError PINPAD_HostMessageError
718 PINPAD_HostConfigError PINPAD_HostConfigError
719 PINPAD_HostKeyError PINPAD_HostKeyError
720 PINPAD_HostConnectError PINPAD_HostConnectError
721 PINPAD_HostTransmitError PINPAD_HostTransmitError
722 PINPAD_HostReceiveError PINPAD_HostReceiveError
723 PINPAD_HostTimeout PINPAD_HostTimeout
724 PINVerificationNotSupportedByCard PINVerificationNotSupportedByCard
725 PINVerificationFailed PINVerificationFailed
## 726
שגיאה בקליטת קובץ config.xml
Error parsing config.xml file
## 730
## מכשיר אישר עסקה בניגוד להחלטת אשראית
Pinpad    authorized    transaction    in    contrary    to    payment
application decision

## 731
## כרטיס לא הוכנס
Card was not inserted


Document Version 1.53   Caspit SmartRetail Solution
## 206

## Appendix J – Transaction Steps
## Explanation
The Pinpad is facing the cardholder and most of the time the Pinpad screen will not be visible  from
the cashier point of view. Because of that, the cashier will not know what is happening on the Pinpad
and what the delay is (if there is a delay).  For example, the Pinpad may ask the cardholder to enter
his PIN, but if the cardholder doesn't pay attention to the Pinpad or if he doesn’t understand what to
do, a delay will happen. For that purpose, we provide the Transaction Steps feature. This feature will
allow the cash register to get the current step (or state) of the Pinpad. The cash register will know if
the Pinpad is waiting for a card or waiting for Pin entry and the cashier can decide whether to abort
the transaction or simply instruct the cardholder what he needs to do.
There are  tree  options  to  get Transaction  Steps  and  to  send  Abort  from  ECR.  The  esiest  way  is  to
use  http to get the step and to send abort. Second option is using  Windows Event Watcher and the
thired way is to implement TCP Listener.

To use Http method STEP application should be download to the pinpad. In such case TCP method
will be disabled.





Enable Transaction Steps with Http
The HTTP GET shell be used as follows
http://pinpadIPaddress:8080/step
http://pinpadIPaddress:8080/abort




Enable Transaction Steps vs FileSystemWatcher
The FileSystemWatcher class in the System.IO namespace can be used to monitor changes to the
transaction steps. It watches a two files “TransactionStep.event” and “TransactionAbort.event” in a
working directory for changes and triggers events when changes occur. The FileSystemWatcher
raises the following events when changes occur to a directory that it is monitoring..

Document Version 1.53   Caspit SmartRetail Solution
## 207

- Changed: This event is triggered when a file“TransactionStep.event” being monitored is
changed. It used for getting step information from file “TransactionStep.event” and/or setting
RedButtonAbort to anabled or disabled state.

- Deleted: This event is triggered when a file “TransactionStep.event” being monitored is deleted.
It used for settind RemoteButtonAbort to hide and close. On starting monitoring we recommended
create an empty file "TransactionStep.event".

- Creted: This event is triggered when a file “TransactionAbort.event” being monitored is created.
It used for emulation of pressed RedButtonAbort on the PinPad. On starting monitoring we
recommended to remove the “TransactionAbort.event”.

For  example,  the default monitoring process name using in “Caspit  SmartRetail  Tester” is “Rba”.
The process “Rba” communicates with the CaspitPayment.dll using the above events.
The process “Rba” starts in “Caspit SmartRetail Tester” after the transaction
(Command>001</Command> <!-- Performing Transaction -->) begins
or other  Ashrait commands (Command>0xx</Command>)

The main functions of the “Rba” process after it is started are:
- Display RedButtonAbort, and display step information. (Changed event)
- Display transaction estimated time remaining.              (Changed event)
- Control of RedButtonAbort Enable/Disable states.        (Changed event)
- Send “TransactionAbort.event”  event  after  user  hit RedButtonAbort on  the  screen  or  after
timeout expired. (Creted event - “TransactionAbort.event”)

The “Rba” process should be closed after the Performing Transaction ends (Deleted event).

Document Version 1.53   Caspit SmartRetail Solution
## 208

Enable Transaction Steps vs TCP Listener
The  ECR  can  use  the  Pinpad  Configuration  command  to  configure  the Pinpad  to  send  the  transaction  steps.  Use  the  tags
<EnableTranSteps> and
<TranStepsAddress> - the IP address and the port number of the listener for the transaction steps.
Here you can see an example of a Pinpad Configuration command that enables the transaction steps, sets the IP address and port of
the listener and tells the Pinpad that the transaction steps are mandatory.
<Request>
<Command>013</Command>    <!--  PinPad Configuration  -->
<TerminalId>0880302</TerminalId>
<TermNo>1</TermNo>      <!--  Station number 1 (Not multiple pinpads).   -->
<RequestId>20180628115807</RequestId> <!--  Request ID (yyyyMMddHHmmss)   -->
<EnableTranSteps>1</EnableTranSteps>  <!--  Transaction steps are enabled   -->
<TranStepsAddress>192.168.1.17:24321</TranStepsAddress>
</Request>

## Disable Transaction Steps
Here you can see an example of a Pinpad Configuration command that disables the transaction steps
<Request>
<Command>013</Command>    <!--  PinPad Configuration  -->
<TerminalId>0880302</TerminalId>
<TermNo>1</TermNo>      <!--  Station number 1 (Not multiple pinpads).   -->
<RequestId>20180628115808</RequestId> <!--  Request ID (yyyyMMddHHmmss)   -->
<EnableTranSteps>0</EnableTranSteps>  <!--  Transaction steps are enabled   -->
<MustTranSteps>1</MustTranSteps>
</Request>

If transaction steps are enabled, the Pinpad will make a TCP connection to the configured address and it will update the ECR  about
the current step of the transaction.
The  ECR  software  is  responsible  for  creating  a  TCP  listener  for  the  Pinpad.  Caspit  doesn't  provide  this
listener.
Beware that if the Pinpad is configured to send transaction steps but the ECR TCP listener is not working, this may cause a delay at
the start of the transaction because the Pinpad is trying to establish the TCP connection at the start of the transaction. The Pinpad
will close the TCP connection at the end of the transaction.
If  the  ECR  is  using  also  the  Idle  Swipe  feature  (see  Appendix  G),  then  the  same  listener  of  the  Idle  Swipe  can  be  used  for  the
transaction steps. But it still required to configure the Transaction steps using the tags <EnableTranSteps> and <TranStepsAddress>.
See Appendix G for Idle Swipe

Document Version 1.53   Caspit SmartRetail Solution
## 209

With the <MustTranSteps> tag you can tell the Pinpad that the transaction steps are mandatory for the transaction. If you configure
the Pinpad with <MustTranSteps>1</MustTranSteps> and the Pinpad is not able to open the TCP connection, the Pinpad will abort
the transaction and return with Result Code 10026 (RETVAL_TRAN_STEPS_LISTENER_NOT_WORKING).
The  last  Pinpad  step  is  also  available in  the  transaction response  XML  (<PinpadStep>  tag).  So  if  the  transaction  was not  completed
successfully you will see on which step the transaction failed.
The following commands will support the steps sending, i.e. during these commands the ECR can expect to get step notifications:
## • Transaction
- Transmit transactions to Shva
- Swipe command
- UI command
Basically, the idea is that every command that takes time to finish, and the ECR "doesn't know" the current status of the command,
that command will send notifications to tell the ECR what is going on.
The Pinpad will send the following XML for each step:
<Step>
<StepCode>0010</StepCode>
## <AP>1</AP>
<Ver>1</Ver>
</Step>

The <StepCode> is a number from the possible transaction steps table that you can see below.
The <AP> tag is a short for "Abort Possible".
If <AP> is 1, it means the ECR can send an abort command to the Pinpad.
If the <AP> is 0 or if <AP> tag is missing then the ECR cannot send an abort command.

The ECR does not need to send response back to the Pinpad.
The  ECR  software  can  do  what  ever  it  likes  with  the  steps  information.  It  can ignore  the  steps  or  it  may  use  them  to  display  the
process of the transaction on the ECR screen for the comfort of the merchant. For example, during PIN entry (secret code entr y) the
Pinpad will send steps describing every key the cardholder is pressing on thePinpad. The ECR may show a nice screen which shows
the cardholder key presses (of course, the specific PIN digits are not sent from the Pinpad).
Note  that  during  the  transaction,  the  step  numbers  don't  need  to  be  consecutive.  It  is  possible  that  a  high  step  code  will  come
before a low step code.

The CaspitPayment.dll  will send to Rba(Red button abort) Event the following XML for each step:

<Step>
<StepCode>0010</StepCode>
## <AP>1</AP>

Document Version 1.53   Caspit SmartRetail Solution
## 210

<Ver>1</Ver>
## <RT>60</RT>
</Step>

Were RT tag value may be used for show  estimated time remaining in seconds.
Note: the remaining time will be starting from Request tag “TimeoutInSeconds” value.
The CaspitPayment.dll  may send the following XML also:
<Remaining>
## <RT>60</RT>
</Remaining>

## Abort
If the last step XML the ECR got included the <AP>1</AP> then the ECR may send an abort command to the Pinpad. The ECR
must use the same TCP connection to send the abort command.
The abort command is this short XML: <Abort>
Table of steps
Step Definition and explanation Application
(Caspit Internal)
## 0010 STEP_REQUEST_ARRIVED_TO_ASHRAIT_EMV
Transaction request has arrived to Ashrait EMV application
Ashrait EMV
## 0020 STEP_USER_MUST_PRESENT_CARD
Cardholder is required to present his card
Abort is possible in this step
Ashrait EMV
## 0030 STEP_USER_PRESENTED_MAGNETIC_CARD
The cardholder swiped the card in the magnetic card reader
Ashrait EMV
## 0031 STEP_USER_MUST_USE_CHIP
The cardholder swiped a magnetic card but he must use the chip
Abort is possible in this step
Ashrait EMV
## 0040 STEP_USER_PRESENTED_CONTACT_CARD
The cardholder inserted the card into the smart card reader
Ashrait EMV
## 0050 STEP_USER_PRESENTED_CONTACTLESS_CARD
The cardholder tapped the card on the contactless reader
Ashrait EMV
## 0060 STEP_USER_PRESENTED_MOBILE_PHONE
The cardholder tapped his mobile phone on the contactless reader
Ashrait EMV

Document Version 1.53   Caspit SmartRetail Solution
## 211

Step Definition and explanation Application
(Caspit Internal)
## 0070 STEP_USER_MUST_ENTER_PIN
The cardholder is required to enter the PIN (secret code)
Abort is possible in this step
## EPA
## 0071 STEP_USER_MUST_RETRY_PIN
The cardholder is required to enter the PIN (secret code) another time (the previous PIN was wrong)
Abort is possible in this step
## EPA
## 0072 STEP_USER_MUST_RETRY_PIN_LAST_TRY
The cardholder is required to enter the PIN (secret code) another time. But Watch out! This is the
last try. Another wrong PIN will cause his credit card to be blocked.
Abort is possible in this step
## EPA
## 0073 STEP_USER_MUST_ENTER_PIN_LAST_TRY
The cardholder is required to enter the PIN (secret code). This is the first try but it is also the last try!.
A wrong PIN will cause his credit card to be blocked.
Abort is possible in this step
## EPA
## 0074 STEP_USER_ENTERED_A_PIN_DIGIT
The cardholder entered a PIN digit (don't worry, there is no way to know which digit was pressed)
Abort is possible in this step
## EPA
## 0075 STEP_USER_ERASED_A_PIN_DIGIT
The cardholder used the backspace to erase one digit of the PIN
Abort is possible in this step
## EPA
## 0076 STEP_USER_CONFIRMED_THE_PIN
The  cardholder pressed  on  the green button  to  confirm the  PIN.   That doesn't  mean that the  PIN is
correct or incorrect.
## EPA
## 0077 STEP_USER_ABORTED_PIN_ENTRY
The  cardholder  pressed  on  the  red  button  to  abort  the  PIN  entry.  The  transaction  cannot  be
completed.
## EPA
## 0078 STEP_PIN_CORRECT
The PIN the cardholder entered was found to be correct
## EPA
## 0079 STEP_PIN_INCORRECT
The PIN the cardholder entered was found to be incorrect
## EPA
## 0085 STEP_USER_REMOVED_CARD_DURING_PIN_ENTRY
The cardholder removed his card in the middle of PIN entry. The transaction cannot be completed.
## EPA
## 0086 STEP_PINPAD_WAIT_FOR_CARD_REMOVAL
The Pinpad is waiting for card removal
## EPA

Document Version 1.53   Caspit SmartRetail Solution
## 212

Step Definition and explanation Application
(Caspit Internal)
## 0087 STEP_WAITING_FOR_CARDHOLDER_INPUT
The cardholder needs to input something using the Pinpad keys
Abort is possible in this step
## EPA
## 0100 STEP_USER_MUST_ENTER_ID
The cardholder is required to enter his ID number
Abort is possible in this step
Ashrait EMV
## 0110 STEP_USER_MUST_ENTER_CVV
The cardholder is required to enter the card CVV
Abort is possible in this step
Ashrait EMV
## 0120 STEP_USER_MUST_ENTER_CARD_NUMBER
The cardholder is required to enter the card number.
Most likely, this will be done by the cashier and not by the cardholder.
Abort is possible in this step
Ashrait EMV
## 0130 STEP_USER_MUST_ENTER_EXPIRATION_DATE
The cardholder is required to enter the expiration date.
Most likely, this will be done by the cashier and not by the cardholder.
Abort is possible in this step
Ashrait EMV
## 0200 STEP_BEFORE_WRITING_TRANSACTION_TO_BATCH
The Pinpad is going to write the transaction into the transaction batch (the TRAN file)
Ashrait EMV
## 0210 STEP_AFTER_WRITING_TRANSACTION_TO_BATCH
The Pinpad has finished writing the transaction into the transaction batch (the TRAN file)
Ashrait EMV
## 0250 STEP_CALLING_SHVA
The Pinpad is calling Shva to get authorization for the transaction
Ashrait EMV
## 0260 STEP_SHVA_COMMUNICATION_ENDED
Shva communication has ended
Ashrait EMV
## 0220 STEP_CHECKING_CARD_PERMISSIONS
Ashrait EMV is checking the permissions of the card
Ashrait EMV
## 0300 STEP_STARTING_SHVA_FULL_COMMUNICATION
Ashrait EMV is starting the full communication to Shva. In the full communication, transactions will be
send and the Pinpad will update its parameters and black list.
Ashrait EMV
## 0310 STEP_RECEIVING_PARAMETERS
While Ashrait EMV is doing the full communication to Shva, this is the step that Ashrait EMV is getting
the parameters.
Ashrait EMV

Document Version 1.53   Caspit SmartRetail Solution
## 213

Step Definition and explanation Application
(Caspit Internal)
## 0320 STEP_SENDING_TRANSACTIONS
While  Ashrait  EMV  is  doing  the  full  communication  to  Shva,  this  is  the  step  that  Ashrait  EMV  is
sending the transactions.
Ashrait EMV
## 0330 STEP_RECEIVING_BLACK_LIST
While Ashrait EMV is doing the full communication to Shva, this is the step that Ashrait EMV is getting
the black list.
Ashrait EMV
## 0340 STEP_RECEIVING_PINPAD_PARAMETERS
Whie Ashrait EMV is doing the full communication to Shva, this is the step that Ashrait EMV is getting
the Pinpad parameters.
Ashrait EMV
## 0350 STEP_ENDING_SHVA_FULL_COMMUNICATION
End of full communication to Shva
Ashrait EMV
## 0400 STEP_USER_MUST_SWIPE_CARD
This step is for the Swipe Command. The cardholder must swipe his card.
Abort is possible in this step

## 0500 STEP_CONTACT_TRAN_APPROVED_REMOVE_CARD
The contact transaction has been approved. The cardholder must remove his card
## EPA
## 0505 STEP_CONTACT_TRAN_DECLINED_REMOVE_CARD
The contact transaction has been declined. The cardholder must remove his card.
## EPA
## 0510 STEP_CONTACT_TRAN_PROCESSING_ERROR_REMOVE_CARD
There is a processing error in the contact transaction. The cardholder must remove his card.
## EPA
## 0515 STEP_CONTACT_TRAN_ABORTED_REMOVE_CARD
The contact transaction was aborted. The cardholder must remove his card.
## EPA
## 0520 STEP_CONTACT_TRAN_INVALID_CARD_REMOVE_CARD
The contact transaction failed because of invalid card. The cardholder must remove his card.
## EPA
## 0525 STEP_USER_REMOVED_THE_CARD
The cardholder removed his card
## EPA
## 0530 STEP_CONTACT_TRAN_AID_BLOCKED_REMOVE_CARD
The contact transaction failed because the card AID is blocked. The cardholder must remove his card.
## EPA
## 0535 STEP_USER_CANCELLED_PIN_ENTRY_REMOVE_CARD
The  contact transaction  failed because  the  cardholder  cancelled the PIN  entry. The  cardholder  must
remove his card.
## EPA
## 0540 STEP_CARD_BLOCKED_REMOVE_CARD
The contact transaction failed because the card is blocked. The cardholder must remove his card.
## EPA

Document Version 1.53   Caspit SmartRetail Solution
## 214

Step Definition and explanation Application
(Caspit Internal)
## 0545 STEP_NO_MATCHING_AID_REMOVE_CARD
The  contact  transaction  failed  because  there  is  no  matching  AID.  The  cardholder  must  remove  his
card.
## EPA
## 0600 STEP_USER_SHOULD_TRY_TAPPING_AGAIN CPA
## 0605 STEP_USER_TAPPED_TOO_MANY_CARDS_TRY_AGAIN CPA
9000 STEP_END_OF_TRANSACTION Ashrait EMV

## Example
During a standard Pin entry process, the Pinpad may send the following XMLs
<Step>
<StepCode>0070</StepCode>  (the cardholder must enter PIN)
## <AP>1</AP>
</Step>
<Step>
<StepCode>0074</StepCode>  (the cardholder entered a digit)
## <AP>1</AP>
</Step>
<Step>
<StepCode>0074</StepCode>  (the cardholder entered a digit)
## <AP>1</AP>
</Step>
<Step>
<StepCode>0074</StepCode>  (the cardholder entered a digit)
## <AP>1</AP>
</Step>
<Step>
<StepCode>0074</StepCode>  (the cardholder entered a digit)
## <AP>1</AP>
</Step>
<Step>
<StepCode>0076</StepCode>  (the cardholder pressed on the green button)
## <AP>0</AP>
</Step>

Document Version 1.53   Caspit SmartRetail Solution
## 215

<Step>
<StepCode>0078</StepCode>  (PIN is correct)
</Step>



Document Version 1.53   Caspit SmartRetail Solution
## 216

## Appendix K – Various Tables
## Caspit Internal Errors Table
The transaction response XML may include the tag <CaspitInternalError>. This tag gives the internal error number of Ashrait EMV
application on the Pinpad. The explanation of each error number is out of the scope of this document. But I will put here the
definition of all the internal errors, it may help sometimes.
#define _PARAMETER_ERROR                            _ERROR_START       + 100
#define _TRANSACTION_ERROR                          _ERROR_START       + 200
#define _BLACKLIST_ERROR                            _ERROR_START       + 300
#define _GENERAL_ERROR                              _ERROR_START       + 500
#define _CREDIT_ERROR                               _ERROR_START       + 900
#define _IDX_ERROR                                  _ERROR_START       + 1000
#define _CARD_IDENTIFICATION_ERROR                  _ERROR_START       + 1100
#define _REPORT_GENERATOR_ERROR                     _ERROR_START       + 1200
#define _COMM_ERROR                                 _ERROR_START       + 1300
#define _AUTHORIZATION_ERROR                        _ERROR_START       + 1400
#define _DATA_PERMISSION_ERROR                      _ERROR_START       + 1500
#define _PIN_PAD_ERROR                              _ERROR_START       + 1600

#define _ECR_ERROR          _ERROR_START       + 3000

/**************************************************************************************/

#define ERR_TOO_MANY_NAKS                           _PARAMETER_ERROR   + 0
#define ERR_CANT_UPDATE_CLOCK                       _PARAMETER_ERROR   + 1
#define ERR_WRONG_SITE_ID                           _PARAMETER_ERROR   + 2
#define ERR_BAD_PARAM_BLOCK_SEQUENCE                _PARAMETER_ERROR   + 3
#define ERR_BAD_PARAM_BLOCK_TYPE                    _PARAMETER_ERROR   + 4
#define ERR_BAD_PARAM_VECTOR_TYPE                   _PARAMETER_ERROR   + 5
#define ERR_CANT_OPEN_VECTOR_FILE                   _PARAMETER_ERROR   + 6
#define ERR_VECTOR_WRITE_TRUNCATED                  _PARAMETER_ERROR   + 7
#define ERR_VECTOR_SEEK_ERROR                       _PARAMETER_ERROR   + 8
#define ERR_VECTOR_READ_ERROR                       _PARAMETER_ERROR   + 9
#define ERR_PRINT_PARAM_ILLEGAL_BLOCK_ID       _PARAMETER_ERROR   + 10
#define ERR_PRINT_PARAM_OPEN_PARAM       _PARAMETER_ERROR   + 11
#define ERR_PRINT_PARAM_SEEK_PARAM       _PARAMETER_ERROR   + 12
#define ERR_PRINT_PARAM_READ_PARAM       _PARAMETER_ERROR   + 13
#define ERR_PRINT_PARAM_WRITE_OUT        _PARAMETER_ERROR   + 14
#define ERR_PRINT_PARAM_OPEN_OUTPUT            _PARAMETER_ERROR   + 15
#define ERR_PRINT_PARAM_OPEN_PARAM_INDEX             _PARAMETER_ERROR   + 16
#define ERR_PRINT_PARAM_SEEK_PARAM_INDEX             _PARAMETER_ERROR   + 17
#define ERR_PRINT_PARAM_READ_PARAM_INDEX             _PARAMETER_ERROR   + 18
#define ERR_CALL_PARAM        _PARAMETER_ERROR   + 19
#define ERR_SEEK_PARAM        _PARAMETER_ERROR   + 20


/**************************************************************************************/

#define ERR_BAD_OK_BLOCK                            _TRANSACTION_ERROR + 0
#define ERR_TRN_COPY_CREATE                    _TRANSACTION_ERROR + 1
#define ERR_TRN_COPY_OPEN                      _TRANSACTION_ERROR + 2
#define ERR_TRN_COPY_WRITE                     _TRANSACTION_ERROR + 3
#define ERR_TRN_COPY_READ                      _TRANSACTION_ERROR + 4
#define ERR_BATCH_OPEN        _TRANSACTION_ERROR + 5

Document Version 1.53   Caspit SmartRetail Solution
## 217

#define ERR_BATCH_CREATE           _TRANSACTION_ERROR + 6
#define ERR_BATCH_SEEK        _TRANSACTION_ERROR + 7
#define ERR_BATCH_READ        _TRANSACTION_ERROR + 8
#define ERR_BATCH_WRITE             _TRANSACTION_ERROR + 9
#define ERR_BATCH_TOO_MANY_TRANSACTIONS        _TRANSACTION_ERROR + 10
#define ERR_BATCH_WRITE_COUNTER         _TRANSACTION_ERROR + 11
#define ERR_CANT_DISPLAY_BLOCK_NUM                  _TRANSACTION_ERROR + 12
#define ERR_EMPTY_BATCH_FILE                        _TRANSACTION_ERROR + 13
#define ERR_ARRAY_CREATE                            _TRANSACTION_ERROR + 14
#define ERR_ARRAY_READ                              _TRANSACTION_ERROR + 15
#define ERR_ARRAY_SEEK                              _TRANSACTION_ERROR + 16
#define ERR_ARRAY_WRITE                             _TRANSACTION_ERROR + 17
#define ERR_NO_TRANSACTION_IN_SHIFT                 _TRANSACTION_ERROR + 18
#define ERR_EMPTY_DEPOSIT_FILE                      _TRANSACTION_ERROR + 19
#define ERR_INVALID_AMOUNT                          _TRANSACTION_ERROR + 20

/**************************************************************************************/

#define ERR_CANT_OPEN_ADD_LIST_FILE                 _BLACKLIST_ERROR   + 0
#define ERR_CANT_OPEN_DEL_LIST_FILE                 _BLACKLIST_ERROR   + 1
#define ERR_BAD_UPDATE_TYPE                         _BLACKLIST_ERROR   + 2
#define ERR_BAD_BLACK_LIST_BLOCK_SEQUENCE           _BLACKLIST_ERROR   + 3
#define ERR_WRITE_TO_BLACKLIST_FILE_FAILED          _BLACKLIST_ERROR   + 4
#define ERR_SMALL_HOT_WRITE                         _BLACKLIST_ERROR   + 5
#define ERR_SMALL_HOT_CREATE                        _BLACKLIST_ERROR   + 6
#define ERR_BL_OFF_LINE                             _BLACKLIST_ERROR   + 7
#define ERR_SHORT_CARD_LEN                          _BLACKLIST_ERROR   + 8
#define ERR_SHORT_ISRACARD_CARD_NUM                 _BLACKLIST_ERROR   + 9
#define ERR_SHORT_AMEX_CARD_NUM                     _BLACKLIST_ERROR   + 10
#define ERR_SHORT_DINERS_CARD_NUM                   _BLACKLIST_ERROR   + 11
#define ERR_SHORT_VISA_CARD_NUM                     _BLACKLIST_ERROR   + 12

/**************************************************************************************/

#define ERR_EXPECTED_DELIMITER_MISSING              _GENERAL_ERROR     + 0
#define ERR_MEMORY_ALOCATION_FAILED                 _GENERAL_ERROR     + 1
#define ERR_CALL_SHVA                               _GENERAL_ERROR     + 2
#define ERR_TRANSMIT_TRANZACTIONS                   _GENERAL_ERROR     + 3
#define ERR_TERMINAL_BLOCKED                        _GENERAL_ERROR     + 4

#define ERR_KEYED_FILE_OPEN                         _GENERAL_ERROR     + 5
#define ERR_EDIT_DISABLE                            _GENERAL_ERROR     + 6
#define ERR_LAST_REPORT_DISABLE                     _GENERAL_ERROR     + 7

#define ERR_HIGH_MEM_BOUNDARY                       _GENERAL_ERROR     + 8
#define ERR_LOW_MEM_BOUNDARY                        _GENERAL_ERROR     + 9
#define ERR_TEST_VERSION                            _GENERAL_ERROR     + 10
#define ERR_TRANSMIT_DISABLE                        _GENERAL_ERROR     + 11
#define ERR_LOW_TRN_MEM_BOUNDARY                    _GENERAL_ERROR     + 12
#define ERR_LOW_FILE_BOUNDARY                       _GENERAL_ERROR     + 13

#define ERR_KUPA_HIGH_MEM_BOUNDARY                  _GENERAL_ERROR     + 14
#define ERR_KUPA_LOW_MEM_BOUNDARY        _GENERAL_ERROR     + 15

/**************************************************************************************/


Document Version 1.53   Caspit SmartRetail Solution
## 218

#define ERR_CARD_REJECTED                           _CREDIT_ERROR      + 0
#define ERR_CARD_REJECTED_BLOCKED                   _CREDIT_ERROR      + 1
#define ERR_CARD_REJECTED_STOLEN                    _CREDIT_ERROR      + 2
#define ERR_CARD_REJECTED_CALL_CREDIT_COMPANY       _CREDIT_ERROR      + 3
#define ERR_CARD_REJECTED_DECLINED                  _CREDIT_ERROR      + 4
#define ERR_CARD_REJECTED_FORGED                    _CREDIT_ERROR      + 5

#define ERR_CARD_REJECTED_TZ       _CREDIT_ERROR      + 6
#define ERR_CARD_REJECTED_CVV             _CREDIT_ERROR      + 7
#define ERR_CARD_BLOCKED                            _CREDIT_ERROR      + 8
#define ERR_BAD_CHECK_DIGIT                         _CREDIT_ERROR      + 9
#define ERR_WRONG_MASTER_NUMBER                     _CREDIT_ERROR      + 10
#define ERR_CANT_UNDO_LAST_TRANSACTION              _CREDIT_ERROR      + 11
#define ERR_NO_TRANSACTIONS_TO_UNDO                 _CREDIT_ERROR      + 12
#define ERR_BAD_TRANSACTION_RECORD                  _CREDIT_ERROR      + 13
#define ERR_NO_TRANSACTIONS                         _CREDIT_ERROR      + 14
#define ERR_NO_TRANSACTIONS_IN_SHIFT                _CREDIT_ERROR      + 15
#define ERR_CARD_NOT_ACCEPTED                       _CREDIT_ERROR      + 16
#define ERR_NO_PHONE_NUMBER                         _CREDIT_ERROR      + 17
#define ERR_PHONE_TRN_BLOCKED                       _CREDIT_ERROR      + 18
#define ERR_LIMIT_NO_OPTIONS                        _CREDIT_ERROR      + 19
#define ERR_NO_AUTHORIZATION                        _CREDIT_ERROR      + 20
#define ERR_READ_READER                             _CREDIT_ERROR      + 21
#define ERR_ISSUER_NOT_OPEN                         _CREDIT_ERROR      + 22
#define ERR_PRE_AUTHOR_NOT_ALLOWED                  _CREDIT_ERROR      + 23
#define ERR_CARD_EXPIRED                            _CREDIT_ERROR      + 24
#define ERR_BAD_TRN_TYPE                            _CREDIT_ERROR      + 25
#define ERR_CREDIT_NOT_ALLOWED                      _CREDIT_ERROR      + 26
#define ERR_DEBIT_NOT_ALLOWED                       _CREDIT_ERROR      + 27
#define ERR_TELEPHONE_TRANSACTION_NOT_PERMITTED     _CREDIT_ERROR      + 28
#define ERR_SIGNATURE_TRANSACTION_NOT_PERMITTED     _CREDIT_ERROR      + 29
#define ERR_INVALID_CARD_DATE                       _CREDIT_ERROR      + 30
#define ERR_PREAUTHOR_NO_UNDO                       _CREDIT_ERROR      + 31
#define ERR_PREAUTHOR_NO_COPY                       _CREDIT_ERROR      + 32
#define ERR_CREDIT36_NOT_ALLOWED                    _CREDIT_ERROR      + 33
#define ERROR_CANT_UNDO_GIFT_TRANSACTION            _CREDIT_ERROR      + 34
#define ERROR_CEIL0          _CREDIT_ERROR      + 35
#define ERROR_CEIL0_PHONE_SIGN          _CREDIT_ERROR      + 36
#define ERROR_CEIL0_ZIKUI                _CREDIT_ERROR      + 37
#define ERROR_CREDIT_BLOCKED                   _CREDIT_ERROR      + 38
#define ERROR_INVALID_PAYM_NUM                      _CREDIT_ERROR      + 39
#define ERROR_BRAND_NOT_OPEN       _CREDIT_ERROR      + 40 //emv
#define ERROR_INVALID_PARAM_SET         _CREDIT_ERROR      + 41 //emv
#define ERROR_ACQUIRE_NOT_OPEN          _CREDIT_ERROR      + 42 //emv
#define ERROR_INVALID_ID_NUMBER                     _CREDIT_ERROR      + 43
#define ERROR_CARD_PERMISSION       _CREDIT_ERROR      + 44 //emv
#define ERROR_TRANS_PERMISSION          _CREDIT_ERROR      + 45 //emv
#define ERROR_LOAD_CARD_PERMISSION       _CREDIT_ERROR      + 46 //emv
#define ERR_CARD_REJECTED_AVS       _CREDIT_ERROR      + 47
#define ERROR_INVALID_PARAM_SET_SOLEK         _CREDIT_ERROR      + 48

/**************************************************************************************/

#define ERR_MEMORY_ALLOCATION_ERROR                 _IDX_ERROR         + 0
#define ERR_FILE_OPEN_ERROR                         _IDX_ERROR         + 1
#define ERR_FILE_NAME_TOO_LONG                      _IDX_ERROR         + 2

Document Version 1.53   Caspit SmartRetail Solution
## 219

#define ERR_READ_ERROR                              _IDX_ERROR         + 3
#define ERR_BAD_KEY_TYPE                            _IDX_ERROR         + 4
#define ERR_SEEK_ERROR                              _IDX_ERROR         + 5
#define ERR_BAD_OFFSET_SIZE                         _IDX_ERROR         + 6
#define ERR_BAD_LENGTH_SIZE                         _IDX_ERROR         + 7
#define ERR_WRITE_ERROR                             _IDX_ERROR         + 8
#define ERR_DUPLICATE_KEY                           _IDX_ERROR         + 9
#define KEY_OUT_OF_RANGE                            _IDX_ERROR         + 10
#define KEY_NOT_FOUND                               _IDX_ERROR         + 11

/**************************************************************************************/

#define ERR_ISSUER_14_DIGIT        _CARD_IDENTIFICATION_ERROR         + 0
#define ERR_BAD_CARD_TYPE          _CARD_IDENTIFICATION_ERROR         + 1
#define ERR_ISSUER_15_DIGIT              _CARD_IDENTIFICATION_ERROR         + 2
#define ERR_ISSUER_16_DIGIT        _CARD_IDENTIFICATION_ERROR         + 3
#define ERR_ISSUER_4_NOT_FIRST_DIGIT      _CARD_IDENTIFICATION_ERROR         + 4
#define ERR_CARD_NUM_LENGTH        _CARD_IDENTIFICATION_ERROR         + 5
#define ERR_BAD_CHECK_DIGIT_LOCAL_ISRACARD    _CARD_IDENTIFICATION_ERROR         + 6
#define ERR_BAD_CHECK_DIGIT_OTHER_CARDS       _CARD_IDENTIFICATION_ERROR         + 7
#define ERR_ISSUER_NUMBER                _CARD_IDENTIFICATION_ERROR         + 8
#define ERR_SEPARATOR_NOT_FOUND         _CARD_IDENTIFICATION_ERROR         + 9
#define ERR_DINERS_PRE_6_NOT_IN_VECTOR_21      _CARD_IDENTIFICATION_ERROR         + 10
#define ERR_AMEX_WRONG_GROUP_NUMBER      _CARD_IDENTIFICATION_ERROR         + 11
#define ERR_YOUTH_CARD_GROUP_NOT_VALID        _CARD_IDENTIFICATION_ERROR         + 12
#define ERR_ISRACARD_GROUP_NUMBER_BLOCKED      _CARD_IDENTIFICATION_ERROR         + 13
#define ERR_ISRACARD_DELEK_CARD         _CARD_IDENTIFICATION_ERROR         + 14
#define ERR_ISRACARD_VECTOR_7       _CARD_IDENTIFICATION_ERROR         + 15
#define ERR_ISRACARD_VECTOR_5       _CARD_IDENTIFICATION_ERROR         + 16
#define ERR_ISRACARD_SERVICE_CODE        _CARD_IDENTIFICATION_ERROR         + 17
#define ERR_VISA_DELEK_CARD        _CARD_IDENTIFICATION_ERROR         + 18
#define ERR_VISA_SERVICE_CODE       _CARD_IDENTIFICATION_ERROR         + 19
#define ERR_VISA_NEED_COMM_REJECT_CODE        _CARD_IDENTIFICATION_ERROR         + 20
#define ERR_VISA_PRE_3090          _CARD_IDENTIFICATION_ERROR         + 21
#define ERR_WRONG_SERVICE_CODE          _CARD_IDENTIFICATION_ERROR         + 22
#define ERR_SEC_SEPARATOR_NOT_FOUND      _CARD_IDENTIFICATION_ERROR         + 23
#define ERR_CARD_OUT_OF_RANGE       _CARD_IDENTIFICATION_ERROR         + 24
#define ERR_COMP_LAST_DIGITS       _CARD_IDENTIFICATION_ERROR         + 25
#define ERR_ILLEGAL_CLUB_RANGE          _CARD_IDENTIFICATION_ERROR         + 26
#define ERR_CARD_NOT_DEFINED       _CARD_IDENTIFICATION_ERROR    + 27
#define ERR_VECTOR_57         _CARD_IDENTIFICATION_ERROR    + 28
#define ERR_VECTOR_58        _CARD_IDENTIFICATION_ERROR + 29
#define ERR_BAD_TECH_CARD                     _CARD_IDENTIFICATION_ERROR + 30

## /*****************************************************************************/

#define REPORT_RETURN_CAN_NOT_OPEN_TEMPLATE          _REPORT_GENERATOR_ERROR + 0
#define REPORT_RETURN_CAN_NOT_OPEN_DEVICE            _REPORT_GENERATOR_ERROR + 1
#define REPORT_RETURN_READ_TEMPLATE_ERROR            _REPORT_GENERATOR_ERROR + 2
#define REPORT_RETURN_WRITE_DEVICE_ERROR             _REPORT_GENERATOR_ERROR + 3
#define REPORT_RETURN_ILLEGAL_ARGUMENT               _REPORT_GENERATOR_ERROR + 4
#define REPORT_RETURN_CONVERT_ARGUMENT_ERROR         _REPORT_GENERATOR_ERROR + 5
#define REPORT_RETURN_VARIABLE_NOT_FOUND             _REPORT_GENERATOR_ERROR + 6
#define REPORT_RETURN_ILLEGAL_DIRECTIVE              _REPORT_GENERATOR_ERROR + 7
#define REPORT_RETURN_GET_DIRECTIVE_ERROR            _REPORT_GENERATOR_ERROR + 8
#define REPORT_RETURN_ILLEGAL_GROUP_NUMBER      _REPORT_GENERATOR_ERROR + 9

Document Version 1.53   Caspit SmartRetail Solution
## 220

#define REPORT_RETURN_SKIP_CURRENT_GROUP        _REPORT_GENERATOR_ERROR + 10
#define REPORT_RETURN_HANDLE_CURRENT_GROUP      _REPORT_GENERATOR_ERROR + 11
#define REPORT_RETURN_CONTINUE_IN_TEMPLATE      _REPORT_GENERATOR_ERROR + 12
#define REPORT_RETURN_REPEAT_CURRENT_GROUP      _REPORT_GENERATOR_ERROR + 13
#define REPORT_RETURN_END_GROUP_NOT_FOUND            _REPORT_GENERATOR_ERROR + 14
#define REPORT_RETURN_COMMAND_NOT_FOUND              _REPORT_GENERATOR_ERROR + 15
#define REPORT_RETURN_ESC_SEQ_TOO_BIG                _REPORT_GENERATOR_ERROR + 16
#define REPORT_RETURN_NOT_ENOUGH_MEMORY_FOR_TEMPLATE _REPORT_GENERATOR_ERROR + 17
#define REPORT_RETURN_TEMPLATE_SEEK_ERROR            _REPORT_GENERATOR_ERROR + 18
#define REPORT_RETURN_GROUP_ENTRY_ALLOCATION_ERROR   _REPORT_GENERATOR_ERROR + 19

## /*****************************************************************************/

#define ERR_CE_COMM_INIT                         _COMM_ERROR         + 0
#define ERR_CE_OPEN_DEVICE                       _COMM_ERROR         + 1
#define ERR_CE_BUILD_DCB                         _COMM_ERROR         + 2
#define ERR_CE_COMM_STATE                        _COMM_ERROR         + 3
#define ERR_CE_MEM_ALLOC                         _COMM_ERROR         + 4
#define ERR_CE_COMM_DIAL                         _COMM_ERROR         + 5
#define ERR_CE_CONNECT_TYPE                      _COMM_ERROR         + 6
#define ERR_CE_CHECK_RESPONSE          _COMM_ERROR         + 7
#define ERR_CE_NOT_SUPPORTED_OPTION              _COMM_ERROR         + 8
#define ERR_CE_WRITE_TO_DEVICE             _COMM_ERROR         + 9
#define ERR_CE_OVERFLOW         _COMM_ERROR         + 10
#define ERR_CE_NO_RESPONSE                       _COMM_ERROR         + 11
#define ERR_CE_RECEIVE_HOST_STRING               _COMM_ERROR         + 12
#define ERR_CE_SEND_HOST_STRING                  _COMM_ERROR         + 13
#define ERR_CE_GET_HOST_ANSWER                   _COMM_ERROR         + 14
#define ERR_CE_WRONG_CHECK_SUM_TYPE              _COMM_ERROR         + 15
#define ERR_CE_SEND                              _COMM_ERROR         + 16
#define ERR_CE_RECEIVE                           _COMM_ERROR         + 17
#define ERR_CE_DATA_LEN                          _COMM_ERROR         + 18
#define ERR_CE_START_CHAR                        _COMM_ERROR         + 19
#define ERR_CE_NAK_RECEIVE                       _COMM_ERROR         + 20
#define ERR_CE_TOO_LARGE_PACKET                  _COMM_ERROR         + 21
#define ERR_CE_END_BLOCK_NOT_RECEIVED            _COMM_ERROR         + 22
#define ERR_CE_WRONG_CHECK_SUM                   _COMM_ERROR         + 23
#define ERR_CE_BLOCK_SEQ                         _COMM_ERROR         + 24
#define ERR_CE_ENVELOPE_NAK_PACKET               _COMM_ERROR         + 25
#define ERR_CE_SEND_NAK_PACKET                   _COMM_ERROR         + 26
#define ERR_CE_NO_CARRIER                        _COMM_ERROR         + 27
#define ERR_DOWNLOAD                             _COMM_ERROR         + 28
#define ERR_SSL_ERROR           _COMM_ERROR         + 29
#define ERR_FTP_NOT_CONNECTED    _COMM_ERROR         + 30
#define ERR_FTP_DIR_NOT_CHANGED      _COMM_ERROR         + 31
#define ERR_CE_DECLINE     _COMM_ERROR         + 32

/**************************************************************************************/

#define ERR_STOP_ACTIVITY_AND_IMMEDIATE_CARD     _AUTHORIZATION_ERROR    + 0
#define ERR_MUST_AUTHOR_NOT_ALLOWED              _AUTHORIZATION_ERROR    + 1
#define ERR_MUST_CALL_AND_SHOULD_NOT_CALL        _AUTHORIZATION_ERROR    + 2
#define ERR_NEGATIVE_RESPONSE_FROM_CRED_CO       _AUTHORIZATION_ERROR    + 3
#define ERR_VOICE_AUTHOR_NOT_ALLOWED_FOR_CARD    _AUTHORIZATION_ERROR    + 4
#define ERR_VOICE_NOT_ALLOWED_FOR_TRANSACTION    _AUTHORIZATION_ERROR    + 5
#define ERR_INQ_CREDIT_ABOVE_LIMIT_NOT_ALLOWED   _AUTHORIZATION_ERROR    + 6

Document Version 1.53   Caspit SmartRetail Solution
## 221

#define ERR_DEBIT_IMMED_INQUERY_NOT_ALLOWED      _AUTHORIZATION_ERROR    + 7
#define ERR_AUTHOR_UNKNOWN_RESPONSE              _AUTHORIZATION_ERROR    + 8
#define ERR_RANDOM_CREATE             _AUTHORIZATION_ERROR    + 9
#define ERR_RANDOM_OPEN         _AUTHORIZATION_ERROR    + 10
#define ERR_RANDOM_SEEK         _AUTHORIZATION_ERROR    + 11
#define ERR_RANDOM_READ         _AUTHORIZATION_ERROR    + 12
#define ERR_RANDOM_WRITE              _AUTHORIZATION_ERROR    + 13
#define ERR_AUTHOR_PINPAD_REQUIRED               _AUTHORIZATION_ERROR    + 14
#define ERR_AUTHOR_UNKNOWN_BLOCK_TYPE            _AUTHORIZATION_ERROR    + 15

## /*****************************************************************************/
#define ERR_DATA_PERMISSION_FILE_OPEN            _DATA_PERMISSION_ERROR  + 0
#define ERR_DATA_PERMISSION_SEEK                 _DATA_PERMISSION_ERROR  + 1
#define ERR_DATA_PERMISSION_READ                 _DATA_PERMISSION_ERROR  + 2
#define ERR_PERMISSION_CARD_NUMBER               _DATA_PERMISSION_ERROR  + 3
#define ERR_DATA_NO_OPTIONS                      _DATA_PERMISSION_ERROR  + 4
#define ERR_PERMISSION_CURRENCY            _DATA_PERMISSION_ERROR  + 5
## /*****************************************************************************/
#define ERR_PP_TOO_LARGE_PACKET                  _PIN_PAD_ERROR          + 0
#define ERR_PP_TRANSMIT_PACKET                   _PIN_PAD_ERROR          + 1
#define ERR_PP_READ_PINPAD_DEVICE                _PIN_PAD_ERROR          + 2
#define ERR_PP_GET_PACKET_WRONG_LRC              _PIN_PAD_ERROR          + 3
#define ERR_PP_GET_PACKET_SIZE                   _PIN_PAD_ERROR          + 4
#define ERR_PP_GET_PACKET_DIRECTION              _PIN_PAD_ERROR          + 5
#define ERR_PP_REMOVE_CARD                       _PIN_PAD_ERROR          + 6
#define ERR_PP_TRANSACTION_CANCELED              _PIN_PAD_ERROR          + 7
#define ERR_PP_VISA_SERVICE_CODE                 _PIN_PAD_ERROR          + 8
#define ERR_LOCKED_PIN_TRANS_CANCELED            _PIN_PAD_ERROR          + 9
#define ERR_PP_TIMEOUT_ON_RECEIVE                _PIN_PAD_ERROR          + 10
#define ERR_PP_NO_ACK                            _PIN_PAD_ERROR          + 11
#define ERR_PP_NO_MATCH_TRACK2                   _PIN_PAD_ERROR          + 12
#define ERR_PP_GOT_NAK                           _PIN_PAD_ERROR          + 13
#define ERR_PP_MAG_STRIPE                        _PIN_PAD_ERROR          + 14
#define ERR_TIMEOUT_TRANS_CANCELED               _PIN_PAD_ERROR          + 15
#define ERR_PP_CTLS                            _PIN_PAD_ERROR          + 16
## /*****************************************************************************/
#define _CASPIT_CENTER_ERROR                        _ERROR_START       + 1800
## /*****************************************************************************/
#define ERR_WRONG_OPERATOR_NUMBER                _CASPIT_CENTER_ERROR + 5
#define ERR_WRONG_TERMINAL_ID                    _CASPIT_CENTER_ERROR + 6
#define ERR_TOO_MANY_SHIFTS                      _CASPIT_CENTER_ERROR + 7
#define ERR_CASPIT_CENTER_FS_ERROR               _CASPIT_CENTER_ERROR + 8
#define ERR_CASPIT_CENTER_NEG_RESPONSE           _CASPIT_CENTER_ERROR + 9
#define ERR_CASPIT_CENTER_ENQ                    _CASPIT_CENTER_ERROR + 10
#define ERR_CASPIT_CENTER_ACK                    _CASPIT_CENTER_ERROR + 11

## /*****************************************************************************/
#define ERR_ECR_PAYMENTS_NOT_EQUAL_TOTAL_AMOUNT  _ECR_ERROR + 37

Document Version 1.53   Caspit SmartRetail Solution
## 222

## Appendix L – Beginner's Guide
I  wrote  this  Beginner's  Guide  to  ease  the  integration  phase  for  new integrators  of  the  Caspit  SmartRetail  Solution.  However,  this
guide  is not  an  excuse  not  to  read  the  complete  description  of  each  command  you  need  to use.  Each  command  described  in  this
guide  has  many  more  options  and  tags  than  described  here.    You  should  refer  to  the  relevant  chapters  and  learn  about  all  the
possible  feature  of  the  commands.  Also,  don't  neglect  chapter  9.2, where  you  can  find  XML  examples  for  most  of  the  transaction
types.
Before you begin, you need to have to following items:
- A Pinpad device with applications that are ready to be used.
- A USB cable for the Pinpad (unless it is a BlueTooth Pinpad)
- Ingenico Driver for Windows (needed only for USB Pinpad)
- A power supply for the Pinpad (depending on the Pinpad model)
- Caspit Payment Windows Service software
- Caspit Payment DLL
- SmartRetail Tester
- This document about the Caspit SmartRetail Solution (read it!)
- Test credit cards
## Step 1 – Installation
Install the following components:
- Install the Ingenico driver.
- Connect a Pinpad to the PC and make sure the Pinpad is found in the Device Manager
- Or, pair the BlueTooth Pinpad to Windows (or to the tablet/smartphone)
- Install the Caspit Payment Windows Service (only for Windows of course. Not relevant for iOS/Android)
- In some cases, you may need to install the Visual C++ Redistributable package. You can download it from the following link:
o https://drive.google.com/open?id=0B3lyoKvcD8chRUQ3SkFQTFdSTW8
- Install the SmartRetail Tester (again, it is only for Windows)
Step 2 – Use the SmartRetail Tester
Now that the installation is behind us, you are going to use the tester to perform three essential commands.
Even  if you  are  integrating  the Pinpad with  iOS  or  Android,  I  strongly  recommend  that  you  install  the  Pinpad  on  Windows  and  use
the SmartRetail tester to learn how to write the correct XML. If something is not working, always go back to Windows and try  it with
the tester.
Learn to use the SmartRetail Tester and perform the following three commands using the Tester:
## • Communication Test (command 003)
## • Transmit Transactions (command 006)
- Perform a Transaction (command 001)
You must have success with all three commands before starting your own implementation.
You can get the full source code of the Tester and learn from it how to implement these three commands.

## Step 3 – Implement Communication Test
Great, tester is working, now let's get down to business and start the real implementation.

Document Version 1.53   Caspit SmartRetail Solution
## 223

The first thing you need to have is a successful Communication Test. A successful Communication Test will give you the following
indications:
- That the Windows Service is installed correctly and working properly.
- That the CaspitPayment.dll is working and that you know how to use the Dll.
- That the Pinpad is connected and have a good setup.
During production, it is always a good practice to perform Communication Test every X minutes.
So to send the Communication Test command, just send the following XML to the Pinpad (either directly or using the DLL).
This  is  a  minimal  format  of  the  Communication  Test  command.  As  you  can  see  in  chapter  16,  the  Communication  Test  has  more
options.
<Request>
<Command>003</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<TimeoutInSeconds>10</TimeoutInSeconds>
<RequestId>20160216155540</RequestId>
</Request>

If all goes well, you should get the following response XML:
<Response>
<Command>003</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<SerialNumber>30303PP3039393</SerialNumber>
<SmartRetailVersion>4872830001</SoftwareVersion>
<AshraitEMVVersion>5959590040</AshraitEMVVersion>
<EPAVersion>33939392122</EPAVersion>
<CPAVersion>20202022020</CPAVersion>
<RouterVersion>30303030303</RouterVersion>
<SDKVersion>9.22.0</SDKVersion>
<ResultCode>0</ResultCode>
<ShvaCommStatus>9</ShvaCommStatus>
<SwitchCommStatus>9</SwitchCommStatus>
<CaspitCommStatus>9</CaspitCommStatus>
<TMSCommStatus>9</TMSCommStatus>
<CertServerStatus>9</CertServerStatus>

Document Version 1.53   Caspit SmartRetail Solution
## 224

<ReportServerStatus>9</ReportServerStatus>
<FTPServerStatus>9</CheckFTPStatus>
<ContactStatus>1</ContactStatus>
<ContactlessStatus>1</ContactlessStatus>
<CardInside>0</CardInside>
<RequestId>20160216155540</RequestId>
</Response>

Some of the tags you get back may have different values than the example, but the <ResultCode> must be zero, to indicate success.

Step 4 – Implement Communication to Shva
Wonderful. Now that you have mastered the Communication Test command, let's move on to make a communication to Shva.
A successful communication to Shva is a must. Otherwise, transactions will stay inside the Pinpad and money will not be transferred.
During  a  transaction,  the  Pinpad  may  do  a  communication  to  Shva,  but  this is  only  to  get  authorization  for  the  transaction.  A
transaction that got online authorization is not a complete transaction. Only the transmission of transactions to Shva, at the end of
day, will complete the transactions.
A successful communication to Shva will give the following indications:
- That all the indications from Step 3 are OK.
- That the Pinpad is able to use the USB layer to connect to Shva
Note that if you are using USB connection, all the communication from the Pinpad to the outside world, like Shva and the Terminal
Management  System  (TMS),  all  this  communication  is  done  through  the  USB.  The  Pinpad  doesn't  need  a  separate  Ethernet  cable,
because thanks to Ingenico PCL technology all TCP based communication can be done over the USB cable.
So to make a communication to Shva, send the Transmit Transactions command. Just send the following XML to the Pinpad (either
directly or using the DLL).
<Request>
<Command>006</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
</Request>

A successful response should look like this:
<Response>
<Command>006</Command>
<TerminalId>0880264</TerminalId>
<ResultCode>0</ResultCode>

Document Version 1.53   Caspit SmartRetail Solution
## 225

<RequestId>20160216155540</RequestId>
<DATA> here will be the text of the DATA file. It is 47 characters long </DATA>
</Response>
If  there were  transactions  in  the Pinpad, you may  get  additional  tags  in  the  response.  Again,  the  <ResultCode> must be  zero  to
indicate a successful response.

Step 5 – Perform a Transaction
Well done! You really are something special. I think you are ready for your first transaction. So fasten you seat belt and get ready for
lift off.
Here is the XML of a simple transaction (this example is taken from chapter 9.2. You can find more examples there).
Send it to the Pinpad
<Request>
<Command>001</Command>
<RequestId>23049820984</RequestId>
<TerminalId>0880264</Terminalid>
<TermNo>001</TermNo>
>TimeoutInSeconds>90</TimeoutInSeconds>
<Mti>100</Mti>
<CreditTerms>1</CreditTerms>
<TranType>1</TranType>
<Amount>10000</Amount>  (Amount is in agorot)
<Currency>376</Currency> (Currency is in ISO currency code)
<PanEntryMode>PinPad</PanEntryMode>
<Xfield>20398049823</Xfield>
</Request>

A successful response will look like that:
<EMV_Output>
<Command>1</Command>
<TerminalId>0880264</TerminalId>
<ResultCode>0</ResultCode>
<Status>0</Status>
<AshStatus>0</AshStatus>
<Mti>100</Mti>
<Pan>0004580289999999709</Pan>
<PanEntryMode>40</PanEntryMode>
<CardName>בהז הזיו       </CardName>

Document Version 1.53   Caspit SmartRetail Solution
## 226

<Manpik>2</Manpik>
<Brand>2</Brand>
Bla Bla Bla Bla. More tags will come here.
<RequestId>20170109130703</RequestId>
</EMV_Output>
The  important  thing is  that  the  <ResultCode>,  <Status>  and  <AshStatus>,  they  all  should be  zero.  If  they  are,  you have  successfully
done you first transaction. Congratulations.



Document Version 1.53   Caspit SmartRetail Solution
## 227

## Appendix M – Troubleshooting
- Pinpad is not shown in the Device Manager of Windows
- Is  the  Pinpad  connected  to  the  PC  using  a  USB  cable?  (if  you  connection  type  is RS232, you will  not  see  the Pinpad in  the
device manager)
- Is the Pinpad turned on? (there is no ON switch, if there is power, the Pinpad should be on). The iPP350 needs only the USB
cable; it  doesn't  need  any  other  external  power  supply.  If you  are  using  the  iSC250  then  you  will need  an  external  power
supply.
- Did you install the Ingenico driver?
- Did you restart your PC after installing the Ingenico driver?

- Pinpad is blinking with an "Unauthorized" message
- The Pinpad is broken. You must replace the Pinpad.

- Troubleshooting Result codes
## Code Define
## 0 RETVAL_SUCCESS
## 10000 RETVAL_TIMEOUT
## 10001
## 10002
## 10003 RETVAL_INCORRECT_TERMINAL_ID
Check the tag <TerminalId> in the request XML. The <TerminalId> value must be
identical to the Terminal Id of the Pinpad.
## 10004
## 10005 RETVAL_NO_LAST_TRAN_FILE
## 10006 RETVAL_CANT_FIND_REQUESTED_TRAN_FILE
## 10007
## 10008
## 10009
## 10010
## 10011
## 10012
## 10013
## 10014
## 10015
## 10016
## 10017

Document Version 1.53   Caspit SmartRetail Solution
## 228

## 10018
## 10019 RETVAL_SWITCH_TRAN_FILE_NOTHING_TO_SEND
## 10020 RETVAL_NO_PAPER_IN_PRINTER
## 10021 RETVAL_SWITCH_TRAN_FILE_IS_EMPTY
## 10022 RETVAL_INCORRECT_ECR_NUMBER
The ECR number aka Station number or Kupa number
Check  the  tag  <TermNo>  in  the  request  XML.  The  <TermNo>  value  must  be
identical to the <TermNo> defined in the Pinpad.
## 10023 RETVAL_NO_STATIS_FILE_ON_POS
## 10024 RETVAL_SWITCH_TRAN_HAS_UNSENT_TRANSACTIONS
## 10025 RETVAL_SWITCH_TRANSACTIONS_SENT_FAILED
## 10026 RETVAL_TRAN_STEPS_LISTENER_NOT_WORKING
## 10027 RETVAL_INVALID_MESSAGE_CODE
## 10028 RETVAL_CANT_CONTINUE_J2
## 10029 RETVAL_INVALID_REQUEST_ID
## 10030 RETVAL_SHVA_PARAMETERS_DELETION_FAILED
## 10031 RETVAL_SHVA_BLACKLIST_DELETION_FAILED
## 10032 RETVAL_TIMEOUT_EVENT_FROM_CASPIT_DLL
## 10033 RETVAL_SHVA_CALL_FAILED
## 10034 RETVAL_REPORTS_SERVER_CALL_FAILED
## 10035 RETVAL_XML_INVALID_METHOD
## 10036 RETVAL_XML_MISSING_TERMINAL_ID_TAG
## 10037 RETVAL_CERTIFICATES_SERVER_CALL_FAILED
## 10038 RETVAL_SWITCH_CALL_FAILED
## 10039 RETVAL_INVALID_TRAN_RECORD_NUMBER
## 10040 RETVAL_FILE_CANNOT_BE_RETRIEVED
## 10041 RETVAL_ERROR_CONNECTING_TO_PINPAD
## 10042 RETVAL_XML_MISSING_REQUEST_ID_TAG
## 10043 RETVAL_CASPIT_WINDOWS_SERVICE_NOT_RESPONDING
## 10044 RETVAL_USER_ABORTED_TRANSACTION
## 10045 RETVAL_TIMEOUT_CHECK_TRAN
There  was a  timeout  during  the  transaction and  the  status of  the  transaction is
not  clear.  The  PC  should  query  the  POS  to  know  if  the transaction  failed  or
succeeded.

Document Version 1.53   Caspit SmartRetail Solution
## 229

## 10046 RETVAL_XML_MISSING_TIMEOUT_TAG
## 10047 RETVAL_XML_MISSING_INT_IN_TAG
## 10048 RETVAL_CHECK_OTHER_STATUSES
It means  you  have  to  check  the  other  statuses  in  the  response.  Check  <Status>
and <AshStatus>
## 10049 RETVAL_TRANSACTION_NOT_FOUND
## 10050 RETVAL_DOUBLE_TRANSACTION
## 10051 RETVAL_BATCH_NUMBER_DOESNT_EXIST
## 10052 RETVAL_INVALID_BLOCK_NUMBER_TO_RESUME
## 10053 RETVAL_PINPAD_RETURNED_EMPTY_RESPONSE
## 10054 RETVAL_ASHRAIT_INVALID_SETUP
## 10055 RETVAL_NO_PING
## 10056 RETVAL_UNSUPPORTED_GENERIC_COMMAND_CODE
## 10057 RETVAL_TRANSMIT_LOGS_FAILED
## 10058 RETVAL_NO_CONNECTION_TO_SHVA
## 10059 RETVAL_DELETE_LOGS_FAILED
## 10060 RETVAL_CASPIT_TECH_CENTER_FAILED
## 10061 RETVAL_TERMINAL_REBOOT_FAILED
## 10062 RETVAL_STARTING_TMS_CALL_FAILED
## 10063 RETVAL_CLEAN_COMMUNICATION_ENGINE_FAILED
## 10064 RETVAL_SETTING_DATE_TIME_FAILED
## 10065 RETVAL_TRANSACTIONS_CENTER_CALL_FAILED
## 10066 RETVAL_TRANSACTIONS_CENTER_TOGGLE_FAILED
## 10099 RETVAL_UNKNOWN_ERROR
## 10100 RETVAL_INVALID_PAN_ENTRY_MODE
## 10101 RETVAL_INVALID_MTI
## 10102 RETVAL_INVALID_X_FIELD
## 10103 RETVAL_CANT_FIND_DEPOSIT_REPORT
## 10104 RETVAL_INVALID_SESSION_NUMBER_XML_TAG
## 10105 RETVAL_INVALID_DATE_XML_TAG
## 10106 RETVAL_NO_TOTAL_FILE
## 10501 RETVAL_TIMEOUT_WHILE_WAITING_FOR_SWIPE
There was a timeout while the POS was waiting for a swipe. The customer didn't
swipe  his  card  and  eventually  the  operation  was  terminated  because  of  a

Document Version 1.53   Caspit SmartRetail Solution
## 230

timeout.
## 10502 RETVAL_TIMEOUT_AFTER_FAILED_SWIPE_ATTEMPT
There  was  a  timeout  while  the  POS  was  waiting  for  a  swipe.  There  is  an
indication that the customer swiped his card at least one time, but the card was
not   read   properly   so   the   POS   continued   to   wait   until   the   operation   was
terminated because of a timeout.
## 10503 RETVAL_CANCEL_WITHOUT_SWIPING
The operation was cancelled by the user, he pressed on the red button.
## 10504 RETVAL_CANCEL_AFTER_FAILED_SWIPE_ATTEMPT
The  operation  was  cancelled  by  the  user,  he  pressed  on  the  red  button.  But
before pressing on  the  red button,  the customer  tried  to  swipe  his card at least
one time, but the card was not read properly so the POS continued to wait until
the operation was terminated by the customer.

## 11000 RETVAL_CANNOT_SEND_OUT_CREDIT_CARDS
## 11001 RETVAL_INVALID_CARD_SWIPE
## 11002 RETVAL_FILE_BAD_RECORD
The operation was cancelled by terminal program, because bad record found in
file.  This  error  stops  terminal  activity  to  avoid  transaction  collection  without
their transmission .




Document Version 1.53   Caspit SmartRetail Solution
## 231

Appendix N – FAQ
Q: How can the ECR check if there is a card inside the smart card reader?
A: The simplest way to check it is to run a minimal communication test command
<Request>
<Command>003</Command>
<TerminalId>0880264</TerminalId>
<TermNo>001</TermNo>
<RequestId>20160216155540</RequestId>
</Request>

The response will be:

<Response>
<Command>003</Command>
## ...
<CardInside>1</CardInside>
</Request>
The important tag from the response is the <CardInside> tag, which tells you if there is a card inside or not.
Note that a card is considered to be inside only if it is inserted all the way, as needed for performing a transaction. If the card is not
all the way in, the <CardInside> tag will return with zero.

Q: What is the fastest way to check if the Pinpad has transactions that need to be transmitted to Shva
A:  You  can  do  it  using  the Pinpad  Configuration  command.  The response will  include  the  tag <UnsentTransactions>  that  holds  the
number of transactions currently inside the Pinpad. Actually, I recommend using this method also after calling Transmit Transation
command. That way you can be sure that the transactions were transmitted successfully to Shva.


Document Version 1.53   Caspit SmartRetail Solution
## 232

Appendix O – CaspitPayment.dll
## עסקאות בתצורות התקנה שונותדוגמאות לביצוע

-כל הדוגמאות מבוססות על פיתוח ב .Visual Studio 2013 C# FW 4.5


לתוכנית המפיץ יש להוסיף ” Reference“ לספריה .dllCaspitPayment) .dllCaspitPayment \CaspitPaymentService\Caspit\c:(
## המסופקת לכם.
קריאה לפונקציהלהלן דוגמה להגדרת פרמטרי קלט,             deal.PerformingTransactionObj
## וקריאת נתוני פלט:
CaspitPayment.RequestTreatment _deal     = new CaspitPayment.RequestTreatment ();
CaspitPayment.
Request          _inputObj = new CaspitPayment.Request ();
CaspitPayment.GlobalObject     _outputObj= new CaspitPayment.GlobalObject();
// כתובת  IP של מחשב בו  מותקן CaspitPaymentService – תוכנת Windows Service המאפשרת  תעבורה של  נתונים בין מחשב של
## מפיצי קופות לבין מכשירי Pinpad של כספיט. התוכנה מסופקת ע"י כספיט.
_deal.IpAddress = "127.0.0.1";
_deal.Port      = 6900; // Config.xml  פורט – ראה קובץ
_deal.Timeout   = 60;   // (in seconds) זמן המתנה ליצירת חיבור בין המחשב ל-סרוויס
_deal.Target    = 52;   // יעד – קבוע
מכיוון ששני האובייקטים  inputObjו  outputOjb מכילים עשרות פרמטרים , בדוגמאות נוכל להתמקד רק בפרמטרים העיקריים.
## דוגמה לעסקה J2:
_inputObj.TerminalId            = "0880302";
_inputObj.Command               = "001";
_inputObj.TimeoutInSeconds      = "90";
_inputObj.Mti                   = "100;         // 100 - Regular; 400 - Cancel
_inputObj.TranType              = "1";
_inputObj.Amount                = "1000";       // Amount is in agorot
_inputObj.TermNo                = "1";
_inputObj.Currency              = "376";        // NIS (שקל) New Israeli Shekel
_inputObj.XField                = "20398049823";
_inputObj.CreditTerms           = "1";
_inputObj.IndexPayment          = "0";
_inputObj.ParameterJ            = "2";
_inputObj.RequestId             = DateTime.Now.ToString ("yyyyMMddHHmmss");
_inputObj.SkipDoubleTranCheck   = "0";
_inputObj.AllowCardInsideBefore = "1";
_inputObj.ContinueJ2            = "0";
_inputObj.AllowCardInsideAfter  = "1";
_inputObj.Pan                   = "";
_inputObj.CreditTerms           = "1";          // Credit type
_inputObj.TranType              = "1";          // Charge
_inputObj.PanEntryMode          = "PinPad";

## /*
המילה “PinPad” מעידה על כך שנתוני הכרטיס צפויים להגיע מהPinPad-
ברוב המקרים ל- PinPadיש גם קורא מגנטי ולעתים גם קורא קירבה  (contactless)ובכל המקרים האלה
PanEntryMode = “PinPad”
## */

Document Version 1.53   Caspit SmartRetail Solution
## 233

int sts = _deal.PerformingTransactionObj(_inputObj, ref _outputObj);
if (sts != 0) {MessageBox.Show("Error"); return;}
/*                            Created string _outputObj.Xml and
Response EMV_Output Objector _outputObj.Output
Or/and _outputObj.Response

If Command = "001"  ("Performing Transaction")
The outputObj object will contain the Emv_Output object.
In any other command - you must access the Response object

Note: Here we would to check: ResultCode!= 0 && Status != 0 && AshStatus !=0
## */




Document Version 1.53   Caspit SmartRetail Solution
## 234

C# EMV_Output Class Example:
using System.Runtime.InteropServices;
using System.Xml.Serialization;

namespace CaspitPayment
## {
// [Serializable]
[ClassInterface(ClassInterfaceType.AutoDual)]
public class EMV_Output
## {
public string Command   { get; set; }// <Command>1</Command>
public string RequestId { get; set; }// <RequestId>20180108130813</RequestId>
public string TerminalId{ get; set; }// <TerminalId>0880302</TerminalId>
## //......................

[XmlElementAttribute("PossibleCreditTerms", Form =
System.Xml.Schema.XmlSchemaForm.Unqualified)]
public EmvOutputPossibleCreditTerms[] PossibleCreditTerms { get; set; }

public string PossibleCreditTermsString { get; set; }
// Code,Avail,MinPayments,MaxPayments|Code,Avail,MinPayments,MaxPayments|...
// 1,True,2,5|2,False,0,0|...

## //......................

public EMV_Output()
## {
Command    = string.Empty;
RequestId  = string.Empty;
TerminalId = string.Empty;
## //......................
## }
## //......................
[System.ComponentModel.DesignerCategoryAttribute("code")]
[XmlTypeAttribute(AnonymousType = true)]
public class EmvOutputPossibleCreditTerms
## {
private EmvOutputPossibleCreditTermsCreditTerm[] _creditTermField;
## /// <remarks/>
[XmlElementAttribute("CreditTerm", Form =
System.Xml.Schema.XmlSchemaForm.Unqualified)]
public EmvOutputPossibleCreditTermsCreditTerm[] CreditTerm
## {
get { return _creditTermField; }
set {_creditTermField = value; }
## }
## }
[System.SerializableAttribute()]
[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[XmlTypeAttribute(AnonymousType = true)]
public class EmvOutputPossibleCreditTermsCreditTerm
## {
private string _codeField;
private string _availField;
private string _minPaymentsField;

Document Version 1.53   Caspit SmartRetail Solution
## 235

private string _maxPaymentsField;
[XmlAttributeAttribute()]
public string Code
## {
get { return _codeField; }
set { _codeField = value; }
## }
[XmlAttributeAttribute()]
public string Avail
## {
get { return _availField; }
set { _availField = value; }
## }
[XmlAttributeAttribute()]
public string MinPayments
## {
get { return _minPaymentsField; }
set { _minPaymentsField = value; }
## }
[XmlAttributeAttribute()]
public string MaxPayments
## {
get { return _maxPaymentsField; }
set { _maxPaymentsField = value; }
## }
## }
## }


//...................... Using for get values from PossibleCreditTerms.
//...................... The PossibleCreditTerms is an Array of Objects
CaspitPayment.GlobalObject _outputObj = new CaspitPayment.GlobalObject();
void Get()
## {
int sts = _deal.PerformingTransactionObj(_inputObj, ref _outputObj);
## //......................

var possibleCreditTerms = _outputObj.Output.PossibleCreditTerms;
if (possibleCreditTerms != null && possibleCreditTerms.Length > 0)
## {
var creditTerm = possibleCreditTerms[0].CreditTerm;
for (int i = 0; i < creditTerm.Length; i++)
## {
string code         = creditTerm[i].Code;
string avail        = creditTerm[i].Avail;
string minPayments  = creditTerm[i].MinPayments;
string maxPayments  = creditTerm[i].MaxPayments;
## }
## }


//...................... Also possible get values from PossibleCreditTermsString
//                       where data like "1,True,2,5|2,False,0,0|..."
//(Code,Avail,MinPayments,MaxPayments| Code,Avail,MinPayments,MaxPayments|...)
## }
## }



Document Version 1.53   Caspit SmartRetail Solution
## 236


Sending request in XML string

string ResponseInternal = "";
int Result = locDeal.PerformingTransactionXml(eArgument as string, out ResponseInternal);

where eArgument is
<Request>
<Command>001</Command>
## - <!--  Performing Transaction  -->
<TerminalId>0880302</TerminalId>
- <!--  Terminal ID  -->
<TimeoutInSeconds>60</TimeoutInSeconds>
<Mti>100</Mti>
<TranType>1</TranType>
## - <!--  Regular  -->
<Amount>1000</Amount>
<TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode>
<Currency>376</Currency>
- <!--  NIS (שקל) New Israeli Shekel  -->
<XField>1234567890</XField>
<CreditTerms>1</CreditTerms>
<ParameterJ>4</ParameterJ>
<RequestId>20180205153858</RequestId>
</Request>



Document Version 1.53   Caspit SmartRetail Solution
## 237

Response EMV_Output XML Example

<?xml version="1.0" ?>
- <EMV_Output>
<Command>1</Command> - <!--  Performing Transaction  -->
<TerminalId>0880302</TerminalId> - <!--  Terminal ID  -->
<ResultCode>0</ResultCode> - <!--  SUCCESS  -->
<Status>0</Status> - <!--  מאושר  (Successful/approved transaction)  -->
<AshStatus>0</AshStatus> - <!--  מאושר  -->
<Mti>100</Mti>
<Pan>0004557449999994812</Pan> - <!--  Same value as it came in the J2 transaction  -->
<PanEntryMode>5</PanEntryMode> - <!--  Contactless EMV  -->
<CardName>בהז  הזיו</CardName> - <!--  שם  כרטיס  -->
<CardHash>21D6F4983DC741FB6C831F3F86578402</CardHash> - <!--  Hash result on the card number (the PAN). MD5.-->
<Manpik>1</Manpik>
<Brand>2</Brand>
<Solek>2</Solek> - <!--  כ.א .ל  (CAL)  -->
<CardType>041</CardType> - <!--  Not defined yet  -->
<spType>0</spType>
<Amount>1</Amount>
<TranType>1</TranType> - <!--  Regular  -->
<CreditTerms>1</CreditTerms>
<Currency>376</Currency> - <!--  NIS (שקל) New Israeli Shekel  -->
<FileNo>07</FileNo>
<TermNo>001</TermNo> - <!--  Station number 001 (Not multiple pinpads).  -->
<TermSeq>001</TermSeq>
<TerminalName>טיפסכ  תוכמסה</TerminalName>
<Retailer>0880302015</Retailer> - <!--  The long terminal ID - מספר  מסוף ארוך   -->
<ComRetailerNum>7007245</ComRetailerNum>-<!--Business number -מספר ספק  בחברה הסולקת-->
<DateTime>0205154447</DateTime>
<ResponseId>0</ResponseId> - <!--  Not entered – לא הוכנס    -->
<ResponseCvv2>0</ResponseCvv2> - <!--  Not entered – לא הוכנס  -->
<ResponseAvs>0</ResponseAvs> - <!--  Not entered – לא הוכנס  -->
<AuthCodeManpik>0</AuthCodeManpik>- <!--  Transaction without authorization number-עסקה  ללא מספר אישור מנפיק  -->
<AuthCodeSolek>0</AuthCodeSolek> - <!--  Transaction has no authorization number from acquirer  -->
<Uid>18020515444708803020013</Uid> - <!--  YYMMDDHHMMSS_TTTTTTT_RRR_C (TimeStamp_TerminalId_ECR_Checksum  -->
<SkipDoubleTranCheck>0</SkipDoubleTranCheck>
<appVersion>CST000128T</appVersion> - <!--  Application version of the Ashrait EMV  -->
<AID>A0000000031010</AID> - <!--  Chip Application Id - מזהה אפליקציה  על  כרטיס חכם   -->

Document Version 1.53   Caspit SmartRetail Solution
## 238

## <ATC>0502</ATC>
<TVR>0000000000</TVR> - <!--  Terminal Verification results - תוצאת  בדיקות המסוף  -->
<AddDspBalance>0</AddDspBalance>
<TelNoCom>0035726333</TelNoCom> - <!--  Phone number of the acquirer - מספר  טלפון של החברה הסולקת  -->
<Xfield>1234567890</Xfield> - <!--  Transaction Query  -->
<RequestId>20180205154428</RequestId> - <!--  מזהה כלשהו של  הבקשה   -->
<ParameterJ>4</ParameterJ>
<PinpadStep>9000</PinpadStep>
- <ReceiptMerchant>
<Line name="Merchant">טיפסכ  תוכמסה </Line>
<Line name="Empty" />
<Line name="TerminalId">0880302 :טיפסכ  .סמ</Line>
<Line name="SWVersion">CST000128T :הנכות</Line>
<Line name="BusinessNumber">7007245 :קסע רפסמ</Line>
<Line name="Empty" />
<Line name="TranDateTime">05/02/18 15:44</Line>
<Line name="Empty" />
<Line name="CardName">בהז הזיו </Line>
<Line name="CardNumber">XXXXXXXXXXXX4812</Line>
<Line name="Voucher">07001001 :רבוש 'סמ</Line>
<Line name="TranType">הבוח  :הקסע</Line>
<Line name="PanEntryMode">Contactless EMV :עוציב</Line>
<Line name="CreditTerms">ליגר  :יארשא</Line>
<Line name="Amount">:הקסיע  םוכס</Line>
<Line name="Empty" />
<Line name="Amount">10.00</Line>
<Line name="Empty" />
<Line name="Currency">ח "ש  :עבטמ</Line>
<Line name="Empty" />
<Line name="Uid">UID:18020515444708803020013</Line>
<Line name="EMV">ATC:0502,TVR:0000000000</Line>
<Line name="EMV">AID:A0000000031010</Line>
<Line name="Empty" />
<Line name="Signature">_________________המיתח</Line>
<Line name="Empty" />
<Line name="Phone">_________________ןופלט</Line>
<Line name="Empty" />
</ReceiptMerchant>

Document Version 1.53   Caspit SmartRetail Solution
## 239

- <ReceiptCustomer>
<Line name="Merchant">טיפסכ  תוכמסה </Line>
<Line name="Empty" />
<Line name="TerminalId">0880302 :טיפסכ  .סמ</Line>
<Line name="SWVersion">CST000128T :הנכות</Line>
<Line name="BusinessNumber">7007245 :קסע רפסמ</Line>
<Line name="Empty" />
<Line name="TranDateTime">05/02/18 15:44</Line>
<Line name="Empty" />
<Line name="CardName">בהז הזיו </Line>
<Line name="CardNumber">XXXXXXXXXXXX4812</Line>
<Line name="Voucher">07001001 :רבוש 'סמ</Line>
<Line name="TranType">הבוח  :הקסע</Line>
<Line name="PanEntryMode">Contactless EMV :עוציב</Line>
<Line name="CreditTerms">ליגר  :יארשא</Line>
<Line name="Amount">:הקסיע  םוכס</Line>
<Line name="Empty" />
<Line name="Amount">0.01</Line>
<Line name="Empty" />
<Line name="Currency">ח "ש  :עבטמ</Line>
<Line name="Empty" />
<Line name="Uid">UID:18020515444708803020013</Line>
<Line name="EMV">ATC:0502,TVR:0000000000</Line>
<Line name="EMV">AID:A0000000031010</Line>
<Line name="Empty" />
<Line name="Copy">*** חוקלל  קתוע  ***</Line>
<Line name="Empty" />
<Line name="Goodbye">!תוארתהלו  הדות </Line>
<Line name="Empty" />
</ReceiptCustomer>
</EMV_Output>


Document Version 1.53   Caspit SmartRetail Solution
## 240

Appendix P – PINPad connection over Broker

- Broker API is a REST api works with POST XML requests.
- The API Domain is 212.235.022.050
- The API connection must be established through SSL , port 5000
- The API is synchronous, Broker sends to PINPad to execute request and returns the response received
from PINPad.
- The api URI = https://[Api Domain]:5000/cashregister/request/[terminalId]/[terminalNo]
- The api body = Caspit Request Text in XML format
