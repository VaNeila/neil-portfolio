# Neil Atienza — developer portfolio

A light, responsive Next.js App Router portfolio with TypeScript, Tailwind CSS, local Geist, typed case studies, and portable static output. Netlify Free is the intended first host.

## Development

Use Node 24 and pnpm 12.16.1, pinned in the repository.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

For a static review build:

```sh
pnpm check
pnpm preview
```

The preview serves `out/` at http://localhost:3000 and returns real HTTP 404 responses. Set `PORT=4173` if port 3000 is occupied. `next start` is not used for static exports.

## Publication state

Ready for **local design/content review**, not public launch:

- Two independent project drafts appear in review builds with explicitly labeled original concept covers, not screenshots.
- ADULive is excluded from review routes, static output, and client payloads.
- Contact details, GitHub, résumé, dates, production origin, and real project media remain owner inputs. No invented addresses, links, or PDF are supplied.
- Review output is noindex, disallows crawling, and has an empty sitemap.
- Production builds fail until the release validator passes. `noindex` is not access control.

See [content checklist](docs/content-checklist.md) and [deployment guide](docs/deployment.md).

## Commands

| Command                       | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `pnpm lint`                   | ESLint                                               |
| `pnpm typecheck`              | Generate route types and run TypeScript              |
| `pnpm check:content`          | Content and publication tests                        |
| `pnpm build`                  | Static export plus confidentiality tests             |
| `pnpm preview` / `pnpm start` | Serve exported files                                 |
| `pnpm check`                  | Lint, types, content, build and export checks        |
| `pnpm test:smoke`             | Chromium, axe, responsive, route and keyboard tests  |
| `pnpm check:release`          | Validate real launch inputs; intentionally fails now |
| `pnpm assets:brand`           | Regenerate original social preview and favicon       |

Install the test browser with `pnpm exec playwright install chromium`. Smoke tests require a current build and use port 4173.

## Content and architecture

Edit identity/contact/services in `data/site.ts`; projects, experience and skills have separate typed data files. Server Components render content; client behavior is isolated to mobile navigation and image loading. Native mobile disclosure works without JavaScript.

Normal builds are review-only and include drafts marked `reviewable`. `CONTEXT=production` or `PORTFOLIO_RELEASE=1` selects published-only content and enforces release checks. Never mark a project approved on the owner's behalf.

No database, CMS, analytics, inquiry endpoint, application secrets, or paid integration is included.

## Assets

Geist is self-hosted through `next/font/local` with the OFL license beside the font. Builds and browsers do not request Google Fonts.

For an approved original at least 1600px wide:

```sh
node scripts/prepare-image.mjs /path/to/approved.png public/images/projects/project-slug/cover.webp
```

This strips metadata and prepares 480, 768, 1200 and 1600px WebP variants without upscaling. Add accurate dimensions, alt text, variants, approval and captions in the project record. The custom Next image loader references local variants; it does not resize at runtime. Keep sensitive originals and unapproved assets outside both `public/` and Git.
