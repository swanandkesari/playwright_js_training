// ============================================================================
//
//   PAGE OBJECT MODEL (POM) — Training Material
//
//   This folder contains a complete, working example of the Page Object Model
//   pattern applied to the HealthHub application.
//
// ============================================================================


// ============================================================================
// WHAT IS THE PAGE OBJECT MODEL?
// ============================================================================
//
// The Page Object Model (POM) is a design pattern that creates an abstraction
// layer between your tests and your web pages. Each page (or major UI section)
// gets its own class that encapsulates:
//
//   1. LOCATORS — How to find elements on the page
//   2. METHODS  — How to interact with those elements
//
// Your tests never touch raw locators. Instead, they call business-level
// methods on page objects:
//
//   // ❌ Without POM — locators scattered across tests
//   await page.getByTestId('auth-email-input').fill('user@test.com');
//   await page.getByTestId('auth-password-input').fill('password');
//   await page.getByTestId('auth-submit-button').click();
//
//   // ✅ With POM — clean, readable, maintainable
//   await loginPage.login('user@test.com', 'password');
//
// When a locator changes, you update ONE file. Not 20 tests.


// ============================================================================
// FILE STRUCTURE
// ============================================================================
//
//   page-object-model/
//   │
//   ├── README.js              ← You are here (explanation file)
//   │
//   ├── pages/                 ← One class per page
//   │   ├── LoginPage.js       ← Login form interactions
//   │   ├── DashboardPage.js   ← Dashboard with composed components
//   │   └── AppointmentsPage.js← Table + modal form CRUD operations
//   │
//   ├── components/            ← Reusable UI component objects
//   │   ├── Header.js          ← Top bar: user menu, notifications, logout
//   │   └── Sidebar.js         ← Navigation: links to all app sections
//   │
//   ├── fixtures/              ← Custom Playwright fixtures
//   │   └── pom-fixtures.js    ← Extends test with loginPage, dashboardPage, etc.
//   │
//   └── tests/                 ← Actual test files
//       ├── login.pom.spec.js          ← Login tests using POM
//       ├── dashboard.pom.spec.js      ← Dashboard + component tests
//       └── appointments.pom.spec.js   ← CRUD + multi-page flow tests


// ============================================================================
// BEST PRACTICES CHECKLIST
// ============================================================================
//
//   ✅ Composition over inheritance
//      Pass `page` to the constructor. Don't extend Page or a BasePage.
//      Why? Inheritance creates tight coupling. If BasePage changes,
//      every page object breaks. Composition is flexible and testable.
//
//   ✅ No assertions in Page Objects
//      Page objects RETURN data. Tests ASSERT on it.
//      Why? A page object shouldn't decide what's "correct."
//      Different tests may assert different things about the same data.
//
//   ✅ Business-level methods
//      login(email, password)  — not  clickEmailField() + typeEmail()
//      Why? Tests should read like user stories, not UI automation scripts.
//
//   ✅ Component Objects for shared UI
//      Header, Sidebar, Modal — extract into separate classes.
//      Page objects compose them: this.header = new Header(page)
//      Why? DRY. Change a header locator once, all pages benefit.
//
//   ✅ Custom fixtures for dependency injection
//      Extend `test` with page object fixtures.
//      Tests declare what they need: async ({ loginPage }) => { ... }
//      Why? Less boilerplate. Tests don't create page objects manually.
//
//   ✅ Locators defined in the constructor
//      All locators as readonly properties, computed once.
//      Why? Single source of truth. IDE autocomplete works perfectly.
//
//   ✅ Keep Page Objects focused
//      One class per page. Under ~20 methods each.
//      If a PO gets too big, extract parts into component objects.


// ============================================================================
// ANTI-PATTERNS TO AVOID
// ============================================================================
//
//   ❌ Assertions inside Page Objects
//      BAD:  async verifyLoginError(msg) { expect(this.error).toHaveText(msg); }
//      GOOD: async getErrorText() { return await this.error.textContent(); }
//
//   ❌ God Page Objects (too many responsibilities)
//      BAD:  class AppPage { /* 50 methods for every page */ }
//      GOOD: Separate LoginPage, DashboardPage, AppointmentsPage
//
//   ❌ Extending Page or a BasePage class
//      BAD:  class LoginPage extends BasePage { ... }
//      GOOD: class LoginPage { constructor(page) { this.page = page; } }
//
//   ❌ Locators in test files
//      BAD:  test('x', async () => { page.getByTestId('auth-email-input')... })
//      GOOD: test('x', async ({ loginPage }) => { loginPage.emailInput... })
//
//   ❌ One method per UI step
//      BAD:  clickEmail(), typeEmail(e), clickPassword(), typePassword(p), clickSubmit()
//      GOOD: login(email, password)


// ============================================================================
// WHEN IS POM OVERKILL?
// ============================================================================
//
// POM adds structure but also adds files and indirection. Consider simpler
// alternatives when:
//
//   - Your app has < 5 pages
//   - Your test suite has < 20 tests
//   - Most tests need API setup/teardown (see: App Actions pattern)
//   - You're writing a quick prototype or proof-of-concept
//
// For these cases, check out the `app-actions-pattern/` folder in this repo
// for a lighter-weight alternative.


// ============================================================================
// RELATED: BasePage PATTERN
// ============================================================================
//
// Some teams use inheritance with a BasePage class that provides shared
// methods (goto, waitForLoad, getTitle, etc.):
//
//   class BasePage {
//     constructor(page) { this.page = page; }
//     async goto(path) { await this.page.goto(path); }
//     async waitForLoad() { await this.page.waitForLoadState('networkidle'); }
//   }
//
//   class LoginPage extends BasePage { ... }
//
// This is a valid approach but has trade-offs:
//   + Less boilerplate for common operations
//   - Tight coupling through inheritance
//   - Harder to test page objects in isolation
//   - "Fragile base class" problem as the base grows
//
// We recommend COMPOSITION (our approach) for most teams.
// The BasePage/inheritance pattern is covered in the Framework Creation
// training session.


// ============================================================================
// RUNNING THE TESTS
// ============================================================================
//
//   # Run all POM tests
//   cd tests
//   npx playwright test "page-object-model" --project=chromium
//
//   # Run a specific test file
//   npx playwright test "login.pom" --project=chromium
//
//   # Run in headed mode to watch
//   npx playwright test "page-object-model" --project=chromium --headed
//
//   # Run with UI mode for debugging
//   npx playwright test "page-object-model" --project=chromium --ui
