import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Image } from 'expo-image';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
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

const heroMetrics = [
  { label: 'Global correspondents', value: '118' },
  { label: 'Policy briefings / week', value: '42' },
  { label: 'Investigations active', value: '23' },
];

const quickActions = [
  {
    title: 'Documentaries',
    subtitle: 'Field films & trailers',
    icon: 'film.fill',
    route: '/documentaries',
  },
  {
    title: 'Current News',
    subtitle: 'Rolling solution headlines',
    icon: 'newspaper.fill',
    route: '/news',
  },
  {
    title: 'Governance Index',
    subtitle: '195-nation scoreboard',
    icon: 'chart.bar.xaxis',
    route: '/governance-index',
  },
  {
    title: 'Protest Watch',
    subtitle: 'Movement dossiers',
    icon: 'megaphone.fill',
    route: '/protests',
  },
  {
    title: 'Science Podcasts',
    subtitle: 'Immersive mission audio',
    icon: 'mic.fill',
    route: '/(tabs)/podcasts',
  },
  {
    title: 'Expose',
    subtitle: 'Accountability spotlight',
    icon: 'exclamationmark.triangle.fill',
    route: '/(tabs)/expose',
  },
  {
    title: 'Command Center',
    subtitle: 'Investor-grade controls',
    icon: 'slider.horizontal.3',
    route: '/(tabs)/command-center',
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

const heroStories = [
  {
    id: 'global-affairs',
    title: 'Global Affairs Index',
    summary:
      'Precision reporting, cinematic storytelling, and actionable briefings for decision-makers navigating volatile civic landscapes.',
    focus:
      'Ministers convene in Nairobi to ratify the clean manufacturing compact while citizen councils stream real-time oversight dashboards.',
  },
  {
    id: 'ocean-accord',
    title: 'Ocean Accord Coalition',
    summary:
      'Coastal alliances deploy open-source sensors, maritime drones, and citizen science to secure blue economy transitions.',
    focus:
      'Delegates in Reykjavik review reef insurance pilots and unveil community-owned desalination backed by the accord’s fund.',
  },
  {
    id: 'urban-resilience',
    title: 'Urban Resilience Network',
    summary:
      'City labs share adaptive infrastructure playbooks, from heat-resilient housing to equitable mobility corridors.',
    focus:
      'Night mayors in Lagos and São Paulo outline participatory zoning reforms to accelerate safe, carbon-free transport.',
  },
];

const audioHighlights = [
  {
    title: 'Signal Flow',
    blurb: 'Weekly brief with policy strategists decoding civic tech breakthroughs.',
    duration: '24 min listen',
    route: '/(tabs)/podcasts',
  },
  {
    title: 'Ground Truth Dispatch',
    blurb: 'Reporters on location unpack the protests and negotiations shaping reforms.',
    duration: '18 min listen',
    route: '/(tabs)/podcasts',
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
  const panelSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : palette.card ?? '#ffffff';
  const forwardSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.12)' : '#f6f7fb';
  const heroBandSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.55)' : '#ffffff';
  const ribbonSurface = colorScheme === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.05)';
  const bandSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.6)' : '#f8fafc';
  const alternateBandSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.45)' : '#eef2ff';
  const tintedSurface = colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.12)';
  const heroBadgeForeground = colorScheme === 'dark' ? '#f8fafc' : palette.background;
  const documentaryBadgeSurface = colorScheme === 'dark' ? 'rgba(59, 130, 246, 0.35)' : 'rgba(15, 23, 42, 0.45)';
  const documentaryBadgeText = '#f8fafc';
  const documentaryTagSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(226, 232, 240, 0.76)';
  const documentaryTagText = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';
  const documentaryDurationText = colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.92)' : 'rgba(241, 245, 249, 0.95)';
  const documentarySummaryText = colorScheme === 'dark' ? 'rgba(226, 232, 240, 0.86)' : 'rgba(248, 250, 252, 0.92)';
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeHeroStory, setActiveHeroStory] = useState(0);

  const currentHeroStory = heroStories[activeHeroStory];
  const primaryQuickActions = quickActions.slice(0, 3);
  const secondaryQuickActions = quickActions.slice(3);
  const quickBadgeSurface = colorScheme === 'dark' ? 'rgba(30, 41, 59, 0.9)' : '#f1f5f9';
  const quickIconSurface = colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.12)';
  const newsletterSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff';
  const newsletterBorder = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : '#d0d5dd';

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
        <View style={[styles.hero, { backgroundColor: heroBandSurface, borderColor: borderSubtle }] }>
          <View style={styles.heroBanner}>
            <View style={styles.heroBrandBlock}>
              <TimelineLogo size={48} showWordmark stacked />
              <ThemedText
                type="defaultSemiBold"
                style={[styles.heroTagline, { color: heroBadgeForeground }]}
                lightColor={heroBadgeForeground}
                darkColor={heroBadgeForeground}
              >
                Timeline Intelligence
              </ThemedText>
            </View>
            <View style={styles.heroCtaCluster}>
              <ThemedText style={[styles.heroCtaLabel, { color: heroBadgeForeground }]}>Live brief</ThemedText>
              <Pressable
                onPress={() => router.push('/news')}
                style={[styles.heroButton, { backgroundColor: heroBadgeForeground }]}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.heroButtonLabel, { color: palette.tint }]}
                  lightColor={palette.tint}
                  darkColor={palette.tint}
                >
                  View headlines
                </ThemedText>
              </Pressable>
            </View>
          </View>

          <View style={styles.heroBody}>
            <View style={styles.heroHeadlineGroup}>
              <ThemedText type="title" style={styles.heroTitle}>
                {currentHeroStory.title}
              </ThemedText>
              <ThemedText style={styles.heroSubtitle}>
                {currentHeroStory.summary}
              </ThemedText>
            </View>

            <View style={styles.heroStoryTabs}>
              {heroStories.map((story, index) => {
                const active = index === activeHeroStory;

                return (
                  <Pressable
                    key={story.id}
                    onPress={() => setActiveHeroStory(index)}
                    style={[styles.heroStoryTab, active && [styles.heroStoryTabActive, { borderColor: palette.tint }]]}
                  >
                    <ThemedText
                      style={[styles.heroStoryTabLabel, active && { color: palette.tint }]}
                      lightColor={active ? palette.tint : undefined}
                      darkColor={active ? palette.tint : undefined}
                    >
                      {story.title}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.heroIndicators}>
              {heroStories.map((story, index) => {
                const active = index === activeHeroStory;

                return (
                  <View
                    key={`${story.id}-indicator`}
                    style={[
                      styles.heroIndicatorDot,
                      {
                        backgroundColor: active ? palette.tint : 'rgba(148, 163, 184, 0.5)',
                        width: active ? 18 : 8,
                      },
                    ]}
                  />
                );
              })}
            </View>

            <ThemedView
              lightColor={colorScheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15, 23, 42, 0.04)'}
              darkColor={colorScheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15, 23, 42, 0.06)'}
              style={[styles.heroSpotlight, { borderColor: borderSubtle }]}
            >
              <View style={styles.heroSpotlightHeader}>
                <IconSymbol name="sparkles" size={16} color={palette.tint} />
                <ThemedText type="defaultSemiBold" style={styles.heroSpotlightTitle} lightColor={palette.tint} darkColor={palette.tint}>
                  Tonight’s focus
                </ThemedText>
              </View>
              <ThemedText style={styles.heroSpotlightCopy}>
                {currentHeroStory.focus}
              </ThemedText>
            </ThemedView>
          </View>
        </View>

        <ThemedView
          lightColor={ribbonSurface}
          darkColor={ribbonSurface}
          style={[styles.metricRibbon, { borderColor: borderSubtle }]}
        >
          {heroMetrics.map((metric) => (
            <View key={metric.label} style={styles.metricTile}>
              <ThemedText type="subtitle" style={styles.metricValue}>
                {metric.value}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
            </View>
          ))}
        </ThemedView>
      </LinearGradient>

      <NewsletterCard
        palette={palette}
        borderColor={newsletterBorder}
        surface={newsletterSurface}
        email={newsletterEmail}
        setEmail={setNewsletterEmail}
        status={newsletterStatus}
        setStatus={setNewsletterStatus}
        onSubmit={handleSubmitNewsletter}
      />

      <SectionHeader
        title="Quick launch"
        caption="Jump straight to live dashboards"
        icon="sparkles"
        cta={{ label: 'Open command center', onPress: () => router.push('/(tabs)/command-center') }}
      />
      <View style={styles.quickPrimaryRow}>
        {primaryQuickActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route)}
            style={({ pressed }) => [
              styles.quickPrimaryCard,
              { borderColor: borderSubtle, backgroundColor: highlightSurface },
              pressed && styles.quickPrimaryPressed,
            ]}
          >
            <View style={styles.quickPrimaryHeader}>
              <ThemedView
                lightColor={quickIconSurface}
                darkColor={quickIconSurface}
                style={styles.quickPrimaryIcon}
              >
                <IconSymbol name={action.icon as ComponentProps<typeof IconSymbol>['name']} size={22} color={palette.tint} />
              </ThemedView>
              <IconSymbol name="arrow.up.right" size={18} color={palette.tint} />
            </View>
            <View style={styles.quickPrimaryBody}>
              <ThemedText type="subtitle" style={styles.quickTitle}>
                {action.title}
              </ThemedText>
              <ThemedText style={styles.quickSubtitle}>{action.subtitle}</ThemedText>
            </View>
          </Pressable>
        ))}
      </View>

      <ThemedView
        style={[styles.quickList, { borderColor: borderSubtle }]}
        lightColor={quickBadgeSurface}
        darkColor={quickBadgeSurface}
      >
        {secondaryQuickActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route)}
            style={({ pressed }) => [styles.quickListItem, pressed && styles.quickListItemPressed]}
          >
            <ThemedView
              lightColor={quickIconSurface}
              darkColor={quickIconSurface}
              style={styles.quickListIcon}
            >
              <IconSymbol name={action.icon as ComponentProps<typeof IconSymbol>['name']} size={18} color={palette.tint} />
            </ThemedView>
            <View style={styles.quickListContent}>
              <ThemedText type="defaultSemiBold" style={styles.quickListTitle}>
                {action.title}
              </ThemedText>
              <ThemedText style={styles.quickListSubtitle}>{action.subtitle}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={palette.tint} />
          </Pressable>
        ))}
      </ThemedView>

      <ContentBand
        title="Watch & Listen"
        caption="Immersive films and mission briefings"
        icon="play.rectangle.on.rectangle.fill"
        cta={{ label: 'View all documentaries', onPress: () => router.push('/documentaries') }}
        surface={bandSurface}
        borderColor={borderSubtle}
      >
        <BandSubheader title="Documentary spotlight" caption="Field storytelling from our frontline crews" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.documentaryCarousel}
        >
          {documentarySpotlight.map((feature, index) => (
            <Pressable
              key={feature.slug}
              onPress={() => handleOpenDocumentary(feature.slug)}
              style={[
                styles.documentaryCard,
                {
                  backgroundColor: featureSurface,
                  borderColor: borderSubtle,
                  marginLeft: index === 0 ? 4 : 0,
                },
              ]}
            >
              <Image source={{ uri: feature.image }} style={styles.documentaryMedia} contentFit="cover" />
              <LinearGradient
                colors={['rgba(15,23,42,0.1)', 'rgba(15,23,42,0.92)']}
                style={styles.documentaryOverlay}
              />
              <View style={styles.documentaryInfo}>
                <View style={styles.documentaryMetaRow}>
                  <View style={[styles.documentaryBadge, { backgroundColor: documentaryBadgeSurface }]}>
                    <IconSymbol name="sparkles" size={14} color={documentaryBadgeText} />
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.documentaryBadgeLabel}
                      lightColor={documentaryBadgeText}
                      darkColor={documentaryBadgeText}
                    >
                      Spotlight
                    </ThemedText>
                  </View>
                  <ThemedText
                    style={styles.documentaryDuration}
                    lightColor={documentaryDurationText}
                    darkColor={documentaryDurationText}
                  >
                    {feature.duration}
                  </ThemedText>
                </View>

                <ThemedText
                  type="subtitle"
                  style={styles.documentaryTitle}
                  lightColor="#f8fafc"
                  darkColor="#f8fafc"
                >
                  {feature.title}
                </ThemedText>
                <ThemedText
                  style={styles.documentarySummary}
                  lightColor={documentarySummaryText}
                  darkColor={documentarySummaryText}
                >
                  {feature.summary}
                </ThemedText>

                <View style={styles.documentaryTags}>
                  {feature.tags.slice(0, 2).map((tag) => (
                    <View
                      key={`${feature.slug}-${tag}`}
                      style={[styles.documentaryTag, { backgroundColor: documentaryTagSurface }]}
                    >
                      <ThemedText
                        style={styles.documentaryTagLabel}
                        lightColor={documentaryTagText}
                        darkColor={documentaryTagText}
                      >
                        {tag}
                      </ThemedText>
                    </View>
                  ))}
                </View>

                <View style={styles.documentaryAction}>
                  <IconSymbol name="play.fill" size={16} color={palette.tint} />
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.documentaryActionLabel}
                    lightColor={palette.tint}
                    darkColor={palette.tint}
                  >
                    Watch trailer
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <BandSubheader title="Audio briefings" caption="Fresh episodes straight from the field team" />
        <View style={styles.audioList}>
          {audioHighlights.map((episode) => (
            <Pressable
              key={episode.title}
              onPress={() => router.push(episode.route)}
              style={({ pressed }) => [
                styles.audioCard,
                { borderColor: borderSubtle, backgroundColor: highlightSurface },
                pressed && styles.audioCardPressed,
              ]}
            >
              <View style={styles.audioCardHeader}>
                <IconSymbol name="waveform" size={18} color={palette.tint} />
                <ThemedText style={styles.audioDuration}>{episode.duration}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.audioTitle}>
                {episode.title}
              </ThemedText>
              <ThemedText style={styles.audioBlurb}>{episode.blurb}</ThemedText>
            </Pressable>
          ))}
        </View>
      </ContentBand>

      <ContentBand
        title="On-the-ground"
        caption="Movements, dispatches, and community wins"
        icon="map.fill"
        cta={{ label: 'View protest reports', onPress: () => router.push('/protests') }}
        surface={alternateBandSurface}
        borderColor={borderSubtle}
      >
        <BandSubheader title="Protest Watch" caption="Current movements shaping policy" />
        <ThemedView
          style={[styles.panelCard, { borderColor: borderSubtle }]}
          lightColor={panelSurface}
          darkColor={panelSurface}
        >
          {protestWatchHighlights.map((protest) => (
            <Pressable
              key={protest.slug}
              onPress={() => router.push('/protests')}
              style={styles.protestRow}
            >
              <View style={styles.protestHeader}>
                <ThemedText type="subtitle" style={styles.protestRegion}>
                  {protest.region}
                </ThemedText>
                <View style={[styles.statusChip, { backgroundColor: tintedSurface }]}>
                  <IconSymbol name="dot.radiowaves.up.forward" size={14} color={palette.tint} />
                  <ThemedText style={[styles.statusLabel, { color: palette.tint }]}>{protest.status}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.protestMovement}>{protest.movement}</ThemedText>
              <ThemedText style={styles.protestUpdate}>{protest.update}</ThemedText>
              <ProgressBar value={protest.severity * 100} tint={palette.tint} />
            </Pressable>
          ))}
        </ThemedView>

        <BandSubheader title="Forward Focus" caption="Solutions worth celebrating" />
        <ThemedView
          style={[styles.forwardContainer, { borderColor: borderSubtle }]}
          lightColor={forwardSurface}
          darkColor={forwardSurface}
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
      </ContentBand>

      <ContentBand
        title="Governance & Policy"
        caption="Transparency and accountability benchmarks"
        icon="chart.bar.xaxis"
        cta={{ label: 'Explore the index', onPress: () => router.push('/governance-index') }}
        surface={bandSurface}
        borderColor={borderSubtle}
      >
        <BandSubheader title="Government Good Index" caption="Governance, transparency & trust" />
        <ThemedView
          style={[styles.indexContainer, { borderColor: borderSubtle }]}
          lightColor={panelSurface}
          darkColor={panelSurface}
        >
          {governanceSpotlight.map((entry) => (
            <Pressable
              key={entry.country}
              onPress={() => router.push('/governance-index')}
              style={styles.indexRow}
            >
              <View style={styles.indexHeader}>
                <ThemedText type="subtitle" style={styles.indexCountry}>
                  {entry.country}
                </ThemedText>
                <View style={styles.indexScoreGroup}>
                  <IconSymbol name="shield.lefthalf.filled" size={16} color={palette.tint} />
                  <ThemedText type="defaultSemiBold" style={styles.indexScore}>
                    {entry.score}
                  </ThemedText>
                </View>
              </View>
              <ProgressBar value={entry.score} tint={palette.tint} />
              <ThemedText style={styles.indexDelta}>
                {entry.change > 0 ? `▲ ${entry.change} this week` : entry.change < 0 ? `▼ ${Math.abs(entry.change)} this week` : 'Unchanged'}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ContentBand>

    </ParallaxScrollView>
  );
}

function SectionHeader({
  title,
  caption,
  icon,
  cta,
}: {
  title: string;
  caption: string;
  icon: ComponentProps<typeof IconSymbol>['name'];
  cta?: { label: string; onPress: () => void };
}) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderTop}>
        <View style={styles.sectionTitleRow}>
          <LinearGradient
            colors={palette.secondaryGradient ?? [palette.tint, palette.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionIconBadge}
          >
            <IconSymbol name={icon} size={18} color="#ffffff" />
          </LinearGradient>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {title}
          </ThemedText>
        </View>
        {cta ? (
          <Pressable onPress={cta.onPress} style={styles.sectionCta}>
            <ThemedText type="defaultSemiBold" style={[styles.sectionCtaLabel, { color: palette.tint }]}>
              {cta.label}
            </ThemedText>
            <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
          </Pressable>
        ) : null}
      </View>
      <View style={[styles.sectionAccent, { backgroundColor: palette.tint }]} />
      <ThemedText style={styles.sectionCaption}>{caption}</ThemedText>
    </View>
  );
}

function ContentBand({
  title,
  caption,
  icon,
  cta,
  surface,
  borderColor,
  children,
}: {
  title: string;
  caption: string;
  icon: ComponentProps<typeof IconSymbol>['name'];
  cta?: { label: string; onPress: () => void };
  surface: string;
  borderColor: string;
  children: ReactNode;
}) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const iconSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.06)';

  return (
    <View style={[styles.bandContainer, { backgroundColor: surface, borderColor }]}>
      <View style={styles.bandHeaderRow}>
        <View style={styles.bandHeaderLeft}>
          <ThemedView
            lightColor={iconSurface}
            darkColor={iconSurface}
            style={styles.bandIconBadge}
          >
            <IconSymbol name={icon} size={18} color={palette.tint} />
          </ThemedView>
          <View style={styles.bandTitleBlock}>
            <ThemedText type="subtitle" style={styles.bandTitle}>
              {title}
            </ThemedText>
            <ThemedText style={styles.bandCaption}>{caption}</ThemedText>
          </View>
        </View>
        {cta ? (
          <Pressable onPress={cta.onPress} style={styles.bandCta}>
            <ThemedText type="defaultSemiBold" style={[styles.bandCtaLabel, { color: palette.tint }]}>
              {cta.label}
            </ThemedText>
            <IconSymbol name="arrow.up.right" size={16} color={palette.tint} />
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

function BandSubheader({ title, caption }: { title: string; caption?: string }) {
  return (
    <View style={styles.bandSubheader}>
      <ThemedText type="defaultSemiBold" style={styles.bandSubheaderTitle}>
        {title}
      </ThemedText>
      {caption ? <ThemedText style={styles.bandSubheaderCaption}>{caption}</ThemedText> : null}
    </View>
  );
}

function NewsletterCard({
  palette,
  borderColor,
  surface,
  email,
  setEmail,
  status,
  setStatus,
  onSubmit,
}: {
  palette: (typeof Colors)['light'];
  borderColor: string;
  surface: string;
  email: string;
  setEmail: (value: string) => void;
  status: { type: 'success' | 'error'; message: string } | null;
  setStatus: (status: { type: 'success' | 'error'; message: string } | null) => void;
  onSubmit: () => void;
}) {
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.75)' : 'rgba(100, 116, 139, 0.7)';
  const statusColor = status
    ? status.type === 'success'
      ? palette.tint
      : colorScheme === 'dark'
        ? '#facc15'
        : '#b45309'
    : undefined;

  return (
    <ThemedView
      lightColor={surface}
      darkColor={surface}
      style={[styles.newsletterCard, { borderColor }]}
    >
      <View style={styles.newsletterHeader}>
        <ThemedView
          lightColor={colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.26)' : 'rgba(99, 102, 241, 0.12)'}
          darkColor={colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.26)' : 'rgba(99, 102, 241, 0.12)'}
          style={styles.newsletterIconWrap}
        >
          <IconSymbol name="envelope.open.fill" size={20} color={palette.tint} />
        </ThemedView>
        <View style={styles.newsletterTextBlock}>
          <ThemedText type="subtitle" style={styles.newsletterTitle}>
            Get the weekend insider brief
          </ThemedText>
          <ThemedText style={styles.newsletterSubtitle}>
            Receive curated investigations, accountability spotlights, and dispatch intel in your inbox.
          </ThemedText>
        </View>
      </View>
      <View style={styles.newsletterForm}>
        <TextInput
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (status) {
              setStatus(null);
            }
          }}
          placeholder="you@example.com"
          placeholderTextColor={placeholderColor}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          style={[
            styles.newsletterInput,
            {
              borderColor: colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.35)' : '#d0d5dd',
              color: palette.text,
            },
          ]}
        />
        <Pressable
          accessibilityRole="button"
          onPress={onSubmit}
          style={({ pressed }) => [
            styles.newsletterButton,
            { backgroundColor: palette.tint },
            pressed && styles.newsletterButtonPressed,
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.newsletterButtonText}>
            Join list
          </ThemedText>
          <IconSymbol name="arrow.right" size={16} color="#ffffff" />
        </Pressable>
      </View>
      {status ? (
        <View style={styles.newsletterStatusRow}>
          <IconSymbol
            name={status.type === 'success' ? 'checkmark.seal.fill' : 'exclamationmark.triangle.fill'}
            size={16}
            color={statusColor}
          />
          <ThemedText style={[styles.newsletterStatusText, { color: statusColor }]}>{status.message}</ThemedText>
        </View>
      ) : null}
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
    marginBottom: 20,
  },
  hero: {
    padding: 28,
    gap: 20,
    borderRadius: 25,
    borderWidth: 1,
  },
  heroBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBrandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroTagline: {
    fontSize: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  heroCtaCluster: {
    alignItems: 'flex-end',
    gap: 10,
  },
  heroCtaLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  heroButton: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heroButtonLabel: {
    fontSize: 15,
    letterSpacing: 0.3,
  },
  heroBody: {
    gap: 18,
  },
  heroHeadlineGroup: {
    gap: 12,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  heroStoryTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroStoryTab: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderColor: 'rgba(148, 163, 184, 0.35)',
  },
  heroStoryTabActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
  },
  heroStoryTabLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.75,
  },
  heroIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroIndicatorDot: {
    height: 8,
    borderRadius: 999,
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
  metricRibbon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 14,
  },
  metricTile: {
    minWidth: 100,
    flexGrow: 1,
    gap: 4,
  },
  metricValue: {
    fontSize: 24,
  },
  metricLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  sectionHeader: {
    marginTop: 28,
    marginBottom: 18,
    gap: 8,
  },
  sectionHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIconBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
  },
  sectionAccent: {
    width: 36,
    height: 3,
    borderRadius: 999,
  },
  sectionCaption: {
    opacity: 0.7,
    fontSize: 14,
  },
  sectionCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  sectionCtaLabel: {
    fontSize: 14,
  },
  quickPrimaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickPrimaryCard: {
    flexGrow: 1,
    minWidth: '48%',
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    gap: 14,
  },
  quickPrimaryPressed: {
    opacity: 0.88,
  },
  quickPrimaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickPrimaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickPrimaryBody: {
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
  quickList: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 6,
  },
  quickListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  quickListItemPressed: {
    opacity: 0.8,
  },
  quickListIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  quickListContent: {
    flex: 1,
    gap: 4,
  },
  quickListTitle: {
    fontSize: 16,
  },
  quickListSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
  },
  bandContainer: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 22,
    marginTop: 32,
    gap: 20,
  },
  bandHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  bandHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    flex: 1,
  },
  bandIconBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bandTitleBlock: {
    flex: 1,
    gap: 4,
  },
  bandTitle: {
    fontSize: 20,
  },
  bandCaption: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  bandCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  bandCtaLabel: {
    fontSize: 14,
  },
  bandSubheader: {
    gap: 4,
    marginTop: 12,
    marginBottom: 12,
  },
  bandSubheaderTitle: {
    fontSize: 17,
  },
  bandSubheaderCaption: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
  },
  audioList: {
    gap: 12,
  },
  audioCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  audioCardPressed: {
    opacity: 0.85,
  },
  audioCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  audioDuration: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  audioTitle: {
    fontSize: 16,
  },
  audioBlurb: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.72,
  },
  documentaryCarousel: {
    paddingBottom: 4,
    paddingRight: 24,
  },
  documentaryCard: {
    width: 280,
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  documentaryMedia: {
    ...StyleSheet.absoluteFillObject,
  },
  documentaryOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  documentaryInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    gap: 10,
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
  documentaryTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  documentarySummary: {
    fontSize: 14,
    lineHeight: 20,
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
  panelCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 20,
  },
  protestRow: {
    gap: 8,
  },
  protestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  protestRegion: {
    fontSize: 18,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
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
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  indexContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 18,
    borderWidth: 1,
  },
  indexRow: {
    gap: 6,
  },
  indexHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexCountry: {
    fontSize: 18,
  },
  indexScoreGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indexScore: {
    fontSize: 18,
  },
  indexDelta: {
    fontSize: 13,
    opacity: 0.7,
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
  newsletterCard: {
    marginTop: 20,
    marginBottom: 8,
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  newsletterHeader: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  newsletterIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsletterTextBlock: {
    flex: 1,
    gap: 6,
  },
  newsletterTitle: {
    fontSize: 18,
  },
  newsletterSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  newsletterForm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  newsletterInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  newsletterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  newsletterButtonPressed: {
    opacity: 0.85,
  },
  newsletterButtonText: {
    color: '#ffffff',
    fontSize: 15,
  },
  newsletterStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  newsletterStatusText: {
    fontSize: 13,
    flex: 1,
  },
});
