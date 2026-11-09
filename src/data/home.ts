export const HOME_WORK_SLUGS = [
  'luxury-handbag-pricing-architecture',
  'olist-marketplace-analysis',
  'competitive-positioning-against-giants',
] as const;

export interface HomeArchiveItem {
  type: string;
  date: string;
  title: string;
  note?: string;
}

export const HOME_STATE = {
  intro: {
    statement:
      'I like following questions until they become clearer — and building things that help me think better.',
    portrait: {
      src: '/life/italy/florence-portrait-edited@2x.webp',
      width: 2896,
      height: 2172,
      alt: 'Gabriel at Piazzale Michelangelo in Florence at night, with the cathedral and city lights behind him.',
      caption: 'Florence',
    },
  },
  photography: {
    milan: {
      src: '/life/italy/milan-portrait-edited.png',
      width: 1087,
      height: 1447,
      alt: 'Gabriel taking a selfie in front of Milan Cathedral, wearing clear-framed glasses.',
      caption: 'Milan',
    },
    campus: {
      src: '/life/italy/bocconi-campus.webp',
      width: 3024,
      height: 4032,
      alt: 'Curved metal facades and a green lawn on the Bocconi campus in Milan.',
      caption: 'Bocconi, Milan',
    },
    venice: {
      src: '/life/italy/venice-waterfront.webp',
      width: 4032,
      height: 3024,
      alt: 'A view across the water in Venice, with a church, a bell tower and mooring posts in the foreground.',
      caption: 'Venice',
    },
    coast: {
      src: '/life/italy/coast-afternoon.webp',
      width: 3024,
      height: 4032,
      alt: 'Colourful houses above a rocky Italian beach, with swimmers and blue umbrellas beside the sea.',
    },
  },
  projects: {
    chanel: {
      context: 'MILAN · 2025 → NOW',
      title: 'Luxury Was Slowing. Why Did Chanel Look Different?',
      opening:
        'I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways.',
      return:
        'Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.',
      resultsTitle: 'What actually recovered?',
      results:
        'Chanel also declined in 2024. Revenue returned to growth in 2025, but profit and cash flow remained much further below their 2023 levels. The difference I had noticed was a partial recovery.',
      recoveryTitle: 'Where did revenue return?',
      recovery:
        'Europe and the Americas added reported revenue in 2025, while Asia Pacific continued to decline. Retail and wholesale both improved. Those figures locate the recovery, but they cover several businesses: Fashion, Fragrance & Beauty, and Watches & Fine Jewellery.',
      explanationsTitle: 'What could explain it?',
      explanations:
        'That business scope changes how I read the possible explanations. Beauty has substantial scale. Selected public accounts describe CHANEL 25 as an everyday-use option. Chanel also continued updating products, stores and client services. The price study shows positioning and selected price increases; it does not measure how much pricing added to the recovery.',
      unresolved:
        'These are possible links to purchase and ownership. Public evidence has not measured their individual contributions or shown that a campaign caused the recovery.',
      status: 'An uneven, partial recovery.',
      cta: 'Explore the research →',
      href: '/work/luxury-handbag-pricing-architecture/',
    },
    olist: {
      context: 'SAMSUNG · 2025 → OLIST · 2026',
      title: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
      samsung:
        'My first real exposure to data analysis came at Samsung, working with sales datasets that could run into hundreds of thousands — sometimes millions — of rows. Most of the work happened in Excel. That was where data analysis started for me, but I didn’t want it to be the endpoint.',
      learning:
        'I had already been learning and practising SQL for some time. But most learning environments came with the question already defined: understand the task, write the right query, retrieve the answer. What I wanted to learn next was different — how to look at unfamiliar data, decide what was worth asking, and work my way toward a business problem on my own.',
      highlight: 'What I wanted to learn next was how to know what to ask.',
      arrival: 'That is what led me to Olist.',
      noQuestion:
        'There was no research question at the beginning. I started by understanding what was in the data — and what wasn’t.',
      businessQuestion:
        'Which markets deserve attention, and what should Olist verify before further growth?',
      shift: 'SQL stopped being the task. It became the language I used to investigate a business.',
      reflection:
        'Historical risk markets followed different paths over time. Checking recent performance and when customers answered reviews changed the priorities I could propose. Their effects still need to be tested.',
      cta: 'Explore the analysis →',
      href: '/work/olist-marketplace-analysis/',
    },
    smallerCompanies: {
      title: 'Why Do Some People Choose Smaller Companies?',
      opening:
        'I started thinking about this while working on employer branding at a quantitative investment firm. At first, I thought the challenge was to identify a clear differentiator — something that could be distilled into a positioning statement.',
      shift:
        'The more I worked on it, the less convincing that idea became. A company does not become compelling because it finds the right sentence. Whatever makes people choose it has to exist before the sentence does.',
      turn: 'So I started looking elsewhere.',
      research:
        'I began by looking at smaller organizations creating outsized impact. The question widened: what information helps someone decide whether a smaller company is right for them?',
      status: 'I’m still trying to understand this.',
      cta: 'Explore the current research →',
      href: '/work/why-some-people-choose-smaller-companies/',
    },
  },
  now: {
    items: [
      { id: 'learning', label: 'Learning', value: 'Italian' },
      { id: 'working', label: 'Working on', value: 'gabrielchen.me' },
      { id: 'playing', label: 'Playing', value: 'Baldur’s Gate 3' },
      {
        id: 'thinking',
        label: 'Thinking about',
        value: 'Why do some people choose smaller companies?',
      },
    ],
    personalMoments: {
      title: 'Milan and elsewhere',
      photos: [
        {
          src: '/life/italy/quiet-street.webp',
          width: 3024,
          height: 4032,
          alt: 'A narrow sunlit street between pink and yellow buildings, with plants growing along the walls.',
          caption: 'A quiet street',
        },
        {
          src: '/life/italy/fellow-passenger.jpeg',
          width: 1080,
          height: 1920,
          alt: 'A dog resting on the floor of a train carriage beside seated passengers.',
          caption: 'A fellow passenger',
        },
        {
          src: '/life/italy/gelato.jpeg',
          width: 1125,
          height: 1494,
          alt: 'A hand holding a gelato cone topped with a La Romana biscuit.',
          caption: 'Gelato',
        },
        {
          src: '/life/italy/old-town-walk.png',
          width: 1086,
          height: 1448,
          alt: 'Gabriel standing on a stone step in an old-town street, with a stone wall and cobbled lane around him.',
          caption: 'An afternoon in the old town',
        },
      ],
    },
    personalTrip: {
      place: 'Hong Kong',
      startDate: '2026-10-24',
      endDate: '2026-10-26',
      photos: [
        {
          src: '/life/hong-kong-2026/concert-full.webp',
          width: 3024,
          height: 4032,
          alt: 'A selfie in the audience at The Weeknd’s Hong Kong concert on the evening of 24 October 2026, with the stage in the background.',
          caption: 'The Weeknd live, 24 October 2026',
        },
        {
          src: '/life/hong-kong-2026/harbour-original.jpeg',
          width: 1536,
          height: 2720,
          alt: 'Looking out over Hong Kong’s illuminated skyline and harbour at night, seen from behind.',
          caption: 'Above the harbour',
        },
      ],
    },
  },
  closing: {
    message: 'I’ll keep adding things here as I go.',
    links: [{ label: 'GitHub', href: 'https://github.com/gabriel232ch' }],
  },
} as const;
