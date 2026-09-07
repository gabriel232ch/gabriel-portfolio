export const HOME_WORK_SLUGS = [
  'luxury-handbag-pricing-architecture',
  'olist-marketplace-analysis',
  'competitive-positioning-against-giants',
] as const;

export interface PersonalSnapshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface HomeArchiveItem {
  type: string;
  date: string;
  title: string;
  note?: string;
}

export const HOME_STATE = {
  intro: {
    label: 'RESEARCH / SYSTEMS / NOTES',
    statement: 'I explore how businesses work, and how research can become useful systems.',
  },
  reading: [
    {
      title: 'How luxury brands structure price',
      href: '#work',
      label: 'PRICING RESEARCH',
    },
    {
      title: 'When marketplace growth strains delivery',
      href: '#olist',
      label: 'MARKETPLACE ANALYSIS',
    },
  ],
  now: {
    primary: {
      title: 'Employer Brand / GEO at JoinQuant',
      state: 'Turning interview evidence and benchmark research into a more grounded employer-brand and GEO direction.',
    },
    side: [
      {
        title: 'AI × Business Systems',
        state: 'Exploring how agents and AI-assisted workflows can turn analysis into repeatable systems.',
      },
      {
        title: 'Building Gabriel Portfolio',
        state: 'Building gabrielchen.me as a long-lived editorial archive rather than a one-off recruiting site.',
      },
    ],
  },
  authorNote: {
    title: 'A place to keep thinking',
    body: 'This is a place for work, research, and ideas I want to return to. I’m building it to grow with my interests over time.',
  },
  personalSnapshot: null,
  archive: null,
} as const;
