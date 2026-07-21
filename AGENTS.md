# Islah — Dark Mode Fork

## Overview

Fork of [islahbd/Islah](https://github.com/islahbd/Islah) — a static Bengali Islamic site for Shah Tayyeb Ashraf Saheb's schedule, bayan links, and majlis calendar, with **dark mode** support added.

## Stack

- Plain HTML/CSS/JS (no build tools)
- Tailwind CSS via CDN
- Google Calendar API v3 (fetch bayan schedule)
- Font Awesome 6
- Fonts: SolaimanLipi, Hind Siliguri

## File Structure

```
├── index.html        # Main page (+8 lines: dark mode toggle, CSS/JS links)
├── style.css         # Original styles (UNCHANGED — upstream merges clean)
├── app.js            # Original JS (UNCHANGED — upstream merges clean)
├── dark-mode.css     # Full dark theme CSS overrides (.dark class)
├── dark-mode.js      # Toggle logic, localStorage persistence, system pref detection
├── logo.jpg, ijtema.png, monday.png, romjan.jpeg  # Static assets
```

## Dark Mode Architecture

- **Separate files** — `dark-mode.css` and `dark-mode.js` are standalone. Zero changes to `style.css` or `app.js`, making upstream merges trivial.
- **Toggle** — Moon/sun icon button in the header.
- **Persistence** — Saves to `localStorage('islah-dark-mode')`. Falls back to `prefers-color-scheme` media query.
- **Class-based** — Adds/removes `body.dark` class. All dark rules are scoped under `body.dark`.

## Upstream Merge Strategy

```bash
git fetch upstream
git merge upstream/main
# Only index.html may have trivial conflicts (8 lines changed)
# dark-mode.css and dark-mode.js never conflict
```

## Adding New Dark Mode Rules

1. Open `dark-mode.css`
2. Add a new rule scoped under `body.dark .your-selector`
3. Use the CSS variables: `--dark-bg`, `--dark-surface`, `--dark-text`, etc.

## Responsive

Mobile-first, max-width 480px container, bottom nav bar.
