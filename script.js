// GSAP ScrollSmoother
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,       // seconds it takes to catch up — higher = smoother
    effects: true,     // enables data-speed / data-lag parallax attributes
    smoothTouch: 0.1,  // light smoothing on touch devices
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initFontSize();
    initHamburger();
    initScrollButton();
    initLanyardSync();
    initBackToTop();
});

// 1. Theme Logic
function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;

    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let isDarkMode = localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && prefersDark);

    const applyTheme = () => {
        let bgColor;
        if (isDarkMode) {
            bgColor = '#0f0f0f';
            root.style.setProperty('--bg-color', bgColor);
            root.style.setProperty('--primary-color', '#FAF9F4');
            themeBtn.innerText = "☀ LIGHT";
        } else {
            bgColor = '#FAF9F4';
            root.style.setProperty('--bg-color', bgColor);
            root.style.setProperty('--primary-color', '#000000');
            themeBtn.innerText = "☾ DARK";
        }
        // Sync iframe background with current theme
        sendBgToLanyard(bgColor);
    };

    applyTheme();

    themeBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        applyTheme();
    });
}

// 2. Font Size Logic
function initFontSize() {
    const fontBtn = document.getElementById('font-btn');
    if (!fontBtn) return;

    let isLargeFont = false;

    fontBtn.addEventListener('click', () => {
        isLargeFont = !isLargeFont;
        if (isLargeFont) {
            document.body.style.fontSize = "18px";
            fontBtn.innerText = "AA ▲";
        } else {
            document.body.style.fontSize = "16px";
            fontBtn.innerText = "AA ▼";
        }
    });
}

// 3. Hamburger / Mobile Nav
function initHamburger() {
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        hamburger.classList.toggle('is-active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// 4. Smooth Scroll (only on pages that have .scroll-container)
function initScrollButton() {
    const scrollBtn = document.querySelector('.scroll-container');
    if (!scrollBtn) return;

    scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // ScrollSmoother needs its own scrollTo — scrollIntoView won't work
        if (typeof smoother !== 'undefined' && smoother && smoother.scrollTo) {
            smoother.scrollTo(targetElement, true);
        } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// 5. Lanyard Iframe Background Sync
// Because iframes can't be truly transparent in modern browsers,
// we use postMessage to tell the iframe the current hero background color.
function initLanyardSync() {
    const iframe = document.getElementById('lanyard-iframe');
    if (!iframe) return;

    // When the iframe signals it's ready, send the current bg
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'lanyardReady') {
            sendBgToLanyard(getCurrentBgColor());
        }
    });

    // Also send once the iframe has loaded (in case ready fires before listener)
    iframe.addEventListener('load', () => {
        setTimeout(() => sendBgToLanyard(getCurrentBgColor()), 100);
    });
}

function getCurrentBgColor() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === 'dark' || (stored === null && prefersDark);
    return isDark ? '#0f0f0f' : '#FAF9F4';
}

function sendBgToLanyard(color) {
    const iframe = document.getElementById('lanyard-iframe');
    if (!iframe || !iframe.contentWindow) return;
    try {
        iframe.contentWindow.postMessage({ type: 'setBg', color }, '*');
    } catch (e) {
        // Cross-origin restriction — ignore
    }
}

// 6. Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    // ScrollSmoother moves #smooth-content via CSS transforms, so actual
    // scroll position lives on window — not wrapper.scrollTop.
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
        if (typeof smoother !== 'undefined' && smoother && smoother.scrollTo) {
            smoother.scrollTo(0, true);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}