# Noble Finish — Website

Premium Dutch finishing brand: stucwerk · schilderwerk · renovatie.

A bilingual (NL primary, EN secondary), 5-page descriptive website built in vanilla HTML/CSS/JS. No build step required.

## Pages

- `index.html` — Home (hero, services, why-us, projects, process, testimonials)
- `about.html` — About (story, values, team)
- `services.html` — Services detail (3 services × 6 sub-items, process)
- `projects.html` — Projects gallery (8 projects, mixed grid)
- `contact.html` — Contact (info + form)

## Stack

- Vanilla HTML / CSS / JS (no frameworks)
- Google Fonts: Inter Tight (display) + Inter (body)
- Custom translation system: `js/translations.js` + `data-i18n` attributes
- Language preference persisted in `localStorage`
- Reveal-on-scroll via `IntersectionObserver`
- Contact form ready for Formspree

## Brand colors

```
Burgundy   #451C29   (primary)     ~25%
Charcoal   #1C1C1A   (text/dark)   ~10%
Ivory      #F1EAE0   (background)  ~55%
Brown      #6B5650   (muted text)  ~10%
Greige     #B8B1A4   (borders)     ~10%
Gold       #9B7B4F   (accent)      ~3%
```

## Setup

### 1. Contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form, copy the form endpoint (e.g. `https://formspree.io/f/abc123`)
3. In `contact.html`, find the `<form id="contactForm">` element
4. Set the `action` attribute to your Formspree endpoint:
   ```html
   <form id="contactForm" class="form" action="https://formspree.io/f/YOUR_ID" method="POST" novalidate>
   ```

Until you set a real Formspree action, the form runs in **demo mode** — it will reset and show the success message but won't actually send anything.

### 2. Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel — it's static, no build settings needed
3. Domain DNS (Hostinger):
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`

### 3. Customize

- Replace placeholder data in `js/translations.js` (phone, address, KVK, team names)
- Replace Unsplash placeholder images in HTML files with real project photos (place in `assets/images/`)
- Update favicon if needed (currently uses `assets/logos/icon-color.png`)

## File structure

```
noble-finish/
├── index.html
├── about.html
├── services.html
├── projects.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── translations.js
│   └── main.js
└── assets/
    ├── logos/        (9 PNG files: primary, secondary, icon × color/white/black)
    └── images/       (place project photos here)
```

## Translations

All visible strings live in `js/translations.js` keyed by `data-i18n="key.path"` attributes.

To add a new language (e.g. German):
1. Add a `de: { ... }` block in `TRANSLATIONS`
2. Add a button in the lang toggles: `<button data-lang="de">DE</button>`
3. Update the `SUPPORTED` array in `js/main.js`

## Notes

- Hero/team/project images use Unsplash CDN URLs as placeholders. Replace with actual project photography for production.
- Logo PNGs are processed to RGBA with transparent backgrounds (originally exported on black).
- Mobile menu uses a slide-in overlay; nav hamburger appears below 769px viewport.
- All sections are wrapped in `.container` (max-width 1280px).

---

Built for production — ready to deploy.
