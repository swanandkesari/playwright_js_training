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

- **Page** : Isolated Page instance, created for each test. Pages are isolated between tests due to fixtures.context isolation.
    - This is the most common fixture used in a test.

    - *goto* : to go to the given url
    - *getByRole* : best way to locate element.
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
        - *role* attribute is used. 
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


    - **lazy loader**
        - if URL is blank it will wait.. so it will not raise error until action is called.
        -  Checks element is there?
            - then hover it.. this is action when error will be thrown..
            - then click or the operation..
        - unless elements are visible we can't go further.. so we check it toBeVisible


- **Web Testing Intro**

    - open the same page in chrome.
    - Right click and select inspect.
    - Devloper tools will open to show text formatted html to show the elements.
    - 