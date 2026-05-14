

Integration Manual - Using Caspit Ashrait Application SampleIntegration Manual - Using Caspit Ashrait Application Sample
Use this sample to learn how to integrate Caspit Ashrait with you cash register.
Table of contentsTable of contents
## Introducion
## Requirements
## Integration Functions
## Native - Recommanded
Url-Scheme
IntroducionIntroducion
Communication between the cashier and the Ashrait module is carried out through the technology of url scheme. Your application must support this technology in order to receive a response from
Ashrait. In this document, we will describe how to send a request to Ashrait and receive a response.
RequirementsRequirements
Caspit-Core APK
PinPad Device - Sunmi P2Pro / P2Lite
Android Native/Hybrid Application
CaspitRequestor Source Code
Integration FunctionsIntegration Functions
Native - RecommandedNative - Recommanded
ActivityForResultsActivityForResults
Request Index Identifire for activity results
private static final int REQUEST_TRANSACTION = 6600;
Start activityforresult our exposed Activity:
PackageName is caspit.core
Exposed Activity is caspit.core.ui.activities.URLSchemeActivity.
private void sendRequestViaIntent(String request_xml) {
Intent myIntent = new Intent();
myIntent.setClassName("caspit.core", "caspit.core.ui.activities.URLSchemeActivity");
myIntent.putExtra("REQUEST_XML",request_xml);
startActivityForResult(myIntent, REQUEST_TRANSACTION);
## }
Override Activity for Result to get the response from our application
Parse the result with our REQUEST_TRANSACTION like so: String results = data.getStringExtra(CASPIT_RESPONSE_EXTRA);String results = data.getStringExtra(CASPIT_RESPONSE_EXTRA);

public static String CASPIT_RESPONSE_EXTRA = "CASPIT_RESPONSE_EXTRA";
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
super.onActivityResult(requestCode, resultCode, data);
Log.e(TAG, "onActivityResult: Requestor reqCode -> " + requestCode + ", resultCode ->" + resultCode + ", -> "+ data);
if(data == null){
return;
## }
Bundle bundle = data.getExtras();
if (bundle != null) {
for (String key : bundle.keySet()) {
Log.e(TAG, "Result Extra Requestor -> "+key + " : " + (bundle.get(key) != null ? bundle.get(key) : "NULL"));
## }
## }
if (requestCode == REQUEST_TRANSACTION) {
if (resultCode == Activity.RESULT_OK) {
final String results = data.getStringExtra(CASPIT_RESPONSE_EXTRA);
Log.d("TAG", "onActivityResult: Requestor data.getStringExtra -> " + data.getStringExtra(CASPIT_RESPONSE_EXTRA));
if (!results.equals("")) {
## //exit(results);
Log.d("TAG", "onActivityResult: Requestor" + data.getStringExtra(CASPIT_RESPONSE_EXTRA));
TextView textViewResponse = findViewById(R.id.textViewResponse);
textViewResponse.setText(data.getStringExtra(CASPIT_RESPONSE_EXTRA));
} else {
## }
## }
if (resultCode == Activity.RESULT_CANCELED) {
## }
## }
## }
ParameterParameterDescriptionDescriptionData ExampleData ExampleResultResult
## REQUEST_XML
Request XML
in the format
of the Caspit
<Request><Command>001</Command><TerminalId>0880302</TerminalId>
<TimeoutInSeconds>120</TimeoutInSeconds><Mti>100</Mti><TranType>1</TranType>
<Amount>1</Amount><Currency>376</Currency><TermNo>1</TermNo>
<PanEntryMode>PinPad</PanEntryMode><XField>0880302</XField>
<CreditTerms>1</CreditTerms><RequestId>20200921142254</RequestId>
<ParameterJ>4</ParameterJ></Request>
XML Response according to
## Caspit Format
## REQUEST_API_VISIBILITY
## Progress
## Window
visibility
FALSE-disables the window
Transparent UI while sending
request
## REQUEST_API_VERSION_CODE
Get current
versions
TRUE-get versions
<Response><Status>0</Status>
<SunmiSDK>3.3.72</SunmiSDK>
<Ashrait>01.60</Ashrait>
<AshraitLib>01.16</AshraitLib>
<CaspitCore>1.0.55</CaspitCore>
</Response>
## REQUEST_DESC
Shows/Hide
result code
description
inside the
popup
true- Show
Shows/Hide result code
description inside the popup
## REQUEST_API_CODE
## REQUEST_API_TYPE
## REQUEST_API_LANG
## Convert
ErrorCodeType
into
## Description
## 10043
ResultCode
## HEB / ENG
<Response><Status>0</Status>
<Description>לשרת בתקשורת כשלון
דוחות</Description></Response>]
in Status you could get:
## 0 - Success
404 - Code not found
## 400 - Bad Request
Cordova - ActivityForResultsCordova - ActivityForResults
- Install this plugin: https://github.com/darryncampbell/darryncampbell-cordova-plugin-intent
Note: we used this Fork because of a fix it includes: https://www.npmjs.com/package/cordova-plugin-intent-updated
- Execute CaspitCore like this:

window.plugins.intentShim.startActivityForResult({
## "component": {
## "package": "caspit.core",
"class": "caspit.core.ui.activities.URLSchemeActivity"
## },
## "extras": {
"REQUEST_XML": "<Request><Command>023</Command><TerminalId>0880381</TerminalId><TimeoutInSeconds>60</TimeoutInSeconds><TermNo>1</TermNo><RequestId>20200830131427</RequestId></Request>"
## }
}, function(intent) {
console.log('Intent callback success: ', intent);
}, function(err) {
console.log('Intent callback failure: ', err);
## });
Url-SchemeUrl-Scheme
startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
The request url scheme formats is: * caspit://ashrait?xml=Url-Encoded-Request-StringUrl-Encoded-Request-String&successLink=&successLink=You-Url-SchemeYou-Url-Scheme:// * caspit://ashrait?xml_base64=Base64-Request-Base64-Request-
StringString&successLink=You-Url-SchemeYou-Url-Scheme://
ResponseResponse
Prepare you application to get ResponsePrepare you application to get Response
- In manifest in you Action configuration enter section:
## <intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<category android:name="android.intent.category.BROWSABLE" />
<data  android:scheme="<You-Scheme>" />
## </intent-filter>
- Add to Activity onCreate function follow code:
Uri data = getIntent().getData();
if(data != null) {
String respx = getIntent().getDataString();
// TODO: Save You Response here:
//TextView textViewResponse = findViewById(R.id.textViewResponse);
//textViewResponse.setText(respx);
## }
Url Scheme - ExamplesUrl Scheme - Examples
Action Config ExampleAction Config Example
<activity android:name=".MainActivity">
## <intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
## </intent-filter>
## <intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<category android:name="android.intent.category.BROWSABLE" />
<data  android:scheme="caspitrequestor" />
## </intent-filter>
## </activity>
Send Request ExampleSend Request Example

String request   = "<Command>001</Command>\n" +
"        \t<TerminalId>0880000</TerminalId>\n" +
"        \t<TimeoutInSeconds>60</TimeoutInSeconds>\n" +
"        \t<Mti>100</Mti>\n" +
"        \t<TranType>1</TranType>\n" +
"        \t<Amount>100</Amount>\n" +
"        \t<Currency>376</Currency>\n" +
"        \t<TermNo>1</TermNo>\n" +
"        \t<PanEntryMode>PinPad</PanEntryMode>\n" +
"        \t<XField>0880265</XField>\n" +
"        \t<CreditTerms>1</CreditTerms>\n" +
"        \t<ParameterJ>4</ParameterJ>\n" +
"        \t<RequestId>20200405153208</RequestId>";
try {
String successUrl = "successLink=" + URLEncoder.encode("<You Scheme>>://", "utf-8");
byte[] data = request.getBytes("UTF-8");
url = "caspit://ashrait?xml_base64=" + Base64.encodeToString(data, Base64.DEFAULT) + "&" + successUrl;
## }
} catch (UnsupportedEncodingException e) {
e.printStackTrace();
## }
startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));