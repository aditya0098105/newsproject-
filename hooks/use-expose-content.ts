import { useCallback } from 'react';

import exposeFallbackContent, { type ExposeContent } from '@/constants/expose-content';

type ExposeContentResponse = {
  content: ExposeContent;
  loading: boolean;
  error: string | undefined;
  refresh: () => void;
};

export function useExposeContent(): ExposeContentResponse {
  const refresh = useCallback(() => {
    // Remote syncing has been disabled; expose content now only uses the bundled fallback data.
  }, []);

  return {
    content: exposeFallbackContent,
    loading: false,
    error: undefined,
    refresh,
  };
}
