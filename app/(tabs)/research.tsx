import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const researchSpotlights = [
  {
    title: 'Programmable Cellular Therapies for Autoimmune Reset',
    institution: 'Helix Institute · Broad · ETH Zürich',
    summary:
      'Engineering adaptive T-cell libraries that can be updated in vivo to permanently recalibrate immune responses in lupus and multiple sclerosis.',
    status: 'Phase II human trials – adaptive dosage within 48 hours',
    impact: 'Projected to reduce relapse rates by 63% across three autoimmune disorders.',
  },
  {
    title: 'Zero-Carbon Ammonia via Quantum-Accelerated Catalysis',
    institution: 'Aurora Fusion Lab · MIT Energy Initiative',
    summary:
      'Deploying tunable quantum dots that drop the Haber-Bosch activation threshold by 18%, enabling distributed ammonia production powered by offshore wind.',
    status: 'Pilot plant commissioning – Q3 2025',
    impact: 'Unlocks 42% emission reduction across global fertilizer supply chains.',
  },
  {
    title: 'Sentinel AI for Ocean Biodiversity Recovery',
    institution: 'Blue Horizon Observatory · NOAA · DeepMind Science',
    summary:
      'Multimodal reef twins model coral resilience, predicting regenerative interventions with 94% accuracy and guiding autonomous reef printers.',
    status: 'Field deployment across 11 reef sanctuaries',
    impact: 'Restores 1.8M m² of reef habitat in under 24 months.',
  },
];

const innovationSignals = [
  {
    label: 'Translational velocity',
    value: '6.3 months',
    detail: 'Average time from pre-print to first clinical/field deployment across portfolio.',
  },
  {
    label: 'Cross-discipline lift',
    value: '4.8×',
    detail: 'Multiplier on breakthrough probability when pairing compute teams with wet labs.',
  },
  {
    label: 'Impact-weighted ROI',
    value: '17.2%',
    detail: 'Annualised value combining climate, health, and resilience outcomes.',
  },
];

const acceleratorStreams = [
  {
    name: 'Bioadaptive Futures',
    focus: 'Regenerative medicine, organ intelligence, programmable immunity.',
    cadence: 'Clinical translation studio · 18-month runway',
    anchors: ['Helix Institute', 'Novo Nordisk Foundation', 'Open Cell Commons'],
  },
  {
    name: 'Planetary Systems Lab',
    focus: 'Decarbonised supply chains, climate resilience twins, circular agriculture.',
    cadence: 'Impact acceleration pods · 12-month runway',
    anchors: ['Aurora Fusion Lab', 'Global Resilience Council', 'ETH Energy Nexus'],
  },
  {
    name: 'Civic Intelligence Forge',
    focus: 'AI governance, autonomous monitoring, networked social research.',
    cadence: 'Policy-to-product sprint · 9-month runway',
    anchors: ['DeepMind Science', 'MIT Media Lab', 'UNESCO CivicTech'],
  },
];

const fundingNarratives = [
  {
    title: 'Ready-to-scale infrastructure',
    copy:
      'Each research stream ships with fabrication partners, regulatory playbooks, and distribution coalitions—funding accelerates execution, not admin.',
  },
  {
    title: 'Audit-grade transparency',
    copy:
      'Every experiment, dataset, and deployment is logged through our immutable impact ledger, delivering investor-grade reporting in real time.',
  },
  {
    title: 'Coalition-first momentum',
    copy:
      'We co-fund with sovereign labs, Fortune 100 sustainability arms, and philanthropic moonshot funds to derisk capital and amplify breakthroughs.',
  },
];

const dueDiligenceProtocols = [
  {
    phase: 'Exploration window',
    focus: 'Immersive lab residency, ethics council intake, interoperability mapping.',
    validation:
      '45-day sprint with reproducibility audits across partner labs, red-teaming safety cases alongside independent reviewers.',
  },
  {
    phase: 'Deployment rehearsal',
    focus: 'Pilot-scale manufacturing, supply assurance, community impact modelling.',
    validation:
      'Scenario stress-tests with regulators, procurement partners, and affected municipalities before green-light.',
  },
  {
    phase: 'Capital activation',
    focus: 'Structured co-investment syndicates, milestone-based disbursement, open impact ledgering.',
    validation:
      'Live telemetry on impact KPIs, quarterly governance summits, and transparent variance reporting for funders.',
  },
];

const fieldDeploymentOutcomes = [
  {
    region: 'Mekong River Basin',
    result: '52% nutrient runoff reduction within 8 months',
    highlight:
      'Planetary Systems Lab deployed quantum-activated catalysts through local cooperatives, halving fertiliser waste while boosting farmer margins.',
  },
  {
    region: 'São Paulo Immunology Network',
    result: 'Autoimmune relapse hospitalisations down 38%',
    highlight:
      'Programmable Cellular Therapies cohort integrated with public hospitals, supported by adaptive dosage protocols in the city’s digital health spine.',
  },
  {
    region: 'Coral Triangle Coalition',
    result: '4.1M reef organisms monitored in real time',
    highlight:
      'Sentinel AI mesh network fuses satellite, acoustic, and diver telemetry—feeding interventions that restored keystone coral cover above 70%.',
  },
];

const knowledgeNetwork = [
  {
    label: '72 partner labs',
    detail: 'From regenerative biotech to climate systems modelling, aligned on open science standards.',
  },
  {
    label: '11 regulatory sandboxes',
    detail: 'Cross-border compliance fast-tracked with agencies in the EU, Latin America, and APAC.',
  },
  {
    label: '36 civic alliances',
    detail: 'Community foundations and municipal coalitions anchoring responsible deployment.',
  },
];

export default function ResearchScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : '#ffffff';
  const softSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.65)';
  const divider = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.25)' : 'rgba(15, 23, 42, 0.08)';
  const accentText = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';
  const timelineAccent = colorScheme === 'dark' ? 'rgba(94, 234, 212, 0.65)' : 'rgba(13, 148, 136, 0.6)';

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
              Timeline Intelligence Research Bureau · 2025
            </ThemedText>
            <ThemedText type="title" style={styles.heroTitle} lightColor="#f8fafc" darkColor="#f8fafc">
              Funding-ready breakthroughs that rebuild the world
            </ThemedText>
            <ThemedText
              style={styles.heroSubtitle}
              lightColor="rgba(248, 250, 252, 0.82)"
              darkColor="rgba(226, 232, 240, 0.9)">
              From quantum catalysis to regenerative medicine, explore the programs already changing policy rooms, boardrooms, and
              frontline communities.
            </ThemedText>
            <View style={styles.heroHighlightsRow}>
              <View style={styles.heroHighlight}>
                <ThemedText style={styles.heroHighlightValue} lightColor="#f8fafc" darkColor="#f8fafc">
                  $480M
                </ThemedText>
                <ThemedText
                  style={styles.heroHighlightLabel}
                  lightColor="rgba(248, 250, 252, 0.75)"
                  darkColor="rgba(226, 232, 240, 0.75)">
                  Co-invested alongside global partners
                </ThemedText>
              </View>
              <View style={styles.heroHighlight}>
                <ThemedText style={styles.heroHighlightValue} lightColor="#f8fafc" darkColor="#f8fafc">
                  18
                </ThemedText>
                <ThemedText
                  style={styles.heroHighlightLabel}
                  lightColor="rgba(248, 250, 252, 0.75)"
                  darkColor="rgba(226, 232, 240, 0.75)">
                  Active flagship research programs
                </ThemedText>
              </View>
            </View>
          </View>
        </LinearGradient>
      }>
      <ThemedView style={[styles.section, styles.visionCard]} lightColor={cardSurface} darkColor={cardSurface}>
        <View style={[styles.sectionBadge, { backgroundColor: softSurface }]}> 
          <ThemedText style={[styles.sectionBadgeText, { color: accentText }]}>Investment Thesis</ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          We fund research that compounds humanity’s resilience
        </ThemedText>
        <ThemedText style={styles.sectionCopy}>
          Our bureau tracks 900+ labs and skunkworks, curating the teams that bridge bold discovery with deployable infrastructure. Each
          spotlighted program below has secured ethical review, regulatory alignment, and go-to-market pathways. Your capital accelerates
          impact, not bureaucracy.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Latest breakthrough dossiers
          </ThemedText>
          <View style={[styles.sectionBadge, { backgroundColor: softSurface }]}> 
            <ThemedText style={[styles.sectionBadgeText, { color: accentText }]}>Updated weekly</ThemedText>
          </View>
        </View>
        <View style={styles.grid}>
          {researchSpotlights.map((item) => (
            <ThemedView
              key={item.title}
              style={[styles.card, { borderColor: divider }]}
              lightColor={cardSurface}
              darkColor={cardSurface}>
              <View style={styles.cardHeader}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80',
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.cardTitleBlock}>
                  <ThemedText type="subtitle" style={styles.cardTitle}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.cardInstitution}>{item.institution}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardSummary}>{item.summary}</ThemedText>
              <View style={[styles.cardDivider, { backgroundColor: divider }]} />
              <View style={styles.cardFooter}>
                <View style={[styles.pill, { backgroundColor: softSurface }]}> 
                  <ThemedText style={[styles.pillText, { color: accentText }]}>{item.status}</ThemedText>
                </View>
                <ThemedText style={styles.impactCopy}>{item.impact}</ThemedText>
              </View>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.section, styles.signalPanel]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Momentum signals we monitor for investors
        </ThemedText>
        <View style={styles.metricsRow}>
          {innovationSignals.map((metric) => (
            <View
              key={metric.label}
              style={[styles.metricCard, { borderColor: divider, backgroundColor: softSurface }]}
            >
              <ThemedText style={[styles.metricValue, { color: accentText }]}>{metric.value}</ThemedText>
              <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
              <ThemedText style={styles.metricDetail}>{metric.detail}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Accelerator streams primed for co-investment
        </ThemedText>
        <View style={styles.grid}>
          {acceleratorStreams.map((stream) => (
            <ThemedView
              key={stream.name}
              style={[styles.card, styles.streamCard, { borderColor: divider }]}
              lightColor={cardSurface}
              darkColor={cardSurface}>
              <View style={[styles.sectionBadge, styles.streamBadge, { backgroundColor: softSurface }]}> 
                <ThemedText style={[styles.sectionBadgeText, { color: accentText }]}>Pipeline</ThemedText>
              </View>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {stream.name}
              </ThemedText>
              <ThemedText style={styles.cardSummary}>{stream.focus}</ThemedText>
              <View style={[styles.cardDivider, { backgroundColor: divider }]} />
              <ThemedText style={styles.metricLabel}>{stream.cadence}</ThemedText>
              <View style={styles.anchorRow}>
                {stream.anchors.map((anchor) => (
                  <View key={anchor} style={[styles.pill, { backgroundColor: softSurface }]}> 
                    <ThemedText style={[styles.pillText, { color: accentText }]}>{anchor}</ThemedText>
                  </View>
                ))}
              </View>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.section, styles.timelinePanel]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Due diligence we run before capital lands
        </ThemedText>
        <View style={styles.timelineList}>
          {dueDiligenceProtocols.map((item) => (
            <View key={item.phase} style={[styles.timelineItem, { borderLeftColor: timelineAccent }]}>
              <View style={styles.timelineHeader}>
                <ThemedText type="subtitle" style={styles.timelinePhase}>
                  {item.phase}
                </ThemedText>
                <ThemedText style={styles.timelineFocus}>{item.focus}</ThemedText>
              </View>
              <ThemedText style={styles.timelineValidation}>{item.validation}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Field deployment outcomes from our portfolio
          </ThemedText>
          <View style={[styles.sectionBadge, { backgroundColor: softSurface }]}>
            <ThemedText style={[styles.sectionBadgeText, { color: accentText }]}>Verified annually</ThemedText>
          </View>
        </View>
        <View style={styles.grid}>
          {fieldDeploymentOutcomes.map((outcome) => (
            <ThemedView
              key={outcome.region}
              style={[styles.card, styles.outcomeCard, { borderColor: divider }]}
              lightColor={cardSurface}
              darkColor={cardSurface}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {outcome.region}
              </ThemedText>
              <ThemedText style={styles.outcomeResult}>{outcome.result}</ThemedText>
              <ThemedText style={styles.cardSummary}>{outcome.highlight}</ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.section, styles.signalPanel]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Our coalition at a glance
        </ThemedText>
        <View style={styles.metricsRow}>
          {knowledgeNetwork.map((node) => (
            <View
              key={node.label}
              style={[styles.metricCard, styles.networkCard, { borderColor: divider, backgroundColor: softSurface }]}
            >
              <ThemedText style={[styles.metricValue, { color: accentText }]}>{node.label}</ThemedText>
              <ThemedText style={styles.metricDetail}>{node.detail}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.section, styles.closingPanel]} lightColor={cardSurface} darkColor={cardSurface}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Why partners choose Timeline Intelligence
        </ThemedText>
        <View style={styles.grid}>
          {fundingNarratives.map((item) => (
            <View key={item.title} style={[styles.narrativeCard, { borderColor: divider }]}> 
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.cardSummary}>{item.copy}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
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
    maxWidth: 220,
  },
  heroHighlightValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  heroHighlightLabel: {
    fontSize: 14,
    lineHeight: 20,
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
  card: {
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  cardTitleBlock: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  cardInstitution: {
    fontSize: 14,
    opacity: 0.8,
  },
  cardSummary: {
    fontSize: 15,
    lineHeight: 24,
  },
  cardDivider: {
    height: 1,
  },
  cardFooter: {
    gap: 12,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  impactCopy: {
    fontSize: 14,
    lineHeight: 22,
  },
  signalPanel: {
    gap: 24,
    borderRadius: 28,
    borderWidth: 1,
  },
  timelinePanel: {
    gap: 24,
    borderWidth: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  metricCard: {
    flexBasis: '30%',
    minWidth: 200,
    gap: 12,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  metricDetail: {
    fontSize: 14,
    lineHeight: 22,
  },
  streamCard: {
    gap: 20,
  },
  streamBadge: {
    marginBottom: -4,
  },
  anchorRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  timelineList: {
    gap: 16,
  },
  timelineItem: {
    gap: 12,
    borderLeftWidth: 3,
    paddingLeft: 16,
  },
  timelineHeader: {
    gap: 6,
  },
  timelinePhase: {
    fontSize: 18,
    lineHeight: 24,
  },
  timelineFocus: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  timelineValidation: {
    fontSize: 15,
    lineHeight: 24,
  },
  closingPanel: {
    gap: 24,
    borderWidth: 1,
  },
  narrativeCard: {
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  outcomeCard: {
    gap: 12,
  },
  outcomeResult: {
    fontSize: 18,
    fontWeight: '700',
  },
  networkCard: {
    minWidth: 220,
  },
});
