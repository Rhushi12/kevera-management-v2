document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('aside');
  const mainContent = document.getElementById('main-content');
  const sidebarToggle = document.getElementById('header-mobile-menu-btn');
  const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle'); // Desktop toggle
  const mobileOverlay = document.getElementById('mobile-overlay');

  // Mobile sidebar toggle
  if (sidebar && sidebarToggle && mobileOverlay) {
    const toggleMobileMenu = () => {
      sidebar.classList.toggle('mobile-open');
      mobileOverlay.classList.toggle('active');
    };

    sidebarToggle.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', toggleMobileMenu);
  }

  // Desktop sidebar toggle
  if (sidebar && mainContent && desktopSidebarToggle) {
    desktopSidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      mainContent.classList.toggle('sidebar-collapsed');
      const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
      desktopSidebarToggle.setAttribute('aria-expanded', !isCollapsed);
    });
  }
});
