// ============================================================================
// Sidebar.js — Component Object for the HealthHub Sidebar Navigation
// ============================================================================
//
// The sidebar is the main navigation component in HealthHub. It appears on
// every authenticated page and contains links to all sections of the app.
//
// COMPONENT OBJECT PATTERN:
//   - Same idea as a Page Object, but for a UI fragment
//   - Receives `page` in the constructor
//   - Encapsulates locators and actions for the sidebar
//   - Composed into page objects: this.sidebar = new Sidebar(page)
//
// DESIGN CHOICE: navigateTo() accepts a section name
// Instead of writing separate methods for each link:
//   goToDashboard(), goToAppointments(), goToHealthRecords()...
//
// We use a single navigateTo('appointments') method. This keeps the
// component lean and avoids a method explosion as new pages are added.
//
// ============================================================================

export class Sidebar {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // -----------------------------------------------------------------------
    // LOCATORS
    // -----------------------------------------------------------------------

    /** The sidebar container element */
    /** @readonly */ this.container = page.getByTestId('sidebar');

    /** Close button (visible on mobile when sidebar is open) */
    /** @readonly */ this.closeButton = page.getByTestId('sidebar-close');

    // -----------------------------------------------------------------------
    // NAVIGATION LINKS
    // -----------------------------------------------------------------------
    // Each nav link has a test ID following the pattern: nav-{section-name}
    // We define the commonly-used ones as named properties for discoverability.
    // For any link, you can also use navigateTo('section-name').
    // -----------------------------------------------------------------------

    /** @readonly */ this.dashboardLink = page.getByTestId('nav-dashboard');
    /** @readonly */ this.appointmentsLink = page.getByTestId('nav-appointments');
    /** @readonly */ this.healthRecordsLink = page.getByTestId('nav-health-records');
    /** @readonly */ this.medicationsLink = page.getByTestId('nav-medications');
    /** @readonly */ this.profileLink = page.getByTestId('nav-profile');
    /** @readonly */ this.settingsLink = page.getByTestId('nav-settings');
  }

  // =========================================================================
  // METHODS
  // =========================================================================

  /**
   * Navigate to a section by clicking its sidebar link.
   *
   * @param {string} section - The section name matching the test ID suffix.
   *   Examples: 'dashboard', 'appointments', 'health-records', 'medications',
   *   'profile', 'settings', 'symptom-checker', 'notifications'
   *
   * USAGE:
   *   await sidebar.navigateTo('appointments');
   *   // Clicks the element with data-testid="nav-appointments"
   */
  async navigateTo(section) {
    const link = this.page.getByTestId(`nav-${section}`);
    await link.click();
  }

  /**
   * Check whether the sidebar is currently visible.
   * Useful for responsive/mobile tests where the sidebar may be hidden.
   *
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    return await this.container.isVisible();
  }

  /**
   * Close the sidebar (mobile only).
   * On desktop the sidebar is always visible and this button doesn't exist.
   */
  async close() {
    await this.closeButton.click();
  }
}
