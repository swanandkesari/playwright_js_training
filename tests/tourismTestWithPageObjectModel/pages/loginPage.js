// ============================================================================
// LoginPage.js — Page Object for the Tourism Login Page
// ============================================================================
//
// KEY CONCEPT: A Page Object encapsulates all interactions with a single page.
// Tests never touch locators directly — they call business-level methods instead.
//
// PATTERN: Composition over inheritance
//   - We receive `page` in the constructor (dependency injection)
//   - We do NOT extend Page or any base class
//   - This keeps each PO independent and testable
//
// RULE: No assertions in Page Objects!
//   - Methods return values (strings, numbers, locators)
//   - Tests are responsible for asserting on those values
//   - Exception: waitFor / expect used purely for synchronization (not validation)
//
// ============================================================================

export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

    // -----------------------------------------------------------------------
    // LOCATORS — defined once in the constructor, reused everywhere
    // -----------------------------------------------------------------------
    // Using data-testid attributes for stability. These won't break when
    // button text or CSS classes change.
    //
    // Tip: Define locators as properties (not methods) so you can chain
    // Playwright's built-in assertions directly:
    //   await expect(loginPage.errorMessage).toBeVisible();
    //
    // We also use getByPlaceholder and getByRole where appropriate to show
    // that POs can mix locator strategies.
    // -----------------------------------------------------------------------

    /** @readonly */ this.usernameInput = page.getByPlaceholder('Username');
    /** @readonly */ this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    /** @readonly */ this.loginsection = page.locator("*[id='loginsection']");

    /** @readonly */ this.submitButton = page.getByRole('button', { name: /Submit/ });
    /** @readonly */ this.shipIcon = page.locator('//*[@id="logo"]');

        // /** @readonly */ this.rememberMeCheckbox = page.getByTestId('auth-remember-checkbox');
        // /** @readonly */ this.forgotPasswordLink = page.getByTestId('auth-forgot-link');
        // /** @readonly */ this.errorMessage = page.getByTestId('auth-error-message');
        // /** @readonly */ this.loginForm = page.getByTestId('login-form');
    }

    // =========================================================================
    // NAVIGATION
    // =========================================================================

    /**
     * Navigate to the login page.
     *
     * WHY a separate goto()?
     * - Not every test starts from the login page
     * - Some tests might already be on the page (e.g., after logout)
     * - Keeping navigation explicit makes tests easier to understand
     */
    async goto() {
        await this.page.goto('https://nichethyself.com/tourism/#loginsection');
    }

    // =========================================================================
    // BUSINESS-LEVEL METHODS
    // =========================================================================
    //
    // These read like user stories:
    //   "Login with email and password"
    // NOT:
    //   "Click email field, type email, click password field, type password..."
    //
    // Each method does ONE logical thing. Tests compose them as needed.
    // =========================================================================

    /**
     * Log in with the given credentials.
     * Waits for navigation to /dashboard after submitting.
     *
     * @param {string} username - User email address
     * @param {string} password - User password
     */
    async login(username = 'stc123', password = '12345') {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        // Wait for successful navigation — this is synchronization, not assertion
        //await this.page.waitForURL(/myaccount/);
        await this.page.waitForLoadState();
    }

    async clickOnShipIcon() {
        await this.shipIcon.click();
        await this.page.waitForLoadState();
    }
    /**
     * Attempt to log in with credentials that we expect to fail.
     *
     * WHY a separate method?
     * - login() waits for /dashboard, which would timeout on failure
     * - This method clicks submit but does NOT wait for navigation
     * - The test can then assert on the error message
     *
     * @param {string} email
     * @param {string} password
     */
    async loginExpectingError(email, password) {
        // Handle unexpected alerts
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        // Wait for the error to appear (synchronization, not assertion)
        //await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    }
}
