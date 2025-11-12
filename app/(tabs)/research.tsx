import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const highlightStats = [
  {
    label: 'Sample coverage',
    value: '17 spotlight countries',
    detail: 'Drawn from Transparency International’s 2023 CPI release.',
  },
  {
    label: 'Average CPI score',
    value: '72.47',
    detail: 'Mean among Governance Index spotlight countries.',
  },
  {
    label: 'Score momentum',
    value: '3 ↑ · 8 → · 6 ↓',
    detail: 'Improved, unchanged, and declining countries in the module.',
  },
];

const keyInsights = [
  {
    eyebrow: 'Finding 01',
    title: 'Regional polarization persists',
    summary:
      'Europe’s cluster of high performers keeps the global mean buoyant while Africa and the Americas trail despite reform narratives.',
    bullets: [
      '82.8 average among the five European inclusions compared with 61.0 for African peers.',
      'Reform efforts focus on beneficial ownership, procurement integrity, and digitalized oversight.',
    ],
  },
  {
    eyebrow: 'Finding 02',
    title: 'Momentum remains fragile',
    summary:
      'Only three countries recorded score gains, underscoring how difficult it is to secure durable anti-corruption advances.',
    bullets: [
      'Rwanda’s +2 increase is tied to e-procurement and service delivery upgrades.',
      'Eight countries were flat year-on-year, signalling stalled reform pipelines.',
    ],
  },
  {
    eyebrow: 'Finding 03',
    title: 'Narratives need localized framing',
    summary:
      'Stakeholder interviews highlight demand for region-specific explainers to complement aggregate dashboards inside the app.',
    bullets: [
      'Policy teams request briefs tying CPI changes to legislative timelines.',
      'Newsroom editors value quick-read context blocks for live coverage moments.',
    ],
  },
];

const methodologyHighlights = [
  {
    label: 'Data cadence',
    detail: 'Annual CPI release (January) complemented with newsroom desk research updates every quarter.',
  },
  {
    label: 'Sampling lens',
    detail: 'Spotlight countries selected for geographic balance, reform momentum, and newsroom story alignment.',
  },
  {
    label: 'Quality controls',
    detail: 'Source citations double-checked against Transparency International publications and government gazettes.',
  },
];

const timelineMilestones = [
  {
    period: 'Jan 2024',
    title: 'CPI 2023 release',
    description: 'Transparency International publishes refreshed rankings; dataset imported into the module within 48 hours.',
  },
  {
    period: 'Mar 2024',
    title: 'Regional desk reviews',
    description: 'Editorial analysts validate regional narratives with subject-matter experts and align messaging for newsroom briefs.',
  },
  {
    period: 'Jun 2024',
    title: 'Stakeholder validation',
    description: 'Policy fellows and partner NGOs review insights to ensure resonance with advocacy roadmaps.',
  },
  {
    period: 'Sep 2024',
    title: 'Product iteration',
    description: 'Design team implements refreshed layout and adds callouts for notable movers based on feedback.',
  },
];

const applicationUseCases = [
  {
    title: 'Editorial planning',
    description:
      'Identifies high-impact governance stories and supplies anchor data for weekend long-reads and newsletter segments.',
  },
  {
    title: 'Policy briefings',
    description:
      'Provides a conversation starter for stakeholder meetings, particularly with regional think tanks and donor roundtables.',
  },
  {
    title: 'Product partnerships',
    description:
      'Illustrates how the news app packages governance intelligence, supporting sponsorship pitches and content syndication deals.',
  },
];

const paperSections = [
  {
    title: 'Abstract',
    body: [
      'This paper examines governance performance among 17 spotlight countries drawn from the Transparency International 2023 Corruption Perceptions Index (CPI) as represented in the Governance Index module of the Expo-based news application. Using summary statistics generated from the curated dataset, we evaluate regional score distributions, identify standout performers, and contextualize year-over-year score movements. Findings show that the highlighted sample averages 72.47 points, with European and Oceania entries leading in perceived integrity while a limited number of positive movers underscore the difficulty of sustaining anti-corruption gains.',
    ],
  },
  {
    title: '1. Introduction',
    body: [
      'Transparency International’s CPI remains a global benchmark for perceived public-sector integrity. The news application’s Governance Index screen foregrounds select nations to communicate both cross-regional comparisons and narrative desk notes about institutional reforms or corruption risks. This paper analyzes the embedded dataset to draw empirical insights that can enhance editorial storytelling within the application experience.',
    ],
  },
  {
    title: '2. Data and Methods',
    subsections: [
      {
        subtitle: '2.1 Data Source',
        body: [
          'The dataset comprises 17 country records, each specifying CPI score, global rank, regional classification, year-over-year change, and qualitative briefing notes tied to the 2023 CPI release on 30 January 2024. The application positions these records within a parallax narrative layout that introduces CPI coverage, presents aggregated statistics, and renders country cards with change labels and source citations.',
        ],
      },
      {
        subtitle: '2.2 Analytical Approach',
        body: [
          'To quantify the information presented by the module, we parsed the dataset to compute overall and regional averages, tally directional score movements, and flag the largest positive and negative change values. These calculations supplement the interface’s built-in aggregate counts by providing region-level summaries and identifying extreme movers for deeper editorial emphasis.',
        ],
      },
    ],
  },
  {
    title: '3. Results',
    subsections: [
      {
        subtitle: '3.1 Global Distribution',
        body: [
          'The highlighted sample yields an overall CPI mean of 72.47, reflecting the application’s focus on upper- and mid-tier performers across regions. Eight countries registered no score change from 2022, while six declined and three improved, emphasizing the CPI’s stagnation theme even among comparatively strong performers.',
        ],
      },
      {
        subtitle: '3.2 Regional Leaders',
        body: [
          'Europe contributes five entries—Denmark, Finland, Norway, Sweden, and France—averaging 82.8, supported by narratives about whistleblower protection, lobbying oversight, and infrastructure transparency reforms. Oceania’s lone representative, New Zealand, scores 85 but is flagged for a two-point decline linked to political fundraising probes. Asia’s trio—Singapore, the United Arab Emirates, and South Korea—averages 71.0, with attention to asset recovery, corporate transparency rules, and disclosure reforms. The Americas’ average stands at 67.4 across Canada, Uruguay, the United States, Chile, and Costa Rica, balancing narratives of beneficial ownership registries against procurement scandals. Africa’s three spotlight countries—Seychelles, Botswana, and Rwanda—average 61.0, showcasing institutional strengthening efforts alongside concerns about state-owned enterprise oversight.',
        ],
      },
      {
        subtitle: '3.3 Notable Movers',
        body: [
          'Rwanda posts the largest gain (+2) credited to digitalized public services and tender monitoring, while New Zealand records the steepest decline (-2) amid fundraising investigations. These extremes provide clear candidates for editorial callouts in the application’s “desk notes” and change labels, reinforcing the interface’s emphasis on dynamics rather than static rankings.',
        ],
      },
    ],
  },
  {
    title: '4. Discussion',
    body: [
      'The Governance Index module succeeds in blending quantitative indicators with qualitative briefings, offering readers a concise yet data-backed snapshot of governance trends. Regional averages highlight persistent integrity gaps between higher-scoring Northern jurisdictions and peers in the Americas and Africa, despite isolated reform progress. The modest number of positive movers suggests that maintaining or improving CPI scores demands sustained institutional investments, a nuance the application surfaces through its narrative briefs.',
    ],
  },
  {
    title: '5. Conclusion',
    body: [
      'Analyzing the Governance Index dataset reveals that the application curates a cross-regional set of governance exemplars and cautionary tales, with Europe and Oceania leading in perceived integrity and only a handful of countries achieving score gains. These insights can guide future editorial updates, such as expanding coverage to regions with emerging reforms or integrating comparative visuals that emphasize persistent governance challenges.',
    ],
  },
  {
    title: 'References',
    body: [
      'Transparency International. (2024). Corruption Perceptions Index 2023. As cited in the Governance Index module’s dataset and source attributions.',
    ],
  },
];

export default function ResearchScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : '#ffffff';
  const softSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.65)';
  const divider = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : 'rgba(15, 23, 42, 0.08)';
  const accentText = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';
  const heroHighlightSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(248, 250, 252, 0.28)';
  const heroHighlightBorder = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.32)' : 'rgba(248, 250, 252, 0.6)';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
            }}
            style={styles.heroBackground}
            contentFit="cover"
          />
          <LinearGradient
            colors={palette.secondaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBackdrop}
          />
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.2)', 'rgba(15, 23, 42, 0.85)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.heroScrim}
          />
          <View pointerEvents="none" style={styles.heroDecorOrb} />
          <View pointerEvents="none" style={styles.heroDecorBar} />
          <View style={styles.heroOverlay}>
            <ThemedText
              style={styles.heroEyebrow}
              lightColor="rgba(248, 250, 252, 0.85)"
              darkColor="rgba(241, 245, 249, 0.85)">
              Governance Index Research Brief · 2025
            </ThemedText>
            <ThemedText type="title" style={styles.heroTitle} lightColor="#f8fafc" darkColor="#f8fafc">
              Regional dynamics in the 2023 Corruption Perceptions Index
            </ThemedText>
            <ThemedText
              style={styles.heroSubtitle}
              lightColor="rgba(248, 250, 252, 0.82)"
              darkColor="rgba(226, 232, 240, 0.9)">
              A data-backed narrative explaining how the Governance Index module interprets Transparency International’s 2023 CPI
              release for newsroom stakeholders and policy-focused readers.
            </ThemedText>
            <View style={styles.heroHighlightsRow}>
              {highlightStats.map((item) => (
                <View
                  key={item.label}
                  style={[styles.heroHighlight, { backgroundColor: heroHighlightSurface, borderColor: heroHighlightBorder }]}
                >
                  <ThemedText style={styles.heroHighlightValue} lightColor="#f8fafc" darkColor="#f8fafc">
                    {item.value}
                  </ThemedText>
                  <ThemedText
                    style={styles.heroHighlightLabel}
                    lightColor="rgba(248, 250, 252, 0.75)"
                    darkColor="rgba(226, 232, 240, 0.75)">
                    {item.label}
                  </ThemedText>
                  <ThemedText
                    style={styles.heroHighlightDetail}
                    lightColor="rgba(248, 250, 252, 0.7)"
                    darkColor="rgba(226, 232, 240, 0.75)">
                    {item.detail}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>
      }>
      <ThemedView
        style={[styles.section, styles.visionCard, { borderColor: divider }]}
        lightColor={cardSurface}
        darkColor={cardSurface}>
        <View style={[styles.sectionBadge, { backgroundColor: softSurface }]}>
          <ThemedText style={[styles.sectionBadgeText, { color: accentText }]}>Research Overview</ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Regional Dynamics in the 2023 Corruption Perceptions Index: Insights from the Governance Index Module
        </ThemedText>
        <ThemedText style={styles.sectionCopy}>
          A newsroom-ready briefing that mirrors the long-form paper, presenting the Governance Index module’s insights in a format
          optimised for on-device reading without sacrificing analytical depth.
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[styles.section, styles.keyInsights, { borderColor: divider }]}
        lightColor={cardSurface}
        darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Key findings at a glance
        </ThemedText>
        <View style={styles.insightGrid}>
          {keyInsights.map((insight) => (
            <ThemedView
              key={insight.title}
              style={[styles.insightCard, { backgroundColor: softSurface }]}
              lightColor={softSurface}
              darkColor={softSurface}>
              <ThemedText style={styles.insightEyebrow}>{insight.eyebrow}</ThemedText>
              <ThemedText type="subtitle" style={styles.insightTitle}>
                {insight.title}
              </ThemedText>
              <ThemedText style={styles.sectionCopy}>{insight.summary}</ThemedText>
              <View style={styles.bulletList}>
                {insight.bullets.map((point) => (
                  <View key={point.slice(0, 32)} style={styles.bulletRow}>
                    <View style={[styles.bulletDot, { backgroundColor: palette.accent }]} />
                    <ThemedText style={styles.bulletText}>{point}</ThemedText>
                  </View>
                ))}
              </View>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView
        style={[styles.section, styles.methodologyCard, { borderColor: divider }]}
        lightColor={cardSurface}
        darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Methodology snapshot
        </ThemedText>
        <View style={styles.methodologyGrid}>
          {methodologyHighlights.map((item) => (
            <View key={item.label} style={[styles.methodologyItem, { borderColor: divider }]}> 
              <ThemedText style={[styles.methodologyLabel, { color: accentText }]}>{item.label}</ThemedText>
              <ThemedText style={styles.sectionCopy}>{item.detail}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView
        style={[styles.section, styles.timelineSection, { borderColor: divider }]}
        lightColor={cardSurface}
        darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Research production timeline
        </ThemedText>
        <View style={styles.timeline}>
          {timelineMilestones.map((milestone, index) => (
            <View key={milestone.title} style={styles.timelineItem}>
              <View style={styles.timelineMarkerContainer}>
                <View style={[styles.timelineMarker, { borderColor: palette.accent }]} />
                {index !== timelineMilestones.length - 1 && <View style={[styles.timelineConnector, { borderColor: divider }]} />}
              </View>
              <View style={styles.timelineContent}>
                <ThemedText style={[styles.timelinePeriod, { color: accentText }]}>{milestone.period}</ThemedText>
                <ThemedText type="subtitle" style={styles.timelineTitle}>
                  {milestone.title}
                </ThemedText>
                <ThemedText style={styles.sectionCopy}>{milestone.description}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView
        style={[styles.section, styles.useCaseSection, { borderColor: divider }]}
        lightColor={cardSurface}
        darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          How stakeholders apply these insights
        </ThemedText>
        <View style={styles.useCaseGrid}>
          {applicationUseCases.map((useCase) => (
            <View key={useCase.title} style={[styles.useCaseCard, { borderColor: divider }]}> 
              <ThemedText type="subtitle" style={styles.useCaseTitle}>
                {useCase.title}
              </ThemedText>
              <ThemedText style={styles.sectionCopy}>{useCase.description}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {paperSections.map((section) => (
        <ThemedView
          key={section.title}
          style={[styles.section, styles.paperSection, { borderColor: divider }]}
          lightColor={cardSurface}
          darkColor={cardSurface}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {section.title}
          </ThemedText>
          {section.body?.map((paragraph) => (
            <ThemedText key={paragraph.slice(0, 32)} style={styles.sectionCopy}>
              {paragraph}
            </ThemedText>
          ))}
          {section.subsections && (
            <View style={styles.subsectionList}>
              {section.subsections.map((subsection) => (
                <View key={subsection.subtitle} style={styles.subsection}>
                  <ThemedText type="subtitle" style={styles.subsectionTitle}>
                    {subsection.subtitle}
                  </ThemedText>
                  {subsection.body.map((paragraph) => (
                    <ThemedText key={paragraph.slice(0, 32)} style={styles.sectionCopy}>
                      {paragraph}
                    </ThemedText>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    flex: 1,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  heroBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    flex: 1,
    padding: 32,
    justifyContent: 'flex-end',
    gap: 20,
  },
  heroDecorOrb: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(148, 163, 184, 0.25)',
    top: -60,
    right: -80,
  },
  heroDecorBar: {
    position: 'absolute',
    width: 260,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    bottom: 40,
    left: -80,
    transform: [{ rotate: '-12deg' }],
  },
  heroEyebrow: {
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '800',
  },
  heroSubtitle: {
    fontSize: 18,
    lineHeight: 28,
  },
  heroHighlightsRow: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  heroHighlight: {
    maxWidth: 240,
    gap: 6,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  heroHighlightValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  heroHighlightLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  heroHighlightDetail: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
  },
  section: {
    gap: 16,
    padding: 24,
    borderRadius: 24,
  },
  keyInsights: {
    borderWidth: 1,
  },
  visionCard: {
    borderWidth: 1,
  },
  sectionBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sectionBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 32,
  },
  sectionCopy: {
    fontSize: 17,
    lineHeight: 26,
  },
  insightGrid: {
    gap: 20,
  },
  insightCard: {
    gap: 12,
    borderRadius: 20,
    padding: 20,
  },
  insightEyebrow: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  insightTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  bulletList: {
    gap: 10,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  methodologyCard: {
    borderWidth: 1,
  },
  methodologyGrid: {
    gap: 16,
  },
  methodologyItem: {
    gap: 8,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  methodologyLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  timelineSection: {
    borderWidth: 1,
  },
  timeline: {
    gap: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineMarkerContainer: {
    alignItems: 'center',
  },
  timelineMarker: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 3,
  },
  timelineConnector: {
    flex: 1,
    width: 1,
    borderLeftWidth: 1,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
    gap: 6,
  },
  timelinePeriod: {
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  timelineTitle: {
    fontSize: 20,
    lineHeight: 24,
  },
  useCaseSection: {
    borderWidth: 1,
  },
  useCaseGrid: {
    gap: 16,
  },
  useCaseCard: {
    gap: 8,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  useCaseTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  grid: {
    gap: 24,
  },
  paperSection: {
    gap: 20,
    borderRadius: 28,
    borderWidth: 1,
  },
  subsectionList: {
    gap: 16,
  },
  subsection: {
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  subsectionTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
});
