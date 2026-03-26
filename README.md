# Dashboard Project

This is a React-based dashboard application scaffolded with Vite. It currently includes a splash screen and login page as starting points.

## Getting Started

1. Install dependencies:
   `ash
   npm install
   `
2. Run the development server:
   `ash
   npm run dev
   `
3. Open your browser to http://localhost:5174/ (or whichever port is shown).

## Directory Overview

- src/pages/Splash.tsx – splash screen displayed on app startup.
- src/pages/Login.tsx – login form for staff users.
- src/pages/Dashboard.tsx – main dashboard with navigation and content placeholders.
- src/components/Sidebar.tsx – left navigation pane.
- src/components/Header.tsx – header with search bar and actions.
- App.tsx – routing configuration.
- main.tsx – entrypoint with BrowserRouter.

## Screens

- / – splash screen, automatically navigates to /login after a short delay.
- /login – staff ID/password form with remember-me checkbox.
- /dashboard – authenticated dashboard with sidebar, header, cards, charts, and tables.

## Notes

- The dashboard currently uses placeholder components for charts and tables.
- Navigation links are non-functional and serve as layout examples.

## Next Steps

- Implement authentication and form validation.
- Add real branding, assets, and styling to match provided designs.
- Integrate actual charting library and populate data.
- Expand navigation and dashboard features.

Refer to the existing template sections above for more advanced ESLint or React compiler configurations if needed.
\n- Added chart filter controls and a floating AI assistant chatbot widget for quick help.\n- Dashboard layout polished with card shadows and responsive behavior.
