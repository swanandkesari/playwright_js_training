// ============================================================================
// appointments.pom.spec.js — CRUD Tests Using the Page Object Model
// ============================================================================
//
// This test file demonstrates:
//
//   1. MULTI-PAGE FLOWS — Login → Navigate → Interact with Appointments
//   2. COMPLEX INTERACTIONS — Modal forms, tables, search, filters
//   3. FIXTURE COMPOSITION — Using loginPage + appointmentsPage together
//   4. DATA-DRIVEN APPROACH — Test data objects for appointment creation
//
// MULTI-PAGE FLOW PATTERN:
//
//   test('create an appointment', async ({ loginPage, appointmentsPage }) => {
//     // Step 1: Login (using loginPage)
//     await loginPage.goto();
//     await loginPage.login(email, password);
//
//     // Step 2: Navigate (using appointmentsPage)
//     await appointmentsPage.goto();
//
//     // Step 3: Create (using appointmentsPage methods)
//     await appointmentsPage.createAppointment({ ... });
//   });
//
// Each page object handles its own page. Tests orchestrate the flow.
//
// ============================================================================

import { test, expect } from '../fixtures/pom-fixtures.js';

// ---------------------------------------------------------------------------
// Test Data
// ---------------------------------------------------------------------------
const VALID_USER = {
  email: 'patient@healthhub.test',
  password: 'Test123!',
};

// Generate a future date for appointment creation
const getFutureDate = (daysFromNow = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const TEST_APPOINTMENT = {
  title: 'Annual Physical Exam',
  type: 'physical',
  date: getFutureDate(14),
  time: '10:00',
  duration: '30',
  provider: 'Dr. Wilson',
  location: 'HealthHub Clinic - Room 204',
  description: 'Routine annual physical examination',
};

// ============================================================================
// TEST SUITE
// ============================================================================

test.describe('Appointments Page (POM)', () => {

  // -------------------------------------------------------------------------
  // Setup: Login and navigate to appointments before each test
  // -------------------------------------------------------------------------
  // After login lands on /dashboard, we navigate to appointments via the
  // sidebar (SPA client-side routing) instead of page.goto() to avoid
  // a full page reload that re-triggers authentication verification.
  // -------------------------------------------------------------------------
  test.beforeEach(async ({ loginPage, appointmentsPage, page }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.email, VALID_USER.password);
    await appointmentsPage.sidebar.navigateTo('appointments');
    await page.waitForURL(/appointments/);
  });

  // =========================================================================
  // PAGE ELEMENTS
  // =========================================================================

  test('should display the appointments page elements', async ({ appointmentsPage }) => {
    await expect(appointmentsPage.newAppointmentButton).toBeVisible();
    await expect(appointmentsPage.searchInput).toBeVisible();
  });

  // =========================================================================
  // CREATE — Modal form interaction
  // =========================================================================

  test('should create a new appointment', async ({ appointmentsPage, page }) => {
    // createAppointment() opens the modal, fills the form, and submits.
    // It waits for the POST response and modal to close.
    await appointmentsPage.createAppointment(TEST_APPOINTMENT);

    // After form submission, the table re-fetches data (shows loading skeleton).
    // Wait for at least one data row to reappear before asserting.
    await page.locator('[data-testid^="appointments-row-"]').first().waitFor({ state: 'visible' });

    // Verify the table has data rows (appointment was added)
    const newCount = await appointmentsPage.getRowCount();
    expect(newCount).toBeGreaterThan(0);
  });

  test('should open and close the appointment form modal', async ({ appointmentsPage }) => {
    // Click "New Appointment" to open the modal
    await appointmentsPage.newAppointmentButton.click();
    await expect(appointmentsPage.modal).toBeVisible();
    await expect(appointmentsPage.form).toBeVisible();

    // Click "Cancel" to close the modal
    await appointmentsPage.cancelButton.click();
    await expect(appointmentsPage.modal).toBeHidden();
  });

  // =========================================================================
  // SEARCH — Table filtering by text
  // =========================================================================

  test('should search for appointments', async ({ appointmentsPage }) => {
    // Type a search query
    await appointmentsPage.searchAppointments('checkup');

    // The table should update (we just verify the search input has the value)
    await expect(appointmentsPage.searchInput).toHaveValue('checkup');
  });

  test('should clear search results', async ({ appointmentsPage }) => {
    // Search for something
    await appointmentsPage.searchAppointments('test');

    // Clear the search
    await appointmentsPage.searchAppointments('');

    await expect(appointmentsPage.searchInput).toHaveValue('');
  });

  // =========================================================================
  // FILTER — Dropdown filtering by status
  // =========================================================================

  test('should filter appointments by status', async ({ appointmentsPage }) => {
    // Filter to show only scheduled appointments
    await appointmentsPage.filterByStatus('scheduled');

    // Verify the filter is applied
    await expect(appointmentsPage.statusFilter).toHaveValue('scheduled');
  });

  test('should filter appointments by type', async ({ appointmentsPage }) => {
    // Filter to show only physical appointments
    await appointmentsPage.filterByType('physical');

    await expect(appointmentsPage.typeFilter).toHaveValue('physical');
  });

  // =========================================================================
  // MULTI-PAGE FLOW — Navigate via sidebar component
  // =========================================================================

  test('should navigate back to dashboard via sidebar', async ({ appointmentsPage, page }) => {
    // Use the Sidebar component (composed into AppointmentsPage)
    await appointmentsPage.sidebar.navigateTo('dashboard');
    await expect(page).toHaveURL(/dashboard/);
  });

  // =========================================================================
  // HEADER COMPONENT — Same component, different page
  // =========================================================================

  test('should access header from appointments page', async ({ appointmentsPage }) => {
    // The Header component works the same on every page —
    // that's the power of component objects!
    await appointmentsPage.header.openUserMenu();
    await expect(appointmentsPage.header.userMenuDropdown).toBeVisible();
  });
});
