/**
 * IIIBC — Website Interactions
 * Vanilla JS, no dependencies. Progressive enhancement — site works without JS.
 */

(function () {
  'use strict';

  /* ── 1. MOBILE NAVIGATION ─────────────────────────────── */
  const toggle  = document.querySelector('.nav__toggle');
  const mobileNav = document.querySelector('.nav__mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

      // Animate hamburger → X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 2. ACTIVE NAV LINK ON SCROLL ─────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  function updateActiveLink () {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── 3. SCROLL REVEAL (fade-up & stagger) ─────────────── */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once visible, stop observing to avoid re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
    observer.observe(el);
  });

  /* ── 4. STICKY NAV SHADOW ─────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
      } else {
        nav.style.boxShadow = '';
      }
    }, { passive: true });
  }

  /* ── 5. SMOOTH SCROLL FOR ANCHOR LINKS ───────────────── */
  // CSS handles smooth scroll, but this ensures offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '68'
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 6. DIAGNOSTIC FORM ENHANCEMENT ──────────────────── */
  // If a Calendly or booking widget is later embedded, initialise here
  // Placeholder for future integration:
  // window.Calendly && Calendly.initInlineWidget({ url: 'https://calendly.com/iiibc/diagnostic', parentElement: document.getElementById('calendly-inline') });

})();
