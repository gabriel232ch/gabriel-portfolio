export const PORTFOLIO_ORIGIN = 'https://gabrielchen.me';

export const PORTFOLIO_PAGES = [
  {
    slug: 'home',
    title: 'Gabriel Chen — Portfolio',
    summary:
      'Gabriel Chen’s portfolio of research and strategy work, including studies of Chanel, Olist, and why people choose smaller companies.',
    path: '/',
  },
  {
    slug: 'chanel',
    title: 'How Chanel Navigated the Luxury Slowdown',
    summary:
      'A public-source case examining Chanel’s FY2023–FY2025 performance, where recovery occurred, and what products, pricing, and client experience can explain.',
    path: '/work/luxury-handbag-pricing-architecture/',
  },
  {
    slug: 'olist',
    title: 'Olist Marketplace Analysis',
    summary:
      'A marketplace study tracing growth, changing delivery risk, and review timing into conditional market priorities.',
    path: '/work/olist-marketplace-analysis/',
  },
  {
    slug: 'smaller-companies',
    title: 'Why Do Some People Choose Smaller Companies?',
    summary:
      'An ongoing inquiry into what information helps someone decide whether a smaller company is right for them.',
    path: '/work/why-some-people-choose-smaller-companies/',
  },
] as const;

export type PortfolioPage = (typeof PORTFOLIO_PAGES)[number];
export type PortfolioPageSlug = PortfolioPage['slug'];

export function getPortfolioPage(slug: string): PortfolioPage | undefined {
  return PORTFOLIO_PAGES.find((page) => page.slug === slug);
}

export function getPortfolioPageByPath(path: string): PortfolioPage | undefined {
  return PORTFOLIO_PAGES.find((page) => page.path === path);
}

export function getPortfolioPageUrl(page: PortfolioPage): string {
  return new URL(page.path, PORTFOLIO_ORIGIN).toString();
}
