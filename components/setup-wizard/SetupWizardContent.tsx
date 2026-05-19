import { useUpdateSettings } from '@/contexts/settings';
import { useInvalidateCaspitConfig } from '@/hooks/useCaspitConfig';
import { caspitStorage } from '@/utils/storage';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from '../KeyboardAvoidingView';
import { RegionCreationStep } from './RegionCreationStep';
import { RegionSelectionStep } from './RegionSelectionStep';
import { SalesChannelCreationStep } from './SalesChannelCreationStep';
import { SalesChannelSelectionStep } from './SalesChannelSelectionStep';
import { StockLocationCreationStep } from './StockLocationCreationStep';
import { StockLocationSelectionStep } from './StockLocationSelectionStep';
import { TerminalIdStep } from './TerminalIdStep';
import { WelcomeStep } from './WelcomeStep';

type SetupStep =
  | 'sales-channel-selection'
  | 'sales-channel-creation'
  | 'region-selection'
  | 'region-creation'
  | 'stock-location-selection'
  | 'stock-location-creation'
  | 'terminal-id'
  | 'welcome';

interface SetupWizardContentProps {
  hasSalesChannels: boolean;
  hasStockLocations: boolean;
  hasRegions: boolean;
}

export const SetupWizardContent: React.FC<SetupWizardContentProps> = ({
  hasSalesChannels,
  hasStockLocations,
  hasRegions,
}) => {
  const getInitialStep = (): SetupStep => {
    if (!hasSalesChannels) return 'sales-channel-creation';
    if (!hasRegions) return 'region-creation';
    if (!hasStockLocations) return 'stock-location-creation';
    return 'sales-channel-selection';
  };

  const [currentStep, setCurrentStep] = useState<SetupStep>(getInitialStep());
  const [salesChannelId, setSalesChannelId] = useState<string>('');
  const [regionId, setRegionId] = useState<string>('');
  const [stockLocationId, setStockLocationId] = useState<string>('');

  const updateSettings = useUpdateSettings();
  const invalidateCaspitConfig = useInvalidateCaspitConfig();

  const handleSalesChannelComplete = (id: string) => {
    setSalesChannelId(id);
    if (!hasRegions) {
      setCurrentStep('region-creation');
    } else {
      setCurrentStep('region-selection');
    }
  };

  const handleSalesChannelCreateNew = () => setCurrentStep('sales-channel-creation');
  const handleSalesChannelBackToSelection = () => setCurrentStep('sales-channel-selection');

  const handleRegionComplete = (id: string) => {
    setRegionId(id);
    if (!hasStockLocations) {
      setCurrentStep('stock-location-creation');
    } else {
      setCurrentStep('stock-location-selection');
    }
  };

  const handleRegionCreateNew = () => setCurrentStep('region-creation');
  const handleRegionBackToSelection = () => setCurrentStep('region-selection');

  const handleStockLocationComplete = (id: string) => {
    setStockLocationId(id);
    setCurrentStep('terminal-id');
  };

  const handleStockLocationCreateNew = () => setCurrentStep('stock-location-creation');
  const handleStockLocationBackToSelection = () => setCurrentStep('stock-location-selection');

  const handleTerminalIdComplete = async (terminalId: string, verified: boolean) => {
    await caspitStorage.saveConfig(terminalId, verified);
    await invalidateCaspitConfig();
    setCurrentStep('welcome');
  };

  const handleWelcomeComplete = async () => {
    console.log('[welcome] mutating with', { salesChannelId, regionId, stockLocationId });
    updateSettings.mutate(
      { sales_channel_id: salesChannelId, region_id: regionId, stock_location_id: stockLocationId },
      {
        onSuccess: () => console.log('[welcome] mutate success'),
        onError: (e) => console.error('[welcome] mutate error', e),
      },
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'sales-channel-selection':
        if (!hasSalesChannels) {
          return (
            <SalesChannelCreationStep
              onComplete={handleSalesChannelComplete}
              onBackToSelection={handleSalesChannelBackToSelection}
            />
          );
        }
        return (
          <SalesChannelSelectionStep
            onComplete={handleSalesChannelComplete}
            onCreateNew={handleSalesChannelCreateNew}
            initialValue={salesChannelId}
          />
        );
      case 'sales-channel-creation':
        return (
          <SalesChannelCreationStep
            onComplete={handleSalesChannelComplete}
            onBackToSelection={hasSalesChannels ? handleSalesChannelBackToSelection : undefined}
          />
        );
      case 'region-selection':
        if (!hasRegions) {
          return (
            <RegionCreationStep onComplete={handleRegionComplete} onBackToSelection={handleRegionBackToSelection} />
          );
        }
        return (
          <RegionSelectionStep
            onComplete={handleRegionComplete}
            onCreateNew={handleRegionCreateNew}
            initialValue={regionId}
          />
        );
      case 'region-creation':
        return (
          <RegionCreationStep
            onComplete={handleRegionComplete}
            onBackToSelection={hasRegions ? handleRegionBackToSelection : undefined}
          />
        );
      case 'stock-location-selection':
        if (!hasStockLocations) {
          return (
            <StockLocationCreationStep
              onComplete={handleStockLocationComplete}
              onBackToSelection={handleStockLocationBackToSelection}
            />
          );
        }
        return (
          <StockLocationSelectionStep
            onComplete={handleStockLocationComplete}
            onCreateNew={handleStockLocationCreateNew}
            initialValue={stockLocationId}
          />
        );
      case 'stock-location-creation':
        return (
          <StockLocationCreationStep
            onComplete={handleStockLocationComplete}
            onBackToSelection={hasStockLocations ? handleStockLocationBackToSelection : undefined}
          />
        );
      case 'terminal-id':
        return <TerminalIdStep onComplete={handleTerminalIdComplete} />;
      case 'welcome':
        return <WelcomeStep onComplete={handleWelcomeComplete} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView className="flex-1">{renderCurrentStep()}</KeyboardAvoidingView>
    </SafeAreaView>
  );
};
