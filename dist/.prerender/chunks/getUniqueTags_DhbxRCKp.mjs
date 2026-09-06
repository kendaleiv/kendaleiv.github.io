import { n as slugifyStr } from "./slugify_7khGWwfZ.mjs";
import { t as postFilter } from "./postFilter_iSSclu9W.mjs";
//#region src/utils/getUniqueTags.ts
/**
* Builds a de-duplicated, sorted tag list from posts.
*
* - Drafts and scheduled posts are excluded via `postFilter()`
* - `tag` is the slug used in URLs; `tagName` is the original label for display
* - Uniqueness is based on the slug (so differently-cased labels collapse)
*/
function getUniqueTags(posts) {
	return posts.filter(postFilter).flatMap((post) => post.data.tags).map((tag) => ({
		tag: slugifyStr(tag),
		tagName: tag
	})).filter((value, index, self) => self.findIndex((tag) => tag.tag === value.tag) === index).sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
}
//#endregion
export { getUniqueTags as t };
