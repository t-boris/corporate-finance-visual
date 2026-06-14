# Corporate Finance Visual — project notes for Claude

## Deploy procedure

This project is **NOT** deployed via git push. It uses the Vercel CLI directly
against local files, so uncommitted changes are included in the deploy.

```bash
# from project root
vercel --prod --yes
```

- Linked Vercel project: `corporate-finance-visual` (scope `tboris-7928s-projects`).
- The link lives in `.vercel/project.json` — do not delete.
- If linking is ever lost: `vercel link --yes --scope tboris-7928s-projects --project corporate-finance-visual`.
- `vercel.json` controls build config — keep it minimal; Vite framework is auto-detected.

### Preflight before deploying

1. `vercel whoami` — confirm logged in.
2. `npx tsc --noEmit -p tsconfig.app.json` — type-check passes.
3. `npm run build` — production build succeeds locally.
4. Note any uncommitted files — they WILL be deployed (CLI uses local files).

### What "deploy" means in this repo

When the user says "deploy", run `vercel --prod --yes` directly. Do not commit
or push first unless asked — those are independent steps.
