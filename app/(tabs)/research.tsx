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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#020617' }}
      headerImage={
        <LinearGradient colors={palette.gradient} style={styles.heroGradient}>
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
                <View key={item.label} style={styles.heroHighlight}>
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
        </LinearGradient>
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
  heroGradient: {
    flex: 1,
    padding: 32,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    gap: 16,
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
  },
  heroHighlight: {
    maxWidth: 240,
    gap: 4,
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
