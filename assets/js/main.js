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

/* ── PARTICLE NETWORK ──────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, mouse = { x: -9999, y: -9999 };

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.5 + .4,
      a: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: Math.min(count, 90) }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const dark = isDark();
    const nodeCl   = dark ? 'rgba(139,92,246,' : 'rgba(109,40,217,';
    const lineCl   = dark ? 'rgba(139,92,246,' : 'rgba(109,40,217,';
    const mouseCl  = dark ? 'rgba(6,182,212,'  : 'rgba(8,145,178,';
    const LINK_D   = 120, MOUSE_D = 140;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // mouse repel
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md  = Math.hypot(mdx, mdy);
      if (md < MOUSE_D) {
        const f = (MOUSE_D - md) / MOUSE_D * .012;
        p.vx += mdx * f; p.vy += mdy * f;
      }
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > .6) { p.vx *= .98; p.vy *= .98; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeCl + '.7)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < LINK_D) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = lineCl + (1 - d / LINK_D) * .25 + ')';
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }

      // mouse connect
      if (md < MOUSE_D) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = mouseCl + (1 - md / MOUSE_D) * .4 + ')';
        ctx.lineWidth = .8;
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', init);
  const heroSection = canvas.closest('section');
  heroSection?.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  heroSection?.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
}

/* ── CARD TILT & SHIMMER ───────────────────────────────────── */
function initTilt() {
  document.querySelectorAll('.gcard, .glass').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2);
      const dy  = (e.clientY - cy) / (r.height / 2);
      const rot = 6;
      card.style.transform = `perspective(900px) rotateY(${dx * rot}deg) rotateX(${-dy * rot}deg) translateY(-4px)`;
      card.style.setProperty('--shimmer-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--shimmer-y', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── CURSOR GLOW ───────────────────────────────────────────── */
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 70%);
    transform:translate(-50%,-50%);
    transition:opacity .3s;
    mix-blend-mode:screen;
  `;
  document.body.appendChild(glow);
  let rx = 0, ry = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
  document.addEventListener('mouseenter', () => glow.style.opacity = '1');
  (function raf() {
    rx += (tx - rx) * .12; ry += (ty - ry) * .12;
    glow.style.left = rx + 'px'; glow.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();
}

/* ── COUNTER ANIMATION ─────────────────────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('.hero__stat-val');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el   = e.target;
      const text = el.textContent.trim();
      const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;
      let start = 0, dur = 1200, startTime = null;
      const step = ts => {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val  = num <= 1 ? (ease * num).toFixed(2) : Math.round(ease * num);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: .5 });
  els.forEach(el => io.observe(el));
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
  initParticles();
  initTilt();
  initCursorGlow();
  initCounters();
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', Theme.toggle));
});
