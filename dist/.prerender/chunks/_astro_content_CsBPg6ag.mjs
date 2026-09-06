import { $ as string, M as escape, O as createHeadAndContent, Y as date, Z as object, b as renderTemplate, f as renderComponent, j as unescapeHTML, o as renderScriptElement, q as array, s as renderUniqueStylesheet, tt as safeParseAsync } from "./jsx-runtime_L71NW7Ph.mjs";
import { d as parse, f as unflatten } from "./entrypoints_DTbJfcDD.mjs";
import { D as LiveContentConfigError, J as RenderUndefinedEntryError, at as AstroUserError, et as UnknownContentCollectionError, it as AstroError } from "./errors-data_DMolGd5S.mjs";
import { c as level, l as createComponent, o as VALID_INPUT_FORMATS } from "./config_C4I1RSKp.mjs";
import { f as prependForwardSlash, p as removeBase, u as isRemotePath } from "./remote_C_-Yync0.mjs";
import { t as createConsoleLogger } from "./console_Dpp7SHHJ.mjs";
import { t as createSvgComponent } from "./runtime_BVE8TaPU.mjs";
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/render-scope/scope.js
var SCOPE_KEY = /* @__PURE__ */ Symbol.for("astro:render-scope");
function getInstalledRenderScope() {
	return globalThis[SCOPE_KEY];
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/core/render-scope/record.js
function recordContentEntryRender(filePath) {
	if (!filePath) return;
	getInstalledRenderScope()?.getStore()?.contentEntries?.add(filePath);
}
var CONTENT_IMAGE_FLAG = "astroContentImageFlag";
var DATA_STORE_VIRTUAL_ID = "astro:data-layer-content";
"" + DATA_STORE_VIRTUAL_ID;
var IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
var CONTENT_LAYER_TYPE = "content_layer";
`${DATA_STORE_VIRTUAL_ID}`;
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/assets/utils/resolveImports.js
function imageSrcToImportId(imageSrc, filePath) {
	imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
	if (isRemotePath(imageSrc)) return;
	const ext = imageSrc.split(".").at(-1)?.toLowerCase();
	if (!ext || !VALID_INPUT_FORMATS.includes(ext)) return;
	const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
	if (filePath) params.set("importer", filePath);
	return `${imageSrc}?${params.toString()}`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/content/config.js
function getImporterFilename() {
	const stackLine = (/* @__PURE__ */ new Error()).stack?.split("\n").find((line) => !line.includes("defineCollection") && !line.includes("defineLiveCollection") && !line.includes("getImporterFilename") && !line.startsWith("Error"));
	if (!stackLine) return;
	return /\/((?:src|chunks)\/.*?):\d+:\d+/.exec(stackLine)?.[1] ?? void 0;
}
function defineCollection$1(config) {
	const importerFilename = getImporterFilename();
	if (importerFilename?.includes("live.config")) throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("Collections in a live config file must use `defineLiveCollection`.", importerFilename)
	});
	if ("loader" in config) {
		if (config.type && config.type !== "content_layer") throw new AstroUserError(`A content collection is defined with legacy features (e.g. missing a \`loader\` or has a \`type\`). Check your collection definitions in ${importerFilename ?? "your content config file"} to ensure that all collections are defined using the current properties.`);
		if (typeof config.loader === "object" && typeof config.loader.load !== "function" && ("loadEntry" in config.loader || "loadCollection" in config.loader)) throw new AstroUserError(`Live content collections must be defined in "src/live.config.ts" file. Check the loaders used in "${importerFilename ?? "your content config file"}" to ensure you are not using a live loader to define a build-time content collection.`);
		config.type = CONTENT_LAYER_TYPE;
	}
	if (!config.type) config.type = "content";
	return config;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/content/data-store-source.js
var InMemorySource = class {
	#store;
	constructor(store) {
		this.#store = store;
	}
	hasCollection(collection) {
		return this.#store.hasCollection(collection);
	}
	get(collection, key) {
		return this.#store.get(collection, key);
	}
	entries(collection) {
		return this.#store.entries(collection);
	}
	values(collection) {
		return this.#store.values(collection);
	}
	keys(collection) {
		return this.#store.keys(collection);
	}
	has(collection, key) {
		return this.#store.has(collection, key);
	}
	collections() {
		return this.#store.collections();
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/content/data-store.js
var ChunkedCollectionParser = class {
	#entries = /* @__PURE__ */ new Map();
	#remainder = "";
	add(part) {
		const records = (this.#remainder + part).split("\n");
		this.#remainder = records.pop();
		for (const record of records) {
			const parsed = parse(record);
			if (!Array.isArray(parsed) || parsed.length !== 2 || typeof parsed[0] !== "string") throw new Error("Invalid chunked data store entry");
			this.#entries.set(parsed[0], parsed[1]);
		}
	}
	finish() {
		if (this.#remainder) throw new Error("Invalid chunked data store entry");
		return this.#entries;
	}
};
var ImmutableDataStore = class ImmutableDataStore {
	_collections = /* @__PURE__ */ new Map();
	constructor() {
		this._collections = /* @__PURE__ */ new Map();
	}
	get(collectionName, key) {
		return this._collections.get(collectionName)?.get(String(key));
	}
	entries(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).entries()];
	}
	values(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).values()];
	}
	keys(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).keys()];
	}
	has(collectionName, key) {
		const collection = this._collections.get(collectionName);
		if (collection) return collection.has(String(key));
		return false;
	}
	hasCollection(collectionName) {
		return this._collections.has(collectionName);
	}
	collections() {
		return this._collections;
	}
	/**
	* Rebuilds a collections map from a chunked-store manifest whose part file
	* names have already been swapped for their contents.
	*
	* Each collection maps to a list of parts. A part is either a raw string
	* (when the store is loaded from disk) or an ESM namespace from a virtual
	* chunk import (`{ default: string }`, when emitted at runtime). Each part
	* contains independently serialized entry records. This is the inverse of
	* {@link import('./data-store-writer.js').ChunkedWriter} and stays free of
	* Node built-ins so it can run at runtime.
	*/
	static manifestToMap(manifest) {
		const collections = /* @__PURE__ */ new Map();
		for (const [collectionName, parts] of Object.entries(manifest)) {
			const parser = new ChunkedCollectionParser();
			for (const part of parts) parser.add(typeof part === "string" ? part : part.default);
			collections.set(collectionName, parser.finish());
		}
		return collections;
	}
	/**
	* Attempts to load a DataStore from the virtual module.
	* This only works in Vite.
	*/
	static async fromModule() {
		try {
			const data = await import("./_astro_data-layer-content_Mlt14QmL.mjs");
			if (data.default instanceof Map) return ImmutableDataStore.fromMap(data.default);
			if (Array.isArray(data.default)) {
				const map2 = unflatten(data.default);
				return ImmutableDataStore.fromMap(map2);
			}
			const map = ImmutableDataStore.manifestToMap(data.default);
			return ImmutableDataStore.fromMap(map);
		} catch {}
		return new ImmutableDataStore();
	}
	static async fromMap(data) {
		const store = new ImmutableDataStore();
		store._collections = data;
		return store;
	}
};
function dataStoreSingleton() {
	let instance = void 0;
	return {
		get: async () => {
			if (!instance) instance = ImmutableDataStore.fromModule().then((store) => new InMemorySource(store));
			return instance;
		},
		set: (store) => {
			instance = new InMemorySource(store);
		}
	};
}
var globalDataStore = dataStoreSingleton();
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/content/loaders/errors.js
function formatZodError(error) {
	return error.issues.map((issue) => `  **${issue.path.join(".")}**: ${issue.message}`);
}
var LiveCollectionError = class LiveCollectionError extends Error {
	collection;
	message;
	cause;
	constructor(collection, message, cause) {
		super(message);
		this.collection = collection;
		this.message = message;
		this.cause = cause;
		this.name = "LiveCollectionError";
		if (cause?.stack) this.stack = cause.stack;
	}
	static is(error) {
		return error instanceof LiveCollectionError;
	}
};
var LiveEntryNotFoundError = class extends LiveCollectionError {
	constructor(collection, entryFilter) {
		super(collection, `Entry ${collection} \u2192 ${typeof entryFilter === "string" ? entryFilter : JSON.stringify(entryFilter)} was not found.`);
		this.name = "LiveEntryNotFoundError";
	}
	static is(error) {
		return error?.name === "LiveEntryNotFoundError";
	}
};
var LiveCollectionValidationError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${collection} \u2192 ${entryId}** data does not match the collection schema.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionValidationError";
	}
	static is(error) {
		return error?.name === "LiveCollectionValidationError";
	}
};
var LiveCollectionCacheHintError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${String(collection)}${entryId ? ` \u2192 ${String(entryId)}` : ""}** returned an invalid cache hint.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionCacheHintError";
	}
	static is(error) {
		return error?.name === "LiveCollectionCacheHintError";
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.3.1_@astrojs+markdown-remark@7.3.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_3509a11a6f86037e1806383b4f842550/node_modules/astro/dist/content/runtime.js
var cacheHintSchema = object({
	tags: array(string()).optional(),
	lastModified: date().optional()
});
async function parseLiveEntry(entry, schema, collection) {
	try {
		const parsed = await safeParseAsync(schema, entry.data);
		if (!parsed.success) return { error: new LiveCollectionValidationError(collection, entry.id, parsed.error) };
		if (entry.cacheHint) {
			const cacheHint = cacheHintSchema.safeParse(entry.cacheHint);
			if (!cacheHint.success) return { error: new LiveCollectionCacheHintError(collection, entry.id, cacheHint.error) };
			entry.cacheHint = cacheHint.data;
		}
		return { entry: {
			...entry,
			data: parsed.data
		} };
	} catch (error) {
		return { error: new LiveCollectionError(collection, `Unexpected error parsing entry ${entry.id} in collection ${collection}`, error) };
	}
}
function createGetCollection({ liveCollections, logger }) {
	return async function getCollection(collection, filter) {
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
		});
		const hasFilter = typeof filter === "function";
		const store = await globalDataStore.get();
		if (await store.hasCollection(collection)) {
			const { default: imageAssetMap } = await import("./content-assets_DXqEyLLP.mjs");
			const result = [];
			for (const rawEntry of await store.values(collection)) {
				const data = resolveEntryData(rawEntry, imageAssetMap);
				let entry = {
					...rawEntry,
					data,
					collection
				};
				if (hasFilter && !filter(entry)) continue;
				result.push(entry);
			}
			return result;
		} else {
			logger.warn("content", `The collection ${JSON.stringify(collection)} does not exist or is empty. Please check your content config file for errors.`);
			return [];
		}
	};
}
function createGetEntry({ liveCollections, logger }) {
	return async function getEntry(collectionOrLookupObject, lookup) {
		let collection, lookupId;
		if (typeof collectionOrLookupObject === "string") {
			collection = collectionOrLookupObject;
			if (!lookup) throw new AstroError({
				...UnknownContentCollectionError,
				message: "`getEntry()` requires an entry identifier as the second argument."
			});
			lookupId = lookup;
		} else {
			collection = collectionOrLookupObject.collection;
			lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
		}
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
		});
		if (typeof lookupId === "object") throw new AstroError({
			...UnknownContentCollectionError,
			message: `The entry identifier must be a string. Received object.`
		});
		const store = await globalDataStore.get();
		if (await store.hasCollection(collection)) {
			const entry = await store.get(collection, lookupId);
			if (!entry) {
				logger.warn("content", `Entry ${collection} → ${lookupId} was not found.`);
				return;
			}
			const { default: imageAssetMap } = await import("./content-assets_DXqEyLLP.mjs");
			const data = resolveEntryData(entry, imageAssetMap);
			const result = {
				...entry,
				data,
				collection
			};
			warnForPropertyAccess(logger, result.data, "slug", `[content] Attempted to access deprecated property on "${collection}" entry.
The "slug" property is no longer automatically added to entries. Please use the "id" property instead.`);
			warnForPropertyAccess(logger, result, "render", `[content] Invalid attempt to access "render()" method on "${collection}" entry.
To render an entry, use "render(entry)" from "astro:content".`);
			return result;
		}
	};
}
function warnForPropertyAccess(logger, entry, prop, message) {
	if (!(prop in entry)) {
		let _value = void 0;
		Object.defineProperty(entry, prop, {
			get() {
				if (_value === void 0) logger.error("content", message);
				return _value;
			},
			set(v) {
				_value = v;
			},
			enumerable: false
		});
	}
}
function createGetLiveCollection({ liveCollections }) {
	return async function getLiveCollection(collection, filter) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveCollection() to load regular content collections.`) };
		try {
			const context = {
				filter,
				collection
			};
			const response = await liveCollections[collection].loader?.loadCollection?.(context);
			if (response && "error" in response) return { error: response.error };
			const { schema } = liveCollections[collection];
			let processedEntries = response.entries;
			if (schema) {
				const entryResults = await Promise.all(response.entries.map((entry) => parseLiveEntry(entry, schema, collection)));
				for (const result of entryResults) if (result.error) return { error: result.error };
				processedEntries = entryResults.map((result) => result.entry);
			}
			let cacheHint = response.cacheHint;
			if (cacheHint) {
				const cacheHintResult = cacheHintSchema.safeParse(cacheHint);
				if (!cacheHintResult.success) return { error: new LiveCollectionCacheHintError(collection, void 0, cacheHintResult.error) };
				cacheHint = cacheHintResult.data;
			}
			if (processedEntries.length > 0) {
				const entryTags = /* @__PURE__ */ new Set();
				let latestModified;
				for (const entry of processedEntries) if (entry.cacheHint) {
					if (entry.cacheHint.tags) entry.cacheHint.tags.forEach((tag) => entryTags.add(tag));
					if (entry.cacheHint.lastModified instanceof Date) {
						if (latestModified === void 0 || entry.cacheHint.lastModified > latestModified) latestModified = entry.cacheHint.lastModified;
					}
				}
				if (entryTags.size > 0 || latestModified || cacheHint) {
					const mergedCacheHint = {};
					if (cacheHint?.tags || entryTags.size > 0) mergedCacheHint.tags = [.../* @__PURE__ */ new Set([...cacheHint?.tags || [], ...entryTags])];
					if (cacheHint?.lastModified && latestModified) mergedCacheHint.lastModified = cacheHint.lastModified > latestModified ? cacheHint.lastModified : latestModified;
					else if (cacheHint?.lastModified || latestModified) mergedCacheHint.lastModified = cacheHint?.lastModified ?? latestModified;
					cacheHint = mergedCacheHint;
				}
			}
			return {
				entries: processedEntries,
				cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading collection ${collection}${error instanceof Error ? `: ${error.message}` : ""}`, error) };
		}
	};
}
function createGetLiveEntry({ liveCollections }) {
	return async function getLiveEntry(collection, lookup) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveEntry() to load regular content collections.`) };
		try {
			const lookupObject = {
				filter: typeof lookup === "string" ? { id: lookup } : lookup,
				collection
			};
			let entry = await liveCollections[collection].loader?.loadEntry?.(lookupObject);
			if (entry && "error" in entry) return { error: entry.error };
			if (!entry) return { error: new LiveEntryNotFoundError(collection, lookup) };
			const { schema } = liveCollections[collection];
			if (schema) {
				const result = await parseLiveEntry(entry, schema, collection);
				if (result.error) return { error: result.error };
				entry = result.entry;
			}
			return {
				entry,
				cacheHint: entry.cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading entry ${collection} → ${typeof lookup === "string" ? lookup : JSON.stringify(lookup)}`, error) };
		}
	};
}
var CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
	const { default: imageAssetMap } = await import("./content-assets_DXqEyLLP.mjs");
	const imageObjects = /* @__PURE__ */ new Map();
	const { getImage } = await import("./_virtual_astro_get-image_CoFHx9rN.mjs");
	for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) try {
		const decodedImagePath = JSON.parse(imagePath.replace(/&(?:#x22|quot);/g, "\"").replace(/&(?:#x27|apos);/g, "'"));
		let image;
		if (URL.canParse(decodedImagePath.src)) image = await getImage(decodedImagePath);
		else {
			const id = imageSrcToImportId(decodedImagePath.src, fileName);
			const imported = imageAssetMap.get(id);
			if (!id || imageObjects.has(id) || !imported) continue;
			image = await getImage({
				...decodedImagePath,
				src: imported
			});
		}
		imageObjects.set(imagePath, image);
	} catch {
		throw new Error(`Failed to parse image reference: ${imagePath}`);
	}
	return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
		const image = imageObjects.get(imagePath);
		if (!image) return full;
		const { index, ...attributes } = image.attributes;
		return Object.entries({
			...attributes,
			src: image.src,
			...image.srcSet.values.length > 0 ? { srcset: image.srcSet.attribute } : {}
		}).filter(([, value]) => value != null).map(([key, value]) => value === "" ? `${key}=""` : `${key}="${escape(String(value))}"`).join(" ");
	});
}
function resolveImageAtPath(src, fileName, imageAssetMap) {
	const id = imageSrcToImportId(src, fileName);
	if (!id) return;
	const imported = imageAssetMap?.get(id);
	if (!imported) return;
	if (imported.__svgData) {
		const { __svgData: svgData, ...meta } = imported;
		return createSvgComponent({
			meta,
			...svgData
		});
	}
	return imported;
}
function setAtPathCopying(target, path, value) {
	if (path.length === 0) return target;
	const [key, ...rest] = path;
	const copy = Array.isArray(target) ? target.slice() : { ...target };
	copy[key] = rest.length === 0 ? value : setAtPathCopying(copy[key], rest, value);
	return copy;
}
function updateImageReferencesInData(data, fileName, imageAssetMap, imageImports) {
	if (!imageImports?.length) return data;
	let result = data;
	for (const path of imageImports) {
		let src = result;
		for (const key of path) src = src?.[key];
		if (typeof src !== "string") continue;
		const resolved = resolveImageAtPath(src, fileName, imageAssetMap);
		if (resolved !== void 0) result = setAtPathCopying(result, path, resolved);
	}
	return result;
}
function resolveEntryData(entry, imageAssetMap) {
	return updateImageReferencesInData(entry.data, entry.filePath, imageAssetMap, entry.imageImports);
}
function createRenderEntry({ logger }) {
	return async function renderEntry(entry) {
		if (!entry) throw new AstroError(RenderUndefinedEntryError);
		recordContentEntryRender(entry.filePath);
		if (entry.deferredRender) try {
			const { default: contentModules } = await import("./content-modules_I7QRxwaA.mjs");
			const renderEntryImport = contentModules.get(entry.filePath);
			return render$1({
				collection: "",
				id: entry.id,
				renderEntryImport
			});
		} catch (e) {
			logger.error("content", `${e}`);
		}
		const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
		return {
			Content: createComponent(() => renderTemplate`${unescapeHTML(html)}`),
			headings: entry?.rendered?.metadata?.headings ?? [],
			remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
		};
	};
}
async function render$1({ collection, id, renderEntryImport }) {
	const UnexpectedRenderError = new AstroError({
		...UnknownContentCollectionError,
		message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
	});
	if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
	const baseMod = await renderEntryImport();
	if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
	const { default: defaultMod } = baseMod;
	if (isPropagatedAssetsModule(defaultMod)) {
		const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
		if (typeof getMod !== "function") throw UnexpectedRenderError;
		const propagationMod = await getMod();
		if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
		return {
			Content: createComponent({
				factory(result, baseProps, slots) {
					let styles = "", links = "", scripts = "";
					if (Array.isArray(collectedStyles)) styles = collectedStyles.map((style) => {
						return renderUniqueStylesheet(result, {
							type: "inline",
							content: style
						});
					}).join("");
					if (Array.isArray(collectedLinks)) links = collectedLinks.map((link) => {
						return renderUniqueStylesheet(result, {
							type: "external",
							src: isRemotePath(link) ? link : prependForwardSlash(link)
						});
					}).join("");
					if (Array.isArray(collectedScripts)) scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
					let props = baseProps;
					if (id.endsWith("mdx")) props = {
						components: propagationMod.components ?? {},
						...baseProps
					};
					return createHeadAndContent(unescapeHTML(styles + links + scripts), renderTemplate`${renderComponent(result, "Content", propagationMod.Content, props, slots)}`);
				},
				propagation: "self"
			}),
			headings: propagationMod.getHeadings?.() ?? [],
			remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
		};
	} else if (baseMod.Content && typeof baseMod.Content === "function") return {
		Content: baseMod.Content,
		headings: baseMod.getHeadings?.() ?? [],
		remarkPluginFrontmatter: baseMod.frontmatter ?? {}
	};
	else throw UnexpectedRenderError;
}
function isPropagatedAssetsModule(module) {
	return typeof module === "object" && module != null && "__astroPropagation" in module;
}
function defineCollection(config) {
	if (config.type === "live") throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("Collections with type `live` must be defined in a `src/live.config.ts` file.")
	});
	return defineCollection$1(config);
}
//#endregion
//#region \0astro:content
var liveCollections = {};
var logger = createConsoleLogger({ level });
var getCollection = createGetCollection({
	liveCollections,
	logger
});
var getEntry = createGetEntry({
	liveCollections,
	logger
});
var render = createRenderEntry({ logger });
createGetLiveCollection({ liveCollections });
createGetLiveEntry({ liveCollections });
//#endregion
export { defineCollection as i, getEntry as n, render as r, getCollection as t };
