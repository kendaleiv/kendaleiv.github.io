import kebabcase from "lodash.kebabcase";
import slugify from "slugify";
//#region src/utils/slugify.ts
var hasNonLatin = (str) => /[^\x00-\x7F]/.test(str);
/**
* Slugify a string using a hybrid approach:
* - Latin strings: slugify (e.g. "E2E Testing" → "e2e-testing")
* - Strings with non-Latin chars: lodash.kebabcase (preserves non-Latin chars)
*/
var slugifyStr = (str) => {
	if (hasNonLatin(str)) return kebabcase(str);
	return slugify(str, { lower: true });
};
var slugifyAll = (arr) => arr.map((str) => slugifyStr(str));
//#endregion
export { slugifyStr as n, slugifyAll as t };
