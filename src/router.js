/**
 * Kevera Manufacturing - Client-Side Hash Router
 * Simple routing system for single-page application
 */

class KeveraRouter {
  constructor() {
    this.routes = new Map();
    this.routeTitles = new Map();
    this.currentRoute = null;
    this.pageContainer = null;
    
    // Initialize router when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.pageContainer = document.getElementById('page-root');
    if (!this.pageContainer) {
      console.error('Router: #page-root container not found');
      return;
    }

    // Define all routes
    this.defineRoutes();
    
    // Handle hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Handle initial route
    this.handleRoute();
    
    // Setup navigation event listeners
    this.setupNavigation();
  }

  defineRoutes() {
    // Define route titles mapping
    this.routeTitles.set('dashboard', 'Dashboard');
    this.routeTitles.set('intake', 'Intake (Step 1)');
    this.routeTitles.set('cutting', 'Cutting & Bundling (Step 2)');
    this.routeTitles.set('sewing', 'Sewing (Step 3)');
    this.routeTitles.set('ironing', 'Ironing (Step 4)');
    this.routeTitles.set('packaging', 'Labeling & Packaging (Step 5)');
    this.routeTitles.set('lots', 'Lots & Tracking');
    this.routeTitles.set('workers', 'Workers');
    this.routeTitles.set('admin', 'Admin');
    this.routeTitles.set('lot-tracking', 'Lot & Tracking');
    this.routeTitles.set('settings', 'Settings');

    this.routes.set('dashboard', {
      path: '#/dashboard',
      file: 'src/pages/dashboard.html',
      title: 'Dashboard',
      navId: 'nav-dashboard'
    });
    
    this.routes.set('intake', {
      path: '#/intake',
      file: 'src/pages/intake-step-1.html',
      title: 'Intake (Step 1)',
      navId: 'nav-intake'
    });
    
    this.routes.set('cutting', {
      path: '#/cutting',
      file: 'src/pages/cutting-step-2.html',
      title: 'Cutting & Bundling (Step 2)',
      navId: 'nav-cutting'
    });
    
    this.routes.set('sewing', {
      path: '#/sewing',
      file: 'src/pages/sewing-step-3.html',
      title: 'Sewing (Step 3)',
      navId: 'nav-sewing'
    });
    
    this.routes.set('ironing', {
      path: '#/ironing',
      file: 'src/pages/ironing-step-4.html',
      title: 'Ironing (Step 4)',
      navId: 'nav-ironing'
    });
    
    this.routes.set('packaging', {
      path: '#/packaging',
      file: 'src/pages/labeling-step-5.html',
      title: 'Labeling & Packaging (Step 5)',
      navId: 'nav-packaging'
    });
    
    this.routes.set('lots', {
      path: '#/lots',
      file: 'src/pages/lot-tracking.html',
      title: 'Lots & Tracking',
      navId: 'nav-lots'
    });
    
    this.routes.set('workers', {
      path: '#/workers',
      file: 'src/pages/workers.html',
      title: 'Workers',
      navId: 'nav-workers'
    });
    
    this.routes.set('admin', {
      path: '#/admin',
      file: 'src/pages/admin.html',
      title: 'Admin',
      navId: 'nav-admin'
    });
    
    this.routes.set('lot-tracking', {
      path: '#/lot-tracking',
      file: 'src/pages/lot-tracking.html',
      title: 'Lot & Tracking',
      navId: 'nav-lot-tracking'
    });
    
    this.routes.set('settings', {
      path: '#/settings',
      file: 'src/pages/settings.html',
      title: 'Settings',
      navId: 'nav-settings'
    });
  }

  getCurrentRouteKey() {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#/') {
      return 'dashboard'; // Default route
    }
    
    // Extract route key from hash (e.g., '#/dashboard' -> 'dashboard')
    const routeKey = hash.replace('#/', '');
    return this.routes.has(routeKey) ? routeKey : 'dashboard';
  }

  async handleRoute() {
    const routeKey = this.getCurrentRouteKey();
    const route = this.routes.get(routeKey);
    
    if (!route) {
      console.error(`Route not found: ${routeKey}`);
      return;
    }

    try {
      // Show loading state
      this.showLoading();
      
      // Load page content
      const content = await this.loadPageContent(route.file);
      
      // Update page container
      this.pageContainer.innerHTML = content;
      
      // Update document title
      document.title = `Kevera - ${route.title}`;
      
      // Update navigation active state
      this.updateNavigationState(route.navId);
      
      // Update page title in header
      this.updatePageTitle(routeKey);
      
      // Initialize any page-specific scripts
      this.initializePageScripts(routeKey);
      
      this.currentRoute = routeKey;
      
    } catch (error) {
      console.error(`Error loading route ${routeKey}:`, error);
      this.showError('Failed to load page. Please try again.');
    }
  }

  async loadPageContent(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }
    return await response.text();
  }

  updateNavigationState(activeNavId) {
    // Remove active state from all nav items
    const navItems = document.querySelectorAll('[data-nav-item]');
    navItems.forEach(item => {
      item.classList.remove('bg-primary/10', 'dark:bg-primary/20', 'text-primary');
      item.classList.add('text-gray-500', 'dark:text-gray-400');
    });
    
    // Add active state to current nav item
    const activeItem = document.querySelector(`[data-nav-item="${activeNavId}"]`);
    if (activeItem) {
      activeItem.classList.add('bg-primary/10', 'dark:bg-primary/20', 'text-primary');
      activeItem.classList.remove('text-gray-500', 'dark:text-gray-400');
    }
  }

  updatePageTitle(routeKey) {
    const pageTitle = document.querySelector('#page-title');
    if (pageTitle && this.routeTitles.has(routeKey)) {
      pageTitle.textContent = this.routeTitles.get(routeKey);
    }
  }

  setupNavigation() {
    // Add click event listeners to navigation links
    document.addEventListener('click', (event) => {
      const navLink = event.target.closest('[data-nav-item]');
      if (navLink) {
        event.preventDefault();
        const href = navLink.getAttribute('href');
        if (href && href.startsWith('#/')) {
          window.location.hash = href;
        }
      }
    });
  }

  showLoading() {
    if (this.pageContainer) {
      this.pageContainer.innerHTML = `
        <div class="flex items-center justify-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span class="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      `;
    }
  }

  showError(message) {
    if (this.pageContainer) {
      this.pageContainer.innerHTML = `
        <div class="flex items-center justify-center min-h-[400px]">
          <div class="text-center">
            <div class="text-red-500 text-4xl mb-4">⚠️</div>
            <p class="text-gray-600 dark:text-gray-400">${message}</p>
            <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }

  initializePageScripts(routeKey) {
    // Initialize page-specific functionality
    switch (routeKey) {
      case 'cutting':
        this.initializeCuttingPage();
        break;
      case 'workers':
        this.initializeWorkersPage();
        break;
      case 'admin':
        this.initializeAdminPage();
        break;
      // Add more page-specific initializations as needed
    }
  }

  initializeCuttingPage() {
    // Initialize cutting page specific functionality
    console.log('Initializing cutting page...');
  }

  initializeWorkersPage() {
    // Initialize workers page specific functionality
    console.log('Initializing workers page...');
  }

  initializeAdminPage() {
    // Initialize admin page specific functionality
    console.log('Initializing admin page...');
  }

  // Public methods for programmatic navigation
  navigateTo(routeKey) {
    if (this.routes.has(routeKey)) {
      window.location.hash = this.routes.get(routeKey).path;
    } else {
      console.error(`Route not found: ${routeKey}`);
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  getRouteTitle(routeKey) {
    const route = this.routes.get(routeKey);
    return route ? route.title : 'Unknown';
  }
}

// Initialize router
const keveraRouter = new KeveraRouter();

// Export for use in other scripts
window.KeveraRouter = keveraRouter;
