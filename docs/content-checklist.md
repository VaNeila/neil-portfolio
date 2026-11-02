# Content and publication checklist

## Confirmed choices

- Light portfolio, React / Next.js / Laravel positioning, and free static hosting.
- ADULive permission pending; excluded even from review builds.
- Placeholders for unavailable contact details and résumé, as requested.

## Required before production

- [ ] Set verified professional email and GitHub URL in `data/site.ts`.
- [ ] Add the approved résumé at `public/resume.pdf` and set `site.resume`.
- [ ] Set `site.origin` to the actual HTTPS production origin, without trailing slash.
- [ ] Approve the independent project narratives.
- [ ] Confirm which Gate Management features are completed. Its current description deliberately states design intent.
- [ ] Supply or approve public lead visuals for both independent projects.
- [ ] If approving the concept covers, prepare local raster variants and retain explicit illustration captions.
- [ ] Set `narrativeApproved: true` and `publicationStatus: "published"` only after owner review.
- [ ] Run `pnpm check:release`, a release-mode build, and smoke tests.

Approval is a human decision. A validation result cannot establish publication permission.

## Optional inputs

Employment/project dates, LinkedIn, availability, actual live/repository URLs, portrait, specific invitation examples and their database choices, and verified challenges/results/lessons. Omit absent fields rather than inventing them. No date placeholders or numerical achievements appear publicly.

## ADULive review

- [ ] Approve exact responsibilities and named modules for public text.
- [ ] Obtain any required institutional permission for screenshots, diagrams or source.
- [ ] Distinguish personal contribution from the wider system/team.
- [ ] Exclude credentials, internal addresses, identifying infrastructure details, and all student/employee/financial data.
- [ ] Review original media and exported files manually.

Keep `reviewable: false`; publish only through the approved published state.

## Media rules

- `public/` files are accessible even when no page links to them.
- Never store unapproved media there or sensitive originals in Git.
- Use wholly synthetic visitor data and no actual identity documents.
- Remove private event details or obtain explicit permission.
- Sanitized screenshots still require permission. Remove identifying content permanently, not with reversible overlays.
- Caption illustrations as illustrations; do not imply they are screenshots or completed features.
- Add meaningful alt text, dimensions, and all configured variants.

## Final content review

Review every visible claim, download, route, asset, social preview, sitemap entry and structured-data field in the exported output. The supplied independent-project copy is still a draft until explicitly approved.
