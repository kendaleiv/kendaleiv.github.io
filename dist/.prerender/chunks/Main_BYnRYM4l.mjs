import { C as addAttribute, P as createAstro, _ as renderSlot, b as renderTemplate, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { c as stripBase, i as useTranslations, l as stripLocale, u as renderScript } from "./Footer_vGz7Z3Kr.mjs";
import { n as getRelativeLocaleUrl } from "./runtime_BVE8TaPU.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
//#region src/components/Breadcrumb.astro
createAstro("https://kendaleiv.com/");
var $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Breadcrumb;
	const locale = Astro.currentLocale ?? config.site.lang;
	const t = useTranslations(locale);
	const pathWithoutBase = stripBase(Astro.url.pathname).replace(/\/+$/, "");
	const breadcrumbList = stripLocale(pathWithoutBase, locale).split("/").slice(1).filter(Boolean);
	const decodeSegment = (value) => {
		try {
			return decodeURIComponent(value);
		} catch {
			return value;
		}
	};
	const navLabels = {
		posts: t.nav.posts,
		tags: t.nav.tags,
		about: t.nav.about,
		archives: t.nav.archives,
		search: t.nav.search
	};
	if (breadcrumbList[0] === "posts") breadcrumbList.splice(0, 2, `${t.nav.posts} (${t.pagination.page.toLowerCase()} ${breadcrumbList[1] || 1})`);
	if (breadcrumbList[0] === "tags" && !isNaN(Number(breadcrumbList[2]))) breadcrumbList.splice(1, 3, `${decodeSegment(breadcrumbList[1])} ${Number(breadcrumbList[2]) === 1 ? "" : `(${t.pagination.page.toLowerCase()} ${breadcrumbList[2]})`}`);
	return renderTemplate`${maybeRenderHead($$result)}<nav class="app-layout mt-8 mb-1" aria-label="breadcrumb"><ul class="font-light [&amp;&gt;li]:inline [&amp;&gt;li:not(:last-child)&gt;a]:hover:opacity-100"><li><a${addAttribute(getRelativeLocaleUrl(locale, ""), "href")} class="opacity-80">${t.nav.home}</a><span aria-hidden="true" class="opacity-80">&raquo;</span></li>${breadcrumbList.map((breadcrumb, index) => index + 1 === breadcrumbList.length ? renderTemplate`<li><span${addAttribute(["capitalize opacity-75", { lowercase: index > 0 }], "class:list")} aria-current="page">${navLabels[breadcrumb] ?? decodeSegment(breadcrumb)}</span></li>` : renderTemplate`<li><a${addAttribute(getRelativeLocaleUrl(locale, breadcrumb), "href")} class="capitalize opacity-70">${navLabels[breadcrumb] ?? decodeSegment(breadcrumb)}</a><span aria-hidden="true" class="opacity-70">&raquo;</span></li>`)}</ul></nav>`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Breadcrumb.astro", void 0);
//#endregion
//#region src/components/Main.astro
createAstro("https://kendaleiv.com/");
var $$Main = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Main;
	const { pageTitle, pageDesc, class: className } = Astro.props;
	const locale = Astro.currentLocale ?? config.site.lang;
	const backUrl = config.features.showBackButton ? Astro.url.pathname : getRelativeLocaleUrl(locale, "");
	return renderTemplate`${maybeRenderHead($$result)}<main${addAttribute(backUrl, "data-backUrl")} id="main-content"${addAttribute(["app-layout pb-4", className], "class:list")}><h1 class="text-2xl font-semibold sm:text-3xl">${pageTitle}</h1><p class="mt-2 mb-6 italic">${pageDesc}</p>${renderSlot($$result, $$slots["default"])}</main>${renderScript($$result, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Main.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Main.astro", void 0);
//#endregion
export { $$Breadcrumb as n, $$Main as t };
