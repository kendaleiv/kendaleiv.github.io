import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { i as useTranslations, o as $$Layout, r as $$Header, t as $$Footer } from "./Footer_vGz7Z3Kr.mjs";
import { t as getCollection } from "./_astro_content_CsBPg6ag.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { t as getSortedPosts } from "./getSortedPosts_D01ZpjZM.mjs";
import { n as $$Breadcrumb, t as $$Main } from "./Main_BYnRYM4l.mjs";
import { t as $$Card } from "./Card_DQiDJN9u.mjs";
import { t as $$Pagination } from "./Pagination_CUqgCrn5.mjs";
//#region src/pages/posts/[...page].astro
var ____page__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://kendaleiv.com/");
var getStaticPaths = (async ({ paginate }) => {
	const posts = await getCollection("posts", ({ data }) => !data.draft);
	return paginate(getSortedPosts(posts), { pageSize: config.posts.perPage });
});
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	const { page } = Astro.props;
	const locale = Astro.currentLocale ?? config.site.lang;
	const t = useTranslations(locale);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.postsTitle} | ${config.site.title}` }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {})}${renderComponent($$result, "Main", $$Main, {
		"pageTitle": t.pages.postsTitle,
		"pageDesc": t.pages.postsDesc
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<ul>${page.data.map((data) => renderTemplate`${renderComponent($$result, "Card", $$Card, { ...data })}`)}</ul>` })}${renderComponent($$result, "Pagination", $$Pagination, { "page": page })}${renderComponent($$result, "Footer", $$Footer, { "noMarginTop": page.lastPage > 1 })}` })}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/posts/[...page].astro", void 0);
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/posts/[...page].astro";
var $$url = "/posts/[...page]/";
//#endregion
//#region \0virtual:astro:page:src/pages/posts/[...page]@_@astro
var page = () => ____page__exports;
//#endregion
export { page };
