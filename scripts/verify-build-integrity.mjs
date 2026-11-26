import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const errors = [];

function checkFile(relativePath) {
  const fullPath = resolve(distDir, relativePath);
  if (!existsSync(fullPath)) {
    errors.push(`Missing built file: dist/${relativePath}`);
    return null;
  }
  const size = statSync(fullPath).size;
  if (size === 0) {
    errors.push(`Built file is empty: dist/${relativePath}`);
    return null;
  }
  return fullPath;
}

const requiredRoutes = [
  'index.html',
  '404.html',
  'api/portfolio.json',
  'llms.txt',
  'robots.txt',
  'work/luxury-handbag-pricing-architecture/index.html',
  'work/olist-marketplace-analysis/index.html',
  'work/why-some-people-choose-smaller-companies/index.html',
];

for (const route of requiredRoutes) {
  checkFile(route);
}

const requiredOlistData = [
  'research/olist/candidate_SP_origin.csv',
  'research/olist/candidate_monthly.csv',
  'research/olist/candidate_windows.csv',
  'research/olist/conditional_review_comparison.csv',
  'research/olist/monthly_trend_matched.csv',
  'research/olist/review_after_delivery.csv',
  'research/olist/review_before_delivery.csv',
  'research/olist/review_timing.csv',
  'research/olist/state_decomposition.csv',
];

for (const csv of requiredOlistData) {
  checkFile(csv);
}

const portfolioJsonPath = resolve(distDir, 'api/portfolio.json');
if (existsSync(portfolioJsonPath)) {
  try {
    const manifest = JSON.parse(readFileSync(portfolioJsonPath, 'utf8'));
    if (manifest.origin !== 'https://gabrielchen.me') {
      errors.push(`Unexpected portfolio.json origin: ${manifest.origin}`);
    }
    if (manifest.mcpEndpoint !== 'https://gabrielchen.me/mcp') {
      errors.push(`Unexpected portfolio.json mcpEndpoint: ${manifest.mcpEndpoint}`);
    }
    const slugs = Array.isArray(manifest.pages) ? manifest.pages.map((p) => p.slug) : [];
    for (const expectedSlug of ['home', 'chanel', 'olist', 'smaller-companies']) {
      if (!slugs.includes(expectedSlug)) {
        errors.push(`portfolio.json missing approved page slug: ${expectedSlug}`);
      }
    }
    if (!manifest.build || typeof manifest.build.commit !== 'string' || manifest.build.commit === 'unknown') {
      errors.push('portfolio.json missing valid build.commit fingerprint');
    }
    if (!manifest.build || typeof manifest.build.shortCommit !== 'string' || manifest.build.shortCommit.length < 7) {
      errors.push('portfolio.json missing valid build.shortCommit fingerprint');
    }
  } catch (error) {
    errors.push(`Failed to parse dist/api/portfolio.json: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const indexPath = resolve(distDir, 'index.html');
if (existsSync(indexPath)) {
  const indexHtml = readFileSync(indexPath, 'utf8');

  const requiredHomepageStrings = [
    '/work/luxury-handbag-pricing-architecture/',
    '/work/olist-marketplace-analysis/',
    '/work/why-some-people-choose-smaller-companies/',
    '/life/italy/florence-portrait-edited@2x.webp',
    '/life/italy/bocconi-departments.webp',
    '/life/italy/old-town-walk.png',
    '/life/hong-kong-2026/concert-full.webp',
    '/life/hong-kong-2026/harbour-original.jpeg',
    'name="build-commit"',
  ];

  for (const snippet of requiredHomepageStrings) {
    if (!indexHtml.includes(snippet)) {
      errors.push(`dist/index.html missing required reference: ${snippet}`);
    }
  }

  // Ensure every local image referenced by homepage exists in dist/
  const imgSrcMatches = indexHtml.matchAll(/<img[^>]+src="(\/[^"]+)"/g);
  for (const match of imgSrcMatches) {
    const assetRel = decodeURIComponent(match[1].replace(/^\//, ''));
    checkFile(assetRel);
  }
}

// Anonymization guard on public pages
const publicPagesToScan = [
  'index.html',
  'work/why-some-people-choose-smaller-companies/index.html',
];
const forbiddenPatterns = [/JoinQuant/i, /聚宽/];

for (const relPath of publicPagesToScan) {
  const fullPath = resolve(distDir, relPath);
  if (!existsSync(fullPath)) continue;
  const content = readFileSync(fullPath, 'utf8');
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      errors.push(`Forbidden private term (${pattern}) found in dist/${relPath}`);
    }
  }
}

if (errors.length > 0) {
  console.error('[verify-build] Build integrity check failed:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('[verify-build] All published routes, assets, Olist data, and build fingerprints verified.');
