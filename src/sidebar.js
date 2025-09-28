// get elements
const btn = document.getElementById('menuToggle');
const drawer = document.getElementById('appSidebar');
const backdrop = document.getElementById('sidebarBackdrop');
const closeBtn = document.getElementById('sidebarClose');

function openDrawer() {
  drawer.hidden = false; 
  backdrop.hidden = false;
  requestAnimationFrame(() => { 
    drawer.classList.add('open'); 
    backdrop.classList.add('show'); 
  });
  btn.setAttribute('aria-expanded','true');
}

function closeDrawer() {
  drawer.classList.remove('open'); 
  backdrop.classList.remove('show'); 
  btn.setAttribute('aria-expanded','false');
  drawer.addEventListener('transitionend', () => {
    drawer.hidden = true; 
    backdrop.hidden = true;
  }, { once: true });
}

btn.addEventListener('click', () => {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  isOpen ? closeDrawer() : openDrawer();
});
backdrop.addEventListener('click', closeDrawer);
closeBtn?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

const DEFAULT_ROUTE = '/dashboard';
function getRoute() {
  const h = location.hash.replace(/^#/, '');
  return h || DEFAULT_ROUTE;
}
window.addEventListener('hashchange', () => {
  // TODO: call existing page loader or switch active state
  highlightActive(getRoute());
});
function highlightActive(route) {
  document.querySelectorAll('.menu-item').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${route}`);
  });
}
highlightActive(getRoute());