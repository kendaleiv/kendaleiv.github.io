import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { parse } from "parse5";
import { parse as parseYaml } from "yaml";

const site = "https://kendaleiv.com";
const dist = resolve("dist");
const manifest = JSON.parse(readFileSync("scripts/migration-manifest.json"));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = file => readFileSync(file, "utf8");
const hash = value => createHash("sha256").update(value).digest("hex");
const walk = node => [node, ...(node.childNodes ?? []).flatMap(walk)];
const attrs = node =>
  Object.fromEntries(
    (node.attrs ?? []).map(({ name, value }) => [name, value])
  );
const text = node =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(text).join("");
const files = dir =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
const outputPath = pathname => {
  const path = resolve(dist, `.${decodeURIComponent(pathname)}`);
  assert(path === dist || path.startsWith(`${dist}/`), "Path escapes dist");
  return existsSync(path) && statSync(path).isDirectory()
    ? join(path, "index.html")
    : path;
};
const documents = new Map();
for (const file of files(dist).filter(file => file.endsWith(".html"))) {
  const nodes = walk(parse(read(file)));
  documents.set(file, {
    nodes,
    ids: new Set(nodes.map(node => attrs(node).id).filter(Boolean)),
    metas: nodes.filter(node => node.tagName === "meta").map(attrs),
    links: nodes.filter(node => node.tagName === "a").map(attrs),
  });
}
const meta = (doc, key) =>
  doc.metas.find(item => item.name === key || item.property === key)?.content;
const canonical = doc =>
  doc.nodes.find(node => attrs(node).rel === "canonical");
const home = documents.get(outputPath("/"));
for (const profile of [
  "https://github.com/kendaleiv",
  "https://mastodon.social/@kendaleiv",
  "https://www.linkedin.com/in/kendaleiv/",
  "https://bsky.app/profile/kendaleiv.com",
]) {
  check(
    home?.links.some(link => link.href === profile),
    `Missing profile: ${profile}`
  );
}
check(
  !home?.links.some(link => link.href?.startsWith("https://x.com/")),
  "X profile present"
);
check(
  home?.links
    .find(link => link.href === "https://mastodon.social/@kendaleiv")
    ?.rel?.split(/\s+/)
    .includes("me"),
  "Mastodon profile verification missing"
);
const checkPng = pathname => {
  const file = outputPath(pathname);
  check(existsSync(file), `Missing social image: ${pathname}`);
  if (!existsSync(file)) return;
  const bytes = readFileSync(file);
  check(
    bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")) &&
      bytes.readUInt32BE(16) === 1200 &&
      bytes.readUInt32BE(20) === 630,
    `Invalid 1200×630 PNG: ${pathname}`
  );
};

let localReferences = 0;
for (const [file, doc] of documents) {
  const route = file.slice(dist.length).replace(/index\.html$/, "");
  const base = new URL(route, site);
  check(meta(doc, "description")?.length > 0, `${route}: missing description`);
  check(
    attrs(canonical(doc) ?? {}).href === base.href,
    `${route}: canonical does not match public route`
  );
  for (const favicon of [
    "/favicon.svg",
    "/favicon-96x96.png",
    "/favicon.ico",
    "/apple-touch-icon.png",
  ]) {
    check(
      doc.nodes.some(node => attrs(node).href === favicon),
      `${route}: custom favicon missing: ${favicon}`
    );
  }
  check(
    doc.nodes.some(node =>
      attrs(node).src?.includes("gtag/js?id=G-72NVH76BJC")
    ),
    `${route}: Google Analytics missing`
  );
  for (const node of doc.nodes) {
    const attributes = attrs(node);
    const references = ["href", "src", "poster", "action"]
      .map(name => attributes[name])
      .filter(Boolean);
    if (attributes.srcset && !attributes.srcset.startsWith("data:")) {
      references.push(
        ...attributes.srcset.split(",").map(item => item.trim().split(/\s/)[0])
      );
    }
    for (const reference of references) {
      const url = new URL(reference, base);
      if (url.origin !== site) continue;
      localReferences++;
      const target = outputPath(url.pathname);
      check(
        existsSync(target),
        `${route}: broken local reference ${reference}`
      );
      if (url.hash && url.hash !== "#" && documents.has(target)) {
        check(
          documents.get(target).ids.has(decodeURIComponent(url.hash.slice(1))),
          `${route}: missing fragment ${reference}`
        );
      }
    }
  }
}

const sources = files("src/content/posts").filter(file => /\.mdx?$/.test(file));
const scheduledPostMargin = 15 * 60 * 1000;
const isPublished = data =>
  !data.draft &&
  Date.now() > new Date(data.pubDatetime).getTime() - scheduledPostMargin;
const sourcePaths = new Set();
const postPaths = new Set();
for (const file of sources) {
  const source = read(file);
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  assert(match, `Invalid front matter: ${file}`);
  const data = parseYaml(match[1]);
  const postId = relative("src/content/posts", file).slice(
    0,
    -extname(file).length
  );
  const pathname = `/${postId.split(sep).join("/")}/`;
  check(!sourcePaths.has(pathname), `Duplicate post route: ${pathname}`);
  sourcePaths.add(pathname);
  check(
    typeof data.description === "string" &&
      data.description.length >= 20 &&
      data.description.length <= 220,
    `${pathname}: missing or excessive description`
  );
  check(Array.isArray(data.tags), `${pathname}: tags must be an array`);
  check(
    !/{%\s*(post_url|raw|endraw)/.test(source),
    `${pathname}: Liquid remains`
  );
  const expected = manifest.posts.find(post => post.path === pathname);
  if (expected) {
    check(data.title === expected.title, `${pathname}: title changed`);
    check(
      new Date(data.pubDatetime).toISOString() ===
        new Date(expected.date).toISOString(),
      `${pathname}: publication date changed`
    );
    check(
      JSON.stringify(data.tags) === JSON.stringify(expected.tags),
      `${pathname}: tags changed`
    );
    const codeBlocks = [
      ...match[2].matchAll(/^(`{3,})[^\n]*\n(.*?)^\1\s*$/gms),
    ].map(block => hash(block[2].replace(/[ \t]+$/gm, "")));
    check(
      JSON.stringify(codeBlocks) === JSON.stringify(expected.codeBlocks),
      `${pathname}: authored code changed`
    );
  }
  if (!isPublished(data)) continue;
  postPaths.add(pathname);
  const doc = documents.get(outputPath(pathname));
  check(doc, `Post route missing: ${pathname}`);
  if (!doc) continue;
  check(
    meta(doc, "description") === data.description,
    `${pathname}: description mismatch`
  );
  check(meta(doc, "author") === "Ken Dale", `${pathname}: wrong author`);
  check(
    doc.nodes.some(
      node => node.tagName === "h1" && text(node).trim() === data.title
    ),
    `${pathname}: wrong article heading`
  );
  check(
    meta(doc, "article:published_time") ===
      new Date(data.pubDatetime).toISOString(),
    `${pathname}: incorrect publication metadata`
  );
  check(
    doc.metas.some(
      item => item.property === "og:type" && item.content === "article"
    ),
    `${pathname}: article Open Graph metadata missing`
  );
  const image = `${site}${pathname}index.png`;
  for (const key of ["og:image", "twitter:image"]) {
    check(meta(doc, key) === image, `${pathname}: wrong ${key}`);
  }
  check(
    meta(doc, "twitter:card") === "summary_large_image",
    `${pathname}: wrong card type`
  );
  checkPng(`${pathname}index.png`);
  const structuredData = doc.nodes.find(
    node =>
      node.tagName === "script" && attrs(node).type === "application/ld+json"
  );
  check(structuredData, `${pathname}: structured data missing`);
  if (structuredData) {
    const data = JSON.parse(text(structuredData));
    check(
      data["@type"] === "BlogPosting",
      `${pathname}: wrong structured data type`
    );
    check(
      data.author[0].name === "Ken Dale",
      `${pathname}: wrong structured author`
    );
  }
  for (const iframe of expected?.iframes ?? []) {
    check(
      doc.nodes.some(
        node => node.tagName === "iframe" && attrs(node).src === iframe
      ),
      `${pathname}: video embed missing`
    );
  }
  check(
    doc.nodes.some(node => "data-pagefind-body" in attrs(node)),
    `${pathname}: search body missing`
  );
  check(
    !doc.links.some(link =>
      link.href?.startsWith("https://x.com/intent/post?")
    ),
    `${pathname}: X sharing link present`
  );
  check(
    doc.links.some(link => {
      if (!link.href?.startsWith("https://t.me/share/url?url=")) return false;
      return (
        new URL(link.href).searchParams.get("url") === `${site}${pathname}`
      );
    }),
    `${pathname}: incorrect sharing URL`
  );
}

for (const [postId, title] of [
  ["violin-backed-by-gibber", "Violin backed by Gibber"],
  [
    "we-replaced-a-multi-application-home-grown-authentication-system",
    "Conference talk recording",
  ],
]) {
  check(
    !read(`src/content/posts/${postId}.md`).includes(`title="${title}"`),
    `/${postId}/: migration-added iframe title present`
  );
}

assert.equal(
  manifest.posts.length,
  78,
  "Historical post baseline must remain 78"
);
for (const post of manifest.posts) {
  check(sourcePaths.has(post.path), `Original post missing: ${post.path}`);
}
for (const asset of manifest.assets) {
  const file = outputPath(asset.path);
  check(existsSync(file), `Missing original asset: ${asset.path}`);
  if (existsSync(file)) {
    check(
      hash(readFileSync(file)) === asset.sha256,
      `Changed asset: ${asset.path}`
    );
  }
}
for (const page of manifest.pages) {
  const doc = documents.get(outputPath(page.path));
  check(doc, `Standalone page missing: ${page.path}`);
  if (!doc) continue;
  for (const pair of page.links) {
    check(
      doc.links.some(link => link.href === (pair[0] || pair[1])),
      `${page.path}: authored link missing`
    );
  }
  for (const iframe of page.iframes) {
    check(
      doc.nodes.some(
        node => node.tagName === "iframe" && attrs(node).src === iframe
      ),
      `${page.path}: video missing`
    );
  }
}
for (const [file, doc] of documents) {
  for (const node of doc.nodes.filter(node => node.tagName === "iframe")) {
    check(attrs(node).src.startsWith("https://"), `${file}: insecure iframe`);
  }
}
const tweetDoc = documents.get(
  outputPath("/iems-and-headphones-for-developer-use/")
);
check(
  tweetDoc.nodes.some(
    node => attrs(node).src === "https://platform.twitter.com/widgets.js"
  ),
  "Twitter script missing"
);
check(
  tweetDoc.links.some(
    link => link.href === "https://twitter.com/detly/status/394755439314755584"
  ),
  "Twitter fallback link missing"
);
const rawDoc = documents.get(
  outputPath("/subscribing-to-browser-title-changes-using-angular/")
);
check(
  rawDoc.nodes.some(
    node =>
      node.tagName === "code" &&
      text(node).includes("<h1>{{ headerText }}</h1>")
  ),
  "Raw Angular template was not preserved"
);

const sitemapIndex = read("dist/sitemap-index.xml");
const sitemapFiles = [...sitemapIndex.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  match => outputPath(new URL(match[1]).pathname)
);
const sitemap = sitemapFiles.map(read).join("");
for (const pathname of [
  ...postPaths,
  "/about/",
  "/rimdev/",
  "/archives/",
  "/posts/",
  "/tags/",
]) {
  check(
    sitemap.includes(`<loc>${site}${pathname}</loc>`),
    `Sitemap missing ${pathname}`
  );
}
for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const url = new URL(match[1]);
  check(
    url.origin === site && existsSync(outputPath(url.pathname)),
    `Invalid sitemap URL ${url}`
  );
}
const rss = read("dist/rss.xml");
const items = [...rss.matchAll(/<item>(.*?)<\/item>/gs)];
check(items.length === postPaths.size, "rss.xml: wrong post count");
for (const post of manifest.posts) {
  check(
    rss.includes(`<link>${site}${post.path}</link>`),
    `rss.xml: missing ${post.path}`
  );
}
check(!existsSync("dist/feed.xml"), "Legacy feed.xml route still exists");
for (const pathname of [
  "/",
  "/posts/",
  "/posts/2/",
  "/tags/",
  "/archives/",
  "/search/",
  "/404.html",
]) {
  check(existsSync(outputPath(pathname)), `Missing core route ${pathname}`);
}
check(read("dist/CNAME").trim() === "kendaleiv.com", "Custom domain missing");
check(existsSync("dist/.nojekyll"), ".nojekyll missing");
check(
  read("dist/robots.txt").includes(`${site}/sitemap-index.xml`),
  "Robots sitemap missing"
);
check(existsSync("dist/pagefind/pagefind.js"), "Pagefind runtime missing");
const pagefind = JSON.parse(read("dist/pagefind/pagefind-entry.json"));
check(
  pagefind.languages.en.page_count === postPaths.size,
  "Pagefind indexed post count differs"
);
checkPng("/og.png");

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${postPaths.size} posts (78 original URLs), ${documents.size} HTML pages, ${localReferences} local references, ${manifest.assets.length} unchanged assets, embeds, metadata, feeds, sitemap, and Pagefind.\n`
  );
}
