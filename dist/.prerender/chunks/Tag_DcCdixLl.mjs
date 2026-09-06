import { C as addAttribute, P as createAstro, a as renderTransition, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { n as getRelativeLocaleUrl, t as createSvgComponent } from "./runtime_BVE8TaPU.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
/* empty css                          */
//#region src/assets/icons/IconHash.svg
var IconHash_default = createSvgComponent({
	"meta": {
		"src": "/_astro/IconHash.CPmqEwD_.svg",
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
		"class": "icon icon-tabler icons-tabler-outline icon-tabler-hash",
		"viewBox": "0 0 24 24"
	},
	"children": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M5 9h14M5 15h14M11 4 7 20M17 4l-4 16\" />",
	"styles": []
});
//#endregion
//#region src/components/Tag.astro
createAstro("https://kendaleiv.com/");
var $$Tag = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tag;
	const { tag, tagName, size = "lg" } = Astro.props;
	const locale = Astro.currentLocale ?? config.site.lang;
	return renderTemplate`${maybeRenderHead($$result)}<li><a${addAttribute(renderTransition($$result, "bztu2lml", "", tag), "data-astro-transition-scope")}${addAttribute(getRelativeLocaleUrl(locale, `tags/${tag}/`), "href")}${addAttribute([
		"flex items-center gap-0.5",
		"border-foreground border-b-2 border-dashed",
		"hover:border-accent hover:text-accent hover:-mt-0.5",
		"focus-visible:text-accent focus-visible:border-none",
		{ "text-sm": size === "sm" },
		{ "text-lg": size === "lg" }
	], "class:list")}>${renderComponent($$result, "IconHash", IconHash_default, { "class:list": [
		"opacity-80",
		{ "size-5": size === "lg" },
		{ "size-4": size === "sm" }
	] })}${tagName}</a></li>`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Tag.astro", "self");
//#endregion
export { $$Tag as t };
