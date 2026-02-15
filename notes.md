# How to install?
- commands:
    """
    npm init playwright@latest  // this command will install playwright if not installed already.
    """
- Create a repository first then tun this command as it will create:
    - a .github folder
    - node modules folder
    - playwright -report folder
    - test results folder
    - tests folder (name is selected by user)
    - package.json file details about installation.
- default answers for the options provied while running the install command:

    - √ Do you want to use TypeScript or JavaScript? · **JavaScript**
    - √ Where to put your end-to-end tests? · **tests**
    - √ Add a GitHub Actions workflow? (Y/n) · **true**
    - √ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · **true**


# Variaous commands that can be used in future:
- *npx playwright test*
    Runs the end-to-end tests.

- *npx playwright test --ui*
    Starts the interactive UI mode.

- *npx playwright test --project=chromium*
    Runs the tests only on Desktop Chrome.

-  *npx playwright test example*
    Runs the tests in a specific file.

- *npx playwright test --debug*
    Runs the tests in debug mode.

-  *npx playwright codegen*
    Auto generate tests with Codegen.

- To open last HTML report run:
    *npx playwright show-report*

- Check out the following files:
  - *.\tests\example.spec.js* - Example end-to-end test
  - *.\playwright.config.js* - Playwright Test configuration

- Visit https://playwright.dev/docs/intro for more information. 

                   
- first session notes:

"Playwright is functional test automation tool."

- What can we do with it?
    - Automate our tests
    - moible Apps- ?NO
    - Automate mobile web broswers
    - API:  RestAssured, postman, curl can also be automated..
    - API testing : Rest API


- When executing the test things happen in background:
    - Browser
        - Context (session)
            - Page (Tab)
- Similar to incognito mode: no history, fresh context. no default logins or cookies.

- Playwright always create a fresh context
    - This is a good practice that each test should run independently and no coockies or previous data has any impact on the next test.
-  playwright always create a fresh context for running a new test.
    - even in selenium it opens fresh context.

- Internally playwright manages browser, context and new page stuff with the help of fixtures.
    - as fixture call internally creates page for test..
-  test ('title of test', async function (ARROW FUNCTION) gets page variable from playwright )
testng : before and after methods from selenium are called fixtures in playwright

- activities which we do before we start working on test and after we finish are called **fixture activities** HOOKS ?.

- opens a broswer,
- 
- some background about HTML:
    - All html pages start with <html>
    - entire page structure comes with start and end tag.
    - it has head
    - *example*:
        """
        <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
          <div>
                <input>
          </div>
          <div>
                <input>
          </div>
        </body>
        </html>
        """
    - locate unique identity so that make your program/ test know which element you want to interact with
# Basic test strcture:
- test function
    - takes two parameters:
    1. *test name* descriptive name 
    2. async function with arrow function definition.
    - first parameter is simple test case name string
    - second: 
    - example: *from example.spec.js*
    """
    async ({ page }) => { // page is fixture explained below

  await page.goto('https://playwright.dev/');// await used in async function. 
  // goto is method from page.

  // Expect a title "to contain" a substring. expect method is also default method
  await expect(page).toHaveTitle(/Playwright/); // "</Playwright/> is regular expression to search if toHaveTitle contains/ includes this string.
  }

- ## Page :
- Isolated Page instance, created for each test. Pages are isolated between tests due to fixtures.context isolation.
    - This is the most common fixture used in a test.
    - **lazy loader**
        - if URL is blank it will wait.. so it will not raise error until action is called.
        -  Checks element is there?
            - then hover it.. this is action when error will be thrown..
            - then click or the operation..
        - unless elements are visible we can't go further.. so we check it toBeVisible

    - **goto** : to go to the given url
    - **getByRole** : best way to locate element.
        - given a choice chose this.
        -  it is using the accessibility aspect of website.
            - user experience will be same. 
                - visually challenged person can access website
                - audio challenged.
                - color blind..
                - compliance requirement.. ex: UK
                - each elements have implicit roles identified.
        -  this is not a tag name similar to Selenium.
         - this is not as per authority perspective like customer or devloper or QA..
            - if the link is hidden it will not be available for the user..
        - each element on the page has identification.
        - **role** attribute is used. 
            **ARIA** - Accesibility rich Internet 
                W3c standards
                - accessibility testing is a branch of testing.
        - visible text can be a name attribute in accessibility.
        so we can use it with inspect.. and check computed properties and see attributes.
        - **properties**
            - heading?
                - levels
        - returns locator object not element object.
        - when we take action on locator we get element located by locator.
        - input element doesnot21 have visible text but we have linked labels which has names/ visible texts.. 

    - **getByPlaceholder**:
        - Locates elements using the `placeholder` attribute of input fields.
        - Example:
          ```javascript
          await page.getByPlaceholder('Username').fill('exampleUser');
          ```
        - Useful for identifying input fields with placeholder text.

    - **getByText**:
        - Locates elements by their text content.
        - Example:
          ```javascript
          await page.getByText('Welcome, John!').click();
          ```
        - Supports substring, exact string, or regular expression matching.

    - **getByLabel**:
        - Locates form controls by their associated label's text.
        - Example:
          ```javascript
          await page.getByLabel('Password').fill('secret-password');
          ```
        - Useful for interacting with labeled input fields.

    - **getByAltText**:
        - Locates elements (e.g., images) by their alternative text.
        - Example:
          ```javascript
          await page.getByAltText('playwright logo').click();
          ```
        - Ideal for testing accessibility features.

    - **getByTitle**:
        - Locates elements by their `title` attribute.
        - Example:
          ```javascript
          await page.getByTitle('Issues count').click();
          ```
        - Useful for elements with descriptive tooltips.

    - **getByTestId**:
        - Locates elements by their `data-testid` attribute.
        - Example:
          ```javascript
          await page.getByTestId('submit-button').click();
          ```
        - Resilient to changes in text or role attributes.

    - **CSS/XPath Locators**:
        - General-purpose locators using CSS or XPath selectors.
        - Example:
          ```javascript
          await page.locator('css=button.submit').click();
          await page.locator('xpath=//button[text()="Submit"]').click();
          ```
        - Use sparingly as they are less resilient to DOM changes.
- ## frame :
    - special element to breakdown page into multiple frames
    - to locate elements inside frame we need to locate parent frame first
    - frame can contain frame inside it.
- ## fuction use:
- ## test groups using describe:
- ## annotations:
    - test.skip
        - can be just skip or conditional skip too!
    - test.fail
    - test.only
    - test.fixme
    - test.slow
    - tag
        - authentication
        - smoke
        - regression
        - examples more..
    - use of grep for running tests
        - grep invert
- **Web Testing Intro**

    - open the same page in chrome.
    - Right click and select inspect.
    - Devloper tools will open to show text formatted html to show the elements.
    -

# Additional Notes

## Playwright Configuration
- The `playwright.config.js` file contains the following key settings:
  - `testDir`: Specifies the directory where tests are located (default: `./tests`).
  - `fullyParallel`: Enables running tests in parallel.
  - `forbidOnly`: Prevents accidental use of `test.only` in CI environments.
  - `retries`: Configures retries for failed tests (default: 2 in CI).
  - `reporter`: Specifies the test reporter (default: `html`).
  - `trace`: Collects trace data on the first retry for debugging.
  - `projects`: Configures browser-specific settings, such as `chromium` for Desktop Chrome.

## Dependencies
- The `package.json` file lists the following dependencies:
  - `@playwright/test`: Playwright testing framework.
  - `@types/node`: TypeScript definitions for Node.js.

## Example Tests
- The `example.spec.js` file demonstrates basic Playwright functionality:
  - **Test 1: Verifying Page Title**
    ```javascript
    test('has title', async ({ page }) => {
      await page.goto('https://playwright.dev/');
      await expect(page).toHaveTitle(/Playwright/);
    });
    ```
  - **Test 2: Interacting with Elements**
    ```javascript
    test('get started link', async ({ page }) => {
      await page.goto('https://playwright.dev/');
      await page.getByRole('link', { name: 'Get started' }).click();
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
    ```
# fixtures:
- define a reusable block
- playwright fixtures:
    - page
    - context
    - browser
    - browserContext
    - request
- custom fixture
    - can extend the tests
    - write simple given when then like structure
        - where given is set up
        - when: use() function
        - then: includes expect + tear down
        - example:
        ```javascript
        ```
## Test grouping

## annotations

