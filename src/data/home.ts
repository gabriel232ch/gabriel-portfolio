export const HOME_WORK_SLUGS = [
  'olist-marketplace-analysis',
  'luxury-handbag-pricing-architecture',
  'competitive-positioning-against-giants',
] as const;

export interface HomeArchiveItem {
  type: string;
  date: string;
  title: string;
  note?: string;
}

export const HOME_STATE = {
  profile: {
    eyebrow: 'DATA & COMMERCIAL ANALYST · AI WORKFLOWS · EN / ZH',
    roleNote:
      'Remote analytics, commercial research, and AI-assisted workflows — open to full-time roles and focused project engagements.',
    email: 'gabrielchen060@gmail.com',
    linkedin: 'https://www.linkedin.com/in/wentao-chen-476155367',
    github: 'https://github.com/gabriel232ch',
    resumeMailto:
      'mailto:gabrielchen060@gmail.com?subject=Resume%20Request%20%28EN%2FZH%29%20%E2%80%94%20Gabriel%20Chen&body=Hi%20Gabriel%2C%0A%0AI%E2%80%99d%20like%20to%20request%20your%20English%20or%20Chinese%20resume%20PDF%20for%20a%20role%20or%20project.',
    timezone: 'UTC+8 · Async-first, flexible EU & US overlap',
  },
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
  capabilities: {
    kicker: 'CAPABILITIES & TRACK RECORD',
    heading: 'Rigorous analysis, paired with repeatable AI workflows.',
    lede:
      'I help commercial, e-commerce, and lean teams turn messy operational data and public market evidence into decision-ready priorities — and codify recurring research into dependable agent workflows.',
    pillars: [
      {
        index: '01',
        label: 'MARKETPLACE & OPS ANALYTICS',
        title: 'Diagnose operational leaks and shifting KPIs',
        summary:
          'Multi-table SQL modeling, metric decomposition, cohort timing diagnostics, and sensitivity checks that separate active risk from static dashboard noise.',
        proofLabel: 'See Olist study →',
        proofHref: '#olist',
      },
      {
        index: '02',
        label: 'COMMERCIAL & PRICING RESEARCH',
        title: 'Structure filings, pricing ladders, and peer signals',
        summary:
          'Operating-profit bridges, cross-brand price-architecture panels, and bilingual (EN/ZH) public-source synthesis with explicit evidence boundaries.',
        proofLabel: 'See Chanel study →',
        proofHref: '#chanel',
      },
      {
        index: '03',
        label: 'AI AGENT WORKFLOWS & SYSTEMS',
        title: 'Turn complex research into reusable pipelines',
        summary:
          'Multi-agent research harnesses, Golden-Sample content systems, multi-platform LLM evaluation matrices, and production MCP integrations.',
        proofLabel: 'See research systems →',
        proofHref: '#smaller-companies',
      },
    ],
    experience: [
      {
        org: 'Samsung · Home Appliances',
        role: 'Sales Operations Support Intern',
        period: '2025',
        impact:
          'Combined AVC/GfK market data with up to ~1M sales records to surface a 550–600 L South China portfolio gap (2 reports forwarded to regional GMs); audited weekly >40% off-RRP pricing exceptions; cut 4 weekly channel reports from ~2h to ~1h with Power Query.',
      },
      {
        org: 'Quantitative Investment Firm',
        role: 'AI Brand Strategy Intern',
        period: '2026',
        impact:
          'Built a 60-observation AI retrieval evaluation across 12 prompts and 5 platforms, distilled employee-interview evidence into reusable Golden-Sample writing workflows, and designed an interactive candidate decision prototype.',
      },
      {
        org: 'Avia Games',
        role: 'Business Development Intern',
        period: '2024–2025',
        impact:
          'Structured 710+ merchant quotes into location/feature pricing benchmarks and a reusable venue directory, lifting negotiation success from ~30% to ~50% and reducing average exclusive booking costs by ~20%.',
      },
    ],
    alsoBuilt: [
      {
        name: 'YUYE (Personal Finance App)',
        detail:
          'Private multi-currency ledger, dynamic monthly budget envelopes, and prepaid-entitlement tracker on Cloudflare Pages + D1, with a ChatGPT MCP server supporting preview-and-confirm write operations (120/120 passing tests).',
        href: null,
      },
      {
        name: 'USAspending Federal IT Account Prioritization',
        detail:
          'Public $188B civilian IT obligations study using ordered Boolean posture rules, incumbent concentration sensitivity, and 24-month contract end-date screening.',
        href: 'https://github.com/gabriel232ch/usaspending-federal-it-account-prioritization',
      },
      {
        name: 'gabrielchen.me + Read-Only MCP',
        detail:
          'Self-built editorial portfolio in Astro and Cloudflare Workers with interactive SVG data visualizations, llms.txt, and a live /mcp endpoint.',
        href: 'https://github.com/gabriel232ch/gabriel-portfolio',
      },
    ],
    stack: [
      {
        label: 'ANALYTICS & BI',
        value: 'PostgreSQL / SQL · Python · Tableau · Power BI · Excel / Power Query',
      },
      {
        label: 'AI & WEB SYSTEMS',
        value: 'AI Agent Workflows · LLM Evaluation Matrices · MCP Servers · Astro · Cloudflare Workers & D1',
      },
      {
        label: 'REMOTE & LANGUAGES',
        value: 'Bilingual English (TOEFL 105) & Mandarin · Italian (A2) · French (B1) · Renmin Univ. MIB · Bocconi Exchange',
      },
    ],
  },
  photography: {
    milan: {
      src: '/life/italy/bocconi-departments.webp',
      width: 768,
      height: 1024,
      alt: 'Looking up at the concrete canopy of Università Bocconi in Milan, with bold dark lettering reading Università Bocconi and dipartimenti/departments.',
      caption: 'Università Bocconi',
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
    olist: {
      context: 'POSTGRESQL · PYTHON · TABLEAU · POWER BI',
      title: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
      samsung:
        'After working with ~1M-row commercial sales datasets in Excel and Power Query at Samsung, I wanted to test an end-to-end decision-science workflow on unfamiliar relational marketplace data — from raw schema contracts to executive prioritization.',
      learning:
        'Static KPI dashboards flagged six commercially material category × state markets as high-risk. Instead of accepting the cumulative shortlist at face value, I built 19 reproducible PostgreSQL scripts, Python validations, and Tableau/Power BI exports to trace monthly trajectories, routes, and review timestamps.',
      highlight: '97.39% of 8+ day late reviews were written before the parcel even arrived.',
      arrival: 'The timeline changed the priorities.',
      noQuestion:
        'Starting from nine raw Olist files (1.55M source rows), I established strict order, item, customer, and review grain contracts before diagnosing where scale outpaced service.',
      businessQuestion:
        'Which markets still need operational intervention, and what should Olist test before scaling further?',
      shift: 'SQL stopped being a query exercise. It became a traceable decision system.',
      reflection:
        'Several historical risk markets recovered by spring while others deteriorated later in the year, and pre-delivery review timing reframed severe-delay scores as an expectation and alert problem to A/B test.',
      cta: 'Explore the analysis →',
      href: '/work/olist-marketplace-analysis/',
    },
    chanel: {
      context: 'FINANCIAL & PRICING RESEARCH · MILAN · 2025 → NOW',
      title: 'Luxury Was Slowing. Why Did Chanel Look Different?',
      opening:
        'I first started investigating luxury resilience while studying Luxury Management at Università Bocconi in Milan. As growth stalled across the sector, brands like Gucci, LVMH Fashion & Leather Goods, Hermès, and Chanel diverged sharply.',
      return:
        'Chanel’s FY2025 return to reported growth stood out against peers. I reconciled three years of consolidated filings, peer disclosures, and a 161-observation France/US handbag price panel to separate observable facts from brand narratives.',
      resultsTitle: 'What actually recovered?',
      results:
        'Chanel also declined in 2024. Revenue returned to 97.6% of its FY2023 level in 2025 (+1.8% comparable), but operating profit (73.5%) and free cash flow (70.5%) remained much further behind due to lower gross profit and higher SG&A.',
      recoveryTitle: 'Where did revenue return?',
      recovery:
        'Europe and the Americas added reported revenue in 2025, while Asia Pacific continued to decline. Retail and wholesale both improved — but group figures span Fashion, Fragrance & Beauty (~$8.54bn third-party scale estimate), and Watches & Fine Jewellery.',
      explanationsTitle: 'What can public evidence establish?',
      explanations:
        'Business scope limits any handbag-only explanation. Beauty carries major scale, selected public accounts highlight CHANEL 25 for everyday use, and the France/US price study documents positioning and a €3,300 / $3,600 pre-icon to icon jump without claiming causal revenue impact.',
      unresolved:
        'The case pins down what is verified in filings and scopes the exact Week-1 internal analyses — PVM bridge, division margins, and cohort incrementality — a strategy or buy-side team would run next.',
      status: 'An uneven, partial recovery — with clear analytical boundaries.',
      cta: 'Explore the research →',
      href: '/work/luxury-handbag-pricing-architecture/',
    },
    smallerCompanies: {
      context: 'AI EVALUATION · RESEARCH SYSTEMS · 2026',
      title: 'Why Do Some People Choose Smaller Companies?',
      opening:
        'This six-week applied engagement at a quantitative investment firm began as an AI search visibility (GEO) question: how do language models describe a specialized smaller firm to technical candidates?',
      shift:
        'A structured 60-observation evaluation across 12 prompts and 5 platforms pointed upstream: output quality was constrained by dispersed, unverifiable public facts — and a sharper slogan could not substitute for inspectable organizational reality.',
      turn: 'From ad-hoc inquiry to reusable AI workflows.',
      research:
        'To turn qualitative research into repeatable output, I structured content around candidate decision queries, codified Golden Samples into an AI-assisted writing process, and built a multi-agent research harness for cross-case synthesis.',
      status: 'Decision-support framing, backed by repeatable AI research systems.',
      cta: 'Explore the research & workflows →',
      href: '/work/why-some-people-choose-smaller-companies/',
    },
  },
  workWithMe: {
    kicker: 'WORK WITH ME · REMOTE (EN / ZH)',
    heading: 'Looking for an analyst who pairs evidence rigor with AI workflows?',
    lede:
      'I work asynchronously across time zones (UTC+8, with flexible Europe and US overlap) and deliver traceable SQL/Python analysis, decision-ready briefs, and reusable agent pipelines.',
    modes: [
      {
        label: '01 / REMOTE FULL-TIME ROLES',
        title: 'Data, Business, Commercial & AI-Enabled Analyst',
        description:
          'Marketplace & operations analytics, commercial/pricing intelligence, sales operations, and strategy roles where clear metric definitions and fast, self-directed execution matter.',
      },
      {
        label: '02 / FOCUSED REMOTE PROJECTS',
        title: 'Analytics Audits, Market Research & Agent Workflows',
        description:
          'Scoped 1–4 week engagements: SQL/KPI diagnostics, competitive pricing & financial deep-dives (EN/ZH), Tableau/Power BI reporting cleanup, or custom AI research & evaluation harnesses.',
      },
    ],
    responseNote: 'Typically reply within 24 hours · English & Chinese resumes available on request.',
  },
  now: {
    kicker: 'THE PERSON BEHIND THE WORK',
    intro:
      'Outside of queries and research workflows, this site also stays a living record of places, curiosity, and things I am learning along the way.',
    items: [
      { id: 'learning', label: 'Learning', value: 'Italian' },
      { id: 'working', label: 'Working on', value: 'gabrielchen.me & YUYE finance MCP' },
      { id: 'playing', label: 'Playing', value: 'Baldur’s Gate 3' },
      {
        id: 'thinking',
        label: 'Thinking about',
        value: 'How AI agents can make rigorous business research repeatable',
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
    links: [
      { label: 'Email', href: 'mailto:gabrielchen060@gmail.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wentao-chen-476155367' },
      { label: 'GitHub', href: 'https://github.com/gabriel232ch' },
    ],
  },
} as const;
