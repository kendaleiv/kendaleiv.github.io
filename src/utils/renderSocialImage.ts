import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const BRAND_COLOR = "#303538";
const BACKGROUND_COLOR = "#fefbfb";
const MUTED_COLOR = "#666c70";
const BORDER_COLOR = "#d8d5d2";

const KD_MARK = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
    <g transform="translate(0 144) scale(.1 -.1)" fill="${BRAND_COLOR}">
      <path d="M0 720V0h1440v1440H0V720zm257 352c9-6 13-54 15-160l3-152 90 132c130 191 128 188 185 188 60 0 80-7 80-30 0-9-47-79-105-155-58-75-105-140-105-143 0-4 50-82 111-173 65-99 109-175 107-186-3-15-13-18-73-18h-70L385 547 275 719l-5-172-5-172h-130l-3 344c-2 269 1 346 10 353 17 10 99 10 115 0zm860-16c152-48 233-206 204-397-25-160-96-242-240-275-72-18-312-19-329-2-9 9-12 99-12 345 0 305 1 333 18 343 26 16 294 6 359-14z"/>
      <path d="m882 724 3-239 56 1c87 2 127 13 165 46 52 46 67 89 68 193 0 105-20 155-80 201-32 25-47 28-125 32l-89 4 2-238z"/>
    </g>
  </svg>
`)}`;

type SocialImageOptions = {
  title: string;
  label: string;
  description?: string;
  author?: string;
  siteName: string;
  hostname: string;
};

type SocialImageFonts = {
  regular: ArrayBuffer;
  bold: ArrayBuffer;
};

function getTitleSize(title: string, description?: string): number {
  if (description) return 76;
  if (title.length <= 34) return 68;
  if (title.length <= 56) return 58;
  if (title.length <= 80) return 50;
  return 42;
}

export async function renderSocialImage(
  { title, label, description, author, siteName, hostname }: SocialImageOptions,
  fonts: SocialImageFonts
): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "44px",
          background: BACKGROUND_COLOR,
          color: BRAND_COLOR,
          fontFamily: "Google Sans Code",
        },
        children: {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: `3px solid ${BRAND_COLOR}`,
              borderRadius: "8px",
              padding: "38px 44px 34px",
              boxShadow: `12px 12px 0 ${BRAND_COLOR}`,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        },
                        children: [
                          {
                            type: "img",
                            props: {
                              src: KD_MARK,
                              width: 72,
                              height: 72,
                            },
                          },
                          {
                            type: "span",
                            props: {
                              style: {
                                fontSize: 25,
                                fontWeight: 700,
                                letterSpacing: "4px",
                              },
                              children: siteName.toUpperCase(),
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          color: MUTED_COLOR,
                          fontSize: 22,
                          fontWeight: 700,
                          letterSpacing: "3px",
                        },
                        children: label.toUpperCase(),
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: "20px 0",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: getTitleSize(title, description),
                          fontWeight: 700,
                          lineHeight: 1.08,
                          letterSpacing: "-2px",
                          maxHeight: description ? "180px" : "330px",
                          overflow: "hidden",
                        },
                        children: title,
                      },
                    },
                    description
                      ? {
                          type: "div",
                          props: {
                            style: {
                              color: MUTED_COLOR,
                              fontSize: 28,
                              lineHeight: 1.4,
                              marginTop: "22px",
                            },
                            children: description,
                          },
                        }
                      : null,
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: `2px solid ${BORDER_COLOR}`,
                    paddingTop: "20px",
                    color: MUTED_COLOR,
                    fontSize: 22,
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        children: author ? `by ${author}` : siteName,
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: { fontWeight: 700 },
                        children: hostname,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      embedFont: true,
      fonts: [
        {
          name: "Google Sans Code",
          data: fonts.regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Google Sans Code",
          data: fonts.bold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return Uint8Array.from(pngBuffer);
}
