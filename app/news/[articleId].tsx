import { useCallback, useMemo } from 'react';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { isLikelyVideoUrl, isStreamingUrl, resolveVideoSource } from '@/utils/media';

type ArticleSearchParams = {
  articleId?: string;
  title?: string;
  image?: string;
  author?: string;
  description?: string;
  content?: string;
  url?: string;
  source?: string;
};

export default function ArticleDetailsScreen() {
  const params = useLocalSearchParams<ArticleSearchParams>();

  const placeholderImage = useMemo(
    () =>
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    [],
  );

  const imageSource = useMemo(() => {
    if (typeof params.image === 'string' && params.image.trim().length > 0) {
      return { uri: params.image };
    }

    return { uri: placeholderImage };
  }, [params.image, placeholderImage]);

  const articleTitle = useMemo(() => {
    if (typeof params.title === 'string' && params.title.trim().length > 0) {
      return params.title.trim();
    }

    return 'Top headline';
  }, [params.title]);

  const articleAuthor = useMemo(() => {
    if (typeof params.author === 'string' && params.author.trim().length > 0) {
      return params.author.trim();
    }

    if (typeof params.source === 'string' && params.source.trim().length > 0) {
      return params.source.trim();
    }

    return null;
  }, [params.author, params.source]);

  const articleBody = useMemo(() => {
    const baseText =
      (typeof params.content === 'string' && params.content.trim().length > 0
        ? params.content
        : typeof params.description === 'string' && params.description.trim().length > 0
          ? params.description
          : null) ??
      'No additional details are available for this headline right now.';

    return baseText.replace(/\s*\[[^\]]*\]$/g, '').trim();
  }, [params.content, params.description]);

  const headerTitle = useMemo(() => {
    if (typeof params.source === 'string' && params.source.trim().length > 0) {
      return params.source.trim();
    }

    return 'Article';
  }, [params.source]);

  const hasArticleUrl = typeof params.url === 'string' && params.url.trim().length > 0;
  const videoSource = useMemo(() => resolveVideoSource(params.url), [params.url]);
  const canPlayVideo = hasArticleUrl && isLikelyVideoUrl(params.url);
  const isStreaming = isStreamingUrl(params.url);

  const handleOpenArticle = useCallback(async () => {
    if (!hasArticleUrl || typeof params.url !== 'string') {
      return;
    }

    try {
      const supported = await Linking.canOpenURL(params.url);
      if (!supported) {
        Alert.alert('Unable to open link', 'Try copying the article URL and opening it in your browser.');
        return;
      }

      await Linking.openURL(params.url);
    } catch {
      Alert.alert('Something went wrong', 'We could not launch the article link.');
    }
  }, [hasArticleUrl, params.url]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: headerTitle }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} contentFit="cover" transition={200} />
        </View>
        <View style={styles.body}>
          <ThemedText type="title" style={styles.title}>
            {articleTitle}
          </ThemedText>
          {articleAuthor && (
            <ThemedText style={styles.author}>
              By {articleAuthor}
            </ThemedText>
          )}
          <ThemedText style={styles.description}>{articleBody}</ThemedText>
        </View>
        {hasArticleUrl && (
          <View style={styles.videoSection}>
            <ThemedText type="subtitle" style={styles.videoHeading}>
              Watch the briefing
            </ThemedText>
            {canPlayVideo && videoSource ? (
              <>
                <View style={styles.videoWrapper}>
                  <Video
                    key={params.articleId ?? 'article-video'}
                    style={styles.video}
                    source={videoSource}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay={false}
                  />
                </View>
                <ThemedText style={styles.videoMeta}>
                  {isStreaming ? 'Streaming from source link.' : 'Playing from local file path.'}
                </ThemedText>
              </>
            ) : (
              <>
                <ThemedView
                  style={styles.videoFallback}
                  lightColor="rgba(59, 130, 246, 0.12)"
                  darkColor="rgba(37, 99, 235, 0.24)"
                >
                  <ThemedText type="defaultSemiBold" style={styles.videoFallbackTitle}>
                    No video briefing available
                  </ThemedText>
                  <ThemedText style={styles.videoFallbackDescription}>
                    This headline doesn’t include an embedded video. Jump to the publisher to read and watch their full
                    coverage.
                  </ThemedText>
                  <Pressable onPress={handleOpenArticle} style={({ pressed }) => [styles.videoButton, pressed && styles.videoButtonPressed]}>
                    <ThemedText type="defaultSemiBold" style={styles.videoButtonLabel} lightColor="#ffffff" darkColor="#ffffff">
                      Open full article
                    </ThemedText>
                    <IconSymbol name="safari.fill" size={18} color="#ffffff" />
                  </Pressable>
                </ThemedView>
                <ThemedText style={styles.videoMeta}>
                  We’ll launch the story in your browser so you can watch the publisher’s briefing.
                </ThemedText>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#cbd5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.85,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.92,
  },
  videoSection: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  videoHeading: {
    fontSize: 20,
    lineHeight: 26,
  },
  videoWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  videoFallback: {
    borderRadius: 16,
    padding: 20,
    gap: 12,
    backgroundColor: 'rgba(30, 64, 175, 0.08)',
  },
  videoFallbackTitle: {
    fontSize: 18,
  },
  videoFallbackDescription: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  videoButton: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#1d4ed8',
  },
  videoButtonPressed: {
    opacity: 0.85,
  },
  videoButtonLabel: {
    fontSize: 16,
  },
  videoMeta: {
    fontSize: 14,
    opacity: 0.75,
  },
});
