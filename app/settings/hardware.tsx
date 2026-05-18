import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/ui/Layout';
import { Text } from '@/components/ui/Text';
import { useHardwareSettings } from '@/hooks/useHardwareSettings';
import { hardwareService } from '@/utils/hardware/HardwareService';
import type { HardwareSettings } from '@/utils/hardware/settings';
import * as React from 'react';
import { Switch, View } from 'react-native';

type TestStatus = 'idle' | 'running' | 'ok' | 'failed';

interface FeatureRow {
  key: keyof HardwareSettings;
  label: string;
  description: string;
  /** Fires the underlying device, ignoring the enable flag. */
  test: () => Promise<void>;
  /** Verb shown on the test button + status messages. */
  testLabel: string;
}

const FEATURES: readonly FeatureRow[] = [
  {
    key: 'printer',
    label: 'Receipt printer',
    description: 'Prints itemized receipts after each completed sale.',
    test: () => hardwareService.testPrinter(),
    testLabel: 'Print test',
  },
  {
    key: 'cashDrawer',
    label: 'Cash drawer',
    description: 'Pops the drawer when a cash tender is taken.',
    test: () => hardwareService.testCashDrawer(),
    testLabel: 'Pop drawer',
  },
];

/**
 * Per-feature row with the enable toggle and a "Test" button. The test button
 * fires the underlying adapter directly (bypassing the enable flag) so a
 * cashier can verify a peripheral is working before turning it back on.
 */
const FeatureCard: React.FC<{
  feature: FeatureRow;
  enabled: boolean;
  onToggle: (v: boolean) => void;
}> = ({ feature, enabled, onToggle }) => {
  const [status, setStatus] = React.useState<TestStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleTest = React.useCallback(async () => {
    setStatus('running');
    setErrorMessage('');
    try {
      await feature.test();
      setStatus('ok');
    } catch (e: any) {
      setErrorMessage(e?.message ?? 'Unknown error');
      setStatus('failed');
    } finally {
      // Reset back to idle after a moment so the cashier can re-test quickly.
      setTimeout(() => setStatus('idle'), 2500);
    }
  }, [feature]);

  const buttonLabel =
    status === 'running' ? 'Testing…' :
    status === 'ok' ? 'Sent ✓' :
    status === 'failed' ? 'Failed ✕' :
    feature.testLabel;

  return (
    <View className="rounded-xl border border-gray-200 px-4 py-4">
      <View className="flex-row items-start gap-4">
        <View className="flex-1">
          <Text className="text-base">{feature.label}</Text>
          <Text className="mt-1 text-sm text-gray-400">{feature.description}</Text>
        </View>
        <Switch value={enabled} onValueChange={onToggle} />
      </View>

      <View className="mt-3 flex-row items-center justify-between gap-3">
        <Text className="flex-1 text-xs text-gray-400" numberOfLines={1}>
          {status === 'failed' ? errorMessage : status === 'ok' ? 'Device responded.' : ''}
        </Text>
        <Button
          variant="outline"
          className="px-4 py-2"
          onPress={handleTest}
          isPending={status === 'running'}
          disabled={status === 'running'}
        >
          {buttonLabel}
        </Button>
      </View>
    </View>
  );
};

export default function HardwareSettingsScreen() {
  const { settings, update } = useHardwareSettings();

  return (
    <Layout className="pb-6">
      <Text className="mb-2 text-4xl">Hardware</Text>
      <Text className="mb-6 text-gray-400">
        Disable a device to silence it without uninstalling the app — useful for training,
        loaner units, or a broken peripheral. The test buttons fire the device directly so
        you can verify a fix without re-enabling first.
      </Text>

      <View className="gap-3">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.key}
            feature={feature}
            enabled={settings[feature.key]}
            onToggle={(v) => update(feature.key, v)}
          />
        ))}
      </View>
    </Layout>
  );
}
