import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { a as $$LinkButton, i as useTranslations, o as $$Layout, r as $$Header, t as $$Footer } from "./Footer_vGz7Z3Kr.mjs";
import { n as getRelativeLocaleUrl } from "./runtime_BVE8TaPU.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://kendaleiv.com/");
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$404;
	const locale = Astro.currentLocale ?? config.site.lang;
	const t = useTranslations(locale);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${t.notFound.title} | ${config.site.title}`,
		"canonicalURL": new URL("404.html", config.site.url).href
	}, {
		"default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main id="main-content" class="app-layout flex flex-1 items-center justify-center"><div class="mb-14 flex flex-col items-center justify-center"><h1 class="text-accent text-9xl font-bold">404</h1><span aria-hidden="true"> ¯\\_(ツ)_/¯ </span><p class="mt-4 text-2xl sm:text-3xl">${t.notFound.message}</p>${renderComponent($$result, "LinkButton", $$LinkButton, {
			"href": getRelativeLocaleUrl(locale, ""),
			"class": "my-6 text-lg underline decoration-dashed underline-offset-8"
		}, { "default": ($$result) => renderTemplate`${t.notFound.goHome}` })}</div></main>${renderComponent($$result, "Footer", $$Footer, {})}`,
		"head": ($$result) => renderTemplate`<meta name="robots" content="noindex">`
	})}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/404.astro", void 0);
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/404.astro";
var $$url = "/404/";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
