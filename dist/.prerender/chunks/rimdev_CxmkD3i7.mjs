import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { b as renderTemplate, f as renderComponent } from "./jsx-runtime_L71NW7Ph.mjs";
import { l as createComponent, t as config } from "./config_C4I1RSKp.mjs";
import { o as $$Layout, r as $$Header, t as $$Footer } from "./Footer_vGz7Z3Kr.mjs";
import { n as getEntry, r as render } from "./_astro_content_CsBPg6ag.mjs";
import "./_astro_assets_qV6WTaR_.mjs";
import { n as $$Breadcrumb, t as $$Main } from "./Main_BYnRYM4l.mjs";
//#region src/pages/rimdev.astro
var rimdev_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Rimdev,
	file: () => $$file,
	url: () => $$url
});
var $$Rimdev = createComponent(async ($$result, $$props, $$slots) => {
	const about = await getEntry("pages", "rimdev");
	if (!about) throw new Error("Missing content entry: `rimdev.md` in `src/content/pages/`");
	const { Content } = await render(about);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${about.data.title} | ${config.site.title}`,
		"description": about.data.description,
		"ogImage": about.data.ogImage,
		"canonicalURL": about.data.canonicalURL
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {})}${renderComponent($$result, "Main", $$Main, {
		"pageTitle": about.data.title,
		"class": "app-prose"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Content", Content, {})}` })}${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/rimdev.astro", void 0);
var $$file = "/home/runner/work/kendaleiv.github.io/kendaleiv.github.io/src/pages/rimdev.astro";
var $$url = "/rimdev/";
//#endregion
//#region \0virtual:astro:page:src/pages/rimdev@_@astro
var page = () => rimdev_exports;
//#endregion
export { page };
