# marcojds.com

Personal landing page for marcojds.com, hosted on GitHub Pages. This will
eventually link out to my various projects.

## Structure

- `index.html` — landing page markup
- `css/style.css` — styles
- `js/main.js` — small bits of JS (currently just the footer year)
- `CNAME` — custom domain config for GitHub Pages (`marcojds.com`)
- `.nojekyll` — disables Jekyll processing since this is plain static HTML/CSS/JS

## Local preview

Just open `index.html` in a browser, or serve the folder locally, e.g.:

```
npx serve .
```

## Deploying (GitHub Pages)

1. Push this repo to `origin` (`main` branch).
2. In the GitHub repo, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Under **Custom domain**, enter `marcojds.com` and save (this matches the
   `CNAME` file already committed here).
5. At your domain registrar, point DNS for `marcojds.com` to GitHub Pages:
   - `A` records for the apex domain to GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Optionally a `CNAME` record for `www` pointing to `speedyrocket.github.io`
6. Once DNS propagates, enable **Enforce HTTPS** in the Pages settings.
