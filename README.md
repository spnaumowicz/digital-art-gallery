# Digital Art Gallery

A responsive single-page gallery for the Advanced Web Design Module 2 assignment. Explore nine works spanning digital art, illustration, photography, and animation. This is a standalone college project with no backend, accounts, API keys, or paid services.

## Technologies and features

React 19, Vite 8, Bootstrap 5, React Router, and custom CSS. Four routes (Home, Gallery, Videos, About), category filters, reusable artwork cards, a keyboard-accessible detail dialog, and native video playback. Artwork content comes from local JSON; media is bundled locally so viewing does not depend on external image/video hosts.

## Getting started

Use Node.js 24 (validated with 24.19.0) and npm.

```sh
npm ci
npm run dev
```

Run these commands from the repository root. Vite reports the development address. Normal navigation uses React Router without reloading the document.

```sh
npm run lint
npm run build
npm run preview
```

Vite produces optimized assets in `dist/`. Preview serves the production build locally; it is not a deployment. No environment variables are required.

## Project structure

```text
src/
  App.jsx                 Routes, navigation, page views, footer
  components/Artwork.jsx  Cards, grid, images, video, attribution, dialog
  data/artworks.json      Collection metadata and media paths
  App.css                 Gallery layout and component styles
  index.css               Global styles and accessibility preferences
  main.jsx                React entry point, Bootstrap, BrowserRouter
public/artwork/           Original SVGs and bundled photo/video media
netlify.toml             Build settings and SPA fallback
```

Add collection entries to `artworks.json`, using a unique ID, title, artist, year, category, description, image, descriptive alt text, source, license, and source URL. Video entries also have a `video` path. Missing text has fallbacks; failed images show an accessible unavailable message.

## Artwork and media attribution

| Work                                                                                              | Creator / source                                                                                                            | License                                                       |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Chromatic tide; Quiet orbit; Sunroom; Blue hour; Signal field; Paper mountains; Afterimage (2026) | Original SVG compositions created for this assignment, credited to Digital Art Gallery project                              | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Grace Hopper portrait (1984)                                                                      | James S. Davis / U.S. Navy; [original photograph and attribution](https://commons.wikimedia.org/wiki/File:Grace_Hopper.jpg) | Public domain: U.S. federal government work                   |
| Big Buck Bunny — excerpt (2008)                                                                   | Blender Foundation / Peach Open Movie Project; [film information](https://peach.blender.org/about/)                         | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)     |

The Grace Hopper JPEG is reproduced from [Matplotlib's sample data](https://github.com/matplotlib/matplotlib/blob/main/lib/matplotlib/mpl-data/sample_data/grace_hopper.jpg); the photograph is unmodified. The one-minute Big Buck Bunny MP4 is reproduced from [MediaElement.js sample media](https://github.com/mediaelement/mediaelement-files/blob/master/big_buck_bunny.mp4). It is an excerpt rather than the full film; the local poster JPEG is a frame extracted at 15 seconds. The film has music and sound effects without dialogue. Attribution is also available in the app's artwork details and video view. These media licenses apply to their respective assets, not automatically to all application code.

## Accessibility and responsive design

Bootstrap columns show one work per row below 768px, two from 768px, and three from 992px. Images preserve their proportions; video uses a responsive 16:9 display. Navigation collapses on mobile with an explicitly labeled toggle. Active links use `aria-current`, and filter buttons use `aria-pressed` with a live result count.

The gallery includes a skip link, semantic landmarks, visible focus outlines, descriptive alt text, and route focus management. The native modal dialog contains keyboard focus, closes with Escape or its close button, and returns focus to the trigger. Motion effects respect `prefers-reduced-motion`. Images are lazy-loaded except the hero/detail image. Videos use `preload="none"`, have native controls, and never autoplay.

## Validation

- `npm run build` and `npm run lint` pass.
- Headless Chromium checks pass at 390px, 768px, and 1440px: 1/2/3-column gallery, image loading, filtering, modal keyboard navigation, Escape, focus return, and no horizontal overflow.
- Verified SPA navigation without document reload, browser back/forward, direct routes in Vite, mobile menu, actual video playback, image failure fallback, reduced motion, and no unexpected browser console errors.
- The browser checks used environment-provided Playwright and Chromium, not additional application dependencies.

These checks do not substitute for a full accessibility audit. Safari, Firefox, physical touch devices, screen readers, and a live Netlify deployment have not been tested. Review the published site's deep routes after deployment.

## Deploy to Netlify

1. Commit and push the repository changes to GitHub.
2. In Netlify, add a project by importing an existing repository and select `spnaumowicz/digital-art-gallery`.
3. Select the branch to deploy (normally `main`), with the repository root as the base directory. The committed `netlify.toml` specifies Node 24, `npm run build`, and the `dist` publish directory.
4. Deploy. No custom domain or environment variables are required.
5. Open the generated Netlify URL and test `/gallery`, `/videos`, and `/about` directly and after refreshing. The `/*` → `/index.html` 200 rewrite serves React Router routes while existing assets remain available.

No live deployment URL is claimed; deployment must be completed through your Netlify account. If using another host, configure an equivalent SPA fallback.

Suggested Git commands (review the diff first):

```sh
git status
git diff
# Confirm the changed files are those you intend to submit.
git add README.md package.json package-lock.json index.html netlify.toml src public
git commit -m "Build responsive digital art gallery"
git push origin main
```

The assignment's personal reflection is intentionally left for a separate step.
