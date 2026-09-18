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
    statement:
      'I like following questions until they become clearer — and building things that help me think better.',
  },
  projects: {
    chanel: {
      context: 'MILAN · 2025 → NOW',
      title: 'Luxury Was Slowing. Why Did Chanel Look Different?',
      opening:
        'I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways.',
      return:
        'Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.',
      visibleStart: 'I started with what I could see.',
      marketing:
        'At first, I looked at the most visible explanations — what Chanel had been doing, how it was showing up, and whether recent brand activity could explain the difference I thought I was seeing. But public activity could tell me what the brand was doing — not whether those actions were actually driving the business.',
      missing: 'But something still felt missing.',
      missingBody:
        'By then, the pricing work was largely complete. I could see how Chanel was positioning itself. I still couldn’t tell whether that positioning was actually supported by the business.',
      current:
        'I no longer think Chanel’s relative resilience can be explained by a single price move or campaign. What I see now is a system: pricing, product, desirability, investment, client experience and brand identity all have to keep reinforcing one another.',
      unresolved:
        'I still don’t know which part of that system matters most. That is the part I am still trying to understand.',
      status: 'The question is still open.',
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
        'How should Olist grow marketplace value without letting fulfillment reliability and customer experience deteriorate?',
      shift: 'SQL stopped being the task. It became the language I used to investigate a business.',
      reflection:
        'What changed wasn’t just what I could query. It was how I approached an unfamiliar problem.',
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
        'One place I started was smaller organizations already creating outsized impact — trying to understand what they actually offered people, how those qualities became visible, and whether any recurring patterns existed.',
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
    personalSnapshot: null as PersonalSnapshot | null,
  },
  closing: {
    message: 'I’ll keep adding things here as I go.',
    links: [{ label: 'GitHub', href: 'https://github.com/gabriel232ch' }],
  },
} as const;
