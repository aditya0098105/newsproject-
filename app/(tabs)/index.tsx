import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TimelineLogo } from '@/components/timeline-logo';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  documentarySpotlight,
  governanceSpotlight,
  protestWatchHighlights,
} from '@/constants/content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const heroHeadlines = [
  {
    title: 'Global Affairs Index',
    summary:
      'Precision reporting, cinematic storytelling, and actionable briefings for decision-makers navigating volatile civic landscapes.',
  },
  {
    title: 'Clean Manufacturing Accord',
    summary:
      'Citizen councils and ministers codify emission thresholds while intelligence analysts surface verified data streams in real time.',
  },
  {
    title: 'Community Resilience Pulse',
    summary:
      'Grassroots observers, climate labs, and municipal coalitions synchronize to deploy rapid relief where it matters most.',
  },
];

const heroMetrics = [
  { label: 'Global correspondents', value: '118' },
  { label: 'Policy briefings / week', value: '42' },
  { label: 'Investigations active', value: '23' },
];

const governanceSignalLabels = ['Transparency', 'Civic trust', 'Crisis readiness'];

const governanceScoreTier = (score: number) => {
  if (score >= 85) {
    return { label: 'Benchmark leader', tone: 'Stability at scale' };
  }
  if (score >= 75) {
    return { label: 'Strong performer', tone: 'Consistent reforms' };
  }
  if (score >= 65) {
    return { label: 'Steady climb', tone: 'Institutional upgrades' };
  }
  return { label: 'In focus', tone: 'Reform momentum building' };
};

const describeGovernanceSignal = (score: number, label: string) => {
  switch (label) {
    case 'Transparency':
      return `${70 + Math.round(score / 4)}% open data`;
    case 'Civic trust':
      return `${55 + Math.round(score / 5)}% positive sentiment`;
    case 'Crisis readiness':
    default:
      return `${60 + Math.round(score / 6)}% response capacity`;
  }
};

const deriveProtestMonitors = (severity: number, index: number) => ({
  monitors: 12 + Math.round(severity * 18) + index * 2,
  updates: 3 + index * 2,
});

const deriveDocumentaryMomentum = (index: number) => ({
  watchlists: 120 + index * 36,
  regions: 4 + index,
});

const quickActions = [
  {
    title: 'Current News',
    subtitle: 'Rolling solution headlines',
    icon: 'newspaper.fill',
    route: '/news',
    priority: 'primary',
  },
  {
    title: 'Protest Watch',
    subtitle: 'Movement dossiers',
    icon: 'megaphone.fill',
    route: '/protests',
    priority: 'primary',
  },
  {
    title: 'Command Center',
    subtitle: 'Investor-grade controls',
    icon: 'slider.horizontal.3',
    route: '/(tabs)/command-center',
    priority: 'primary',
  },
  {
    title: 'Documentaries',
    subtitle: 'Field films & trailers',
    icon: 'film.fill',
    route: '/documentaries',
    priority: 'secondary',
  },
  {
    title: 'Governance Index',
    subtitle: '195-nation scoreboard',
    icon: 'chart.bar.xaxis',
    route: '/governance-index',
    priority: 'secondary',
  },
  {
    title: 'Science Podcasts',
    subtitle: 'Immersive mission audio',
    icon: 'mic.fill',
    route: '/(tabs)/podcasts',
    priority: 'secondary',
  },
  {
    title: 'Expose',
    subtitle: 'Accountability spotlight',
    icon: 'exclamationmark.triangle.fill',
    route: '/(tabs)/expose',
    priority: 'secondary',
  },
];

const forwardFocus = [
  {
    title: 'Carbon-negative cement reaches commercial scale',
    summary:
      'Two megacities approve rapid deployment of carbon-sequestering construction, lowering build emissions by 68%.',
  },
  {
    title: 'Indigenous innovation labs create circular economies',
    summary:
      'Community-led labs across the Pacific accelerate zero-waste supply chains with open-source tooling.',
  },
];

function ProgressBar({ value, tint }: { value: number; tint: string }) {
  const colorScheme = useColorScheme();
  const trackColor = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.35)' : '#e2e8f0';

  return (
    <View style={[styles.progressTrack, { backgroundColor: trackColor }]}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: tint }]} />
    </View>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const borderSubtle = colorScheme === 'dark' ? palette.stroke ?? 'rgba(148, 163, 184, 0.25)' : palette.stroke ?? '#e2e8f0';
  const highlightSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.72)' : palette.card ?? '#ffffff';
  const featureSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.85)' : '#0f172a';
  const tintedSurface = colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.12)';
  const heroBadgeForeground = colorScheme === 'dark' ? '#f8fafc' : palette.background;
  const heroBadgeBackground = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.88)' : '#ffffff';
  const documentaryBadgeSurface = colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.35)' : 'rgba(15, 23, 42, 0.45)';
  const documentaryBadgeText = '#f8fafc';
  const documentaryTagSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(226, 232, 240, 0.76)';
  const documentaryTagText = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';
  const documentaryDurationText = colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.92)' : 'rgba(241, 245, 249, 0.95)';
  const documentarySummaryText = colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.86)' : 'rgba(248, 250, 252, 0.92)';
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
  const activeHeadline = heroHeadlines[activeHeadlineIndex];
  const primaryActions = quickActions.filter((action) => action.priority === 'primary');
  const secondaryActions = quickActions.filter((action) => action.priority === 'secondary');
  const bandAltSurface = colorScheme === 'dark' ? 'rgba(30, 41, 59, 0.72)' : '#f5f7ff';
  const tertiarySurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.12)' : '#f1f5f9';
  const documentaryFeatureGlow = colorScheme === 'dark' ? 'rgba(15,23,42,0.8)' : 'rgba(15, 23, 42, 0.88)';
  const governanceCardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.78)' : palette.card ?? '#ffffff';
  const protestCardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.78)' : palette.card ?? '#ffffff';
  const protestAccent = colorScheme === 'dark' ? palette.tint : '#4338ca';
  const [featuredDocumentary, ...supportingDocumentaries] = documentarySpotlight;
  const featuredMomentum = featuredDocumentary ? deriveDocumentaryMomentum(0) : null;

  const handleOpenDocumentary = useCallback(
    (slug: string) => {
      router.push({ pathname: '/documentaries', params: { slug } });
    },
    [router],
  );

  const handleSubmitNewsletter = useCallback(() => {
    const trimmed = newsletterEmail.trim();

    if (!trimmed) {
      setNewsletterStatus({ type: 'error', message: 'Please enter an email address to continue.' });
      return;
    }

    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!emailPattern.test(trimmed)) {
      setNewsletterStatus({ type: 'error', message: 'That email doesn’t look quite right. Try again?' });
      return;
    }

    setNewsletterEmail('');
    setNewsletterStatus({
      type: 'success',
      message: 'Thanks! Your weekend intelligence briefing will land in your inbox.',
    });
    Alert.alert('You’re on the list', 'We’ll deliver our next Timeline Intelligence digest straight to you.');
  }, [newsletterEmail]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#111827', '#1f2937'] : ['#eef2ff', '#e0f2fe']}
        style={styles.heroShell}
      >
        <View
          style={[
            styles.heroTopBanner,
            { backgroundColor: heroBadgeBackground, borderColor: borderSubtle },
          ]}
        >
          <View style={styles.heroBrandBlock}>
            <TimelineLogo size={42} showWordmark stacked />
            <View style={styles.heroBrandText}>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.heroTagline, { color: heroBadgeForeground }]}
                lightColor={heroBadgeForeground}
                darkColor={heroBadgeForeground}
              >
                Timeline Intelligence
              </ThemedText>
              <ThemedText style={[styles.heroEyebrow, { color: heroBadgeForeground }]}>Global live brief</ThemedText>
            </View>
          </View>
          <Pressable
            onPress={() => router.push('/news')}
            style={[styles.heroButton, { borderColor: palette.tint }]}
          >
            <View style={styles.heroButtonDot} />
            <ThemedText
              type="defaultSemiBold"
              style={[styles.heroButtonLabel, { color: palette.tint }]}
              lightColor={palette.tint}
              darkColor={palette.tint}
            >
              Live brief
            </ThemedText>
          </Pressable>
        </View>

        <ThemedView
          lightColor={highlightSurface}
          darkColor={highlightSurface}
          style={[styles.heroMain, { borderColor: borderSubtle }]}
        >
          <View style={styles.heroHeadlineGroup}>
            <ThemedText type="title" style={styles.heroTitle}>
              {activeHeadline.title}
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>{activeHeadline.summary}</ThemedText>
          </View>

          <View style={styles.heroTabs}>
            {heroHeadlines.map((headline, index) => {
              const isActive = index === activeHeadlineIndex;

              return (
                <Pressable
                  key={headline.title}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => setActiveHeadlineIndex(index)}
                  style={[
                    styles.heroTab,
                    { borderColor: borderSubtle },
                    isActive && { backgroundColor: tintedSurface, borderColor: palette.tint },
                  ]}
                >
                  <View
                    style={[
                      styles.heroTabDot,
                      { backgroundColor: isActive ? palette.tint : borderSubtle },
                    ]}
                  />
                  <ThemedText
                    style={[
                      styles.heroTabLabel,
                      { color: isActive ? palette.tint : heroBadgeForeground },
                    ]}
                  >
                    {`0${index + 1}`}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

          <ThemedView
            lightColor={colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15, 23, 42, 0.04)'}
            darkColor={colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15, 23, 42, 0.05)'}
            style={[styles.heroSpotlight, { borderColor: borderSubtle }]}
          >
            <View style={styles.heroSpotlightHeader}>
              <IconSymbol name="sparkles" size={16} color={palette.tint} />
              <ThemedText type="defaultSemiBold" style={styles.heroSpotlightTitle} lightColor={palette.tint} darkColor={palette.tint}>
                Tonight’s focus
              </ThemedText>
            </View>
            <ThemedText style={styles.heroSpotlightCopy}>
              Ministers convene in Nairobi to ratify the clean manufacturing compact while citizen councils stream real-time oversight dashboards.
            </ThemedText>
          </ThemedView>

          <View style={[styles.metricBand, { borderColor: borderSubtle }]}>
            {heroMetrics.map((metric, index) => (
              <View
                key={metric.label}
                style={[
                  styles.metricItem,
                  index > 0 && { borderLeftColor: borderSubtle, borderLeftWidth: StyleSheet.hairlineWidth },
                ]}
              >
                <ThemedText type="subtitle" style={styles.metricValue}>
                  {metric.value}
                </ThemedText>
                <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
      </LinearGradient>

      <ThemedView
        style={[styles.newsletterStrip, { borderColor: borderSubtle }]}
        lightColor={tertiarySurface}
        darkColor={tertiarySurface}
      >
        <View style={styles.newsletterIntro}>
          <View style={styles.newsletterBadge}>
            <IconSymbol name="envelope.open.fill" size={18} color={palette.tint} />
          </View>
          <View style={styles.newsletterCopy}>
            <ThemedText type="subtitle" style={styles.newsletterTitle}>
              Weekend intelligence brief
            </ThemedText>
            <ThemedText style={styles.newsletterSubtitle}>
              Curated investigations and dispatch intel, ready for Sunday decision sessions.
            </ThemedText>
          </View>
        </View>
        <View style={styles.newsletterControls}>
          <View style={styles.newsletterFieldset}>
            <TextInput
              value={newsletterEmail}
              onChangeText={(value) => {
                setNewsletterEmail(value);
                if (newsletterStatus) {
                  setNewsletterStatus(null);
                }
              }}
              placeholder="you@example.com"
              placeholderTextColor={colorScheme === 'dark' ? 'rgba(226,232,240,0.5)' : 'rgba(15,23,42,0.45)'}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.newsletterInput}
            />
            {newsletterStatus ? (
              <ThemedText
                style={[
                  styles.newsletterStatus,
                  newsletterStatus.type === 'success'
                    ? { color: palette.tint }
                    : { color: colorScheme === 'dark' ? '#facc15' : '#b45309' },
                ]}
              >
                {newsletterStatus.message}
              </ThemedText>
            ) : null}
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmitNewsletter}
            style={[styles.newsletterButton, { backgroundColor: palette.tint }]}
          >
            <ThemedText type="defaultSemiBold" style={styles.newsletterButtonText} lightColor={palette.background} darkColor={palette.background}>
              Subscribe
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
      <View style={styles.sectionIntro}>
        <View style={styles.sectionIntroLabel}>
          <IconSymbol name="sparkles" size={16} color={palette.tint} />
          <ThemedText type="subtitle" style={styles.sectionIntroTitle}>
            Quick launch
          </ThemedText>
        </View>
        <ThemedText style={styles.sectionIntroCaption}>Priority destinations in one tap.</ThemedText>
      </View>

      <View style={styles.primaryQuickRow}>
        {primaryActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route)}
            style={({ pressed }) => [
              styles.primaryQuickCard,
              { borderColor: borderSubtle },
              pressed && styles.quickCardPressed,
            ]}
          >
            <View style={styles.primaryQuickHeader}>
              <View style={[styles.quickIconBadge, { borderColor: borderSubtle }]}>
                <IconSymbol name={action.icon as ComponentProps<typeof IconSymbol>['name']} size={18} color={palette.tint} />
              </View>
              <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
            </View>
            <View style={styles.quickContent}>
              <ThemedText type="subtitle" style={styles.quickTitle}>
                {action.title}
              </ThemedText>
              <ThemedText style={styles.quickSubtitle}>{action.subtitle}</ThemedText>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.secondaryQuickList}>
        {secondaryActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route)}
            style={({ pressed }) => [styles.secondaryQuickItem, pressed && styles.secondaryQuickItemPressed]}
          >
            <View style={[styles.secondaryIconBadge, { borderColor: borderSubtle }]}>
              <IconSymbol name={action.icon as ComponentProps<typeof IconSymbol>['name']} size={16} color={palette.tint} />
            </View>
            <View style={styles.secondaryQuickCopy}>
              <ThemedText style={styles.secondaryQuickTitle}>{action.title}</ThemedText>
              <ThemedText style={styles.secondaryQuickSubtitle}>{action.subtitle}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={palette.tint} />
          </Pressable>
        ))}
      </View>

      <SectionBand
        title="Watch & Listen"
        description="Documentaries and mission audio from correspondents embedded around the globe."
        icon="film.fill"
        ctaLabel="View all films"
        onPressCta={() => router.push('/documentaries')}
        variant="solid"
      >
        {featuredDocumentary ? (
          <Pressable
            onPress={() => handleOpenDocumentary(featuredDocumentary.slug)}
            style={[
              styles.documentaryFeature,
              { borderColor: borderSubtle, backgroundColor: featureSurface },
            ]}
          >
            <Image source={{ uri: featuredDocumentary.image }} style={styles.documentaryFeatureImage} contentFit="cover" />
            <LinearGradient
              colors={['rgba(15,23,42,0.15)', documentaryFeatureGlow]}
              style={styles.documentaryFeatureOverlay}
            />
            <View style={styles.documentaryFeatureContent}>
              <View style={styles.documentaryMetaRow}>
                <View style={[styles.documentaryBadge, { backgroundColor: documentaryBadgeSurface }]}>
                  <IconSymbol name="sparkles" size={14} color={documentaryBadgeText} />
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.documentaryBadgeLabel}
                    lightColor={documentaryBadgeText}
                    darkColor={documentaryBadgeText}
                  >
                    Field feature
                  </ThemedText>
                </View>
                <ThemedText
                  style={styles.documentaryDuration}
                  lightColor={documentaryDurationText}
                  darkColor={documentaryDurationText}
                >
                  {featuredDocumentary.duration}
                </ThemedText>
              </View>
              <ThemedText type="subtitle" style={styles.documentaryFeatureTitle} lightColor="#f8fafc" darkColor="#f8fafc">
                {featuredDocumentary.title}
              </ThemedText>
              <ThemedText style={styles.documentaryFeatureSummary} lightColor={documentarySummaryText} darkColor={documentarySummaryText}>
                {featuredDocumentary.summary}
              </ThemedText>
              <View style={styles.documentaryMomentumRow}>
                <View style={styles.documentaryMomentumItem}>
                  <IconSymbol name="star.fill" size={16} color={palette.tint} />
                  <View>
                    <ThemedText type="defaultSemiBold" style={styles.documentaryMomentumValue} lightColor={palette.tint} darkColor={palette.tint}>
                      {featuredMomentum?.watchlists}+ watchlists
                    </ThemedText>
                    <ThemedText style={styles.documentaryMomentumLabel}>
                      Across {featuredMomentum?.regions} regions
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.documentaryMomentumItem}>
                  <IconSymbol name="film.fill" size={16} color={palette.tint} />
                  <View>
                    <ThemedText type="defaultSemiBold" style={styles.documentaryMomentumValue} lightColor={palette.tint} darkColor={palette.tint}>
                      {featuredDocumentary.tags[0]}
                    </ThemedText>
                    <ThemedText style={styles.documentaryMomentumLabel}>Primary focus</ThemedText>
                  </View>
                </View>
              </View>
              <View style={styles.documentaryAction}>
                <IconSymbol name="play.fill" size={16} color={palette.tint} />
                <ThemedText type="defaultSemiBold" style={styles.documentaryActionLabel} lightColor={palette.tint} darkColor={palette.tint}>
                  Watch trailer
                </ThemedText>
              </View>
            </View>
          </Pressable>
        ) : null}
        {supportingDocumentaries.length > 0 ? (
          <View style={styles.documentarySupportGrid}>
            {supportingDocumentaries.map((feature, index) => {
              const momentum = deriveDocumentaryMomentum(index + 1);
              return (
                <Pressable
                  key={feature.slug}
                  onPress={() => handleOpenDocumentary(feature.slug)}
                  style={[styles.documentarySupportCard, { borderColor: borderSubtle, backgroundColor: palette.background }]}
                >
                  <Image source={{ uri: feature.image }} style={styles.documentarySupportImage} contentFit="cover" />
                  <View style={styles.documentarySupportContent}>
                    <View style={styles.documentarySupportHeader}>
                      <ThemedText type="subtitle" style={styles.documentarySupportTitle}>
                        {feature.title}
                      </ThemedText>
                      <ThemedText style={styles.documentarySupportDuration}>{feature.duration}</ThemedText>
                    </View>
                    <ThemedText style={styles.documentarySupportSummary}>{feature.summary}</ThemedText>
                    <View style={styles.documentarySupportStats}>
                      <View style={[styles.documentaryTag, { backgroundColor: documentaryTagSurface }]}> 
                        <ThemedText style={styles.documentaryTagLabel} lightColor={documentaryTagText} darkColor={documentaryTagText}>
                          {momentum.watchlists}+ saved
                        </ThemedText>
                      </View>
                      <View style={[styles.documentaryTag, { backgroundColor: documentaryTagSurface }]}> 
                        <ThemedText style={styles.documentaryTagLabel} lightColor={documentaryTagText} darkColor={documentaryTagText}>
                          {feature.tags[0]}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </SectionBand>

      <SectionBand
        title="Governance Intelligence"
        description="Scorecards, transparency signals, and institutional trust indicators refreshed weekly."
        icon="chart.bar.xaxis"
        ctaLabel="View full index"
        onPressCta={() => router.push('/governance-index')}
        variant="tinted"
      >
        <View style={styles.indexGrid}>
          {governanceSpotlight.map((entry) => {
            const tier = governanceScoreTier(entry.score);
            return (
              <Pressable
                key={entry.country}
                onPress={() => router.push('/governance-index')}
                style={[styles.indexCard, { borderColor: borderSubtle, backgroundColor: governanceCardSurface }]}
              >
                <View style={styles.indexCardHeader}>
                  <View>
                    <ThemedText type="subtitle" style={styles.indexCountry}>
                      {entry.country}
                    </ThemedText>
                    <ThemedText style={styles.indexTone}>{tier.tone}</ThemedText>
                  </View>
                  <View style={[styles.indexTierBadge, { backgroundColor: tintedSurface }]}> 
                    <IconSymbol name="shield.lefthalf.filled" size={14} color={palette.tint} />
                    <ThemedText style={[styles.indexTierLabel, { color: palette.tint }]}>{tier.label}</ThemedText>
                  </View>
                </View>
                <View style={styles.indexScoreWrap}>
                  <ThemedText type="title" style={styles.indexScoreLarge}>
                    {entry.score}
                  </ThemedText>
                  <View style={styles.indexChangePill}>
                    <IconSymbol
                      name={entry.change >= 0 ? 'arrow.up' : 'arrow.down'}
                      size={14}
                      color={entry.change >= 0 ? palette.tint : '#f97316'}
                    />
                    <ThemedText
                      style={[
                        styles.indexChangeLabel,
                        { color: entry.change >= 0 ? palette.tint : '#f97316' },
                      ]}
                    >
                      {entry.change >= 0 ? `+${entry.change}` : entry.change} pts
                    </ThemedText>
                  </View>
                </View>
                <ProgressBar value={entry.score} tint={palette.tint} />
                <View style={styles.indexSignalRow}>
                  {governanceSignalLabels.map((label) => (
                    <View key={`${entry.country}-${label}`} style={styles.indexSignal}>
                      <ThemedText style={styles.indexSignalLabel}>{label}</ThemedText>
                      <ThemedText type="defaultSemiBold" style={styles.indexSignalValue}>
                        {describeGovernanceSignal(entry.score, label)}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </Pressable>
            );
          })}
        </View>
      </SectionBand>

      <SectionBand
        title="On-the-ground"
        description="Movements, field intel, and solution prototypes emerging from civic frontlines."
        icon="megaphone.fill"
        ctaLabel="View protest desk"
        onPressCta={() => router.push('/protests')}
        variant="solid"
      >
        <View style={styles.protestGrid}>
          {protestWatchHighlights.map((protest, index) => {
            const severityPercent = Math.round(protest.severity * 100);
            const stats = deriveProtestMonitors(protest.severity, index);
            return (
              <Pressable
                key={protest.slug}
                onPress={() => router.push('/protests')}
                style={({ pressed }) => [
                  styles.protestCard,
                  {
                    borderColor: borderSubtle,
                    backgroundColor: protestCardSurface,
                  },
                  pressed && styles.protestCardPressed,
                ]}
              >
                <View style={styles.protestCardHeader}>
                  <View>
                    <ThemedText type="subtitle" style={styles.protestRegion}>
                      {protest.region}
                    </ThemedText>
                    <ThemedText style={styles.protestStatus}>{protest.status}</ThemedText>
                  </View>
                  <View style={[styles.protestSeverityBadge, { borderColor: protestAccent }]}> 
                    <ThemedText type="defaultSemiBold" style={[styles.protestSeverityValue, { color: protestAccent }]}>
                      {severityPercent}%
                    </ThemedText>
                    <ThemedText style={[styles.protestSeverityLabel, { color: protestAccent }]}>Intensity</ThemedText>
                  </View>
                </View>
                <ThemedText type="subtitle" style={styles.protestMovement}>
                  {protest.movement}
                </ThemedText>
                <ThemedText style={styles.protestUpdate}>{protest.update}</ThemedText>
                <ProgressBar value={severityPercent} tint={palette.tint} />
                <View style={styles.protestStatsRow}>
                  <View style={styles.protestStat}>
                    <IconSymbol name="person.3.sequence" size={16} color={palette.tint} />
                    <ThemedText style={styles.protestStatLabel}>{stats.monitors} field monitors</ThemedText>
                  </View>
                  <View style={styles.protestStat}>
                    <IconSymbol name="waveform" size={16} color={palette.tint} />
                    <ThemedText style={styles.protestStatLabel}>{stats.updates} verified updates</ThemedText>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <ThemedView
          style={[styles.forwardContainer, { borderColor: borderSubtle }]}
          lightColor={bandAltSurface}
          darkColor={bandAltSurface}
        >
          {forwardFocus.map((item) => (
            <View key={item.title} style={styles.forwardCard}>
              <IconSymbol name="sparkle" size={20} color={palette.tint} />
              <View style={styles.forwardContent}>
                <ThemedText type="subtitle" style={styles.forwardTitle}>
                  {item.title}
                </ThemedText>
                <ThemedText style={styles.forwardSummary}>{item.summary}</ThemedText>
              </View>
            </View>
          ))}
        </ThemedView>
      </SectionBand>
    </ParallaxScrollView>
  );
}

function SectionBand({
  title,
  description,
  icon,
  ctaLabel,
  onPressCta,
  variant = 'solid',
  children,
}: {
  title: string;
  description: string;
  icon: ComponentProps<typeof IconSymbol>['name'];
  ctaLabel?: string;
  onPressCta?: () => void;
  variant?: 'solid' | 'tinted';
  children: ReactNode;
}) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const solidBackground = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.78)' : palette.card ?? '#ffffff';
  const tintedBackground = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.12)' : '#f6f7fb';
  const background = variant === 'solid' ? solidBackground : tintedBackground;
  const badgeBackground =
    variant === 'solid'
      ? colorScheme === 'dark'
        ? 'rgba(99, 102, 241, 0.28)'
        : 'rgba(99, 102, 241, 0.16)'
      : colorScheme === 'dark'
        ? 'rgba(148, 163, 184, 0.22)'
        : 'rgba(148, 163, 184, 0.24)';
  const borderColor =
    variant === 'solid'
      ? palette.stroke ?? (colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : '#e2e8f0')
      : 'transparent';

  return (
    <ThemedView
      style={[
        styles.sectionBand,
        { borderColor },
        variant === 'tinted' ? styles.sectionBandTinted : null,
      ]}
      lightColor={background}
      darkColor={background}
    >
      <View style={styles.sectionBandHeader}>
        <View style={styles.sectionBandTitleGroup}>
          <View style={[styles.sectionBandIcon, { backgroundColor: badgeBackground }]}>
            <IconSymbol name={icon} size={18} color={palette.tint} />
          </View>
          <View style={styles.sectionBandText}>
            <ThemedText type="subtitle" style={styles.sectionBandTitle}>
              {title}
            </ThemedText>
            <ThemedText style={styles.sectionBandDescription}>{description}</ThemedText>
          </View>
        </View>
        {ctaLabel && onPressCta ? (
          <Pressable onPress={onPressCta} style={styles.sectionBandCta}>
            <ThemedText
              type="defaultSemiBold"
              style={[styles.sectionBandCtaLabel, { color: palette.tint }]}
            >
              {ctaLabel}
            </ThemedText>
            <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.sectionBandContent}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 260,
  },
  heroShell: {
    borderRadius: 28,
    padding: 3,
    marginTop: -32,
    marginBottom: 24,
    gap: 12,
  },
  heroTopBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 22,
    borderWidth: 1,
  },
  heroBrandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroBrandText: {
    gap: 4,
  },
  heroTagline: {
    fontSize: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    opacity: 0.75,
  },
  heroButton: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroButtonDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.45)',
  },
  heroButtonLabel: {
    fontSize: 15,
    letterSpacing: 0.4,
  },
  heroMain: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    gap: 20,
  },
  heroHeadlineGroup: {
    gap: 12,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  heroTabs: {
    flexDirection: 'row',
    gap: 10,
  },
  heroTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  heroTabDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  heroTabLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroSpotlight: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  heroSpotlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroSpotlightTitle: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroSpotlightCopy: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
  metricBand: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  metricItem: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 6,
  },
  metricValue: {
    fontSize: 24,
  },
  metricLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.7,
  },
  newsletterStrip: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 16,
    marginBottom: 24,
  },
  newsletterIntro: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  newsletterBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsletterCopy: {
    flex: 1,
    gap: 4,
  },
  newsletterTitle: {
    fontSize: 18,
  },
  newsletterSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  newsletterControls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'flex-end',
  },
  newsletterFieldset: {
    flex: 1,
    gap: 6,
  },
  newsletterInput: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  newsletterStatus: {
    fontSize: 13,
  },
  newsletterButton: {
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  newsletterButtonText: {
    fontSize: 15,
  },
  sectionIntro: {
    marginTop: 8,
    marginBottom: 16,
    gap: 6,
  },
  sectionIntroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIntroTitle: {
    fontSize: 20,
  },
  sectionIntroCaption: {
    fontSize: 14,
    opacity: 0.7,
  },
  primaryQuickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  primaryQuickCard: {
    flex: 1,
    minWidth: 160,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  primaryQuickHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
  },
  quickContent: {
    gap: 6,
  },
  quickTitle: {
    fontSize: 18,
  },
  quickSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  quickCardPressed: {
    transform: [{ translateY: 2 }],
    opacity: 0.92,
  },
  secondaryQuickList: {
    gap: 10,
    marginBottom: 24,
  },
  secondaryQuickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryQuickItemPressed: {
    opacity: 0.85,
  },
  secondaryIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryQuickCopy: {
    flex: 1,
    gap: 2,
  },
  secondaryQuickTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryQuickSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  documentaryFeature: {
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 18,
    minHeight: 320,
  },
  documentaryFeatureImage: {
    ...StyleSheet.absoluteFillObject,
  },
  documentaryFeatureOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  documentaryFeatureContent: {
    padding: 24,
    gap: 12,
    minHeight: 320,
    justifyContent: 'flex-end',
  },
  documentaryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  documentaryBadgeLabel: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  documentaryDuration: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  documentaryFeatureTitle: {
    fontSize: 26,
    lineHeight: 32,
  },
  documentaryFeatureSummary: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  documentaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  documentaryTag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  documentaryTagLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  documentaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  documentaryActionLabel: {
    fontSize: 14,
  },
  documentaryMomentumRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  documentaryMomentumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  documentaryMomentumValue: {
    fontSize: 15,
  },
  documentaryMomentumLabel: {
    fontSize: 12,
    opacity: 0.75,
  },
  documentarySupportGrid: {
    gap: 14,
  },
  documentarySupportCard: {
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
  },
  documentarySupportImage: {
    width: '100%',
    height: 180,
  },
  documentarySupportContent: {
    padding: 18,
    gap: 10,
  },
  documentarySupportHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  documentarySupportTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
  },
  documentarySupportDuration: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.7,
  },
  documentarySupportSummary: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  documentarySupportStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  protestRegion: {
    fontSize: 18,
  },
  protestGrid: {
    gap: 14,
  },
  protestCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  protestCardPressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.92,
  },
  protestCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  protestStatus: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    opacity: 0.7,
  },
  protestSeverityBadge: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'flex-end',
  },
  protestSeverityValue: {
    fontSize: 18,
    textAlign: 'center',
  },
  protestSeverityLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  protestMovement: {
    fontSize: 15,
    fontWeight: '600',
  },
  protestUpdate: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
  protestStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  protestStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  protestStatLabel: {
    fontSize: 13,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  indexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  indexCard: {
    flex: 1,
    minWidth: '48%',
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  indexCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  indexCountry: {
    fontSize: 18,
  },
  indexTone: {
    fontSize: 13,
    opacity: 0.7,
  },
  indexTierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  indexTierLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  indexScoreWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexScoreLarge: {
    fontSize: 36,
    lineHeight: 40,
  },
  indexChangePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  indexChangeLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  indexSignalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  indexSignal: {
    flexBasis: '48%',
    gap: 2,
  },
  indexSignalLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  indexSignalValue: {
    fontSize: 14,
  },
  forwardContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 16,
    borderWidth: 1,
  },
  forwardCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  forwardContent: {
    gap: 6,
    flex: 1,
  },
  forwardTitle: {
    fontSize: 18,
  },
  forwardSummary: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionBand: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 28,
    gap: 16,
  },
  sectionBandTinted: {
    borderWidth: 0,
  },
  sectionBandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  sectionBandTitleGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  sectionBandIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionBandText: {
    flex: 1,
    gap: 4,
  },
  sectionBandTitle: {
    fontSize: 20,
  },
  sectionBandDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  sectionBandCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  sectionBandCtaLabel: {
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  sectionBandContent: {
    gap: 16,
  },
});

