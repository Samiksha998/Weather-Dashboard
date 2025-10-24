# Samiksha Gurav — DevOps Portfolio

This is a small React + Vite portfolio site intended for deployment to GitHub Pages.

Getting started

1. Install dependencies

```powershell
npm install
```

2. Run locally

```powershell
npm run dev
```

Build and deploy to GitHub Pages

You can build the site with `npm run build` and then deploy the contents of the `dist/` folder to GitHub Pages. A simple way is to use the `gh-pages` npm package or GitHub Actions.

Quick steps with gh-pages (optional):

```powershell
npm install --save-dev gh-pages
npm run build
npx gh-pages --dotfiles -d dist -b gh-pages
```

Or use the included GitHub Actions workflow `.github/workflows/deploy.yml` to build and publish `dist/` to the `gh-pages` branch automatically on push to `main`/`master`.

GitHub Actions notes:

- The workflow builds the site with Node 18 and publishes the `dist/` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
- Make sure your repository's default branch is `main` (or adjust the workflow) and that GitHub Pages is set to serve from the `gh-pages` branch in repository settings.

Notes

- Update repository name and homepage in `package.json` if you plan to set `homepage` for gh-pages.
- Replace contact links with your preferred destinations.

