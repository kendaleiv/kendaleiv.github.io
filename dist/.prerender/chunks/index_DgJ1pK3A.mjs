import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { C as addAttribute, P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { a as $$LinkButton, i as useTranslations, n as $$Socials, o as $$Layout, r as $$Header, t as $$Footer, u as renderScript } from "./Footer_vGz7Z3Kr.mjs";
import { n as getRelativeLocaleUrl, t as createSvgComponent } from "./runtime_BVE8TaPU.mjs";
import { t as getCollection } from "./_astro_content_CsBPg6ag.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { t as getSortedPosts } from "./getSortedPosts_D01ZpjZM.mjs";
import { t as IconArrowRight_default } from "./IconArrowRight_BuYYHp9H.mjs";
import { t as $$Card } from "./Card_DQiDJN9u.mjs";
//#region src/assets/icons/IconRss.svg
var IconRss_default = createSvgComponent({
	"meta": {
		"src": "/_astro/IconRss.BYWRoVjV.svg",
		"width": 24,
		"height": 24,
		"format": "svg"
	},
	"attributes": {
		"width": "24",
		"height": "24",
		"fill": "none",
		"stroke": "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		"class": "icon icon-tabler icons-tabler-outline icon-tabler-rss",
		"viewBox": "0 0 24 24"
	},
	"children": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M4 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M4 4a16 16 0 0 1 16 16M4 11a9 9 0 0 1 9 9\" />",
	"styles": []
});
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://kendaleiv.com/");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Index;
	const { socials, posts: postsConfig } = config;
	const locale = Astro2.currentLocale ?? config.site.lang;
	const t = useTranslations(locale);
	const posts = await getCollection("posts");
	const sortedPosts = getSortedPosts(posts);
	const featuredPosts = sortedPosts.filter(({ data }) => data.featured);
	const recentPosts = sortedPosts.filter(({ data }) => !data.featured);
	const homePath = getRelativeLocaleUrl(locale, "");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, {})}${maybeRenderHead($$result2)}<main id="main-content" data-layout="index"${addAttribute(homePath, "data-home-path")} class="app-layout"><section id="hero" class="border-border border-b pt-8 pb-6"><h1 class="my-4 inline-block text-4xl font-bold sm:my-8 sm:text-5xl">Ken Dale</h1><a target="_blank"${addAttribute(`${"/".replace(/\/?$/, "/")}rss.xml`, "href")} class="inline-block" aria-label="RSS Feed" title="RSS Feed">${renderComponent($$result2, "IconRss", IconRss_default, {
		"width": 20,
		"height": 20,
		"class": "stroke-accent scale-125 stroke-3 rtl:-rotate-90"
	})}<span class="sr-only">RSS Feed</span></a><p>Jesus follower, husband, father, software engineer.</p><p class="mt-2">Read the blog posts or learn more${renderComponent($$result2, "LinkButton", $$LinkButton, {
		"class": "hover:text-accent underline decoration-dashed underline-offset-4",
		"href": getRelativeLocaleUrl(locale, "about")
	}, { "default": ($$result3) => renderTemplate`about me` })}.</p>${socials.length > 0 && renderTemplate`<div class="mt-4 flex max-sm:flex-col sm:items-center"><div class="me-2 mb-1 whitespace-nowrap sm:mb-0">${t.home.socialLinks}:</div>${renderComponent($$result2, "Socials", $$Socials, {})}</div>`}</section>${featuredPosts.length > 0 && renderTemplate`<section id="featured"${addAttribute(["pt-12 pb-6", { "border-border border-b": recentPosts.length > 0 }], "class:list")}><h2 class="text-2xl font-semibold tracking-wide">${t.home.featured}</h2><ul>${featuredPosts.map((data) => renderTemplate`${renderComponent($$result2, "Card", $$Card, {
		"variant": "h3",
		...data
	})}`)}</ul></section>`}${recentPosts.length > 0 && renderTemplate`<section id="recent-posts" class="pt-12 pb-6"><h2 class="text-2xl font-semibold tracking-wide">${t.home.recentPosts}</h2><ul>${recentPosts.slice(0, postsConfig.perIndex).map((data) => renderTemplate`${renderComponent($$result2, "Card", $$Card, {
		"variant": "h3",
		...data
	})}`)}</ul></section>`}<div class="my-8 text-center">${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": getRelativeLocaleUrl(locale, "posts") }, { "default": ($$result3) => renderTemplate`${t.home.allPosts}${renderComponent($$result3, "IconArrowRight", IconArrowRight_default, { "class": "inline-block rtl:-rotate-180" })}` })}</div></main>${renderComponent($$result2, "Footer", $$Footer, {})}` })}${renderScript($$result, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/index.astro", void 0);
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
