import "./chunks/jsx-runtime_L71NW7Ph.mjs";
import { _ as getDefaultRoutes, b as RedirectSinglePageBuiltModule, c as getRouteCache, g as routeIsRedirect, h as routeIsFallback, l as getEnvironment, m as getFallbackRoute, p as findRouteToRewrite, t as BaseApp, u as setEnvironment, v as createAssetLink, x as manifest, y as createStylesheetElementSet } from "./chunks/entrypoints_DTbJfcDD.mjs";
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/vite-plugin-scripts/index.js
var SCRIPT_ID_PREFIX = `astro:scripts/`;
var BEFORE_HYDRATION_SCRIPT_ID = `${SCRIPT_ID_PREFIX}before-hydration.js`;
var PAGE_SCRIPT_ID = `${SCRIPT_ID_PREFIX}page.js`;
`${SCRIPT_ID_PREFIX}`;
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/build/plugins/util.js
var ASTRO_PAGE_KEY_SEPARATOR = "&";
function makePageDataKey(route, componentPath) {
	return route + ASTRO_PAGE_KEY_SEPARATOR + componentPath;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/build/runtime.js
function getPageData(internals, route, component) {
	let pageData = internals.pagesByKeys.get(makePageDataKey(route, component));
	if (pageData) return pageData;
}
function cssOrder(a, b) {
	let depthA = a.depth, depthB = b.depth, orderA = a.order, orderB = b.order;
	if (orderA === -1 && orderB >= 0) return 1;
	else if (orderB === -1 && orderA >= 0) return -1;
	else if (orderA > orderB) return 1;
	else if (orderA < orderB) return -1;
	else if (depthA === -1) return -1;
	else if (depthB === -1) return 1;
	else return depthA > depthB ? -1 : 1;
}
function mergeInlineCss(acc, current) {
	const lastAdded = acc.at(acc.length - 1);
	const lastWasInline = lastAdded?.type === "inline";
	const currentIsInline = current?.type === "inline";
	if (lastWasInline && currentIsInline) {
		const currentHasImport = current.content.includes("@import");
		const lastHasImport = lastAdded.content.includes("@import");
		if (!currentHasImport && !lastHasImport) {
			const merged = {
				type: "inline",
				content: lastAdded.content + current.content
			};
			acc[acc.length - 1] = merged;
			return acc;
		}
	}
	acc.push(current);
	return acc;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/build/environment.js
async function getModuleForRoute(manifest, route) {
	for (const defaultRoute of getDefaultRoutes(manifest)) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
	let routeToProcess = route;
	if (routeIsRedirect(route)) {
		if (route.redirectRoute) routeToProcess = route.redirectRoute;
		else return RedirectSinglePageBuiltModule;
	} else if (routeIsFallback(route)) routeToProcess = getFallbackRoute(route, manifest.routes);
	if (manifest.pageMap) {
		const importComponentInstance = manifest.pageMap.get(routeToProcess.component);
		if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
		return await importComponentInstance();
	} else if (manifest.pageModule) return manifest.pageModule;
	throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
}
async function getComponentByRoute(manifest, routeData) {
	return (await getModuleForRoute(manifest, routeData)).page();
}
function createBuildEnvironment() {
	let internals;
	let options;
	function getInternals() {
		if (!internals) throw new Error("No internals defined");
		return internals;
	}
	function getOptions() {
		if (!options) throw new Error("No options defined");
		return options;
	}
	function getSettings() {
		return getOptions().settings;
	}
	const resolveCache = /* @__PURE__ */ new Map();
	return {
		env: {
			name: "build",
			runtimeMode: "production",
			defaultStreaming: (manifest) => manifest.serverLike,
			async resolve(manifest, specifier) {
				if (resolveCache.has(specifier)) return resolveCache.get(specifier);
				const hashedFilePath = manifest.entryModules[specifier];
				if (typeof hashedFilePath !== "string" || hashedFilePath === "") {
					if (specifier === BEFORE_HYDRATION_SCRIPT_ID) {
						resolveCache.set(specifier, "");
						return "";
					}
					throw new Error(`Cannot find the built path for ${specifier}`);
				}
				const assetLink = createAssetLink(hashedFilePath, manifest.base, manifest.assetsPrefix);
				resolveCache.set(specifier, assetLink);
				return assetLink;
			},
			headElements(manifest, routeData) {
				const { assetsPrefix, base } = manifest;
				const settings = getSettings();
				const buildInternals = getInternals();
				const links = /* @__PURE__ */ new Set();
				const pageBuildData = getPageData(buildInternals, routeData.route, routeData.component);
				const scripts = /* @__PURE__ */ new Set();
				const sortedCssAssets = pageBuildData?.styles.sort(cssOrder).map(({ sheet }) => sheet).reduce(mergeInlineCss, []);
				const styles = createStylesheetElementSet(sortedCssAssets ?? [], base, assetsPrefix);
				if (settings.scripts.some((script) => script.stage === "page")) {
					const hashedFilePath = buildInternals.entrySpecifierToBundleMap.get(PAGE_SCRIPT_ID);
					if (typeof hashedFilePath !== "string") throw new Error(`Cannot find the built path for ${PAGE_SCRIPT_ID}`);
					const src = createAssetLink(hashedFilePath, base, assetsPrefix);
					scripts.add({
						props: {
							type: "module",
							src
						},
						children: ""
					});
				}
				for (const script of settings.scripts) if (script.stage === "head-inline") scripts.add({
					props: {},
					children: script.content
				});
				return {
					scripts,
					styles,
					links
				};
			},
			componentMetadata() {},
			getComponentByRoute,
			getModuleForRoute,
			async tryRewrite(manifest, payload, request) {
				const { routeData, pathname, newUrl } = findRouteToRewrite({
					payload,
					request,
					routes: manifest.routes.map((r) => r.routeData),
					trailingSlash: manifest.trailingSlash,
					buildFormat: manifest.buildFormat,
					base: manifest.base,
					outDir: manifest.serverLike ? manifest.buildClientDir : manifest.outDir
				});
				return {
					routeData,
					componentInstance: await getComponentByRoute(manifest, routeData),
					newUrl,
					pathname
				};
			},
			getRenderers(manifest) {
				return manifest.renderers;
			},
			errorStrategy: "build",
			injectCspMetaTagsOnErrorPages: false,
			logRequest() {}
		},
		setInternals(value) {
			internals = value;
		},
		setOptions(value) {
			options = value;
		},
		getInternals,
		getOptions,
		getSettings
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/build/app.js
var BuildApp = class extends BaseApp {
	#buildEnv;
	constructor(manifest, buildEnv) {
		super(manifest);
		this.#buildEnv = buildEnv;
	}
	isDev() {
		return true;
	}
	/**
	* Streaming falls through to the environment default
	* (`manifest.serverLike` for the build environment) — we can skip
	* streaming in SSG for performance, as writing strings is faster.
	*/
	resolveStreaming() {}
	setInternals(internals) {
		this.#buildEnv.setInternals(internals);
	}
	setOptions(options) {
		this.#buildEnv.setOptions(options);
		this.logger.setDestination(options.logger.options.destination);
		this.resetAdapterLogger();
	}
	getOptions() {
		return this.#buildEnv.getOptions();
	}
	getSettings() {
		return this.#buildEnv.getSettings();
	}
	/**
	* Route cache and component loader for `StaticPaths`. Defined on the app
	* (rather than reached through the functional core at the call site) so
	* they execute inside the prerender bundle's module graph: the default
	* prerenderer constructs `StaticPaths` from a different bundle, whose
	* copies of the core modules hold separate per-manifest state.
	*/
	get routeCache() {
		return getRouteCache(this.manifest);
	}
	getComponentByRoute(routeData) {
		return getEnvironment(this.manifest).getComponentByRoute(this.manifest, routeData);
	}
	logRequest(_options) {}
};
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/entrypoints/prerender.js
var buildEnv = createBuildEnvironment();
setEnvironment(manifest, buildEnv.env);
var app = new BuildApp(manifest, buildEnv);
//#endregion
export { app, manifest };
