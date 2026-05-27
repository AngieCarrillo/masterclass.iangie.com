/* ============================================
   THE ASK - LANDING PAGE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- COUNTDOWN TIMER to June 9, 2026 9:00 AM PST (UTC-7) ---
  const eventDate = new Date('2026-06-09T09:00:00-07:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      document.querySelector('.countdown-label').textContent = "We're live now";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- SCROLL FADE-IN ANIMATIONS ---
  const animatedSelectors = [
    '.problem-content .section-label',
    '.problem-title',
    '.problem-highlight',
    '.problem-body',
    '.learn-intro',
    '.learn-item',
    '.rsvp-top',
    '.rsvp-details',
    '.course-title',
    '.course-tagline',
    '.course-description',
    '.module-card',
    '.audience-card',
    '.bold-title',
    '.bold-section .btn-primary',
    '.agenda-title',
    '.agenda-item',
    '.host-text .section-label',
    '.host-text h2',
    '.host-text p',
    '.host-image',
    '.btn-host',
    '.final-title',
    '.final-subtitle',
    '.final-cta-section .btn-primary'
  ];

  animatedSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-in');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // --- STAGGER LEARN ITEMS ---
  document.querySelectorAll('.learn-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.12}s`;
  });

  // --- STAGGER MODULE CARDS ---
  document.querySelectorAll('.module-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // --- STAGGER AGENDA ITEMS ---
  document.querySelectorAll('.agenda-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- STAGGER AUDIENCE CARDS ---
  document.querySelectorAll('.audience-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });

  // --- NAVBAR OPACITY ON SCROLL ---
  const nav = document.querySelector('.top-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(24, 24, 24, 0.97)';
    } else {
      nav.style.background = 'rgba(24, 24, 24, 0.92)';
    }
  });

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = anchor.getAttribute('href');
      if (target && target !== '#' && target !== '#/') {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // --- STAT COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
  }

});
