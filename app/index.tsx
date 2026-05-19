import { useAuthCtx } from '@/contexts/auth';
import { useSettings } from '@/contexts/settings';
import { useCaspitConfig } from '@/hooks/useCaspitConfig';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';

export default function RootLoadingScreen() {
  const router = useRouter();
  const auth = useAuthCtx();
  const settings = useSettings();
  const caspitConfig = useCaspitConfig();

  // caspitConfig is considered "ready" once it has either succeeded or errored —
  // an error (e.g. SecureStore unavailable) is treated the same as "not configured".
  const caspitReady = caspitConfig.isSuccess || caspitConfig.isError;
  const caspitTerminalId = caspitConfig.data?.terminalId ?? null;

  const isSetupComplete =
    settings.isSuccess &&
    !!settings.data &&
    !!settings.data.sales_channel &&
    !!settings.data.region &&
    !!settings.data.stock_location &&
    !!caspitTerminalId;

  React.useEffect(() => {
    if (auth.state.status === 'unauthenticated') {
      router.replace('/login');
      return;
    }

    if (auth.state.status === 'authenticated') {
      if (settings.isSuccess && caspitReady) {
        if (!isSetupComplete) {
          router.replace('/setup-wizard');
          return;
        } else {
          router.replace('/products');
          return;
        }
      }
    }
  }, [auth.state.status, settings.isSuccess, caspitReady, router, isSetupComplete]);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: '#f4faff' }}>
      <Image
        source={require('@/assets/images/splash-icon.png')}
        style={{
          width: 233,
          height: 233,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
