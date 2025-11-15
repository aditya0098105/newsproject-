import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type HeroHighlight = {
  label: string;
  value: string;
  icon: IconSymbolName;
};

type FeaturedSeries = {
  title: string;
  publisher: string;
  tagline: string;
  cadence: string;
  runtime: string;
  focusAreas: string[];
  url: string;
  image: string;
  banner: string;
};

type LatestEpisode = {
  show: string;
  title: string;
  summary: string;
  runtime: string;
  releaseDate: string;
  url: string;
  image: string;
};

const heroHighlights: HeroHighlight[] = [
  { label: 'Curated science shows', value: '8 programs', icon: 'rectangle.stack.fill' },
  { label: 'Fresh episodes tracked', value: '24 this week', icon: 'waveform.path.ecg' },
  { label: 'Runtime library', value: '38 hr 12 min', icon: 'clock.fill' },
];

const quickSpotlights = [
  {
    title: 'The Daily',
    description: 'The New York Times reporters unpack the biggest stories with on-the-ground context and interviews.',
    image:
      'https://static01.nyt.com/images/2019/05/01/podcasts/the-daily-album-art/the-daily-album-art-superJumbo-v3.jpg',
    url: 'https://www.nytimes.com/column/the-daily',
  },
  {
    title: 'Today, Explained',
    description: 'Vox journalists break down the news with expert voices and vivid explainers every weekday.',
    image:
      'https://content.production.cdn.art19.com/images/28/74/21/28742151-9daa-4f5c-a0a9-0f72e0c127fd/6d686293-9490-11e8-bb7a-b7f3b9a3c6b9/TodayExplained2024.jpg',
    url: 'https://www.vox.com/today-explained-podcast',
  },
  {
    title: 'Up First',
    description: 'Start the day with NPR’s concise headlines, field reporting, and timely conversations.',
    image:
      'https://media.npr.org/assets/img/2023/06/29/upfirst_podcasttile_sq-86a4f80ac5712ad0374d783b617c6097785f4c4a.jpg',
    url: 'https://www.npr.org/podcasts/510318/up-first',
  },
];

const featuredSeries: FeaturedSeries[] = [
  {
    title: "NASA's Curious Universe",
    publisher: 'NASA',
    tagline: 'Travel alongside mission specialists and pilots as they decode discoveries from our solar system and beyond.',
    cadence: 'New stories every other Tuesday',
    runtime: '28 – 42 min',
    focusAreas: ['Deep space missions', 'Human spaceflight diaries', 'Planetary science explainers'],
    url: 'https://www.nasa.gov/podcasts/nasas-curious-universe/',
    image:
      'https://www.nasa.gov/wp-content/uploads/2020/06/curious-universe-podcast.jpg',
    banner:
      'https://www.nasa.gov/wp-content/uploads/2023/06/ncu-season5-tile.jpg',
  },
  {
    title: 'Science Vs',
    publisher: 'Gimlet / Spotify Studios',
    tagline: 'Evidence-first audio journalism that pits facts against popular fads, conspiracies, and cultural myths.',
    cadence: 'Weekly on Thursdays',
    runtime: '35 – 45 min',
    focusAreas: ['Health & climate investigations', 'Data-backed myth busting', 'Expert-led interviews'],
    url: 'https://open.spotify.com/show/2VRS1IJCTn2NtKojcDvrxK',
    image:
      'https://i.scdn.co/image/ab6765630000ba8a0c606b3316d0e6f2fa14de3f',
    banner:
      'https://i.scdn.co/image/ab6765630000ba8a0c606b3316d0e6f2fa14de3f',
  },
  {
    title: 'Radiolab',
    publisher: 'WNYC Studios',
    tagline: 'Award-winning documentary storytelling that blends narrative curiosity with cutting-edge scientific research.',
    cadence: 'Weekly drops',
    runtime: '45 – 60 min',
    focusAreas: ['Physics and biology', 'Society & ethics', 'Sound-rich storytelling'],
    url: 'https://www.wnycstudios.org/podcasts/radiolab',
    image:
      'https://media.wnyc.org/i/1200/900/l/80/1/Radiolab_Podcast_Thumbnail_2023.png',
    banner:
      'https://media.wnyc.org/i/3000/3000/l/80/1/Radiolab_Podcast_Thumbnail_2023.png',
  },
  {
    title: 'Short Wave',
    publisher: 'NPR',
    tagline: 'Daily bursts of surprising science, decoded with NPR’s team of reporters and guest researchers.',
    cadence: 'Weekdays at 10:00 ET',
    runtime: '12 – 15 min',
    focusAreas: ['Space & physics', 'Climate frontiers', 'Human biology insights'],
    url: 'https://www.npr.org/podcasts/510351/short-wave',
    image:
      'https://media.npr.org/assets/img/2023/09/12/shortwave_template_3000x3000_custom-4f18ddac188f1114fab7196e1873efa0a154266e.jpg',
    banner:
      'https://media.npr.org/assets/img/2023/09/12/shortwave_template_3000x3000_custom-4f18ddac188f1114fab7196e1873efa0a154266e.jpg',
  },
];

const latestEpisodes: LatestEpisode[] = [
  {
    show: 'The Daily',
    title: 'How the Supreme Court reshaped immigration enforcement',
    summary:
      'The New York Times legal reporters unpack the justices’ latest ruling and how it affects cases on the ground.',
    runtime: '24 min',
    releaseDate: 'June 25, 2024',
    url: 'https://www.nytimes.com/2024/06/25/podcasts/the-daily-immigration-supreme-court.html',
    image:
      'https://static01.nyt.com/images/2019/05/01/podcasts/the-daily-album-art/the-daily-album-art-superJumbo-v3.jpg',
  },
  {
    show: 'Today, Explained',
    title: 'The chips war goes global',
    summary:
      'Vox’s tech team explains the race to control semiconductor supply chains — and what it means for AI and geopolitics.',
    runtime: '27 min',
    releaseDate: 'June 24, 2024',
    url: 'https://www.vox.com/podcasts/2024/06/24/24184039/today-explained-ai-chips-trade-war',
    image:
      'https://content.production.cdn.art19.com/images/28/74/21/28742151-9daa-4f5c-a0a9-0f72e0c127fd/6d686293-9490-11e8-bb7a-b7f3b9a3c6b9/TodayExplained2024.jpg',
  },
  {
    show: 'Radiolab',
    title: 'The Wordless Yet',
    summary:
      'Jad Abumrad and Lulu Miller trace the search for language beyond words — from signed conversations to AI translations.',
    runtime: '52 min',
    releaseDate: 'June 19, 2024',
    url: 'https://www.wnycstudios.org/podcasts/radiolab/articles/wordless-yet',
    image:
      'https://media.wnyc.org/i/1200/900/l/80/1/Radiolab_Podcast_Thumbnail_2023.png',
  },
  {
    show: 'Science Vs',
    title: 'PFAS: The fight to clean up forever chemicals',
    summary:
      'Host Wendy Zukerman digs into the lawsuits, research, and regulation surrounding PFAS contamination.',
    runtime: '39 min',
    releaseDate: 'June 13, 2024',
    url: 'https://open.spotify.com/episode/3S2p3e43B76zMZhg4xD8cW',
    image: 'https://i.scdn.co/image/ab6765630000ba8a0c606b3316d0e6f2fa14de3f',
  },
  {
    show: 'Short Wave',
    title: 'What record ocean heat means for hurricane season',
    summary:
      'NPR climate correspondents translate the science behind warming seas and the forecasts for the months ahead.',
    runtime: '13 min',
    releaseDate: 'June 20, 2024',
    url: 'https://www.npr.org/2024/06/20/1177471578/hurricane-season-ocean-heat-short-wave',
    image: 'https://media.npr.org/assets/img/2023/09/12/shortwave_template_3000x3000_custom-4f18ddac188f1114fab7196e1873efa0a154266e.jpg',
  },
];

const listeningLabs = [
  {
    title: 'Climate solutions lab',
    description:
      'Zero in on decarbonization breakthroughs, frontline adaptation strategies, and the innovators leading the charge.',
    shows: ['The Climate Question', 'The Carbon Copy', 'Volts'],
  },
  {
    title: 'Spacefaring futures',
    description:
      'Track missions to the Moon, Mars, and exoplanets with audio briefings direct from NASA, ESA, and private launch teams.',
    shows: ["NASA's Curious Universe", 'Today In Space', 'Are We There Yet?'],
  },
  {
    title: 'Bio frontier briefings',
    description:
      'Follow CRISPR breakthroughs, microbiome therapeutics, and neuroscience advances shaping the next decade of health.',
    shows: ['Short Wave', 'Science Vs', 'Big Biology'],
  },
];

export default function PodcastsScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const cardSurface = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.88)' : '#ffffff';
  const softSurface = colorScheme === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(226, 232, 240, 0.6)';
  const badgeSurface = colorScheme === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(148, 163, 184, 0.18)';
  const heroOverlay = colorScheme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.85)';
  const textStrong = colorScheme === 'dark' ? '#f8fafc' : '#0f172a';

  const handleOpenLink = useCallback(async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Unable to open link', 'Try again in your browser to keep listening.');
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert('Something went wrong', 'We could not launch that listening destination.');
    }
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#eef2ff', dark: '#0b1120' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1600&q=80',
          }}
          style={styles.headerImage}
        />
      }>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#0f172a', '#1e293b'] : ['#eef2ff', '#e0f2fe']}
        style={styles.heroShell}
      >
        <View style={[styles.heroContent, { backgroundColor: heroOverlay }] }>
          <View pointerEvents="none" style={styles.heroGlowOne} />
          <View pointerEvents="none" style={styles.heroGlowTwo} />

          <View style={styles.heroHeader}>
            <View style={styles.heroIconWrap}>
                <LinearGradient
                  colors={palette.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroIconGradient}
              >
                <IconSymbol name="mic.fill" color="#ffffff" size={28} />
              </LinearGradient>
              <ThemedText type="defaultSemiBold" style={styles.heroBadge}>
                Scientific audio desk
              </ThemedText>
            </View>
            <ThemedText type="title" style={styles.heroTitle} lightColor={textStrong} darkColor={textStrong}>
              Mission-ready science podcasts
            </ThemedText>
            <ThemedText style={styles.heroSubtitle} lightColor={textStrong} darkColor={textStrong}>
              Discover deeply reported space, climate, and bioscience shows curated by the Timeline intelligence team.
              Stream trusted voices, download briefing packs, and follow the hosts who turn complex research into clear signal.
            </ThemedText>
          </View>

          <View style={styles.heroStatsRow}>
            {heroHighlights.map((item) => (
              <ThemedView
                key={item.label}
                style={[styles.heroStatCard, { borderColor: palette.stroke }]}
                lightColor={cardSurface}
                darkColor={cardSurface}
              >
                <LinearGradient
                  colors={palette.secondaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.heroStatIconBadge}
                >
                  <IconSymbol name={item.icon} size={18} color="#ffffff" />
                </LinearGradient>
                <ThemedText type="subtitle" style={styles.heroStatValue} lightColor={textStrong} darkColor={textStrong}>
                  {item.value}
                </ThemedText>
                <ThemedText style={styles.heroStatLabel}>{item.label}</ThemedText>
              </ThemedView>
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="sparkles" size={18} color={palette.tint} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Signal boosters
          </ThemedText>
        </View>
        <ThemedText style={styles.sectionDescription}>
          Rotate through the news desk’s daily listening prompts – quick-hit playlists that surface the most urgent science and
          technology briefings in your feed.
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.spotlightRail}
        >
          {quickSpotlights.map((spotlight) => (
            <Pressable
              key={spotlight.title}
              onPress={() => handleOpenLink(spotlight.url)}
              style={({ pressed }) => [styles.spotlightCard, pressed && styles.spotlightCardPressed]}
            >
              <Image source={{ uri: spotlight.image }} style={styles.spotlightImage} contentFit="cover" />
              <LinearGradient
                colors={['rgba(15, 23, 42, 0.1)', 'rgba(15, 23, 42, 0.65)']}
                style={styles.spotlightOverlay}
              />
              <View style={styles.spotlightInner}>
                <View style={styles.spotlightBadge}>
                  <IconSymbol name="play.circle.fill" size={20} color="#ffffff" />
                  <ThemedText style={styles.spotlightBadgeLabel} lightColor="#ffffff" darkColor="#ffffff">
                    Press play
                  </ThemedText>
                </View>
                <ThemedText type="subtitle" style={styles.spotlightTitle} lightColor="#ffffff" darkColor="#ffffff">
                  {spotlight.title}
                </ThemedText>
                <ThemedText style={styles.spotlightDescription} lightColor="rgba(248,250,252,0.85)" darkColor="rgba(248,250,252,0.85)">
                  {spotlight.description}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="mic.fill" size={18} color={palette.tint} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Featured science series
          </ThemedText>
        </View>
        <ThemedText style={styles.sectionDescription}>
          Each program is vetted for rigorous sourcing, consistent publishing, and a modern, cinematic audio palette.
          Subscribe to follow along with the breakthroughs shaping tomorrow’s briefings.
        </ThemedText>

        <View style={styles.seriesGrid}>
          {featuredSeries.map((series) => (
            <ThemedView
              key={series.title}
              style={[styles.seriesCard, { borderColor: palette.stroke }]}
              lightColor={cardSurface}
              darkColor={cardSurface}
            >
              <View style={styles.seriesArtWrap}>
                <Image
                  source={{
                    uri: series.banner ?? series.image,
                  }}
                  style={styles.seriesArt}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.4)']}
                  style={styles.seriesArtOverlay}
                />
                <View style={styles.seriesArtBadge}>
                  <IconSymbol name="play.circle.fill" size={24} color="#ffffff" />
                </View>
              </View>
              <View style={styles.seriesBody}>
                <View style={styles.seriesHeadingRow}>
                  <LinearGradient
                    colors={palette.secondaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.seriesAvatarHalo}
                  >
                    <View style={styles.seriesAvatarInner}>
                      <Image source={{ uri: series.image }} style={styles.seriesAvatarImage} contentFit="cover" />
                    </View>
                  </LinearGradient>
                  <View style={styles.seriesHeadingCopy}>
                    <ThemedText type="subtitle" style={styles.seriesTitle}>
                      {series.title}
                    </ThemedText>
                    <ThemedText style={styles.seriesPublisher}>{series.publisher}</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.seriesTagline}>{series.tagline}</ThemedText>

                <View style={styles.seriesMeta}>
                  <View style={[styles.metaBadge, { backgroundColor: softSurface }]}>
                    <ThemedText style={styles.metaBadgeLabel}>{series.cadence}</ThemedText>
                  </View>
                  <View style={[styles.metaBadge, { backgroundColor: softSurface }]}>
                    <ThemedText style={styles.metaBadgeLabel}>{series.runtime}</ThemedText>
                  </View>
                </View>

                <View style={styles.seriesTags}>
                  {series.focusAreas.map((focus) => (
                    <View key={`${series.title}-${focus}`} style={[styles.seriesTag, { backgroundColor: badgeSurface }]}>
                      <ThemedText style={styles.seriesTagLabel}>{focus}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>

              <Pressable onPress={() => handleOpenLink(series.url)} style={styles.seriesButton}>
                <LinearGradient
                  colors={palette.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.seriesButtonGradient}
                >
                  <ThemedText type="defaultSemiBold" style={styles.seriesButtonLabel} lightColor="#ffffff" darkColor="#ffffff">
                    Listen now
                  </ThemedText>
                  <IconSymbol name="chevron.right" size={18} color="#ffffff" />
                </LinearGradient>
              </Pressable>
            </ThemedView>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={18} color={palette.tint} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Latest episodes in review
          </ThemedText>
        </View>
        <ThemedText style={styles.sectionDescription}>
          Catch the freshest releases vetted by our science editors for clarity, rigor, and storytelling craft.
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.episodeScroller}
        >
          {latestEpisodes.map((episode) => (
            <ThemedView
              key={episode.title}
              style={[styles.episodeCard, { borderColor: palette.stroke }]}
              lightColor={cardSurface}
              darkColor={cardSurface}
            >
              <View style={styles.episodeArtWrap}>
                <Image source={{ uri: episode.image }} style={styles.episodeArt} contentFit="cover" />
                <LinearGradient
                  colors={['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.7)']}
                  style={styles.episodeArtOverlay}
                />
              </View>

              <View style={styles.episodeBody}>
                <View style={styles.episodeHeader}>
                  <LinearGradient
                    colors={palette.secondaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.episodeAvatarHalo}
                  >
                    <View style={styles.episodeAvatarInner}>
                      <Image source={{ uri: episode.image }} style={styles.episodeAvatarImage} contentFit="cover" />
                    </View>
                  </LinearGradient>
                  <View style={styles.episodeHeaderCopy}>
                    <ThemedText type="defaultSemiBold" style={styles.episodeShow}>
                      {episode.show}
                    </ThemedText>
                    <ThemedText style={styles.episodeMeta}>{episode.releaseDate}</ThemedText>
                  </View>
                </View>
                <ThemedText type="subtitle" style={styles.episodeTitle}>
                  {episode.title}
                </ThemedText>
                <ThemedText style={styles.episodeSummary}>{episode.summary}</ThemedText>

                <View style={styles.episodeFooter}>
                  <View style={[styles.metaBadge, { backgroundColor: softSurface }]}>
                    <ThemedText style={styles.metaBadgeLabel}>{episode.runtime}</ThemedText>
                  </View>
                  <Pressable onPress={() => handleOpenLink(episode.url)} style={styles.episodeLink}>
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.episodeLinkLabel}
                      lightColor={palette.tint}
                      darkColor={palette.tint}
                    >
                      Stream episode
                    </ThemedText>
                    <IconSymbol name="chevron.right" size={16} color={palette.tint} />
                  </Pressable>
                </View>
              </View>
            </ThemedView>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="book.pages.fill" size={18} color={palette.tint} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Listening labs
          </ThemedText>
        </View>
        <ThemedText style={styles.sectionDescription}>
          Build editorial playlists that match your beat. Each lab combines marquee shows with emerging voices to round out your
          knowledge stack.
        </ThemedText>

        <View style={styles.labStack}>
          {listeningLabs.map((lab) => (
            <ThemedView
              key={lab.title}
              style={[styles.labCard, { borderColor: palette.stroke }]}
              lightColor={cardSurface}
              darkColor={cardSurface}
            >
              <ThemedText type="subtitle" style={styles.labTitle}>
                {lab.title}
              </ThemedText>
              <ThemedText style={styles.labDescription}>{lab.description}</ThemedText>
              <View style={styles.labShowsRow}>
                {lab.shows.map((show) => (
                  <View key={`${lab.title}-${show}`} style={[styles.labShowPill, { backgroundColor: softSurface }] }>
                    <ThemedText style={styles.labShowLabel}>{show}</ThemedText>
                  </View>
                ))}
              </View>
            </ThemedView>
          ))}
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
  heroShell: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  heroContent: {
    padding: 24,
    gap: 20,
    borderRadius: 28,
    position: 'relative',
    overflow: 'hidden',
  },
  heroHeader: {
    gap: 16,
  },
  heroIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadge: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.92,
  },
  heroStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  heroStatCard: {
    flexGrow: 1,
    minWidth: 120,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
  heroStatIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStatValue: {
    fontSize: 24,
    lineHeight: 28,
  },
  heroStatLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(100, 116, 139, 1)',
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 28,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(100, 116, 139, 1)',
  },
  spotlightRail: {
    gap: 16,
    paddingVertical: 4,
    paddingRight: 12,
  },
  spotlightCard: {
    width: 280,
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
  },
  spotlightCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  spotlightImage: {
    ...StyleSheet.absoluteFillObject,
  },
  spotlightOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  spotlightInner: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    gap: 8,
  },
  spotlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderRadius: 999,
  },
  spotlightBadgeLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  spotlightTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  spotlightDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  seriesGrid: {
    gap: 20,
  },
  seriesCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 0,
  },
  seriesArtWrap: {
    position: 'relative',
    overflow: 'hidden',
  },
  seriesArt: {
    width: '100%',
    height: 200,
  },
  seriesArtOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  seriesArtBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seriesBody: {
    padding: 20,
    gap: 16,
  },
  seriesHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  seriesHeadingCopy: {
    flex: 1,
    gap: 4,
  },
  seriesAvatarHalo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    padding: 3,
  },
  seriesAvatarInner: {
    flex: 1,
    borderRadius: 17,
    overflow: 'hidden',
  },
  seriesAvatarImage: {
    width: '100%',
    height: '100%',
  },
  seriesTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  seriesPublisher: {
    fontSize: 14,
    color: 'rgba(100, 116, 139, 1)',
  },
  seriesTagline: {
    fontSize: 16,
    lineHeight: 24,
  },
  seriesMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metaBadgeLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  seriesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  seriesTag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  seriesTagLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  seriesButton: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  seriesButtonGradient: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  seriesButtonLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  episodeScroller: {
    paddingRight: 8,
    gap: 16,
    paddingVertical: 4,
  },
  episodeCard: {
    width: 300,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 0,
    marginRight: 16,
  },
  episodeArtWrap: {
    height: 160,
    position: 'relative',
    overflow: 'hidden',
  },
  episodeArt: {
    width: '100%',
    height: '100%',
  },
  episodeArtOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  episodeBody: {
    padding: 20,
    gap: 12,
  },
  episodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  episodeHeaderCopy: {
    flex: 1,
    gap: 4,
  },
  episodeAvatarHalo: {
    width: 56,
    height: 56,
    borderRadius: 18,
    padding: 3,
  },
  episodeAvatarInner: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  episodeAvatarImage: {
    width: '100%',
    height: '100%',
  },
  episodeShow: {
    fontSize: 16,
  },
  episodeMeta: {
    fontSize: 13,
    color: 'rgba(100, 116, 139, 1)',
  },
  episodeTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  episodeSummary: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(100, 116, 139, 1)',
  },
  episodeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  episodeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  episodeLinkLabel: {
    fontSize: 15,
  },
  labStack: {
    gap: 16,
  },
  labCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 12,
  },
  labTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  labDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(100, 116, 139, 1)',
  },
  labShowsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  labShowPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  labShowLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  heroGlowOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    top: -60,
    right: -40,
    transform: [{ rotate: '18deg' }],
  },
  heroGlowTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(20, 184, 166, 0.18)',
    bottom: -40,
    left: -50,
    transform: [{ rotate: '-22deg' }],
  },
});
