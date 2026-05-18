import * as React from 'react';
import {
  type HardwareSettings,
  getHardwareSettings,
  setHardwareSetting,
  subscribeHardwareSettings,
} from '@/utils/hardware/settings';

/**
 * React binding for the module-level hardware settings store. Mirrors the
 * imperative `getHardwareSettings` / `setHardwareSetting` API but re-renders
 * the consumer whenever any feature flag flips.
 */
export function useHardwareSettings() {
  const [settings, setSettings] = React.useState<HardwareSettings>(getHardwareSettings);

  React.useEffect(() => subscribeHardwareSettings(setSettings), []);

  const update = React.useCallback(
    <K extends keyof HardwareSettings>(feature: K, value: HardwareSettings[K]) => {
      void setHardwareSetting(feature, value);
    },
    [],
  );

  return { settings, update };
}
