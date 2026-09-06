import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { K as generateCspDigest, b as renderTemplate, j as unescapeHTML, r as spreadAttributes } from "./jsx-runtime_L71NW7Ph.mjs";
import { a as redirectToDefaultLocale$1, i as notFound$1, o as redirectToFallback$1, r as getLocaleRelativeUrl, s as requestHasLocale$1 } from "./entrypoints_DTbJfcDD.mjs";
import "./errors-data_DMolGd5S.mjs";
import { l as createComponent } from "./config_C4I1RSKp.mjs";
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/app/common.js
function toRoutingStrategy(routing, domains) {
	let strategy;
	const hasDomains = domains ? Object.keys(domains).length > 0 : false;
	if (routing === "manual") strategy = "manual";
	else if (!hasDomains) {
		if (routing?.prefixDefaultLocale === true) {
			if (routing.redirectToDefaultLocale) strategy = "pathname-prefix-always";
			else strategy = "pathname-prefix-always-no-redirect";
		} else strategy = "pathname-prefix-other-locales";
	} else if (routing?.prefixDefaultLocale === true) {
		if (routing.redirectToDefaultLocale) strategy = "domains-prefix-always";
		else strategy = "domains-prefix-always-no-redirect";
	} else strategy = "domains-prefix-other-locales";
	return strategy;
}
function toFallbackType(routing) {
	if (routing === "manual") return "rewrite";
	return routing.fallbackType;
}
//#endregion
//#region \0astro:config/client
var client_exports = /* @__PURE__ */ __exportAll({
	base: () => "/",
	build: () => build$1,
	compressHTML: () => "jsx",
	i18n: () => i18n$1,
	image: () => image,
	site: () => site$1,
	trailingSlash: () => trailingSlash$1
});
var i18n$1 = {
	defaultLocale: "en",
	locales: ["en"],
	routing: {
		"prefixDefaultLocale": false,
		"redirectToDefaultLocale": true,
		"fallbackType": "redirect"
	},
	fallback: void 0,
	domains: void 0
};
var image = {
	objectFit: void 0,
	objectPosition: void 0,
	layout: void 0
};
var trailingSlash$1 = "always";
var site$1 = "https://kendaleiv.com/";
var build$1 = { format: "directory" };
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/virtual-modules/i18n.js
var { trailingSlash, site, i18n, build } = client_exports;
var { format } = build;
var { defaultLocale, locales, domains, fallback, routing } = i18n;
var base = "/";
var strategy = toRoutingStrategy(routing, domains);
var fallbackType = toFallbackType(routing);
var getRelativeLocaleUrl = (locale, path, options) => getLocaleRelativeUrl({
	locale,
	path,
	base,
	trailingSlash,
	format,
	defaultLocale,
	locales,
	strategy,
	domains,
	...options
});
if (i18n?.routing === "manual") redirectToDefaultLocale$1({
	base,
	trailingSlash,
	format,
	defaultLocale,
	locales,
	strategy,
	domains,
	fallback,
	fallbackType
});
if (i18n?.routing === "manual") notFound$1({
	base,
	trailingSlash,
	format,
	defaultLocale,
	locales,
	strategy,
	domains,
	fallback,
	fallbackType
});
if (i18n?.routing === "manual") requestHasLocale$1(locales);
if (i18n?.routing === "manual") redirectToFallback$1({
	base,
	trailingSlash,
	format,
	defaultLocale,
	locales,
	strategy,
	domains,
	fallback,
	fallbackType
});
if (i18n?.routing === "manual");
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/assets/runtime.js
function createSvgComponent({ meta, attributes, children, styles }) {
	const hasStyles = styles.length > 0;
	const Component = createComponent({
		async factory(result, props) {
			const normalizedProps = normalizeProps(attributes, props);
			if (hasStyles && result.cspDestination) for (const style of styles) {
				const hash = await generateCspDigest(style, result.cspAlgorithm);
				result._metadata.extraStyleHashes.push(hash);
			}
			return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
		},
		propagation: hasStyles ? "self" : "none"
	});
	Object.defineProperty(Component, "toJSON", {
		value: () => meta,
		enumerable: false
	});
	return Object.assign(Component, meta);
}
var ATTRS_TO_DROP = [
	"xmlns",
	"xmlns:xlink",
	"version"
];
var DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
	for (const attr of ATTRS_TO_DROP) delete attributes[attr];
	return attributes;
}
function normalizeProps(attributes, props) {
	return dropAttributes({
		...DEFAULT_ATTRS,
		...attributes,
		...props
	});
}
//#endregion
export { getRelativeLocaleUrl as n, createSvgComponent as t };
