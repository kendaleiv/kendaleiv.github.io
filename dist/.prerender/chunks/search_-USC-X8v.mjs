import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { C as addAttribute, P as createAstro, b as renderTemplate, f as renderComponent, i as createTransitionScope, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { i as useTranslations, o as $$Layout, r as $$Header, s as getAssetPath, t as $$Footer, u as renderScript } from "./Footer_vGz7Z3Kr.mjs";
import { n as getRelativeLocaleUrl } from "./runtime_BVE8TaPU.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
/* empty css                          */
import { n as $$Breadcrumb, t as $$Main } from "./Main_BYnRYM4l.mjs";
//#region src/pages/search.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Search,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://kendaleiv.com/");
var $$Search = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Search;
	const locale = Astro.currentLocale ?? config.site.lang;
	const notFoundUrl = getRelativeLocaleUrl(locale, "404");
	if (config.features.search !== "pagefind" && notFoundUrl) return Astro.rewrite(notFoundUrl);
	const backUrl = config.features.showBackButton ? `${Astro.url.pathname}` : getRelativeLocaleUrl(locale, "");
	const pagefindBundlePath = getAssetPath("pagefind/");
	const t = useTranslations(locale);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.searchTitle} | ${config.site.title}` }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {})}${renderComponent($$result, "Main", $$Main, {
		"pageTitle": t.pages.searchTitle,
		"pageDesc": t.pages.searchDesc
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(createTransitionScope($$result, "637jddtz"), "data-astro-transition-persist")} id="pagefind-search"${addAttribute(backUrl, "data-backurl")}${addAttribute(pagefindBundlePath, "data-bundle-path")}></div>` })}${renderComponent($$result, "Footer", $$Footer, {})}` })}${renderScript($$result, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/search.astro", "self");
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/search.astro";
var $$url = "/search/";
//#endregion
//#region \0virtual:astro:page:src/pages/search@_@astro
var page = () => search_exports;
//#endregion
export { page };
