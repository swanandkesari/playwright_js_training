// ============================================================================
// dashboard.pom.spec.js — Dashboard Tests Using POM + Component Objects
// ============================================================================
//
// This test file demonstrates:
//
//   1. MULTI-PAGE FLOWS — Login first, then interact with the dashboard
//   2. COMPONENT OBJECTS — Using dashboardPage.header and dashboardPage.sidebar
//   3. FIXTURE COMPOSITION — Using both loginPage AND dashboardPage fixtures
//
// COMPONENT OBJECTS IN ACTION:
//
//   // Header component (extracted from page object)
//   await dashboardPage.header.logout();
//   await dashboardPage.header.getNotificationCount();
//
//   // Sidebar component (same component used across all page objects)
//   await dashboardPage.sidebar.navigateTo('appointments');
//
// Both the DashboardPage and AppointmentsPage share the same Header and
// Sidebar classes — change a locator in Header.js and ALL pages benefit.
//
// ============================================================================

import { test, expect } from '../fixtures/pom-fixtures.js';

const VALID_USER = {
  email: 'patient@healthhub.test',
  password: 'Test123!',
};

test.describe('Dashboard Page (POM)', () => {

  // -------------------------------------------------------------------------
  // Login and navigate to dashboard before each test
  // -------------------------------------------------------------------------
  // This is a common pattern: use one page object (loginPage) for setup,
  // then switch to another (dashboardPage) for the actual test.
  // -------------------------------------------------------------------------
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.email, VALID_USER.password);
  });

  // -------------------------------------------------------------------------
  // Dashboard content verification
  // -------------------------------------------------------------------------
  test('should display welcome message after login', async ({ dashboardPage }) => {
    // getWelcomeText() returns a string — the test asserts on it
    const welcomeText = await dashboardPage.getWelcomeText();
    expect(welcomeText).toBeTruthy();
  });

  test('should display the health score', async ({ dashboardPage }) => {
    // The health score element should be visible on the dashboard
    await expect(dashboardPage.healthScore).toBeVisible();
  });

  test('should display upcoming appointments', async ({ dashboardPage }) => {
    await expect(dashboardPage.appointmentsList).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // Component Object: Sidebar navigation
  // -------------------------------------------------------------------------
  // These tests show how to use the Sidebar COMPONENT through the
  // DashboardPage. The sidebar is NOT part of DashboardPage itself —
  // it's a composed component object.
  //
  //   dashboardPage.sidebar.navigateTo('appointments')
  //   └── DashboardPage
  //       └── Sidebar (component)
  //           └── navigateTo() method
  // -------------------------------------------------------------------------

  test('should navigate to appointments via sidebar', async ({ dashboardPage, page }) => {
    await dashboardPage.sidebar.navigateTo('appointments');
    await expect(page).toHaveURL(/appointments/);
  });

  test('should navigate to health records via sidebar', async ({ dashboardPage, page }) => {
    await dashboardPage.sidebar.navigateTo('health-records');
    await expect(page).toHaveURL(/health-records|records/);
  });

  test('should navigate to medications via sidebar', async ({ dashboardPage, page }) => {
    await dashboardPage.sidebar.navigateTo('medications');
    await expect(page).toHaveURL(/medications/);
  });

  // -------------------------------------------------------------------------
  // Component Object: Header interactions
  // -------------------------------------------------------------------------
  // Similarly, we access the Header COMPONENT through the page object.
  //
  //   dashboardPage.header.logout()
  //   └── DashboardPage
  //       └── Header (component)
  //           └── logout() method
  // -------------------------------------------------------------------------

  test('should open user menu from header', async ({ dashboardPage }) => {
    await dashboardPage.header.openUserMenu();

    // The dropdown should now be visible
    await expect(dashboardPage.header.userMenuDropdown).toBeVisible();

    // Individual menu items should be present
    await expect(dashboardPage.header.profileLink).toBeVisible();
    await expect(dashboardPage.header.logoutButton).toBeVisible();
  });

  test('should logout via header user menu', async ({ dashboardPage, page }) => {
    // logout() opens the user menu, clicks logout, and waits for /login
    await dashboardPage.header.logout();

    // Verify we're back at the login page
    await expect(page).toHaveURL(/login/);
  });

  // -------------------------------------------------------------------------
  // Quick action buttons
  // -------------------------------------------------------------------------
  test('should navigate to appointments via quick action button', async ({ dashboardPage, page }) => {
    await dashboardPage.clickNewAppointment();
    await expect(page).toHaveURL(/appointments/);
  });
});
