import { caspitStorage, type CaspitConfig } from '@/utils/storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const CASPIT_CONFIG_KEY = ['caspit-config'];

export function useCaspitConfig() {
  return useQuery<CaspitConfig>({
    queryKey: CASPIT_CONFIG_KEY,
    queryFn: () => caspitStorage.loadConfig(),
    staleTime: Infinity,
    retry: false,
  });
}

export function useInvalidateCaspitConfig() {
  const client = useQueryClient();
  return () => client.invalidateQueries({ queryKey: CASPIT_CONFIG_KEY });
}
