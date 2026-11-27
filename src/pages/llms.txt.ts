import {
  PORTFOLIO_PAGES,
  getPortfolioPageUrl,
} from '../lib/portfolio-pages';

export const prerender = true;

export function GET(): Response {
  const pageList = PORTFOLIO_PAGES.map(
    (page) => `- [${page.title}](${getPortfolioPageUrl(page)}): ${page.summary}`,
  ).join('\n');

  const content = `# Gabriel Chen

> Bilingual (EN/ZH) Data & Commercial Analyst and AI Workflow Builder. Open to remote full-time analyst roles and focused project engagements.

## Core capabilities

- Marketplace & Operations Analytics: PostgreSQL / SQL, Python, Tableau, Power BI, Excel / Power Query, KPI decomposition, cohort timing diagnostics, experiment design.
- Commercial, Financial & Pricing Research: Operating-profit bridges, competitive price architecture, bilingual (EN/ZH) market synthesis with explicit evidence boundaries.
- AI Agent Workflows & Systems: Multi-agent research harnesses, Golden-Sample workflows, multi-platform LLM evaluation matrices, and MCP integrations.

## Contact

- Email: gabrielchen060@gmail.com
- LinkedIn: https://www.linkedin.com/in/wentao-chen-476155367
- GitHub: https://github.com/gabriel232ch
- Timezone: UTC+8 (async-first, flexible Europe & US overlap; EN/ZH resumes available on request)

## Public pages

${pageList}

## Machine-readable access

- Portfolio index: https://gabrielchen.me/api/portfolio.json
- Read-only MCP endpoint: https://gabrielchen.me/mcp
- MCP tools: list_portfolio_pages, search_portfolio, read_portfolio_page

The MCP endpoint reads only the public pages listed above. Olist source orders, identifiers, and review text are not exposed.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
