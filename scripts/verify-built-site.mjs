import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
const root = resolve("dist");
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = resolve(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
const pages = walk(root).filter((path) => path.endsWith(".html"));
let links = 0;
for (const path of pages) {
  const html = readFileSync(path, "utf8");
  const route = relative(root, path).replace(/index\.html$/, "");
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|tel:|\/\/)/.test(href)) continue;
    const url = new URL(
      href.replaceAll("&amp;", "&"),
      `https://site.invalid/${route}`,
    );
    const destination = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    assert(destination.startsWith(root), `Path escaped output: ${href}`);
    const file =
      existsSync(destination) && statSync(destination).isDirectory()
        ? resolve(destination, "index.html")
        : destination;
    assert(
      existsSync(file),
      `Broken local target: ${relative(root, path)} → ${href}`,
    );
    if (url.hash && file.endsWith(".html")) {
      const ids = [
        ...readFileSync(file, "utf8").matchAll(/\bid="([^"]+)"/g),
      ].map((m) => m[1]);
      assert(
        ids.includes(decodeURIComponent(url.hash.slice(1))),
        `Missing fragment ${href}`,
      );
    }
    links++;
  }
}
const slugs = [
  "luxury-handbag-pricing-architecture",
  "olist-marketplace-analysis",
  "competitive-positioning-against-giants",
];
for (const slug of slugs) {
  const html = readFileSync(resolve(root, "work", slug, "index.html"), "utf8");
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert(html.includes('name="robots" content="noindex"'));
  for (const id of ["context", "analysis", "limits", "sources"])
    assert(html.includes(`id="${id}"`));
  assert(!/G\.\d{3}/.test(html), "Unapproved permanent ID");
}
const essay = readFileSync(
  resolve(root, "work", slugs[0], "index.html"),
  "utf8",
);
const reading = readFileSync(
  resolve(root, "work", slugs[0], "reading/index.html"),
  "utf8",
);
const body = (html) =>
  html.match(/<div class="work-prose" data-case-body>([\s\S]*?)<\/div>/)?.[1];
assert(body(essay), "Missing essay body");
assert.equal(body(essay), body(reading), "Reading prose drift");
const tables = (html) =>
  [...html.matchAll(/<table data-price-table>([\s\S]*?)<\/table>/g)].map(
    (m) => m[1],
  );
assert.equal(tables(essay).length, 2);
assert.deepEqual(tables(essay), tables(reading), "Reading data drift");
assert.equal([...reading.matchAll(/<details open/g)].length, 2);
assert(!reading.includes("data-price-chart"));
for (const price of ["€4,850", "€6,500", "$7,100", "$13,500"])
  assert(reading.includes(price));
console.log(
  `PASS: ${pages.length} built pages, ${links} local links/assets; case structure, noindex, IDs, reading prose and data equivalence.`,
);
