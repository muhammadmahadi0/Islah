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

- **Separate files** — `dark-mode.css` and `dark-mode.js` are standalone. Zero changes to `app.js`, making upstream merges trivial.
- **Toggle** — Moon/sun icon button in the header.
- **Persistence** — Saves to `localStorage('islah-dark-mode')`. Falls back to `prefers-color-scheme` media query.
- **Class-based** — Adds/removes `body.dark` class. All dark rules are scoped under `body.dark`.

## Glassmorphism Nav Bar

Bottom fixed nav bar uses frosted glass effect:
- `backdrop-filter: blur(24px)` with semi-transparent background
- Active nav item has a subtle green glass background (`::before` pseudo)
- `padding-bottom: env(safe-area-inset-bottom)` for notch devices
- Graceful fallback with `@supports not (backdrop-filter)`
- Both light & dark mode variants

## Upstream Merge Strategy

```bash
git fetch upstream
git merge upstream/main
# Only index.html may have trivial conflicts (8 lines changed)
# dark-mode.css and dark-mode.js never conflict
```

### Auto-Sync (GitHub Actions)

A scheduled workflow (`.github/workflows/sync-upstream.yml`) runs every **Monday at 6:00 UTC** to:

1. Fetch the latest from `islahbd/Islah`
2. Merge into `main`
3. **Validate**: checks file integrity, HTML structure, dark mode references
4. Push if all good
5. If merge conflicts arise → creates a PR for manual resolution

Trigger manually from GitHub Actions → `Sync Upstream` → `workflow_dispatch`.

### Validation Checks

The workflow verifies:
- `index.html`, `style.css`, `app.js`, `dark-mode.css`, `dark-mode.js` exist
- HTML has valid `<!DOCTYPE html>` structure
- Dark mode references (`dark-mode.css`, `dark-mode.js`, `toggleDarkMode`) intact
- Key CSS classes present (`neu-footer`, `dark-toggle-btn`)

## Adding New Dark Mode Rules

1. Open `dark-mode.css`
2. Add a new rule scoped under `body.dark .your-selector`
3. Use the CSS variables: `--dark-bg`, `--dark-surface`, `--dark-text`, etc.

## Responsive

Mobile-first, max-width 480px container, bottom nav bar.
