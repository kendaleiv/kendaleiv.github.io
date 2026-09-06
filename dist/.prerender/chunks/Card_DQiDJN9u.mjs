import { C as addAttribute, P as createAstro, a as renderTransition, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent } from "./config_C4I1RSKp.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { n as getPostUrl } from "./getPostPaths_yLBopjp2.mjs";
import { n as $$Datetime, t as toTransitionName } from "./toTransitionName_CIH4BEQn.mjs";
/* empty css                          */
//#region src/components/Card.astro
createAstro("https://kendaleiv.com/");
var $$Card = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Card;
	const { variant: Heading = "h2", id, data, filePath } = Astro.props;
	const { title, description, ...props } = data;
	return renderTemplate`${maybeRenderHead($$result)}<li class="my-6"><a${addAttribute(getPostUrl(id, filePath, Astro.currentLocale), "href")}${addAttribute([
		"text-accent inline-block text-lg font-medium",
		"decoration-dashed underline-offset-4 hover:underline",
		"focus-visible:no-underline focus-visible:underline-offset-0"
	], "class:list")}>${renderComponent($$result, "Heading", Heading, { "data-astro-transition-scope": renderTransition($$result, "jyu37kgb", "", toTransitionName(title)) }, { "default": ($$result) => renderTemplate`${title}` })}</a>${renderComponent($$result, "Datetime", $$Datetime, { ...props })}<p>${description}</p></li>`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Card.astro", "self");
//#endregion
export { $$Card as t };
