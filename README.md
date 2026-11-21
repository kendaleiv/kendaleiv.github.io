# Ken Dale

[kendaleiv.com](https://kendaleiv.com/) uses [AstroPaper v7.2.0](https://github.com/satnaing/astro-paper/releases/tag/v7.2.0), released November 15, 2026 (commit `ffd0260a2947eea93a2f5bb80029edf5654c0e8a`).

## Development

Use Node.js 24 LTS (minimum 22.23.4) and pnpm 11.11.0 (pinned in `package.json`):

```sh
npm install --global pnpm@11.11.0
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm build
pnpm preview
```

`build` checks Astro/TypeScript, builds static pages and default dynamic social images, then runs Pagefind. Build once before using search locally. AstroPaper's default Google Sans Code font uses its stock Google font provider. Google Analytics runs only in production and records client-side page navigation.

Site-specific code belongs in `src/custom/Head.astro`, `BodyEnd.astro`, or `PostEnd.astro`, which render at the end of the head, body, or post's share links respectively. AstroPaper leaves these files unchanged in future releases. Production-only Google Analytics is included through `Head.astro`.

## Content and routes

Posts live in `src/content/posts/`; standalone content lives in `src/content/pages/`. Posts require `title`, `description`, `pubDatetime`, and a tags array. A post's filename determines its public URL, so preserve the filename to keep the URL stable. Publication timestamps retain midnight in `America/New_York`, including the historical daylight-saving offset.

The only post-routing changes from AstroPaper are moving its post detail/image routes to `src/pages/[...slug]/` and removing the `posts/` prefix in `getPostUrl`. Existing post URLs remain `/:title/`, including underscores. Listings, tags, archives, pagination, search, sharing, RSS, styles, typography, and social-card rendering follow upstream conventions.

Post assets live in `public/post-assets/<post-filename>/` and use `/post-assets/` links. Full-resolution images may have smaller thumbnails that link to them. Legacy static asset redirects are intentionally not retained. The site retains the original KD favicon and, without upstream's demo social image, uses AstroPaper's generated `/og.png`.

## Deployment

GitHub Actions validates pull requests and deploys `main` to GitHub Pages using the frozen pnpm lockfile. In repository **Settings → Pages**, select **GitHub Actions** as the source and retain the custom domain `kendaleiv.com` with HTTPS enabled. GitHub stores the custom domain in the repository settings; DNS remains managed outside this repository.

## Copyright / License

Content: All content copyright &copy; Ken Dale 2026 under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.

Theme: [AstroPaper](https://github.com/satnaing/astro-paper) | MIT License | Copyright (c) 2023 Sat Naing
