/**
 * IVAN SANDOVAL · PORTFOLIO
 * main.js — All interactive behaviour
 */

/* ============================================================
   THEME TOGGLE — Dark / Light mode
   ============================================================ */
const THEME_KEY = 'ivan-portfolio-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  // 1. Check localStorage first
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) { applyTheme(saved); return; }
  // 2. Fall back to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

initTheme();

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme button ────────────────────────────────────────── */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
    themeBtn.setAttribute('aria-label', 'Toggle colour theme');
  }

  /* ── Mobile nav ──────────────────────────────────────────── */
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileNav  = document.getElementById('nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Nav scroll border + active link ────────────────────── */
  const nav      = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Scroll reveal ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Skill bar animations ────────────────────────────────── */
  const skillPanels = document.querySelectorAll('.skills-panel');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  skillPanels.forEach(el => skillObserver.observe(el));

  /* ── Parallax bands ──────────────────────────────────────── */
  const parallaxBands = document.querySelectorAll('[data-parallax]');

  // Skip parallax if user prefers reduced motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && parallaxBands.length) {
    function updateParallax() {
      parallaxBands.forEach(band => {
        const target = band.querySelector('[data-parallax-target]');
        if (!target) return;
        const rect     = band.getBoundingClientRect();
        const viewH    = window.innerHeight;
        const center   = rect.top + rect.height / 2 - viewH / 2;
        const offset   = (center / (viewH + rect.height)) * rect.height * 0.4;
        target.style.transform = `translateY(${offset}px)`;
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateParallax(); ticking = false; });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    updateParallax();
  }

  /* ── Projects carousel ───────────────────────────────────── */
  const track      = document.getElementById('projects-track');
  const arrowLeft  = document.getElementById('arrow-left');
  const arrowRight = document.getElementById('arrow-right');

  if (track) {
    /* Card width helper */
    const cardWidth = () => {
      const first = track.querySelector('.project-card');
      return first ? first.offsetWidth + 24 : 344; // width + gap
    };

    /* Arrow buttons */
    if (arrowRight) arrowRight.addEventListener('click', () => track.scrollBy({ left:  cardWidth(), behavior: 'smooth' }));
    if (arrowLeft)  arrowLeft.addEventListener('click',  () => track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));

    /* Keyboard navigation when track is focused */
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Projects carousel');
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left:  cardWidth(), behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }); }
    });

    /* Mouse drag scroll */
    let isDragging = false, startX, startScrollLeft;

    track.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      startScrollLeft = track.scrollLeft;
      track.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = startScrollLeft - (x - startX) * 1.2;
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      track.style.userSelect = '';
    });

    /* Shift + scroll → horizontal */
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.addEventListener('wheel', e => {
        if (!e.shiftKey) return;
        e.preventDefault();
        track.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
      }, { passive: false });
    }

    /* Card entrance animation */
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cards = track.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('card-visible'), i * 120);
        });
        cardObserver.disconnect();
      });
    }, { threshold: 0.15 });

    cardObserver.observe(track);
  }

}); // end DOMContentLoaded
