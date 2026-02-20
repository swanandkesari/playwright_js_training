// ============================================================================
// pom-fixtures.js — Custom Fixtures for Page Object Model Tests
// ============================================================================
//
// WHAT ARE CUSTOM FIXTURES?
//
// Playwright's fixture system lets you extend `test` with reusable setup code.
// Instead of creating page objects manually in every test:
//
//   // ❌ Without fixtures (repetitive)
//   test('should login', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     // ...
//   });
//
// You define fixtures ONCE and use them everywhere:
//
//   // ✅ With fixtures (clean)
//   test('should login', async ({ loginPage }) => {
//     await loginPage.goto();
//     // ...
//   });
//
// HOW IT WORKS:
//
//   1. Import `test as base` from '@playwright/test'
//   2. Call base.extend({ ... }) to add new fixtures
//   3. Each fixture is an async function that receives { page } and a `use` callback
//   4. Create the page object, pass it to `use()`, and tests receive it automatically
//   5. Export YOUR custom `test` — tests import from HERE, not from '@playwright/test'
//
// FIXTURE LIFECYCLE:
//   - Setup code runs BEFORE `use()`
//   - The test runs during `use()`
//   - Teardown code runs AFTER `use()` returns (like afterEach)
//
// ============================================================================

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { AppointmentsPage } from '../pages/AppointmentsPage.js';

// ---------------------------------------------------------------------------
// Extend the base test with page object fixtures
// ---------------------------------------------------------------------------
//
// Each fixture:
//   1. Destructures { page } from the base fixtures
//   2. Creates a page object instance
//   3. Passes it to `use()` — this is where the test body runs
//
// The type annotation in the generic helps with IDE autocomplete.
// In JavaScript we use JSDoc; in TypeScript you'd use the generic directly.
// ---------------------------------------------------------------------------

export const test = base.extend(
  /** @type {import('@playwright/test').Fixtures<{
   *   loginPage: import('../pages/LoginPage.js').LoginPage,
   *   dashboardPage: import('../pages/DashboardPage.js').DashboardPage,
   *   appointmentsPage: import('../pages/AppointmentsPage.js').AppointmentsPage,
   * }>} */
  ({

    // -----------------------------------------------------------------------
    // loginPage fixture
    // -----------------------------------------------------------------------
    // Creates a LoginPage instance for each test.
    // The fixture is "lazy" — it only runs if the test actually uses it.
    // -----------------------------------------------------------------------
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },

    // -----------------------------------------------------------------------
    // dashboardPage fixture
    // -----------------------------------------------------------------------
    // Creates a DashboardPage (which includes Header + Sidebar components).
    // Note: This doesn't navigate to the dashboard — tests do that explicitly.
    // -----------------------------------------------------------------------
    dashboardPage: async ({ page }, use) => {
      const dashboardPage = new DashboardPage(page);
      await use(dashboardPage);
    },

    // -----------------------------------------------------------------------
    // appointmentsPage fixture
    // -----------------------------------------------------------------------
    appointmentsPage: async ({ page }, use) => {
      const appointmentsPage = new AppointmentsPage(page);
      await use(appointmentsPage);
    },

    // -----------------------------------------------------------------------
    // OPTIONAL: authenticatedPage fixture (commented out)
    // -----------------------------------------------------------------------
    // If most of your tests require login, you could create a fixture that
    // logs in automatically. Uncomment if needed:
    //
    // authenticatedPage: async ({ page }, use) => {
    //   const loginPage = new LoginPage(page);
    //   await loginPage.goto();
    //   await loginPage.login('patient@healthhub.test', 'Test123!');
    //   await use(page);
    // },
    //
    // This is a DESIGN CHOICE. Some teams prefer explicit login in tests
    // (more visible), others prefer auto-login fixtures (less boilerplate).
    // -----------------------------------------------------------------------
  })
);

// ---------------------------------------------------------------------------
// Re-export expect so tests can import everything from one place:
//
//   import { test, expect } from '../fixtures/pom-fixtures.js';
//
// Instead of mixing imports:
//   import { test } from '../fixtures/pom-fixtures.js';    // custom
//   import { expect } from '@playwright/test';              // base
// ---------------------------------------------------------------------------

export { expect };
