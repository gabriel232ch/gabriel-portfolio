import { PORTFOLIO_PAGES, getPortfolioPageUrl } from '../../lib/portfolio-pages';

export const prerender = true;

export function GET(): Response {
  const body = {
    name: 'Gabriel Chen — Portfolio',
    origin: 'https://gabrielchen.me',
    mcpEndpoint: 'https://gabrielchen.me/mcp',
    pages: PORTFOLIO_PAGES.map((page) => ({
      slug: page.slug,
      title: page.title,
      summary: page.summary,
      url: getPortfolioPageUrl(page),
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
