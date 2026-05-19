import { CASPIT_CONFIG_SCHEMA } from '@/utils/payment/providers/caspit/CaspitAdapter';
import { getProvider } from '@/utils/payment/registry';
import type { VerifyResult } from '@/utils/payment/types';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '../ui/Text';

interface TerminalIdStepProps {
  onComplete: (terminalId: string, verified: boolean) => void;
}

type VerifyState =
  | { phase: 'idle' }
  | { phase: 'checking' }
  | { phase: 'done'; result: VerifyResult };

const FIELD = CASPIT_CONFIG_SCHEMA.fields[0];

function CheckRow({
  label,
  status,
}: {
  label: string;
  status: 'idle' | 'pending' | 'ok' | 'fail';
}) {
  const icon =
    status === 'ok'
      ? '✓'
      : status === 'fail'
        ? '✗'
        : status === 'pending'
          ? '…'
          : '·';

  const iconColor =
    status === 'ok'
      ? 'text-green-600'
      : status === 'fail'
        ? 'text-red-500'
        : 'text-gray-400';

  return (
    <View className="flex-row items-center gap-3 py-1">
      <Text className={`w-5 text-center text-base font-bold ${iconColor}`}>{icon}</Text>
      <Text className={`text-sm ${status === 'idle' ? 'text-gray-400' : 'text-gray-700'}`}>
        {label}
      </Text>
    </View>
  );
}

function errorMessage(result: VerifyResult & { ok: false }): string {
  switch (result.code) {
    case 'NOT_INSTALLED':
      return 'Caspit app not found. Make sure it is installed and running on this device.';
    case 'WRONG_TERMINAL_ID':
      return 'Terminal rejected this ID. Double-check the 7-digit merchant number on your terminal.';
    case 'SHVA_UNREACHABLE':
      return 'Terminal is reachable but the acquirer (Shva) is currently unreachable. You can save and retry later.';
    case 'TIMEOUT':
      return 'No response from terminal within 15 seconds. Make sure Caspit is open and the device is online.';
    default:
      return result.message ?? 'Verification failed. You can save without verifying and retry later.';
  }
}

export const TerminalIdStep: React.FC<TerminalIdStepProps> = ({ onComplete }) => {
  const [value, setValue] = useState('');
  const [verifyState, setVerifyState] = useState<VerifyState>({ phase: 'idle' });
  const continueOpacity = useRef(new Animated.Value(0)).current;

  const validationError = FIELD.validate(value);
  const canVerify = validationError === null;

  const terminalStatus: 'idle' | 'pending' | 'ok' | 'fail' =
    verifyState.phase === 'idle'
      ? 'idle'
      : verifyState.phase === 'checking'
        ? 'pending'
        : verifyState.result.ok
          ? 'ok'
          : 'fail';

  const shvaStatus: 'idle' | 'pending' | 'ok' | 'fail' =
    verifyState.phase === 'idle'
      ? 'idle'
      : verifyState.phase === 'checking'
        ? 'pending'
        : verifyState.result.ok
          ? 'ok'
          : verifyState.result.ok === false && verifyState.result.code === 'SHVA_UNREACHABLE'
            ? 'fail'
            : verifyState.result.ok === false && verifyState.result.code === 'WRONG_TERMINAL_ID'
              ? 'idle' // shva check didn't run
              : 'idle';

  const isVerified = verifyState.phase === 'done' && verifyState.result.ok;
  const hasFailed = verifyState.phase === 'done' && !verifyState.result.ok;

  const handleVerify = async () => {
    setVerifyState({ phase: 'checking' });

    try {
      const provider = getProvider('ashrait');
      const result = await provider.verifyConfig!({ terminalId: value });
      setVerifyState({ phase: 'done', result });

      if (result.ok) {
        Animated.timing(continueOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }
    } catch (err: any) {
      setVerifyState({
        phase: 'done',
        result: { ok: false, code: 'UNKNOWN', message: err?.message ?? 'Unexpected error' },
      });
    }
  };

  const handleSaveAnyway = () => {
    onComplete(value, false);
  };

  const handleContinue = () => {
    onComplete(value, true);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="mb-6 text-4xl">Setting Up</Text>
      <Text className="mb-2 text-2xl">Payment Terminal</Text>
      <Text className="mb-6 text-gray-500">
        Enter the 7-digit merchant ID from your Caspit terminal to connect it to this POS.
      </Text>

      {/* Input */}
      <Text className="mb-1 text-sm font-medium text-gray-700">{FIELD.label}</Text>
      {FIELD.helper && (
        <Text className="mb-2 text-xs text-gray-400">{FIELD.helper}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={(t) => {
          setValue(t);
          setVerifyState({ phase: 'idle' });
          continueOpacity.setValue(0);
        }}
        placeholder={FIELD.placeholder}
        keyboardType={FIELD.keyboardType ?? 'default'}
        maxLength={7}
        className="mb-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900"
        editable={verifyState.phase !== 'checking'}
        placeholderTextColor="#9ca3af"
      />
      {value.length > 0 && validationError && (
        <Text className="mb-3 text-xs text-red-500">{validationError}</Text>
      )}

      {/* Verify button */}
      {verifyState.phase !== 'done' || hasFailed ? (
        <TouchableOpacity
          onPress={handleVerify}
          disabled={!canVerify || verifyState.phase === 'checking'}
          className={`mt-4 flex-row items-center justify-center rounded-xl px-6 py-4 ${
            canVerify && verifyState.phase !== 'checking'
              ? 'bg-gray-900'
              : 'bg-gray-200'
          }`}
          activeOpacity={0.8}
        >
          {verifyState.phase === 'checking' ? (
            <>
              <ActivityIndicator size="small" color="#ffffff" />
              <Text className="ml-2 text-base font-semibold text-white">Verifying…</Text>
            </>
          ) : (
            <Text
              className={`text-base font-semibold ${canVerify ? 'text-white' : 'text-gray-400'}`}
            >
              {hasFailed ? 'Retry Verification' : 'Verify Terminal'}
            </Text>
          )}
        </TouchableOpacity>
      ) : null}

      {/* Checklist — visible once verification starts */}
      {verifyState.phase !== 'idle' && (
        <View className="mt-5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <CheckRow label="Terminal connection" status={terminalStatus} />
          <CheckRow label="Acquirer (Shva) reachability" status={shvaStatus} />
        </View>
      )}

      {/* Error copy */}
      {hasFailed && verifyState.phase === 'done' && (
        <View className="mt-4">
          <Text className="text-sm text-red-600">{errorMessage(verifyState.result as VerifyResult & { ok: false })}</Text>
        </View>
      )}

      {/* Save anyway (soft block) — shown on failure */}
      {hasFailed && (
        <TouchableOpacity
          onPress={handleSaveAnyway}
          className="mt-3"
          activeOpacity={0.7}
        >
          <Text className="text-center text-sm text-gray-400 underline">
            Save without verifying
          </Text>
        </TouchableOpacity>
      )}

      {/* Animated Continue — slides in on success */}
      <Animated.View style={{ opacity: continueOpacity, marginTop: 16 }}>
        <TouchableOpacity
          onPress={handleContinue}
          className="rounded-xl bg-green-600 px-6 py-4"
          activeOpacity={0.8}
        >
          <Text className="text-center text-base font-semibold text-white">Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
