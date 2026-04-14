// theme-init.js — Runs before paint to prevent theme flash
// Shared across all pages
(function () {
    var s = localStorage.getItem('theme');
    var dark = s === 'dark' || (s === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) {
        document.documentElement.style.setProperty('--bg-color', '#0f0f0f');
        document.documentElement.style.setProperty('--primary-color', '#FAF9F4');
    }
})();
