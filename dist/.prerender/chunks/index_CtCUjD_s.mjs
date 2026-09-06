import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { i as useTranslations, o as $$Layout, r as $$Header, t as $$Footer } from "./Footer_vGz7Z3Kr.mjs";
import { t as getCollection } from "./_astro_content_CsBPg6ag.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { t as $$Tag } from "./Tag_DcCdixLl.mjs";
import { n as $$Breadcrumb, t as $$Main } from "./Main_BYnRYM4l.mjs";
import { t as getUniqueTags } from "./getUniqueTags_DhbxRCKp.mjs";
//#region src/pages/tags/index.astro
var tags_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://kendaleiv.com/");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const posts = await getCollection("posts", ({ data }) => !data.draft);
	const tags = getUniqueTags(posts);
	const locale = Astro.currentLocale ?? config.site.lang;
	const t = useTranslations(locale);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.tagsTitle} | ${config.site.title}` }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {})}${renderComponent($$result, "Main", $$Main, {
		"pageTitle": t.pages.tagsTitle,
		"pageDesc": t.pages.tagsDesc
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<ul class="flex flex-wrap gap-6">${tags.map(({ tag, tagName }) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, {
		"tag": tag,
		"tagName": tagName
	})}`)}</ul>` })}${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/tags/index.astro", void 0);
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/tags/index.astro";
var $$url = "/tags/";
//#endregion
//#region \0virtual:astro:page:src/pages/tags/index@_@astro
var page = () => tags_exports;
//#endregion
export { page };
