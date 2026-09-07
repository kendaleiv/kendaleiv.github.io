# Ken Dale

[kendaleiv.com](https://kendaleiv.com/) uses [AstroPaper v6.1.0](https://github.com/satnaing/astro-paper/releases/tag/v6.1.0), the latest stable upstream release as of September 6, 2026 (commit `4c33a60529f9c443145a89fe526ff231c009272d`).

## Development

Use Node.js 24 LTS and pnpm 11.11.0 (pinned in `package.json`):

```sh
npm install --global pnpm@11.11.0
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm check
pnpm build
pnpm preview
```

`build` checks Astro/TypeScript, builds static pages and default dynamic social images, then runs Pagefind. Build once before using search locally. AstroPaper's default Google Sans Code font uses its stock Google font provider. Google Analytics runs only in production and records client-side page navigation.

## Content and routes

Posts live in `src/content/posts/`; standalone content lives in `src/content/pages/`. Posts require `title`, `description`, `pubDatetime`, and a tags array. A post's filename determines its public URL, so preserve the filename to keep the URL stable. Publication timestamps retain midnight in `America/New_York`, including the historical daylight-saving offset.

The only post-routing changes from AstroPaper are moving its post detail/image routes to `src/pages/[...slug]/` and removing the `posts/` prefix in `getPostUrl`. Existing post URLs remain `/:title/`, including underscores. Listings, tags, archives, pagination, search, sharing, RSS, styles, typography, and social-card rendering follow upstream conventions.

About includes a link to `/rimdev/`. Original article media and downloads retain their `/assets/` paths. The site retains the original KD favicon and, without upstream's demo social image, uses AstroPaper's generated `/og.png`.

Astro and related integrations, Sharp, pnpm, and vulnerable transitive dependencies have security updates beyond the template's dependency pins; the template remains v6.1.0. Compatibility fixes resolve public assets as URLs, encode sharing URLs, and reload the preserved Twitter embed after client-side navigation.

## Deployment

GitHub Actions validates pull requests and deploys `main` to GitHub Pages using the frozen pnpm lockfile. In repository **Settings → Pages**, select **GitHub Actions** as the source and retain the custom domain `kendaleiv.com` with HTTPS enabled. `public/CNAME` preserves the domain in the artifact. DNS remains managed outside this repository.

## Copyright / License

Content: All content copyright &copy; Ken Dale 2026 under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.

Theme: [AstroPaper](https://github.com/satnaing/astro-paper) | MIT License | Copyright (c) 2023 Sat Naing
