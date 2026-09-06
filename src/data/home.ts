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
  currentPhase: {
    label: 'CURRENT PHASE',
    statement: 'Building a durable personal system for work, research, and the things I want to keep.',
  },
  movements: [
    { date: '2026-09-05', type: 'SYSTEM', title: 'Home v1 architecture approved.' },
    { date: '2026-09-04', type: 'SYSTEM', title: 'Editorial design system frozen.' },
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
  personalSnapshot: null,
  archive: null,
} as const;
