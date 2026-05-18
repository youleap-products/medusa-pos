import { Layout } from '@/components/ui/Layout';
import { Text } from '@/components/ui/Text';
import { useHardwareSettings } from '@/hooks/useHardwareSettings';
import type { HardwareSettings } from '@/utils/hardware/settings';
import * as React from 'react';
import { Switch, View } from 'react-native';

interface FeatureRow {
  key: keyof HardwareSettings;
  label: string;
  description: string;
}

const FEATURES: readonly FeatureRow[] = [
  {
    key: 'printer',
    label: 'Receipt printer',
    description: 'Prints itemized receipts after each completed sale.',
  },
  {
    key: 'cashDrawer',
    label: 'Cash drawer',
    description: 'Pops the drawer when a cash tender is taken.',
  },
];

export default function HardwareSettingsScreen() {
  const { settings, update } = useHardwareSettings();

  return (
    <Layout className="pb-6">
      <Text className="mb-2 text-4xl">Hardware</Text>
      <Text className="mb-6 text-gray-400">
        Disable a device to silence it without uninstalling the app — useful for training,
        loaner units, or a broken peripheral.
      </Text>

      <View className="gap-3">
        {FEATURES.map((feature) => (
          <View
            key={feature.key}
            className="flex-row items-start gap-4 rounded-xl border border-gray-200 px-4 py-4"
          >
            <View className="flex-1">
              <Text className="text-base">{feature.label}</Text>
              <Text className="mt-1 text-sm text-gray-400">{feature.description}</Text>
            </View>
            <Switch
              value={settings[feature.key]}
              onValueChange={(v) => update(feature.key, v)}
            />
          </View>
        ))}
      </View>
    </Layout>
  );
}
