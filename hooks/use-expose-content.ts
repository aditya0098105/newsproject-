import { useCallback, useEffect, useState } from 'react';

import exposeFallbackContent, {
  type ExposeContent,
} from '@/constants/expose-content';

const CMS_ENDPOINT = process.env.EXPO_PUBLIC_EXPOSE_CMS_URL;

const mergeContent = (incoming?: Partial<ExposeContent>): ExposeContent => ({
  heroBadgeLabel: incoming?.heroBadgeLabel ?? exposeFallbackContent.heroBadgeLabel,
  heroTitle: incoming?.heroTitle ?? exposeFallbackContent.heroTitle,
  heroSubtitle: incoming?.heroSubtitle ?? exposeFallbackContent.heroSubtitle,
  highlightCard: {
    ...exposeFallbackContent.highlightCard,
    ...incoming?.highlightCard,
  },
  dossierHighlights:
    Array.isArray(incoming?.dossierHighlights) && incoming?.dossierHighlights.length
      ? incoming!.dossierHighlights
      : exposeFallbackContent.dossierHighlights,
  timeline:
    Array.isArray(incoming?.timeline) && incoming?.timeline.length
      ? incoming!.timeline
      : exposeFallbackContent.timeline,
  takeaway: {
    ...exposeFallbackContent.takeaway,
    ...incoming?.takeaway,
  },
});

export function useExposeContent() {
  const [content, setContent] = useState<ExposeContent>(exposeFallbackContent);
  const [loading, setLoading] = useState<boolean>(Boolean(CMS_ENDPOINT));
  const [error, setError] = useState<string | undefined>();

  const fetchContent = useCallback(async () => {
    if (!CMS_ENDPOINT) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(CMS_ENDPOINT);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = (await response.json()) as Partial<ExposeContent>;
      setContent(mergeContent(payload));
    } catch (err) {
      console.error('Failed to load expose CMS payload', err);
      setContent(exposeFallbackContent);
      setError('Unable to sync the latest dossier right now. Showing last published data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refresh: fetchContent };
}
