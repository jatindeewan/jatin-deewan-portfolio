# Jatin Deewan — Marketing & Growth Leadership Portfolio

A responsive React + Vite portfolio. This is an original implementation; it does not use or reproduce that site's proprietary source code.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Publish with GitHub Pages

1. Create a GitHub repository named `jatin-deewan-portfolio`.
2. Upload the contents of this folder to the repository root (not the folder itself).
3. In the repository, open **Settings → Pages** and choose **GitHub Actions** under **Build and deployment**.
4. The included `.github/workflows/deploy.yml` will build and publish the site whenever you push to the `main` branch.

The Vite `base` option is set to `'/jatin-deewan-portfolio/'` in `vite.config.js`. Change it to match your repository name if you use a different name. If using a custom domain, use `/` as the base.

## Where to update content

- `src/content.js` — experience, case studies, brand list and published work links.
- `src/App.jsx` — page structure and component behaviour.
- `src/style.css` — all visual styling and responsive behaviour.
- `public/assets/jatin-deewan-headshot.png` — current headshot. Replace this file to update the portrait.
- `public/assets/jatin-deewan-resume.pdf` — downloadable résumé. Replace this file when the CV changes.

## Published media behaviour

- YouTube videos are embedded using YouTube's privacy-enhanced `youtube-nocookie.com` player.
- Instagram posts show a branded preview card first. Visitors can load an Instagram embed or open the original post. Instagram may restrict embeds depending on post privacy, browser settings or its own platform policies.
- LinkedIn, press and brand website links open the original source in a new tab.

## Notes before going public

- Confirm that your phone number is approved for public WhatsApp contact.
- Confirm the current job title and regional scope shown in the Experience section.
- Verify that all campaign photos, logos and embedded content are cleared for portfolio use.
- Update or remove any performance metric whose wording or attribution needs adjustment.
