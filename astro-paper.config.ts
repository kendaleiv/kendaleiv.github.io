import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://kendaleiv.com/",
    title: "Ken Dale",
    description: "Jesus follower, husband, father, software engineer.",
    author: "Ken Dale",
    profile: "https://www.linkedin.com/in/kendaleiv/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/New_York",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/kendaleiv/kendaleiv.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/kendaleiv" },
    { name: "linkedin", url: "https://www.linkedin.com/in/kendaleiv/" },
    { name: "x", url: "https://x.com/kendaleiv" },
    { name: "mail", url: "mailto:ken@kendaleiv.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
