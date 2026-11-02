# Deployment and rollback

## Current state

Git is initialized locally on `main`. No remote repository, hosted preview, public deployment, domain or paid subscription has been created. The available GitHub connector does not expose repository creation, and there is no connected Netlify deployment tool. Use an authenticated owner account for these external steps.

Create a private `neil-portfolio` GitHub repository, connect the local remote, and push reviewed source and the lockfile. Never commit confidential originals. Use short branches and PRs into `main`; require the `Portfolio checks / verify` status through branch protection where the GitHub plan supports it, or apply the same review gate manually.

## Netlify Free setup

Import the repository with root as base directory. `netlify.toml` specifies Node 24, pnpm 12.16.1, static build, `out` publish directory, disabled Next runtime, production release checks, and preview noindex headers. No application secrets are required.

Netlify explicitly permits commercial projects on Free: https://www.netlify.com/blog/introducing-netlify-free-plan/. Verify current quota terms at https://www.netlify.com/pricing/ before setup. At planning time, Free included 300 monthly credits; production deploys consumed 15 each, plus traffic/request usage. Exhaustion can pause sites. Favor previews and batch production releases. Do not enable paid upgrades, domains or add-ons without approval.

## Release workflow

1. Run `pnpm check` locally and review `pnpm preview`.
2. Complete the content checklist. Review drafts should stay local until public accessibility is understood; noindex is not privacy.
3. Run `pnpm check:release` and resolve all missing inputs.
4. Assign the free Netlify URL and set it as `site.origin` for canonical/social URLs.
5. Run `CONTEXT=production pnpm check` followed by `CONTEXT=production pnpm test:smoke`. Tests and build must use the same publication mode.
6. Review a deploy preview. Its metadata/headers prevent indexing; never include confidential material.
7. Publish only the owner-approved release from `main` and verify logs contain static output, with no runtime functions.
8. Record the deployed Git commit and hosting deployment ID.

Production is guarded both by Netlify's command and the package build script. Modern Next uses `output: "export"` plus `next build`, not the removed `next export` command. Vercel migration does not require rewriting the application.

## Production verification

- [ ] HTTPS, homepage, archive and each published detail route work directly and on refresh.
- [ ] Trailing slash behavior is consistent.
- [ ] Unknown/draft routes return HTTP 404. Never add an SPA `/* /index.html 200` rewrite.
- [ ] Responsive image variants, fonts, favicon and social previews load.
- [ ] Email/profile links work and CV response contains the approved PDF.
- [ ] Production is indexable; previews are noindex.
- [ ] Canonicals/sitemap use the real origin and published routes only.
- [ ] Structured data contains only factual fields.
- [ ] Host response headers apply: immutable `/_next/static/*`, revalidatable HTML/résumé, security headers.
- [ ] Keyboard, zoom, reduced motion, Firefox, Safari and mobile reviews are complete.
- [ ] Record the median of three comparable mobile Lighthouse runs.

Targets: Lighthouse Performance 90+, Accessibility/SEO/Best Practices 95+, LCP ≤2.5s, CLS ≤0.1, INP ≤200ms. Lighthouse is lab evidence; field INP needs real usage. The local static server does not emulate every host header policy.

## Domain and monitoring

Start on the provider subdomain. A domain purchase is optional and separately approved. If added, choose one canonical hostname, redirect its alternative through the host, update `site.origin`, rebuild, and verify HTTPS/metadata. Static exports cannot apply Next runtime redirects.

Enable build-failure notifications and review free quota monthly. Analytics is omitted initially.

## Rollback

Restore the last known-good deployment in the dashboard. Smoke-test homepage, project, 404, résumé, metadata and assets. Revert the faulty Git commit or merge a reviewed fix so the next deployment preserves the correction. Record the deployment ID and incident. No database recovery or migration is involved.

## Optional Vercel path

Freelance-service promotion is treated as commercial. Hobby is restricted to personal noncommercial use: https://vercel.com/docs/limits/fair-use-guidelines. Use Pro only after paid-hosting approval and recheck https://vercel.com/pricing/ for current base, usage and tax charges.

Import the repository using the Next.js preset, pinned Node/pnpm, and `pnpm build`. Set `PORTFOLIO_RELEASE=1` in the production build context only. Keep static export initially. Configure spending controls and branch previews. Translate `_headers` into Vercel host configuration because Vercel does not apply Netlify's headers file; verify output detection, slashes, caching and 404 behavior before publication. Native runtime image optimization would be a separate reviewed configuration change.

## Audit record

Verified locally on 2026-11-02:

- `pnpm check`: lint, strict TypeScript, 5 content tests, static export, and 3 artifact tests passed.
- `pnpm test:smoke`: 17 Chromium tests passed. Includes axe on all four pages, 320–1920px reflow, HTTP 404 responses, local links, mobile disclosure, skip link, reduced motion, and navigation without JavaScript.
- Desktop and mobile homepage screenshots inspected. A font-weight mismatch and an illustrated-link accessible-name issue were corrected before the final audit.
- Three Lighthouse 13.6.0 mobile runs: median Performance **100**, Accessibility **100**, Best Practices **100**, SEO **63**. Median LCP **1.052s**, CLS **0**, TBT **6ms**.
- SEO is deliberately below launch target because review output emits noindex and robots disallow rules. Production SEO must be audited after approved content and a real origin are configured. Back/forward cache restoration is also unavailable under the local preview server's no-store policy.
- `pnpm check:release` correctly rejects missing production origin, contact email, GitHub, résumé and independent-project publication approvals.

Raw measurement summaries are in `qa-report.json`. These are local lab results, not field metrics or evidence of a deployed release. Native Safari, Firefox, mobile hardware, screen-reader checks, host headers, production SEO and deployment/rollback verification remain outstanding.
