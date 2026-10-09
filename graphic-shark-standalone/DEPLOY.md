# Graphic Shark Studios: deploy guide

Everything here is done for you already, except the account steps only you can
do. Nothing in this guide needs any tool installed on your computer, though
there are optional command line shortcuts marked **CLI**.

You will end up with:

- The site live at `https://graphicsharkstudios.com`
- A leads database in your Cloudflare account
- Automatic deploys: any push to your GitHub `main` branch rebuilds and
  republishes the live site with no manual upload

Time: about 15 to 20 minutes.

---

## 0. What you need open

- Your Cloudflare account, with `graphicsharkstudios.com` already added as a zone
- Your GitHub account
- The attached project folder, unzipped

Heads up on one thing: the repo root must be the folder that contains
`package.json` and `wrangler.jsonc`. Do not nest it one level deeper or the
build will not find them.

---

## 1. Put the code in your own GitHub repo

**Easiest, in the browser**

1. Go to github.com, click New repository
2. Name it `graphic-shark-studios`, set it Private if you prefer, and click
   Create repository
3. On the new repo page click **uploading an existing file**
4. Drag in the contents of the unzipped folder (all the files and folders, not
   the folder itself), then click Commit changes

**CLI**

```bash
cd graphic-shark-studios
git init
git add .
git commit -m "Graphic Shark Studios site"
git branch -M main
git remote add origin git@github.com:YOURNAME/graphic-shark-studios.git
git push -u origin main
```

---

## 2. Create the leads database

**In the dashboard**

1. Cloudflare dashboard, then **Workers & Pages**, then **D1 SQL Database**,
   then **Create**
2. Name it exactly `graphic-shark-leads` and click Create
3. Open it and copy the **Database ID** (a long uuid)

**CLI**

```bash
npx wrangler login
npx wrangler d1 create graphic-shark-leads
```

Either way, paste that ID into `wrangler.jsonc`, replacing
`PASTE_YOUR_D1_DATABASE_ID_HERE`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "graphic-shark-leads",
    "database_id": "the-uuid-you-copied"
  }
]
```

Then commit and push that change. You can do it right in GitHub: open
`wrangler.jsonc`, click the pencil, paste, click Commit changes.

Do this before the first deploy, or the deploy fails with a database binding
error.

---

## 3. Create the table that stores the leads

**In the dashboard**

1. Open your `graphic-shark-leads` database
2. Click the **Console** tab
3. Paste the SQL below and click Execute

```sql
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  name TEXT NOT NULL,
  business TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  services TEXT,
  budget TEXT,
  timeline TEXT,
  demo_goal TEXT,
  message TEXT,
  source_path TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at
  ON submissions (created_at DESC);
```

**CLI**

```bash
npm install
npm run db:apply
```

---

## 4. Connect the repo so Cloudflare builds and deploys it for you

This is the step that removes manual uploads forever.

1. Cloudflare dashboard, **Workers & Pages**, then **Create application**, then
   the **Workers** tab, then **Connect to Git** (labelled Import a repository on
   some accounts)
2. Authorise GitHub if asked, then pick `graphic-shark-studios`
3. Set the build settings:

| Field | Value |
|---|---|
| Project name | `graphic-shark-studios` |
| Root directory | `/` (or leave blank) |
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Framework preset | None |

4. Click Create and Deploy

Cloudflare installs the dependencies, builds the site, and deploys the Worker.
When it finishes it gives you a `https://graphic-shark-studios.YOUR-SUBDOMAIN.workers.dev`
URL. Open it: the film should play as you scroll, and all four pages should
work.

Every future push to `main` now rebuilds and redeploys on its own.

---

## 5. Put graphicsharkstudios.com on it

1. Cloudflare dashboard, **Workers & Pages**, open `graphic-shark-studios`
2. **Settings**, then **Domains & Routes**, then **Add**, then **Custom domain**
3. Type `graphicsharkstudios.com` and confirm

Because the domain lives in this same Cloudflare account, Cloudflare writes the
DNS record for you. Nothing to copy into a DNS page.

4. Repeat for `www.graphicsharkstudios.com`
5. Then send `www` to the apex: **Rules**, then **Redirect Rules**, then Create
   rule. If the incoming request hostname equals `www.graphicsharkstudios.com`,
   redirect to `https://graphicsharkstudios.com` with a 301, preserving the path.

Give it a minute or two, then open `https://graphicsharkstudios.com`.

---

## 6. Check that leads actually save

1. On the live site, submit a test request on `/quote`
2. Cloudflare dashboard, **D1 SQL Database**, open `graphic-shark-leads`,
   **Console**, run:

```sql
SELECT id, kind, name, email, created_at FROM submissions ORDER BY created_at DESC;
```

**CLI**

```bash
npm run db:leads
```

If your test row is there, the whole pipeline works end to end.

---

## 7. How changes ship from now on

You say what you want changed. The change is made, committed, and pushed to
`main`. Cloudflare sees the push, rebuilds, and the live site updates in about a
minute. No zip, no download, no upload step.

Same thing for new pages: a new file under `src/routes/` becomes a new URL.

---

## 8. Optional: work on it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-check + production build
```

---

## 9. Troubleshooting

**Build fails with `EOVERRIDE` on @types/react.** The version in
`devDependencies` and the `overrides` block must match exactly. Both currently
read `19.2.15`.

**Deploy fails mentioning the database or a binding.** The real `database_id`
is not in `wrangler.jsonc`, or that change was not pushed. Step 2.

**Build fails with `tsr: not found`.** The install step skipped dev
dependencies. Use `npm ci && npm run build` as the build command.

**Build fails mentioning `ASSETS` or the assets directory.** `wrangler.jsonc`
and the `dist/` output must both be present. Do not add `run_worker_first`.

**The site loads but the form does nothing.** Run the SQL in step 3, then
resubmit. The form reports a clear failure and shows your phone number if
storage is unavailable.

**The domain shows a Cloudflare error page.** Check Settings, Domains & Routes
on the Worker: the domain should read Active. If the site previously had DNS
records for `@` or `www`, remove the conflicting ones.

**Fonts look like a fallback.** Cabinet Grotesk comes from Fontshare and Inter
Tight plus JetBrains Mono from Google Fonts. Nothing to configure; it needs a
normal internet connection to load them.

---

## 10. Where everything lives

| You want to change | Edit this |
|---|---|
| Any wording, service names, project list, phone, email | `src/lib/site-content.ts` |
| Homepage sections | `src/routes/index.tsx` |
| Work archive and its filters | `src/routes/work.tsx` |
| Quote and demo pages | `src/routes/quote.tsx`, `src/routes/demo.tsx` |
| Nav, footer, buttons, the form itself | `src/components/site/` |
| The whole look (colours, type, layout) | `src/site.css` |
| Hero film and the chapter copy over it | `src/scroll-scrub-scenes.ts`, `public/assets/world/` |
| Database schema | `migrations/` |
| Page metadata, cover image, favicon | `src/app-meta.json` |

## Notes on assets

- Do not rewrite `src/components/scroll-scrub/`. That is the film engine: it
  handles seeking, lazy loading, mobile sources, reduced motion and reverse
  scroll. Fill in scene data, never the engine.
- Every film poster in `public/assets/world/` must be the exact first frame of
  the clip beside it. Regenerate posters from the encoded clip, never from a
  still.
- The hero film is currently 720p. For a sharper hero, encode a higher
  resolution take to the same filenames and regenerate the two posters.
- Images are webp at 1600px, video is H.264 with the audio track removed.

## Reusing this for a client site

Swap the content in `src/lib/site-content.ts`, replace `public/assets/`, and
change `name` plus the database name in `wrangler.jsonc`. Same pattern, new
client, new repo, new domain.
