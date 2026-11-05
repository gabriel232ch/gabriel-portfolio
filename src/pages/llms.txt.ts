import {
  PORTFOLIO_PAGES,
  getPortfolioPageUrl,
} from '../lib/portfolio-pages';

export const prerender = true;

export function GET(): Response {
  const pageList = PORTFOLIO_PAGES.map(
    (page) => `- [${page.title}](${getPortfolioPageUrl(page)}): ${page.summary}`,
  ).join('\n');

  const content = `# Gabriel Chen\n\n> Research and strategy work by Gabriel Chen.\n\n## Public pages\n\n${pageList}\n\n## Machine-readable access\n\n- Portfolio index: https://gabrielchen.me/api/portfolio.json\n- Read-only MCP endpoint: https://gabrielchen.me/mcp\n- MCP tools: list_portfolio_pages, search_portfolio, read_portfolio_page\n\nThe MCP endpoint reads only the public pages listed above. Olist source orders, identifiers, and review text are not exposed.\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
