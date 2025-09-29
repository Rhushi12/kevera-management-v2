(function(){
  const btn = document.getElementById('menuToggle');
  const drawer = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  function openDrawer(){
    drawer.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('show'); });
    btn.setAttribute('aria-expanded','true');
  }

  function finalizeClose(){
    drawer.hidden = true; backdrop.hidden = true;
  }

  function closeDrawer(){
    drawer.classList.remove('open'); backdrop.classList.remove('show');
    btn.setAttribute('aria-expanded','false');
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const csD = getComputedStyle(drawer), csB = getComputedStyle(backdrop);
    const noTransition = prefersReduced || (csD.transitionDuration === '0s' && csB.transitionDuration === '0s');
    if (noTransition) { finalizeClose(); return; }
    drawer.addEventListener('transitionend', finalizeClose, { once:true });
  }

  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closeDrawer() : openDrawer();
  });
  backdrop?.addEventListener('click', closeDrawer);
})();