//#region src/utils/getFontPathByWeight.ts
function getFontPathByWeight(fonts, weight, options) {
	const style = options?.style ?? "normal";
	const format = options?.format ?? "truetype";
	for (const font of fonts) if (font.weight === String(weight) && font.style === style) {
		const src = font.src.find((file) => file.format === format) ?? font.src[0];
		if (src) return src.url;
	}
}
//#endregion
export { getFontPathByWeight as t };
