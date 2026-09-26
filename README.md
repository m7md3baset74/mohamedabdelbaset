# Mohamed Abdelbaset — Portfolio v2

A bilingual (English / Arabic) portfolio built with Next.js 16, Tailwind CSS 4, Motion and Lenis.

- `/` — English (LTR)
- `/ar` — Arabic (RTL, fully mirrored)

## Signature details

- **Inspect mode** — press <kbd>I</kbd> (or the "Inspect" button) and hover anything to see a DevTools-style box model, colours, fonts and accessibility info. <kbd>Esc</kbd> exits. The hero runs an automatic demo of it.
- **`package.json` stack** — every skill links to the projects that used it; counts are computed from the project data.
- **Stacking project cards**, a cursor-following preview on the archive list, a scroll-lit About statement, a live Cairo clock and an auto-fitting footer wordmark.

## Editing content

Everything lives in two files:

| File | What's in it |
| --- | --- |
| `src/content/site.ts` | Name, email, phone, socials, CV path, EmailJS keys, **projects**, **skills** |
| `src/content/dict.ts` | All interface text in English and Arabic |

**Add a project:** drop a screenshot in `public/work/` (WebP, ~1600px wide), then add an entry to `projects` in `site.ts`. Set `featured: true` to put it in the stacked cards; otherwise it appears in "More projects". Use `fit: "contain"` for screenshots that are a device/card centred on a dark background, and `position` (e.g. `"left top"`) to choose which part of a wide screenshot shows.

**Add a skill:** add an entry to `skills` in `site.ts`. `matches` lists the project `stack` labels that count as using it.

**Replace the CV:** overwrite `public/Mohamed_Abdelbaset_CV.pdf`.

## Contact form

The form posts to EmailJS with the same service/template/public key as the old site (`emailjs` in `site.ts`), sending `name`, `email` and `message`. If EmailJS restricts allowed domains, add the new domain in the EmailJS dashboard.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Vercel)

Import the repo in Vercel. No environment variables are required.

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final domain for canonical URLs, the sitemap and social previews. Defaults to the Vercel project's production domain. |
| `SITE_NOINDEX=1` | Review/staging copies only: adds `noindex` and a disallow-all `robots.txt`. **Don't set it on the real site.** |
