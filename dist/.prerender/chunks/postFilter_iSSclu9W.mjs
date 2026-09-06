import { t as config } from "./config_C4I1RSKp.mjs";
//#region src/utils/postFilter.ts
function postFilter({ data }) {
	const isPublishTimePassed = Date.now() > new Date(data.pubDatetime).getTime() - config.posts.scheduledPostMargin;
	return !data.draft && isPublishTimePassed;
}
//#endregion
export { postFilter as t };
