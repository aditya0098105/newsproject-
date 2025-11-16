export type DossierHighlight = {
  title: string;
  detail: string;
  icon: string;
};

export type TimelineEntry = {
  year: string;
  headline: string;
  summary: string;
};

export type ExposeContent = {
  heroBadgeLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  highlightCard: {
    title: string;
    quote: string;
  };
  dossierHighlights: DossierHighlight[];
  timeline: TimelineEntry[];
  takeaway: {
    title: string;
    body: string;
    icon: string;
  };
};

const exposeFallbackContent: ExposeContent = {
  heroBadgeLabel: 'Accountability desk',
  heroTitle: '1MDB global money trail',
  heroSubtitle:
    'How Malaysia’s sovereign development fund became the centre of a multi-billion-dollar fraud touching Hollywood, Gulf investment funds, and Wall Street banks.',
  highlightCard: {
    title: '“The largest kleptocracy case to date”',
    quote:
      'U.S. prosecutors say bonds arranged for 1MDB were immediately rerouted to shell companies controlled by financier Low Taek Jho and allies—funding luxury property, films like “The Wolf of Wall Street,” and political influence campaigns.',
  },
  dossierHighlights: [
    {
      title: 'USD $4.5B allegedly siphoned',
      detail:
        'U.S. Department of Justice investigators allege more than $4.5 billion was diverted from 1MDB into offshore vehicles linked to Malaysian and Emirati officials between 2009 and 2014.',
      icon: 'globe.asia.australia.fill',
    },
    {
      title: 'Luxuries seized worldwide',
      detail:
        'Civil forfeiture cases recovered assets including a $250M superyacht, Beverly Hills mansions, and rare art purchased with misappropriated funds, according to DoJ filings.',
      icon: 'sailboat.fill',
    },
    {
      title: 'Banks paid record fines',
      detail:
        'Goldman Sachs agreed to a $2.9B global settlement in 2020 and Malaysia negotiated $3.9B in penalties after prosecutors said bond offerings enabled the scheme.',
      icon: 'dollarsign.circle.fill',
    },
  ],
  timeline: [
    {
      year: '2009',
      headline: '1MDB founded under Najib Razak',
      summary:
        'Malaysia transformed the Terengganu Investment Authority into 1MDB with Najib as advisory board chair, pledging to spur strategic development projects.',
    },
    {
      year: '2015',
      headline: 'Wall Street Journal exposes $700M transfer',
      summary:
        'Investigative reporting revealed funds linked to 1MDB were wired into Najib’s personal accounts, prompting domestic protests and official denials.',
    },
    {
      year: '2016',
      headline: 'DoJ launches “kleptocracy” suits',
      summary:
        'U.S. authorities filed civil actions to seize $1B in assets, calling it the largest kleptocracy case in DoJ history.',
    },
    {
      year: '2022',
      headline: 'Najib begins 12-year prison term',
      summary:
        'Malaysia’s Federal Court upheld Najib’s conviction for abuse of power, criminal breach of trust, and money laundering tied to SRC International, a former 1MDB unit.',
    },
  ],
  takeaway: {
    title: 'What’s next',
    body:
      'Malaysia continues pursuing Low Taek Jho and other fugitives while auditing recovery of 1MDB-linked assets. Stay alert for U.S. court filings on forfeiture auctions and Malaysia’s ongoing negotiations with international banks.',
    icon: 'lightbulb.fill',
  },
};

export default exposeFallbackContent;
