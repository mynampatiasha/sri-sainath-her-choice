# Sri Sainath Her Choice

Landing page for Sri Sainath Her Choice, a women's and kids' clothing store
in Kamalanagar, Anantapur — premium women's clothing, kids' collection, and
daily wear.

## Tech stack

Static HTML, CSS, and vanilla JavaScript — no build step, no framework.
`patch.py` is a standalone Python utility (not part of the served site) for
offline image/content updates.

## Structure

- `index.html` — the public landing page
- `admin.html` / `admin.css` / `admin.js` — a lightweight admin page for
  managing site content
- `index.css`, `index.js` — public page styles/behavior
- product and store photos

## Running locally

```bash
python -m http.server 8000
```
