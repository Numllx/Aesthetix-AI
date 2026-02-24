/* ================================================
   Aesthetix AI — Interactive JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initScrollAnimations();
    initDarkMode();
});

/* ---- Mobile Menu Toggle ---- */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        const icon = toggle.querySelector('.material-symbols-outlined');
        icon.textContent = isOpen ? 'close' : 'menu';
        toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const icon = toggle.querySelector('.material-symbols-outlined');
            icon.textContent = 'menu';
            toggle.setAttribute('aria-label', 'Abrir menú');
        });
    });
}

/* ---- Sticky Header with Shadow on Scroll ---- */
function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check initial state
}

/* ---- Smooth Scroll for anchor links ---- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = document.getElementById('site-header')?.offsetHeight || 64;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ---- Scroll-triggered Animations (IntersectionObserver) ---- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (!elements.length) return;

    // If IntersectionObserver is not supported, show all elements
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---- Dark Mode Toggle ---- */
function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    const icon = document.getElementById('dark-mode-icon');

    if (!toggle || !icon) return;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        icon.textContent = 'light_mode';
    }

    toggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
