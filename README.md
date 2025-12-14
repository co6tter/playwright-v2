# playwright-v2

## Overview

This is a modern web application with comprehensive E2E testing using Playwright. The application features user authentication and item management functionality, with tests following best practices including Page Object Model pattern, fixtures, and state management.

## Tech Stack

### Frontend
- **React** (v19.1.1) - UI framework
- **TypeScript** (v5.8.3) - Type-safe JavaScript
- **Vite** (v7.1.2) - Build tool and dev server
- **TailwindCSS** (v4.1.12) - Utility-first CSS framework
- **React Router** (v7.8.2) - Client-side routing

### Testing
- **Playwright** (v1.55.0) - E2E testing framework
- **Test Architecture**: Page Object Model (POM), Fixtures, State Helpers

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Set environment variables (optional):
```bash
export BASE_URL=http://localhost:5173
```

## Usage

### Development

Start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173)

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview production build:
```bash
npm run preview
```

### Testing

Run E2E tests:
```bash
npx playwright test
```

Run tests with UI:
```bash
npx playwright test --ui
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

View test report:
```bash
npx playwright show-report
```

### Code Quality

Run linter:
```bash
npm run lint
```

## Directory Structure

```
playwright-v2/
├── src/                    # Application source code
│   ├── components/        # React components
│   │   └── NavBar.tsx
│   ├── pages/             # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── ItemForm.tsx
│   ├── lib/               # Utility libraries
│   │   └── auth/          # Authentication utilities
│   └── assets/            # Static assets
├── tests/                 # Playwright test suite
│   ├── e2e/               # E2E test specs
│   │   ├── auth/          # Authentication tests
│   │   ├── items/         # Item management tests
│   │   ├── nav.spec.ts
│   │   └── nav-with-pom.spec.ts
│   ├── pom/               # Page Object Models
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── ItemFormPage.ts
│   │   └── Navbar.ts
│   ├── fixtures/          # Test fixtures
│   │   └── base-test.ts
│   ├── helpers/           # Test helper functions
│   │   └── state.ts
│   └── .auth/             # Authentication setup
│       └── setup.setup.ts
├── .auth/                 # Storage states for authenticated sessions
├── playwright.config.ts   # Playwright configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## License

This repository is for personal/private use only.
