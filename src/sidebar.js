(() => {
  const btn = document.getElementById('menuToggle');
  const drawer = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const STORAGE_KEY = 'sidebarOpen';

  let lastFocus = null;

  const focusableSelectors = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('open');
      backdrop.classList.add('show');
    });
    btn.setAttribute('aria-expanded', 'true');
    // Focus first focusable in the sidebar
    const first = drawer.querySelector(focusableSelectors);
    (first || drawer).focus({ preventScroll: true });
    // Persist state
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
    document.addEventListener('keydown', onKeydown, true);
    document.addEventListener('focus', trapFocus, true);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
    // After transition, hide from tree
    const done = () => {
      drawer.hidden = true;
      backdrop.hidden = true;
      drawer.removeEventListener('transitionend', done);
    };
    drawer.addEventListener('transitionend', done, { once: true });
    try { localStorage.setItem(STORAGE_KEY, 'false'); } catch {}
    document.removeEventListener('keydown', onKeydown, true);
    document.removeEventListener('focus', trapFocus, true);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function toggleDrawer() {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closeDrawer() : openDrawer();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
    } else if (e.key === 'Tab') {
      // Keep focus inside
      const nodes = drawer.querySelectorAll(focusableSelectors);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }

  function trapFocus(e) {
    if (!drawer.classList.contains('open')) return;
    if (!drawer.contains(e.target)) {
      e.stopPropagation();
      const first = drawer.querySelector(focusableSelectors);
      (first || drawer).focus();
    }
  }

  // Wire up interactions
  btn.addEventListener('click', toggleDrawer);
  backdrop.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (link) closeDrawer();
  });

  // Initialize state (default closed)
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      // still start closed on first load after a hard refresh
      btn.setAttribute('aria-expanded', 'false');
    } else {
      btn.setAttribute('aria-expanded', 'false');
    }
  } catch {
    btn.setAttribute('aria-expanded', 'false');
  }
})();