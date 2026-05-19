import { Globe } from '@/components/icons/globe';
import { LogOut } from '@/components/icons/log-out';
import { MapPin } from '@/components/icons/map-pin';
import { RotateCcw } from '@/components/icons/rotate-ccw';
import { Store } from '@/components/icons/store';
import { Truck } from '@/components/icons/truck';
import { UserRound } from '@/components/icons/user-round';
import { Zap } from '@/components/icons/zap';
import { Prompt } from '@/components/ui/Prompt';
import { Text } from '@/components/ui/Text';
import { useAuthCtx } from '@/contexts/auth';
import { useClearSettings, useSettings } from '@/contexts/settings';
import { useCaspitConfig } from '@/hooks/useCaspitConfig';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, useWindowDimensions, View } from 'react-native';

// ─── Layout constants ─────────────────────────────────────────────────────────

const PADDING = 20;
const GAP = 8;
const COLS = 4;
const TILE_HEIGHT_RATIO = 1.15;

// ─── Per-tile color palette ───────────────────────────────────────────────────

const C = {
  profile:      { border: '#BFDBFE', bg: '#EFF6FF', iconBg: '#DBEAFE', icon: '#1D4ED8' },
  logout:       { border: '#FED7AA', bg: '#FFF7ED', iconBg: '#FFEDD5', icon: '#C2410C' },
  salesChannel: { border: '#DDD6FE', bg: '#F5F3FF', iconBg: '#EDE9FE', icon: '#6D28D9' },
  region:       { border: '#99F6E4', bg: '#F0FDFA', iconBg: '#CCFBF1', icon: '#0F766E' },
  stockLocation:{ border: '#BBF7D0', bg: '#F0FDF4', iconBg: '#DCFCE7', icon: '#15803D' },
  terminal:     { border: '#FDE68A', bg: '#FFFBEB', iconBg: '#FEF3C7', icon: '#B45309' },
  hardware:     { border: '#FBCFE8', bg: '#FDF2F8', iconBg: '#FCE7F3', icon: '#BE185D' },
  reset:        { border: '#FECACA', bg: '#FEF2F2', iconBg: '#FEE2E2', icon: '#DC2626' },
};

// ─── Tile ─────────────────────────────────────────────────────────────────────

interface TileProps {
  icon: (color: string) => React.ReactNode;
  label: string;
  sublabel?: string;
  badge?: { text: string; variant: 'green' | 'yellow' | 'gray' };
  onPress: () => void;
  colors: typeof C.profile;
  size: number;
}

function Tile({ icon, label, sublabel, badge, onPress, colors, size }: TileProps) {
  const height = Math.round(size * TILE_HEIGHT_RATIO);

  const badgeBg =
    badge?.variant === 'green' ? '#DCFCE7' :
    badge?.variant === 'yellow' ? '#FEF3C7' : '#F3F4F6';
  const badgeText =
    badge?.variant === 'green' ? '#15803D' :
    badge?.variant === 'yellow' ? '#B45309' : '#6B7280';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{
        width: size,
        height,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.bg,
        padding: 12,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: colors.iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon(colors.icon)}
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#111827' }} numberOfLines={1}>
          {label}
        </Text>
        {sublabel ? (
          <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }} numberOfLines={1}>
            {sublabel}
          </Text>
        ) : null}
        {badge ? (
          <View
            style={{
              marginTop: 4,
              alignSelf: 'flex-start',
              borderRadius: 999,
              paddingHorizontal: 6,
              paddingVertical: 2,
              backgroundColor: badgeBg,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: '600', color: badgeText }}>
              {badge.text}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const tileSize = Math.floor((screenWidth - PADDING * 2 - GAP * (COLS - 1)) / COLS);

  const queryClient = useQueryClient();
  const auth = useAuthCtx();
  const settings = useSettings();
  const clearSettings = useClearSettings();
  const caspitConfig = useCaspitConfig();

  const [isLogoutPromptVisible, setIsLogoutPromptVisible] = React.useState(false);
  const [isResetPromptVisible, setIsResetPromptVisible] = React.useState(false);

  const userEmail = auth.state.status === 'authenticated' ? auth.state.user?.email : null;
  const medusaUrl = auth.state.status === 'authenticated' ? auth.state.medusaUrl : null;
  const terminalId = caspitConfig.data?.terminalId ?? null;
  const isVerified = caspitConfig.data?.verified ?? false;

  const profileSublabel = [userEmail, medusaUrl].filter(Boolean).join(' · ');

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ padding: PADDING, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 text-3xl font-bold text-gray-900">Settings</Text>

        {/* ── Account ── */}
        <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Account
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP, marginBottom: 20 }}>
          <Tile
            icon={(c) => <UserRound size={18} color={c} />}
            label="Profile"
            sublabel={profileSublabel || '—'}
            onPress={() => {}}
            colors={C.profile}
            size={tileSize}
          />
          <Tile
            icon={(c) => <LogOut size={18} color={c} />}
            label="Log Out"
            sublabel="Sign out"
            onPress={() => setIsLogoutPromptVisible(true)}
            colors={C.logout}
            size={tileSize}
          />
        </View>

        {/* ── Store Setup ── */}
        <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Store Setup
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP, marginBottom: 20 }}>
          <Tile
            icon={(c) => <Store size={18} color={c} />}
            label="Sales Channel"
            sublabel={settings.data?.sales_channel?.name ?? '—'}
            onPress={() => router.push('/settings/sales-channel')}
            colors={C.salesChannel}
            size={tileSize}
          />
          <Tile
            icon={(c) => <Globe size={18} color={c} />}
            label="Region"
            sublabel={settings.data?.region?.name ?? '—'}
            onPress={() => router.push('/settings/region')}
            colors={C.region}
            size={tileSize}
          />
          <Tile
            icon={(c) => <MapPin size={18} color={c} />}
            label="Stock Location"
            sublabel={settings.data?.stock_location?.name ?? '—'}
            onPress={() => router.push('/settings/stock-location')}
            colors={C.stockLocation}
            size={tileSize}
          />
          <Tile
            icon={(c) => <Zap size={18} color={c} />}
            label="Terminal"
            sublabel={terminalId ?? 'Not configured'}
            badge={
              terminalId
                ? { text: isVerified ? 'Verified' : 'Unverified', variant: isVerified ? 'green' : 'yellow' }
                : undefined
            }
            onPress={() => router.push('/settings/terminal')}
            colors={C.terminal}
            size={tileSize}
          />
        </View>

        {/* ── Hardware ── */}
        <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Hardware
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP, marginBottom: 20 }}>
          <Tile
            icon={(c) => <Truck size={18} color={c} />}
            label="Hardware"
            sublabel="Printer & cash drawer"
            onPress={() => router.push('/settings/hardware')}
            colors={C.hardware}
            size={tileSize}
          />
        </View>

        {/* ── Danger Zone ── */}
        <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Danger Zone
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}>
          <Tile
            icon={(c) => <RotateCcw size={18} color={c} />}
            label="Reset Setup"
            sublabel="Clear all store settings"
            onPress={() => setIsResetPromptVisible(true)}
            colors={C.reset}
            size={tileSize}
          />
        </View>
      </ScrollView>

      <Prompt
        onSubmit={async () => {
          setIsLogoutPromptVisible(false);
          queryClient.clear();
          router.replace('/login');
          await auth.logout();
        }}
        onClose={() => setIsLogoutPromptVisible(false)}
        submitText="Log Out"
        cancelText="Cancel"
        title="Are you sure you want to log out?"
        visible={isLogoutPromptVisible}
        showCloseButton={false}
        dismissOnOverlayPress={false}
      />

      <Prompt
        onSubmit={() => {
          setIsResetPromptVisible(false);
          clearSettings.mutate();
        }}
        onClose={() => setIsResetPromptVisible(false)}
        submitText="Reset"
        cancelText="Cancel"
        title="Reset all store settings?"
        visible={isResetPromptVisible}
        showCloseButton={false}
        dismissOnOverlayPress={false}
      />
    </>
  );
}
