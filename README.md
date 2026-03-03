# Ivan Napoles · Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live_preview-blueviolet?style=for-the-badge&logo=netlify)](https://ivangeo.netlify.app/)

Vanilla HTML/CSS/JS portfolio — no build tools, no dependencies, no npm.
**Check it out here:** [ivangeo.netlify.app](https://ivangeo.netlify.app/)


---

## 📁 Structure

```
/portfolio
  index.html          ← Main HTML (semantic, accessible, SEO-ready)
  /css
    styles.css        ← All styles + dark/light mode tokens
  /js
    main.js           ← Theme toggle, nav, parallax, reveal, carousel
  /assets
    /images           ← Put your screenshots and photos here
      og-preview.png  ← 1200×630 image for social sharing (create this)
      project-geo-eda.png
      project-stats-dashboard.png
      project-sql-pipeline.png
    /icons            ← favicon files (optional)
```

---

## 🖼️ Adding Real Images

### Project cards
In `index.html`, each project card has a comment block like:
```html
<!--
  REPLACE: swap the SVG placeholder below with a real screenshot:
  <img src="assets/images/project-geo-eda.png"
       alt="Terrain analysis map showing contour lines..."
       class="project-img"
       loading="lazy"
       width="560" height="315" />
-->
```
1. Drop your screenshot into `assets/images/`
2. Delete the `<div class="project-img-placeholder">` block
3. Uncomment the `<img>` tag and fill in your real `src` and `alt` text

### Social preview image
Create `assets/images/og-preview.png` at 1200×630 pixels.
A screenshot of your hero section works great.

---

## 🌗 Dark / Light Mode

The toggle button in the nav switches themes and saves the choice to `localStorage`.
On first visit, it respects the user's system preference (`prefers-color-scheme`).

To adjust colors, edit the CSS variables in `css/styles.css`:
```css
/* Dark mode (default) */
:root { --bg: #0c0c0e; --accent: #2a7fff; ... }

/* Light mode */
[data-theme="light"] { --bg: #f5f5f3; ... }
```

---

## ✏️ Customise Content

Search for these placeholders in `index.html` and replace them:

| Placeholder | Replace with |
|---|---|
| `Ivan Napoles` | Your real name |
| `hello@youremail.com` | Your email |
| `user-name-c` | Your GitHub username |
| `yourprofile` | Your LinkedIn handle |
| `[ Company Name ]` | Your employer |
| `[ University Name ]` | Your university |
| `https://helloivan.netlify.app/` | Your deployed URL |

---

## 🚀 Deploy to Netlify

1. Go to **netlify.com/drop**
2. Drag and drop the entire `/portfolio` folder
3. Done — live URL in seconds

Or connect your GitHub repo for auto-deploys on push.

---

## 📊 Adding More Projects

Copy one `<article class="project-card">` block and paste it inside the
`<div class="projects-track" id="projects-track">` container.
The carousel handles any number of cards automatically.

---

## ♿ Accessibility

- Skip link at top of page
- All interactive elements have `aria-label`
- Skill bars use `role="progressbar"` with `aria-valuenow`
- Images require descriptive `alt` text (see project card comments)
- Keyboard navigation: Arrow keys scroll the project carousel
- Respects `prefers-reduced-motion` — parallax and animations disabled if requested

---

## 🔍 SEO Checklist

- [x] `<title>` tag
- [x] `<meta name="description">`
- [x] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [x] Twitter Card tags
- [x] `<link rel="canonical">`
- [ ] Add `assets/images/og-preview.png` (1200×630)
- [ ] Update canonical URL to your real domain
- [ ] Submit sitemap to Google Search Console (optional)
