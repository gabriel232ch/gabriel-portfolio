import {
  PORTFOLIO_PAGES,
  getPortfolioPage,
  getPortfolioPageUrl,
} from './lib/portfolio-pages';

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

const MCP_PATH = '/mcp';
const MAX_REQUEST_BYTES = 64 * 1024;
const MAX_PAGE_CHARS = 24_000;
const SUPPORTED_PROTOCOL_VERSIONS = [
  '2026-07-28',
  '2025-11-25',
  '2025-06-18',
  '2025-03-26',
] as const;
const MODERN_PROTOCOL_VERSION = '2026-07-28';
const LEGACY_DEFAULT_VERSION = '2025-11-25';

const ALLOWED_ORIGINS = new Set([
  'https://gabrielchen.me',
  'https://www.gabrielchen.me',
  'https://chatgpt.com',
  'https://chat.openai.com',
]);

const toolDefinitions = [
  {
    name: 'list_portfolio_pages',
    description: 'List the public pages available on Gabriel Chen’s portfolio.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: 'search_portfolio',
    description:
      'Search the text of the public portfolio pages and return matching excerpts with source links.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', minLength: 1, maxLength: 200 },
        max_results: { type: 'integer', minimum: 1, maximum: 10, default: 5 },
      },
      required: ['query'],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: 'read_portfolio_page',
    description:
      'Read a public portfolio page as clean text. Use offset and limit to continue through long pages.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          enum: PORTFOLIO_PAGES.map((page) => page.slug),
        },
        offset: { type: 'integer', minimum: 0, default: 0 },
        limit: { type: 'integer', minimum: 1, maximum: MAX_PAGE_CHARS, default: 12000 },
      },
      required: ['slug'],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function jsonResponse(
  body: unknown,
  status = 200,
  request?: Request,
): Response {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  });

  const origin = request?.headers.get('Origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }

  return new Response(JSON.stringify(body), { status, headers });
}

function rpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown,
): Record<string, unknown> {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message, ...(data === undefined ? {} : { data }) },
  };
}

function emptyAccepted(request: Request): Response {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  });
  const origin = request.headers.get('Origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }
  return new Response(null, { status: 202, headers });
}

function corsPreflight(request: Request): Response {
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response('Origin is not allowed.', { status: 403 });
  }

  const headers = new Headers({
    Allow: 'POST, OPTIONS',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'Accept, Content-Type, MCP-Protocol-Version, Mcp-Method, Mcp-Name',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  });
  if (origin) headers.set('Access-Control-Allow-Origin', origin);
  return new Response(null, { status: 204, headers });
}

function decodeHtmlEntity(entity: string): string {
  const normalized = entity.toLowerCase();
  if (normalized.startsWith('#x')) {
    const codePoint = Number.parseInt(normalized.slice(2), 16);
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : ' ';
  }
  if (normalized.startsWith('#')) {
    const codePoint = Number.parseInt(normalized.slice(1), 10);
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : ' ';
  }

  const entities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };
  return entities[normalized] ?? ' ';
}

function htmlToText(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg|noscript|template|head)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<(?:br|\/p|\/h[1-6]|\/li|\/tr|\/section|\/article|\/td|\/th|\/summary|\/details|\/main|\/aside|\/figure|\/figcaption)\b[^>]*>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (_match, entity: string) =>
      decodeHtmlEntity(entity),
    )
    .replace(/[\t\f\v ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function readPageText(env: Env, pagePath: string, baseUrl: string): Promise<string> {
  const pageUrl = new URL(pagePath, baseUrl);
  const pageResponse = await env.ASSETS.fetch(
    new Request(pageUrl, { headers: { Accept: 'text/html' } }),
  );
  if (!pageResponse.ok) {
    throw new Error(`Could not read the public page (HTTP ${pageResponse.status}).`);
  }
  const html = await pageResponse.text();
  return htmlToText(html);
}

function pageCatalogueText(): string {
  return PORTFOLIO_PAGES.map(
    (page) => `- ${page.slug}: ${page.title}\n  ${page.summary}\n  ${getPortfolioPageUrl(page)}`,
  ).join('\n');
}

function pageSection(pageSlug: string, offset: number, limit: number, text: string): string {
  const start = Math.max(0, Math.min(offset, text.length));
  const boundedLimit = Math.max(1, Math.min(limit, MAX_PAGE_CHARS));
  const end = Math.min(start + boundedLimit, text.length);
  const content = text.slice(start, end);
  const next = end < text.length ? `\n\n[More available: call read_portfolio_page with slug="${pageSlug}" and offset=${end}.]` : '';
  return `${content}${next}`;
}

async function callTool(
  name: string,
  args: Record<string, unknown>,
  env: Env,
  baseUrl: string,
): Promise<{ content: Array<{ type: 'text'; text: string }>; isError?: boolean }> {
  if (name === 'list_portfolio_pages') {
    return { content: [{ type: 'text', text: pageCatalogueText() }] };
  }

  if (name === 'read_portfolio_page') {
    const slug = typeof args.slug === 'string' ? args.slug : '';
    const page = getPortfolioPage(slug);
    if (!page) {
      return {
        content: [{ type: 'text', text: `Unknown page slug. Available slugs: ${PORTFOLIO_PAGES.map((item) => item.slug).join(', ')}.` }],
        isError: true,
      };
    }

    const offset = typeof args.offset === 'number' && Number.isInteger(args.offset) && args.offset >= 0 ? args.offset : 0;
    const limit = typeof args.limit === 'number' && Number.isInteger(args.limit) ? args.limit : 12000;
    try {
      const text = await readPageText(env, page.path, baseUrl);
      const result = `# ${page.title}\nSource: ${getPortfolioPageUrl(page)}\n\n${pageSection(slug, offset, limit, text)}`;
      return { content: [{ type: 'text', text: result }] };
    } catch (error) {
      return {
        content: [{ type: 'text', text: error instanceof Error ? error.message : 'Could not read that page.' }],
        isError: true,
      };
    }
  }

  if (name === 'search_portfolio') {
    const query = typeof args.query === 'string' ? args.query.trim() : '';
    if (!query || query.length > 200) {
      return {
        content: [{ type: 'text', text: 'Provide a search query between 1 and 200 characters.' }],
        isError: true,
      };
    }

    const terms = [...new Set(query.toLocaleLowerCase().split(/\s+/).filter((term) => term.length > 1))];
    const maxResults = typeof args.max_results === 'number' && Number.isInteger(args.max_results)
      ? Math.max(1, Math.min(args.max_results, 10))
      : 5;

    try {
      const searched = await Promise.all(
        PORTFOLIO_PAGES.map(async (page) => ({ page, text: await readPageText(env, page.path, baseUrl) })),
      );
      const matches = searched.flatMap(({ page, text }) => {
        const lowerText = text.toLocaleLowerCase();
        const matchedTerms = terms.filter((term) => lowerText.includes(term));
        if (matchedTerms.length === 0) return [];
        const excerpts = text
          .split(/\n+/)
          .map((line) => line.trim())
          .filter((line) => line && terms.some((term) => line.toLocaleLowerCase().includes(term)))
          .slice(0, 3)
          .map((line) => line.length > 360 ? `${line.slice(0, 357)}…` : line);
        return [{ page, score: matchedTerms.length, excerpts }];
      });

      matches.sort((left, right) => right.score - left.score);
      const result = matches.slice(0, maxResults).map(({ page, excerpts }) =>
        `## ${page.title}\n${getPortfolioPageUrl(page)}\n${excerpts.map((excerpt) => `- ${excerpt}`).join('\n')}`,
      );
      return {
        content: [{
          type: 'text',
          text: result.length > 0 ? result.join('\n\n') : `No public page matched “${query}”.`,
        }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: error instanceof Error ? error.message : 'Could not search portfolio pages.' }],
        isError: true,
      };
    }
  }

  return {
    content: [{ type: 'text', text: `Unknown tool: ${name}.` }],
    isError: true,
  };
}

async function handleMcp(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response('Origin is not allowed.', { status: 403 });
  }

  if (request.method === 'OPTIONS') return corsPreflight(request);
  if (request.method !== 'POST') {
    return new Response('Use POST for MCP requests.', {
      status: 405,
      headers: { Allow: 'POST, OPTIONS' },
    });
  }

  const contentType = request.headers.get('Content-Type') ?? '';
  if (!contentType.toLocaleLowerCase().startsWith('application/json')) {
    return new Response('Content-Type must be application/json.', { status: 415 });
  }

  const contentLength = Number(request.headers.get('Content-Length') ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return new Response('Request body is too large.', { status: 413 });
  }

  let rpc: JsonRpcRequest;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BYTES) {
      return new Response('Request body is too large.', { status: 413 });
    }
    const parsed: unknown = JSON.parse(body);
    if (!isRecord(parsed) || parsed.jsonrpc !== '2.0' || typeof parsed.method !== 'string') {
      return jsonResponse(rpcError(null, -32600, 'Invalid JSON-RPC request.'), 400, request);
    }
    rpc = parsed as unknown as JsonRpcRequest;
  } catch {
    return jsonResponse(rpcError(null, -32700, 'Invalid JSON.'), 400, request);
  }

  const params = isRecord(rpc.params) ? rpc.params : {};
  const requestMeta = isRecord(params._meta) ? params._meta : {};
  const metaVersion = requestMeta['io.modelcontextprotocol/protocolVersion'];
  const headerVersion = request.headers.get('MCP-Protocol-Version');
  const isModern = metaVersion === MODERN_PROTOCOL_VERSION;

  if (isModern) {
    if (headerVersion !== MODERN_PROTOCOL_VERSION) {
      return jsonResponse(
        rpcError(rpc.id ?? null, -32022, 'Protocol version header does not match request metadata.', {
          requested: MODERN_PROTOCOL_VERSION,
          supported: SUPPORTED_PROTOCOL_VERSIONS,
        }),
        400,
        request,
      );
    }

    const methodHeader = request.headers.get('Mcp-Method');
    if (methodHeader !== rpc.method) {
      return jsonResponse(rpcError(rpc.id ?? null, -32023, 'Mcp-Method does not match the JSON-RPC method.'), 400, request);
    }

    const expectedName = rpc.method === 'tools/call' && typeof params.name === 'string'
      ? params.name
      : rpc.method === 'resources/read' && typeof params.uri === 'string'
        ? params.uri
        : undefined;
    if (expectedName && request.headers.get('Mcp-Name') !== expectedName) {
      return jsonResponse(rpcError(rpc.id ?? null, -32023, 'Mcp-Name does not match the request.'), 400, request);
    }
  } else if (rpc.method !== 'initialize') {
    const version = headerVersion ?? LEGACY_DEFAULT_VERSION;
    if (!SUPPORTED_PROTOCOL_VERSIONS.includes(version as (typeof SUPPORTED_PROTOCOL_VERSIONS)[number]) || version === MODERN_PROTOCOL_VERSION) {
      return jsonResponse(
        rpcError(rpc.id ?? null, -32022, 'Unsupported protocol version.', {
          requested: version,
          supported: SUPPORTED_PROTOCOL_VERSIONS.filter((item) => item !== MODERN_PROTOCOL_VERSION),
        }),
        400,
        request,
      );
    }
  }

  if (rpc.id === undefined) {
    return emptyAccepted(request);
  }

  let result: unknown;
  if (rpc.method === 'initialize') {
    const requested = typeof params.protocolVersion === 'string' ? params.protocolVersion : '';
    const negotiated = (SUPPORTED_PROTOCOL_VERSIONS as readonly string[]).includes(requested) && requested !== MODERN_PROTOCOL_VERSION
      ? requested
      : LEGACY_DEFAULT_VERSION;
    result = {
      protocolVersion: negotiated,
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
      },
      serverInfo: { name: 'gabriel-portfolio', version: '1.0.0' },
      instructions:
        'Read-only access to the public pages listed by list_portfolio_pages. Search and page reading are limited to those public routes.',
    };
  } else if (rpc.method === 'ping') {
    result = {};
  } else if (rpc.method === 'tools/list') {
    result = { tools: toolDefinitions };
  } else if (rpc.method === 'resources/list') {
    result = {
      resources: PORTFOLIO_PAGES.map((page) => ({
        uri: getPortfolioPageUrl(page),
        name: page.slug,
        title: page.title,
        description: page.summary,
        mimeType: 'text/plain',
      })),
    };
  } else if (rpc.method === 'resources/read') {
    const uri = typeof params.uri === 'string' ? params.uri : '';
    const page = PORTFOLIO_PAGES.find((item) => getPortfolioPageUrl(item) === uri);
    if (!page) {
      return jsonResponse(rpcError(rpc.id, -32002, 'Unknown portfolio resource.'), 404, request);
    }
    try {
      const text = await readPageText(env, page.path, request.url);
      result = {
        contents: [
          {
            uri,
            mimeType: 'text/plain',
            text: `${page.title}\n${uri}\n\n${pageSection(page.slug, 0, MAX_PAGE_CHARS, text)}`,
          },
        ],
      };
    } catch (error) {
      return jsonResponse(rpcError(rpc.id, -32603, error instanceof Error ? error.message : 'Could not read the page.'), 500, request);
    }
  } else if (rpc.method === 'tools/call') {
    const name = typeof params.name === 'string' ? params.name : '';
    const args = isRecord(params.arguments) ? params.arguments : {};
    const toolResult = await callTool(name, args, env, request.url);
    result = toolResult;
  } else {
    return jsonResponse(rpcError(rpc.id, -32601, 'Method not found.'), 404, request);
  }

  return jsonResponse({ jsonrpc: '2.0', id: rpc.id, result }, 200, request);
}

export default {
  fetch(request: Request, env: Env): Promise<Response> | Response {
    const url = new URL(request.url);
    if (url.pathname === MCP_PATH) return handleMcp(request, env);
    if (url.pathname.startsWith(`${MCP_PATH}/`)) {
      return new Response('Not found.', { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};
