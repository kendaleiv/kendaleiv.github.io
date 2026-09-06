import { c as level } from "./config_C4I1RSKp.mjs";
import { t as createConsoleLogger } from "./console_Dpp7SHHJ.mjs";
import { n as getImage$1 } from "./assets_C4FljMGJ.mjs";
//#region \0virtual:astro:get-image
var imageConfig = {
	"endpoint": { "route": "/_image/" },
	"service": {
		"entrypoint": "astro/assets/services/sharp",
		"config": {}
	},
	"dangerouslyProcessSVG": false,
	"domains": [],
	"remotePatterns": [],
	"responsiveStyles": false
};
Object.defineProperty(imageConfig, "assetQueryParams", {
	value: void 0,
	enumerable: false,
	configurable: true
});
var _astroLogger = createConsoleLogger({ level });
var _runtimeLogger = {
	info: (message) => _astroLogger.info(null, message),
	warn: (message) => _astroLogger.warn(null, message),
	error: (message) => _astroLogger.error(null, message)
};
var getImage = async (options) => await getImage$1(options, imageConfig, _runtimeLogger);
//#endregion
export { getImage };
