import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const editorialDirectory = resolve(root, 'src/components/editorial');
const tokensPath = resolve(root, 'src/styles/tokens.css');
const tokens = readFileSync(tokensPath, 'utf8');
const semanticSize = /^var\(--font-size-(micro|supporting|secondary-reading|body|lead|statement|section-title|project-title)\)$/;
const semanticFamily = /^var\(--font-(display|reading|numeric|metadata)\)$/;

function collectAstroFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) return collectAstroFiles(path);
    return extname(entry.name) === '.astro' ? [path] : [];
  });
}

function collectRuntimeFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) return entry.name === 'lab' ? [] : collectRuntimeFiles(path);
    return ['.astro', '.css'].includes(extname(entry.name)) && path !== tokensPath ? [path] : [];
  });
}

const productionFiles = [
  'src/styles/global.css',
  'src/styles/typography.css',
  'src/styles/home.css',
  'src/styles/home-chanel.css',
  'src/styles/home-olist.css',
  'src/styles/home-inquiry.css',
  'src/styles/report.css',
  'src/components/system/ThemeToggle.astro',
  'src/pages/work/luxury-handbag-pricing-architecture.astro',
  'src/pages/work/olist-marketplace-analysis.astro',
  'src/pages/work/why-some-people-choose-smaller-companies.astro',
].map((path) => resolve(root, path)).concat(collectAstroFiles(editorialDirectory));
const runtimeFiles = collectRuntimeFiles(resolve(root, 'src'));

describe('production typography source contract', () => {
  test('defines exactly the approved family and size token names', () => {
    const familyTokenNames = [...tokens.matchAll(/^\s*(--font-(?!size-)[\w-]+)\s*:/gm)]
      .map((match) => match[1])
      .sort();
    const sizeTokenNames = [...tokens.matchAll(/^\s*(--font-size-[\w-]+)\s*:/gm)]
      .map((match) => match[1])
      .sort();

    expect(familyTokenNames).toEqual([
      '--font-display',
      '--font-metadata',
      '--font-numeric',
      '--font-reading',
    ]);
    expect(sizeTokenNames).toEqual([
      '--font-size-body',
      '--font-size-lead',
      '--font-size-micro',
      '--font-size-project-title',
      '--font-size-secondary-reading',
      '--font-size-section-title',
      '--font-size-statement',
      '--font-size-supporting',
    ]);
  });

  test('uses semantic font-size roles for every production declaration', () => {
    const violations = productionFiles.flatMap((path) => {
      const source = readFileSync(path, 'utf8');
      const declarations = source.match(/font-size\s*:\s*[^;]+/g) ?? [];

      return declarations.flatMap((declaration) => {
        const value = declaration.replace(/^font-size\s*:\s*/, '').trim();
        return value === 'inherit' || semanticSize.test(value)
          ? []
          : [`${relative(root, path)}: ${declaration}`];
      });
    });

    expect(violations).toEqual([]);
  });

  test('uses semantic family roles for every production declaration', () => {
    const violations = runtimeFiles.flatMap((path) => {
      const source = readFileSync(path, 'utf8');
      const declarations = source.match(/font-family\s*:\s*[^;]+/g) ?? [];

      return declarations.flatMap((declaration) => {
        const value = declaration.replace(/^font-family\s*:\s*/, '').trim();
        return semanticFamily.test(value)
          ? []
          : [`${relative(root, path)}: ${declaration}`];
      });
    });

    expect(violations).toEqual([]);
  });

  test('does not expose legacy aliases or finalist families in production sources', () => {
    const forbidden = /--font-report-display|--font-report-body|--font-size-reading|Newsreader|Inter Variable/g;
    const violations = productionFiles.flatMap((path) => {
      const source = readFileSync(path, 'utf8');
      return (source.match(forbidden) ?? []).map((match) => `${relative(root, path)}: ${match}`);
    });

    expect(violations).toEqual([]);
  });
});
