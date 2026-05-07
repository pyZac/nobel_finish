/* =========================================================
   NOBLE FINISH — Main script
   - Language toggle (NL/EN, persisted)
   - Mobile menu
   - Sticky nav effect
   - Scroll reveal animations
   - Contact form (Formspree-ready)
   ========================================================= */

(function () {
    'use strict';

    /* ---------- 1. LANGUAGE SYSTEM ---------- */
    const DEFAULT_LANG = 'nl';
    const STORAGE_KEY = 'nf_lang';
    const SUPPORTED = ['nl', 'en'];

    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.includes(stored)) return stored;
        return DEFAULT_LANG;
    }

    function setLang(lang) {
        if (!SUPPORTED.includes(lang)) return;
        localStorage.setItem(STORAGE_KEY, lang);
        applyLang(lang);
        document.documentElement.lang = lang;

        // Update toggle UI (desktop + mobile)
        document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.lang === lang);
        });
    }

    function applyLang(lang) {
        const dict = TRANSLATIONS[lang];
        if (!dict) return;

        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                // Multi-line strings need to preserve line breaks
                if (dict[key].includes('\n')) {
                    el.innerHTML = dict[key].split('\n')
                        .map(s => escapeHtml(s))
                        .join('<br>');
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        // Placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });

        // aria-label attributes
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
        });
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /* ---------- 2. NAV BEHAVIOR ---------- */
    function initNav() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const onScroll = () => {
            nav.classList.toggle('is-scrolled', window.scrollY > 24);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        // Hamburger
        const hamburger = document.querySelector('.nav__hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                const open = hamburger.classList.toggle('is-open');
                mobileMenu.classList.toggle('is-open', open);
                document.body.style.overflow = open ? 'hidden' : '';
            });

            // Close on link click
            mobileMenu.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    hamburger.classList.remove('is-open');
                    mobileMenu.classList.remove('is-open');
                    document.body.style.overflow = '';
                });
            });
        }

        // Active link based on current page
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            if (href === path || (path === '' && href === 'index.html')
                || (path === 'index.html' && href === 'index.html')) {
                link.classList.add('is-active');
            }
        });
    }

    /* ---------- 3. SCROLL REVEAL ---------- */
    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (!items.length || !('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));
    }

    /* ---------- 4. LANGUAGE TOGGLE WIRING ---------- */
    function initLangToggle() {
        document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang) setLang(lang);
            });
        });
    }

    /* ---------- 5. CONTACT FORM (Formspree-ready) ---------- */
    function initContactForm() {
        const form = document.querySelector('#contactForm');
        if (!form) return;
        const successEl = form.querySelector('.form__success');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const action = form.getAttribute('action');
            const submitBtn = form.querySelector('button[type=submit]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;

            // Real Formspree submission if action is set
            if (action && action.includes('formspree.io')) {
                try {
                    const res = await fetch(action, {
                        method: 'POST',
                        body: data,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (res.ok) {
                        form.reset();
                        if (successEl) successEl.classList.add('is-visible');
                    } else {
                        alert('Er ging iets mis. Probeer het opnieuw of mail ons direct.');
                    }
                } catch (err) {
                    alert('Er ging iets mis. Probeer het opnieuw of mail ons direct.');
                }
            } else {
                // Demo mode (no Formspree configured yet)
                form.reset();
                if (successEl) successEl.classList.add('is-visible');
            }

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }

    /* ---------- INIT ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        const lang = getLang();
        setLang(lang);
        initNav();
        initLangToggle();
        initReveal();
        initContactForm();
    });
})();
