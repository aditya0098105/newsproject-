import { useCallback, useEffect, useState } from 'react';

import exposeFallbackContent, {
  type ExposeContent,
} from '@/constants/expose-content';
import { EXPOSE_CONTENT_URL } from '@/constants/expose-source';

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
  const [loading, setLoading] = useState<boolean>(Boolean(EXPOSE_CONTENT_URL));
  const [error, setError] = useState<string | undefined>();

  const fetchContent = useCallback(async () => {
    if (!EXPOSE_CONTENT_URL) {
      setLoading(false);
      setError('Expose JSON source URL has not been configured.');
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(EXPOSE_CONTENT_URL);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = (await response.json()) as Partial<ExposeContent>;
      setContent(mergeContent(payload));
    } catch (err) {
      console.error('Failed to load expose JSON payload', err);
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
