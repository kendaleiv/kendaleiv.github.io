import { P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent } from "./config_C4I1RSKp.mjs";
import { a as $$LinkButton, i as useTranslations } from "./Footer_vGz7Z3Kr.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { t as IconArrowLeft_default } from "./IconArrowLeft_D2C-EWOd.mjs";
import { t as IconArrowRight_default } from "./IconArrowRight_BuYYHp9H.mjs";
//#region src/components/Pagination.astro
createAstro("https://kendaleiv.com/");
var $$Pagination = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pagination;
	const { page } = Astro.props;
	const t = useTranslations(Astro.currentLocale);
	return renderTemplate`${page.lastPage > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="mt-auto mb-8 flex justify-center gap-4" role="navigation" aria-label="Pagination Navigation">${renderComponent($$result, "LinkButton", $$LinkButton, {
		"disabled": !page.url.prev,
		"href": page.url.prev,
		"class:list": ["select-none", { "opacity-50": !page.url.prev }],
		"aria-label": t.a11y.goToPreviousPage
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "IconArrowLeft", IconArrowLeft_default, { "class": "inline-block rtl:rotate-180" })}${t.pagination.prev}` })}${page.currentPage} / ${page.lastPage}${renderComponent($$result, "LinkButton", $$LinkButton, {
		"disabled": !page.url.next,
		"href": page.url.next,
		"class:list": ["select-none", { "opacity-50": !page.url.next }],
		"aria-label": t.a11y.goToNextPage
	}, { "default": ($$result) => renderTemplate`${t.pagination.next}${renderComponent($$result, "IconArrowRight", IconArrowRight_default, { "class": "inline-block rtl:rotate-180" })}` })}</nav>`}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Pagination.astro", void 0);
//#endregion
export { $$Pagination as t };
