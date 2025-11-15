import type { ComponentProps } from 'react';
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

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const borderSubtle = colorScheme === 'dark' ? palette.stroke ?? 'rgba(148, 163, 184, 0.25)' : palette.stroke ?? '#e2e8f0';
  const highlightSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.72)' : palette.card ?? '#ffffff';
  const tintedSurface = colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.12)';
  const heroBadgeForeground = colorScheme === 'dark' ? '#f8fafc' : palette.background;
  const heroBadgeBackground = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.88)' : '#ffffff';
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
  const activeHeadline = heroHeadlines[activeHeadlineIndex];
  const primaryActions = quickActions.filter((action) => action.priority === 'primary');
  const secondaryActions = quickActions.filter((action) => action.priority === 'secondary');
  const tertiarySurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.12)' : '#f1f5f9';

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

      
    </ParallaxScrollView>
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

