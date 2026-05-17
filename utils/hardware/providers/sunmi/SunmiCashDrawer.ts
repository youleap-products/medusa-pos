import type { CashDrawer } from '../../types';
import { getSunmiService } from './sunmi-service';

/**
 * Sunmi cash drawer — opens the RJ11-connected drawer on Sunmi POS devices
 * (tested on P3 Mix).
 *
 * ── Why ESC/POS `ESC p` instead of the AIDL `openDrawer()` ────────────────
 * The library exposes `printerService.openDrawer()` (AIDL `IWoyouService`).
 * On the P3 Mix that call succeeds (`getDrawerStatus()` flips to true and the
 * solenoid clicks audibly) but the pulse is too short to fully throw the
 * latch — drawer rattles but doesn't pop. The default AIDL pulse appears to
 * be ~100 ms regardless of drawer model.
 *
 * The ESC/POS `ESC p m t1 t2` command (`0x1B 0x70 m t1 t2`) lets us specify
 * the pulse on-time explicitly. With `t1 = t2 = 0xFF` (≈ 510 ms total) the
 * solenoid energises long enough to fully release a standard 24V drawer
 * latch. The command is sent through `sendRAWData()`, which the Sunmi
 * printer service forwards to the same solenoid driver — so it works on any
 * Sunmi device with a drawer port without needing per-model tuning.
 *
 *   Byte sequence: 1B 70 00 FF FF  (pin 2, full pulse)
 *   Base64:        G3AA//8=
 *
 * `printerInit()` is called first to ensure the printer service is bound;
 * `sendRAWData` will silently fail on an unbound service.
 *
 * Pin 5 (`m = 0x01`) is available if a future drawer is wired to the other
 * solenoid pin — swap the command to `1B 70 01 FF FF` / `G3ABAP8=`.
 */

const ESC_P_PIN2_MAX_PULSE_BASE64 = 'G3AA//8=';

export class SunmiCashDrawer implements CashDrawer {
  async open(): Promise<void> {
    const service = getSunmiService();
    if (!service) return;
    try {
      service.printerInit();
      service.sendRAWData(ESC_P_PIN2_MAX_PULSE_BASE64);
    } catch (e) {
      console.warn('[SunmiCashDrawer] open failed:', e);
    }
  }

  async getStatus(): Promise<boolean> {
    const service = getSunmiService();
    if (!service) return false;
    try {
      return await service.getDrawerStatus();
    } catch (e) {
      console.warn('[SunmiCashDrawer] getStatus failed:', e);
      return false;
    }
  }
}
