import { C as addAttribute, P as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { i as useTranslations } from "./Footer_vGz7Z3Kr.mjs";
import { t as createSvgComponent } from "./runtime_BVE8TaPU.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { n as slugifyStr } from "./slugify_7khGWwfZ.mjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
//#region src/assets/icons/IconCalendar.svg
var IconCalendar_default = createSvgComponent({
	"meta": {
		"src": "/_astro/IconCalendar.C0xY3fv4.svg",
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
		"class": "icon icon-tabler icons-tabler-outline icon-tabler-calendar-week",
		"viewBox": "0 0 24 24"
	},
	"children": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16M7 14h.013M10.01 14h.005M13.01 14h.005M16.015 14h.005M13.015 17h.005M7.01 17h.005M10.01 17h.005\" />",
	"styles": []
});
//#endregion
//#region src/components/Datetime.astro
createAstro("https://kendaleiv.com/");
var $$Datetime = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Datetime;
	dayjs.extend(utc);
	dayjs.extend(timezone);
	const { pubDatetime, modDatetime, size = "sm", class: className = "", timezone: postTimezone } = Astro.props;
	const t = useTranslations(Astro.currentLocale);
	const isModified = modDatetime && modDatetime > pubDatetime;
	const datetime = dayjs(isModified ? modDatetime : pubDatetime).tz(postTimezone ?? config.site.timezone);
	const date = datetime.format("D MMM, YYYY");
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["text-muted-foreground flex items-center gap-x-2", className], "class:list")}>${renderComponent($$result, "IconCalendar", IconCalendar_default, { "class:list": ["inline-block size-6 min-w-5.5", { "scale-90": size === "sm" }] })}${isModified && renderTemplate`<span${addAttribute(["text-sm", { "sm:text-base": size === "lg" }], "class:list")}>${t.post.updatedAt}:</span>`}<time${addAttribute(["text-sm", { "sm:text-base": size === "lg" }], "class:list")}${addAttribute(datetime.toISOString(), "datetime")}>${date}</time></div>`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/components/Datetime.astro", void 0);
//#endregion
//#region src/utils/toTransitionName.ts
/**
* Produce a valid CSS <custom-ident> for view-transition-name.
* CSS idents only allow [a-zA-Z0-9_-] plus Unicode U+00A0+.
* Non-ASCII chars are hex-encoded, ASCII special chars (:, /, etc.)
* are replaced with hyphens to keep the browser from ignoring the name.
*/
var toTransitionName = (str) => {
	let result = slugifyStr(str.replaceAll(".", "-")).replace(/[^\x00-\x7F]/gu, (c) => "u" + c.codePointAt(0).toString(16).padStart(6, "0")).replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
	if (/^\d/.test(result)) result = "p-" + result;
	if (!result) result = "post";
	return result;
};
//#endregion
export { $$Datetime as n, toTransitionName as t };
