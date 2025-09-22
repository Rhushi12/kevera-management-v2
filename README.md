# Kevera Manufacturing Web Application

A modern, responsive manufacturing management web application built with vanilla HTML, CSS, and JavaScript. This application provides a comprehensive interface for managing the entire garment manufacturing process from intake to packaging.

## 🚀 Phase A - Front-end Refactor (COMPLETED)

The application has been successfully refactored from individual Stitch-exported pages into a modular, maintainable single-page application with shared layouts and client-side routing.

## 📁 Project Structure

```
kevera/
├── index.html                    # Main entry point with consolidated Tailwind config
├── src/
│   ├── layouts/
│   │   ├── SharedLayout.html    # Shared sidebar and header components
│   │   └── SharedLayout.js      # Layout functionality and mobile responsiveness
│   ├── pages/                   # Individual page content (extracted from Stitch exports)
│   │   ├── dashboard.html       # Main dashboard
│   │   ├── intake-step-1.html   # Material intake form
│   │   ├── cutting-step-2.html  # Cutting & bundling with sticky action bar
│   │   ├── sewing-step-3.html   # Sewing operations management
│   │   ├── ironing-step-4.html  # Ironing process tracking
│   │   ├── labeling-step-5.html # Labeling & packaging operations
│   │   ├── workers.html         # Worker management with responsive tables
│   │   ├── admin.html           # Admin panel with user roles
│   │   ├── audit-log.html       # Audit trail and logging
│   │   └── sign-in.html         # Authentication page
│   ├── styles/
│   │   └── tokens.css           # Design system with CSS custom properties
│   └── router.js                # Client-side hash-based router
└── README.md                    # This file
```

## 🏃‍♂️ Running Locally

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (Python, Node.js, or any static file server)

### Quick Start

1. **Clone or download** the project files to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd kevera
   ```

3. **Start a local web server**:

   **Option 1: Python (Recommended)**
   ```bash
   # Python 3
   python -m http.server 3000
   
   # Python 2
   python -m SimpleHTTPServer 3000
   ```

   **Option 2: Node.js**
   ```bash
   # Install a global static server
   npm install -g serve
   
   # Serve the current directory
   serve -p 3000
   ```

   **Option 3: PHP**
   ```bash
   php -S localhost:3000
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

5. **Navigate through the app** using the sidebar or direct URLs:
   - Dashboard: `http://localhost:3000#/dashboard`
   - Intake: `http://localhost:3000#/intake`
   - Cutting: `http://localhost:3000#/cutting`
   - And so on...

## 🧭 Routing Structure

The application uses hash-based client-side routing for seamless navigation without page reloads.

### Available Routes

| Route | URL | Page | Description |
|-------|-----|------|-------------|
| Dashboard | `#/dashboard` | `dashboard.html` | Main overview with active lots and summary cards |
| Intake (Step 1) | `#/intake` | `intake-step-1.html` | Material intake and lot creation |
| Cutting & Bundling (Step 2) | `#/cutting` | `cutting-step-2.html` | Cutting operations with sub-bundle management |
| Sewing (Step 3) | `#/sewing` | `sewing-step-3.html` | Sewing job assignment and tracking |
| Ironing (Step 4) | `#/ironing` | `ironing-step-4.html` | Ironing process management |
| Labeling & Packaging (Step 5) | `#/packaging` | `labeling-step-5.html` | Final packaging and labeling |
| Lots & Tracking | `#/lots` | `dashboard.html` | Lot tracking (currently uses dashboard) |
| Workers | `#/workers` | `workers.html` | Worker management with role assignments |
| Admin | `#/admin` | `admin.html` | User and system administration |
| Audit Log | `#/audit` | `audit-log.html` | Activity logging and audit trails |
| Settings | `#/settings` | `dashboard.html` | Application settings (placeholder) |

### Deep Linking

All routes support deep linking. Users can:
- Bookmark specific pages
- Share direct links to manufacturing steps
- Use browser back/forward navigation
- Refresh the page without losing context

## 🎨 Design System

### Color Palette
The application uses a consistent color system defined in `src/styles/tokens.css`:

- **Primary**: `#0F766E` (Teal green for primary actions)
- **Accent**: `#F59E0B` (Amber for secondary actions)
- **Backgrounds**: Light (`#f6f8f8`) / Dark (`#112120`)
- **Surfaces**: Light (`#ffffff`) / Dark (`#1a2e2c`)

### Typography
- **Primary Font**: Inter (clean, modern sans-serif)
- **Display Font**: Inter + Manrope (for headings)
- **Icons**: Material Symbols Outlined

### Responsive Design
- **Mobile-first**: Optimized for mobile devices with responsive breakpoints
- **Sidebar**: Collapsible on mobile with hamburger menu
- **Tables**: Horizontal scroll on small screens
- **Forms**: Stacked inputs on mobile, side-by-side on desktop

## 🔧 Key Features

### ✅ Completed Features

1. **Unified Layout System**
   - Single shared sidebar and header
   - Consistent navigation across all pages
   - Mobile-responsive hamburger menu

2. **Client-Side Routing**
   - Hash-based navigation
   - No page reloads
   - Browser history support
   - Deep linking capability

3. **Design System**
   - Consolidated CSS custom properties
   - Consistent color palette
   - Unified typography scale
   - Responsive utilities

4. **Page-Specific Features Preserved**
   - Cutting page: Sticky bottom action bar, sub-bundle tables
   - Workers page: Responsive table with role management
   - Admin page: User management with custom roles
   - All original Stitch designs maintained

5. **Mobile Optimization**
   - Responsive sidebar behavior
   - Touch-friendly navigation
   - Optimized form layouts
   - Consistent spacing and typography

### 🎯 Technical Highlights

- **Zero Build Process**: Runs directly in the browser
- **Vanilla JavaScript**: No framework dependencies
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Accessibility**: Semantic HTML, keyboard navigation, focus management
- **Error Handling**: Global error boundary with user-friendly messages
- **Loading States**: Smooth transitions between routes

## 📱 Browser Compatibility

- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅

## 🔍 Testing Checklist

### ✅ Phase A Acceptance Criteria

- [x] All pages render within shared Dashboard shell
- [x] Identical sidebar/top bar with correct order and labels
- [x] Active states work on both desktop and mobile
- [x] Hash routes load correct content without document reload
- [x] Deep links work directly (e.g., `#/cutting`, `#/audit`)
- [x] Only one Tailwind config exists globally
- [x] No duplicate font/script imports across pages
- [x] Cutting page preserves sticky action bar and sub-bundle functionality
- [x] Workers/Admin/Audit pages preserve tables, drawers, and filters
- [x] Mobile hamburger behavior matches Dashboard across all pages

### 🧪 Manual Testing Steps

1. **Navigation Testing**
   ```
   ✓ Click each sidebar item
   ✓ Verify URL changes to correct hash
   ✓ Verify page content loads without full reload
   ✓ Test browser back/forward buttons
   ✓ Test direct URL access with hash routes
   ```

2. **Mobile Responsiveness**
   ```
   ✓ Resize browser to mobile width (< 768px)
   ✓ Verify sidebar collapses and hamburger appears
   ✓ Test hamburger menu open/close
   ✓ Verify all pages work in mobile view
   ✓ Test form layouts on mobile
   ```

3. **Page-Specific Features**
   ```
   ✓ Cutting page: Test sub-bundle splitting functionality
   ✓ Workers page: Test responsive table and filter dropdowns
   ✓ Admin page: Test user management tabs
   ✓ All pages: Verify original Stitch styling preserved
   ```

## 🚧 Phase B - Backend Scaffolding (PLANNED)

The next phase will add Firebase integration and Google Sheets backup functionality:

### Planned Backend Features

1. **Firebase Integration**
   - Authentication with role-based access control
   - Firestore collections for each manufacturing step
   - Real-time data synchronization

2. **Google Sheets Integration**
   - Automated backup of all manufacturing data
   - Cloud Functions for data synchronization
   - Audit trail logging

3. **Security Implementation**
   - Role-based permissions (admin, supervisor, operator, viewer)
   - Step-specific access controls
   - Audit logging for all data changes

### Firestore Collections (Planned)
```
- materialsIntake/
- cuttingBatches/
- sewingOps/
- ironingBatches/
- packagingRuns/
- lots/
- workers/
- users/
- auditLogs/
```

## 🤝 Contributing

To contribute to the project:

1. Test all routes and responsive behavior
2. Verify original Stitch designs are preserved
3. Ensure no console errors or network failures
4. Test on multiple browsers and devices
5. Follow the established design system patterns

## 📄 License

This project is part of the Kevera Manufacturing system. All rights reserved.

---

**Built with ❤️ for modern manufacturing management**