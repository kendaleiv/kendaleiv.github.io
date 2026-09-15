import type { APIRoute } from "astro";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import { renderSocialImage } from "@/utils/renderSocialImage";
import config from "@/config";

export const GET: APIRoute = async context => {
  const fonts = fontData["--font-google-sans-code"];
  const regularFontPath = getFontPathByWeight(fonts, 400);
  const boldFontPath = getFontPathByWeight(fonts, 700);

  if (regularFontPath === undefined || boldFontPath === undefined) {
    throw new Error("Cannot find the font path.");
  }

  const [regularData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, context.url)).then(res =>
      res.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, context.url)).then(res =>
      res.arrayBuffer()
    ),
  ]);

  const png = await renderSocialImage(
    {
      title: config.site.title,
      label: "Personal site",
      description: config.site.description,
      siteName: config.site.title,
      hostname: new URL(config.site.url).hostname,
    },
    { regular: regularData, bold: boldData }
  );

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
