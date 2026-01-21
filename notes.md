# How to install?
- commands:
    '''Commands
    npm init playwright@latest  // this command will install playwright if not installed already.
    '''
- create a repository first then tun this command as it will create:
    - a .github folder
    - node modules folder
    - playwright -report folder
    - test results folder
    - tests folder (name is selected by user)
    - package.json file details about installation.
- default answers for the options provied while running the install command:

√ Do you want to use TypeScript or JavaScript? · **JavaScript**
√ Where to put your end-to-end tests? · **tests**
√ Add a GitHub Actions workflow? (Y/n) · **true**
√ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · **true**


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

- check out the following files:
  - .\tests\example.spec.js - Example end-to-end test
  - .\playwright.config.js - Playwright Test configuration

- Visit https://playwright.dev/docs/intro for more information. 

                   

Playwright is functional test automation tool.


- Automate our tests
- moible Apps- ?NO
- Automate mobile web broswers
- API:  RestAssured, postman, curl can also be automated..
- API testing : Rest API


when executing the test things happen in background:
- Browser
    - Context (session)
        - Page (Tab)
- incognito mode: no history fresh context..

- Playwright always create a fresh context
- this is a good practice that each test should run independently and no coockies or previous data has impact.
-  playwright always create a fresh context for running a new test.
    - even in selenium it opens fresh context.

- internally playwright manages browser, context and new page stuf..
- as fixture call internally creates page for test..
-  test ('title of test', async function gets page variable from playwright )
testng : before and after methods from selenium are called fixtures in playwright

- activities which we do before we start working on test and after we finish are called fixture activities.

- opens a broswer,
- 

-All html pages start with <html>
- entire page structure comes with start and end tag.
- it has head
- *example*:
'''html
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
'''
- locate unique identity so that make your program/ test know which element you want to interact with
- a