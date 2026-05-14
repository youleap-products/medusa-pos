# Native Intent Bridge — Kotlin Source

## Why this is needed

Expo bare workflow runs JS in a React Native bridge. `startActivityForResult` is an Android-only
Activity lifecycle method — it can't be called from JS directly. You need a minimal Expo native
module that:

1. Accepts an XML string from JS
2. Builds and fires the Intent
3. Stores the pending JS Promise
4. Resolves/rejects the Promise in `onActivityResult`

---

## IntentBridgeModule.kt

Place at: `android/app/src/main/java/<your.package>/IntentBridgeModule.kt`

```kotlin
package <your.package>   // ← replace with your actual package

import android.app.Activity
import android.content.Intent
import expo.modules.core.interfaces.ActivityEventListener
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

private const val CASPIT_PACKAGE = "caspit.core"
private const val CASPIT_ACTIVITY = "caspit.core.ui.activities.URLSchemeActivity"
private const val REQUEST_CODE = 6600
private const val REQUEST_EXTRA = "REQUEST_XML"
private const val RESPONSE_EXTRA = "CASPIT_RESPONSE_EXTRA"

class IntentBridgeModule : Module(), ActivityEventListener {

    private var pendingPromise: Promise? = null

    override fun definition() = ModuleDefinition {
        Name("IntentBridge")

        // Called from JS: IntentBridge.sendIntent(xml)
        AsyncFunction("sendIntent") { xml: String, promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity
                ?: return@AsyncFunction promise.reject("NO_ACTIVITY", "No current activity", null)

            if (pendingPromise != null) {
                return@AsyncFunction promise.reject("BUSY", "Another payment is in progress", null)
            }

            pendingPromise = promise

            try {
                val intent = Intent().apply {
                    setClassName(CASPIT_PACKAGE, CASPIT_ACTIVITY)
                    putExtra(REQUEST_EXTRA, xml)
                }
                activity.startActivityForResult(intent, REQUEST_CODE)
            } catch (e: Exception) {
                pendingPromise = null
                promise.reject("INTENT_ERROR", e.message ?: "Failed to start activity", e)
            }
        }

        OnCreate {
            appContext.activityProvider?.addActivityEventListener(this@IntentBridgeModule)
        }

        OnDestroy {
            appContext.activityProvider?.removeActivityEventListener(this@IntentBridgeModule)
        }
    }

    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode != REQUEST_CODE) return

        val promise = pendingPromise ?: return
        pendingPromise = null

        when (resultCode) {
            Activity.RESULT_OK -> {
                val response = data?.getStringExtra(RESPONSE_EXTRA)
                if (response != null) {
                    promise.resolve(response)
                } else {
                    promise.reject("NO_RESPONSE", "Terminal returned RESULT_OK but no response data", null)
                }
            }
            Activity.RESULT_CANCELED -> {
                promise.reject("CANCELLED", "User cancelled the payment", null)
            }
            else -> {
                promise.reject("UNKNOWN_RESULT", "Unexpected result code: $resultCode", null)
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        // not needed for startActivityForResult flow
    }
}
```

---

## IntentBridgePackage.kt

```kotlin
package <your.package>

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.Package

class IntentBridgePackage : Package {
    override fun createModules(): List<Module> = listOf(IntentBridgeModule())
}
```

---

## Registration in MainApplication.kt

In your `MainApplication.kt`, add to the packages list:

```kotlin
override fun getPackages(): List<ReactPackage> {
    val packages = PackageList(this).packages
    packages.add(IntentBridgePackage())
    return packages
}
```

---

## Accessing from JavaScript

After building and running the app, access via `NativeModules`:

```typescript
import { NativeModules } from 'react-native';

const { IntentBridge } = NativeModules;

// Returns a Promise<string> (the XML response)
const responseXml = await IntentBridge.sendIntent(xmlString);
```

---

## Troubleshooting

| Symptom | Likely cause |
|---------|-------------|
| `IntentBridge is null` at runtime | Module not registered in `MainApplication.kt`, or app not rebuilt after adding Kotlin file |
| `ActivityNotFoundException` | Caspit app not installed on the device |
| `RESULT_CANCELED` immediately | Intent extras malformed — Caspit rejected the request silently |
| `NO_RESPONSE` on `RESULT_OK` | Wrong response extra key — verify `CASPIT_RESPONSE_EXTRA` with Caspit docs |
| Promise never resolves | `onActivityResult` not firing — check `ActivityEventListener` registration |

---

## URL Scheme fallback (optional)

If the Intent approach doesn't work on a specific device, Caspit also supports a URL scheme:

```typescript
import { Linking } from 'react-native';
import { Buffer } from 'buffer';

const xmlBase64 = Buffer.from(xml).toString('base64');
const successLink = 'yourapp://payment-result';
const url = `caspit://ashrait?xml_base64=${encodeURIComponent(xmlBase64)}&successLink=${encodeURIComponent(successLink)}`;

await Linking.openURL(url);
// Then handle the result via Linking.addEventListener('url', handler)
// when Caspit calls back to your successLink
```

The URL scheme flow is harder to handle cleanly (async fire-and-forget), so prefer the Intent approach when possible.
