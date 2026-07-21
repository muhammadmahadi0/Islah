/* ========== Dark Mode Toggle ==========
 * Separate file to avoid merge conflicts with upstream app.js
 * Detects system preference, saves to localStorage, toggles <body> class
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'islah-dark-mode';
    const DARK_CLASS = 'dark';

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
        // Respect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add(DARK_CLASS);
        } else {
            document.body.classList.remove(DARK_CLASS);
        }
        // Update toggle button icon if it exists
        const btn = document.getElementById('dark-mode-toggle');
        if (btn) {
            btn.innerHTML = theme === 'dark'
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.contains(DARK_CLASS);
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, newTheme);
        applyTheme(newTheme);
    }

    // Apply on load
    const theme = getPreferredTheme();
    applyTheme(theme);

    // Listen for system preference changes (when no explicit choice saved)
    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', function (e) {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Expose toggle for inline onclick
    window.toggleDarkMode = toggleTheme;
})();
