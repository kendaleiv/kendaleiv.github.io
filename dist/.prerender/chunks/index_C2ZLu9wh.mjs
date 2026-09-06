import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { i as useTranslations, o as $$Layout, r as $$Header, t as $$Footer } from "./Footer_vGz7Z3Kr.mjs";
import { n as getRelativeLocaleUrl } from "./runtime_BVE8TaPU.mjs";
import { t as getCollection } from "./_astro_content_CsBPg6ag.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { t as postFilter } from "./postFilter_iSSclu9W.mjs";
import { n as $$Breadcrumb, t as $$Main } from "./Main_BYnRYM4l.mjs";
import { t as $$Card } from "./Card_DQiDJN9u.mjs";
//#region src/pages/archives/_utils/getPostsByGroupCondition.ts
function getPostsByGroupCondition(posts, groupFunction) {
	const result = {};
	for (let i = 0; i < posts.length; i++) {
		const item = posts[i];
		const groupKey = groupFunction(item, i);
		if (!result[groupKey]) result[groupKey] = [];
		result[groupKey].push(item);
	}
	return result;
}
//#endregion
//#region src/pages/archives/index.astro
var archives_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://kendaleiv.com/");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const locale = Astro.currentLocale ?? config.site.lang;
	const notFoundUrl = getRelativeLocaleUrl(locale, "404");
	if (!config.features.showArchives && notFoundUrl) return Astro.rewrite(notFoundUrl);
	const t = useTranslations(locale);
	const filteredPosts = (await getCollection("posts")).filter(postFilter);
	const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.archivesTitle} | ${config.site.title}` }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {})}${renderComponent($$result, "Main", $$Main, {
		"pageTitle": t.pages.archivesTitle,
		"pageDesc": t.pages.archivesDesc
	}, { "default": ($$result) => renderTemplate`${Object.entries(getPostsByGroupCondition(filteredPosts, (post) => post.data.pubDatetime.getFullYear())).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)).map(([year, yearGroup]) => renderTemplate`${maybeRenderHead($$result)}<div><span class="text-2xl font-bold">${year}</span><sup class="text-muted-foreground text-sm">${yearGroup.length}</sup>${Object.entries(getPostsByGroupCondition(yearGroup, (post) => post.data.pubDatetime.getMonth() + 1)).sort(([monthA], [monthB]) => Number(monthB) - Number(monthA)).map(([month, monthGroup]) => renderTemplate`<div class="flex flex-col sm:flex-row"><div class="mt-6 min-w-36 text-lg sm:my-6"><span class="font-bold">${monthFormatter.format(new Date(2e3, Number(month) - 1, 1))}</span><sup class="text-muted-foreground text-xs">${monthGroup.length}</sup></div><ul>${monthGroup.sort((a, b) => Math.floor(new Date(b.data.pubDatetime).getTime() / 1e3) - Math.floor(new Date(a.data.pubDatetime).getTime() / 1e3)).map((data) => renderTemplate`${renderComponent($$result, "Card", $$Card, { ...data })}`)}</ul></div>`)}</div>`)}` })}${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/archives/index.astro", void 0);
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/archives/index.astro";
var $$url = "/archives/";
//#endregion
//#region \0virtual:astro:page:src/pages/archives/index@_@astro
var page = () => archives_exports;
//#endregion
export { page };
