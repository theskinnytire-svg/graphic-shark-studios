# Graphic Shark Studios

The studio site: an animated, scroll-driven homepage, a filterable work archive,
and quote and demo request forms that store leads in a Cloudflare database.

**Start with [DEPLOY.md](./DEPLOY.md)** for the full GitHub + Cloudflare setup.

- Live URL (once deployed): https://graphicsharkstudios.com
- Stack: React 19, TanStack Start (server rendered), Tailwind v4, one Cloudflare
  Worker, Cloudflare D1 for leads
- Local preview: `npm install` then `npm run dev`
- Build: `npm run build`, deploy: `npx wrangler deploy`

## Editing the site

| You want to change | Edit this |
|---|---|
| Any wording, services, projects, phone, email | `src/lib/site-content.ts` |
| Homepage sections | `src/routes/index.tsx` |
| Work archive and filters | `src/routes/work.tsx` |
| Quote and demo pages | `src/routes/quote.tsx`, `src/routes/demo.tsx` |
| Nav, footer, buttons, the form | `src/components/site/` |
| The whole look | `src/site.css` |
| Hero film and its chapter copy | `src/scroll-scrub-scenes.ts`, `public/assets/world/` |

Do not rewrite `src/components/scroll-scrub/`. That is the film engine. Fill in
scene data, never the engine.
