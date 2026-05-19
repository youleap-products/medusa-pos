import { TerminalIdStep } from '@/components/setup-wizard/TerminalIdStep';
import { Layout } from '@/components/ui/Layout';
import { useInvalidateCaspitConfig } from '@/hooks/useCaspitConfig';
import { caspitStorage } from '@/utils/storage';
import { router } from 'expo-router';

export default function TerminalScreen() {
  const invalidateCaspitConfig = useInvalidateCaspitConfig();

  const handleComplete = async (terminalId: string, verified: boolean) => {
    await caspitStorage.saveConfig(terminalId, verified);
    await invalidateCaspitConfig();
    router.back();
  };

  return (
    <Layout>
      <TerminalIdStep onComplete={handleComplete} />
    </Layout>
  );
}
