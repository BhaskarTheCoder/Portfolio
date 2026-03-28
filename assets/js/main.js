'use strict';

/* ── THEME ─────────────────────────────────────────────────── */
const Theme = (() => {
  const KEY = 'ubv-theme';
  const html = document.documentElement;
  const get = () => localStorage.getItem(KEY) || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const set = t => { html.setAttribute('data-theme', t); localStorage.setItem(KEY, t); };
  const toggle = () => set(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  const init = () => {
    set(get());
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(KEY)) set(e.matches ? 'dark' : 'light');
    });
  };
  return { init, toggle };
})();

/* ── NAV ───────────────────────────────────────────────────── */
const Nav = (() => {
  const nav       = document.querySelector('.nav');
  const burger    = document.querySelector('.nav__hamburger');
  const drawer    = document.querySelector('.nav__mobile');
  const allLinks  = document.querySelectorAll('.nav__link');
  const sections  = [...document.querySelectorAll('section[id]')];
  let open = false;

  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
    // active link
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
    allLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
  };

  const closeMenu = () => {
    open = false;
    burger?.classList.remove('open');
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  };

  const init = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    burger?.addEventListener('click', () => {
      open = !open;
      burger.classList.toggle('open', open);
      drawer?.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer?.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
      if (open && !nav?.contains(e.target) && !drawer?.contains(e.target)) closeMenu();
    });
  };
  return { init };
})();

/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - hh - 4, behavior: 'smooth' });
    });
  });
}

/* ── REVEAL ────────────────────────────────────────────────── */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── BACK TO TOP ───────────────────────────────────────────── */
function initB2T() {
  const btn = document.querySelector('.b2t');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 500), { passive: true });
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── TICKER ────────────────────────────────────────────────── */
function initTicker() {
  document.querySelectorAll('.ticker__track').forEach(t => { t.innerHTML += t.innerHTML; });
}

/* ── CONTACT FORM ──────────────────────────────────────────── */
function initForm() {
  const form   = document.getElementById('contact-form');
  const status = document.querySelector('.cstatus');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (r.ok) { showStatus('ok', '✓ Sent! I\'ll reply soon.'); form.reset(); }
      else showStatus('err', 'Something went wrong. Email me directly.');
    } catch { showStatus('err', 'Network error. Email ai.vub21@gmail.com'); }
    btn.textContent = 'Send Message'; btn.disabled = false;
  });

  function showStatus(cls, msg) {
    if (!status) return;
    status.className = `cstatus ${cls}`; status.textContent = msg;
    setTimeout(() => status.className = 'cstatus', 6000);
  }
}

/* ── TYPEWRITER ────────────────────────────────────────────── */
function initTyped() {
  const el = document.querySelector('[data-typed]');
  if (!el) return;
  const words = JSON.parse(el.dataset.typed);
  let wi = 0, ci = 0, del = false;
  const tick = () => {
    const word = words[wi];
    del ? ci-- : ci++;
    el.textContent = word.slice(0, ci);
    let ms = del ? 55 : 95;
    if (!del && ci === word.length) { ms = 1800; del = true; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; ms = 350; }
    setTimeout(tick, ms);
  };
  setTimeout(tick, 800);
}

/* ── YEAR ──────────────────────────────────────────────────── */
function initYear() {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Nav.init();
  initScroll();
  initReveal();
  initB2T();
  initTicker();
  initForm();
  initTyped();
  initYear();
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', Theme.toggle));
});
