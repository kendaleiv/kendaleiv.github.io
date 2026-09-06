import { n as __exportAll } from "./rolldown-runtime_DC62tzP2.mjs";
import { t as config } from "./config_C4I1RSKp.mjs";
import { t as getCollection } from "./_astro_content_CsBPg6ag.mjs";
import { n as getPostUrl } from "./getPostPaths_yLBopjp2.mjs";
import { t as getSortedPosts } from "./getSortedPosts_D01ZpjZM.mjs";
import rss from "@astrojs/rss";
//#region src/pages/rss.xml.ts
var rss_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
async function GET() {
	const posts = await getCollection("posts");
	const sortedPosts = getSortedPosts(posts);
	return rss({
		title: config.site.title,
		description: config.site.description,
		site: config.site.url,
		items: sortedPosts.map(({ data, id, filePath }) => ({
			link: getPostUrl(id, filePath, config.site.lang),
			title: data.title,
			description: data.description,
			pubDate: new Date(data.modDatetime ?? data.pubDatetime)
		}))
	});
}
//#endregion
export { rss_xml_exports as n, GET as t };
