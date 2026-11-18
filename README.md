# Rosanky Baptist Church

Static rebuild of [rosankybc.org](https://www.rosankybc.org/) with [Astro](https://astro.build/). Pages, service times, beliefs, giving instructions, Trumpet News posts, and images come from the current Squarespace site. Facts that the current site does not publish are marked **TODO** on the contact, prayer, and Get Connected pages, and again below.

## Develop

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321/`.

## Build

```bash
npm run build
```

Static files are written to `dist/`. Preview them with:

```bash
npm run preview
```

## Deploy

This is a static site. On Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`

The repository is also connected to Cloudflare Workers Builds. Preview builds run `npx wrangler preview` with no separate build command, so `prepare` runs `astro build` during `npm ci` and `wrangler.jsonc` serves `dist` as static assets, including `404.html` and `public/_redirects`.

`public/_redirects` sends `/home` to `/` and keeps a few older Trumpet category URLs working. Astro also emits an HTML redirect for `/home`.

Set the production site URL in `astro.config.mjs` (`site`) if the domain changes. Canonical links, Open Graph tags, the sitemap, and Church / LocalBusiness JSON-LD use `https://www.rosankybc.org`.

## Pages

| Path | Source on the current site |
| --- | --- |
| `/` | Home |
| `/visit` | I'm New & Beliefs |
| `/give` | Give |
| `/calendar` | Church Center calendar embed |
| `/trumpet` and `/trumpet/…` | Trumpet News posts, categories, and tags |
| `/contact` | Contact |
| `/get-connected` | Get Connected |
| `/pray-for-me` | Pray For Me |

## TODO — not on the current site

- Pastor and staff names are not on the old Squarespace pages. Bible and Life names Dr. Mark Redd as interim pastor.
- Visit details still unpublished: music style, dress, which door, kids’ age groups, check-in safety steps, and a 60 to 90 second pastor welcome video. The visit form emails hello@rosankybc.org.
- There is no sermon or media archive.
- The church Facebook page is https://www.facebook.com/RosankyBaptistChurch. Header icons on the old site for Instagram and X point at Squarespace’s own accounts, so those are omitted.
- Two phone numbers appear: `(512) 360-3968` in the footer and tap-to-call link, and `(512) 360-3109` in the site’s business settings.
- `hello@rosankybc.org` is in the site’s business information and is not printed in the visible footer.
- The May 2026 and March 2026 “Download Trumpet” buttons have empty links, and those PDFs were not found.
- `/get-connected` is Squarespace placeholder copy and stock photos, not church content.
- Contact and prayer forms posted to Squarespace with a captcha. This site opens an email and links the live Church Center prayer form until a form backend is connected.
