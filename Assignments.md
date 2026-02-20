### 1. Assignment to handle login functionality
**Test name** : tourism login test
**File name** : tourism.spec.js
- Date 2Feb26
1. Visit the URL: https://nichethyself.com/tourism/
2. Click on Myaccount to enter in Login Page
3. enter the username and password
4. Click the login button.
5. Expects page to have a heading with the name of Installation.


### 2. Assignment to handle login functionality
**Test name** :orange hrm login test
**File name** : orangehrmlogin.spec.js
1. Visit the URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
2. enter the username and password
3. Click the login button.
4. Expects page to have a heading with the name of Installation.

### 3. Assignment to handle new tab functionality
- 2Feb26
**Test name** : book a customized tour package
**File name** : tourism.spec.js
- Test to book a customized tour package
- observe that context is also passed to the test function
 1. Visit the URL: https://nichethyself.com/tourism/
 2. Click on Customized tour package link which opens in a new tab
 3. Handle the new tab
 4. Enter the full name, email address, address, number of members, number of days
 5. Click Yes for Snaks provided field radio button
 6. Select Home Stay from the dropdown for Prefferred stay
 7. Select USA and France checkboxes for Countries to visit
 8. Click on Submit button

### 4. Assignment to handle new window functionality by clicking on menu items
- 3Feb26
**Test name** : healthybites menuitem new window test
**File name** : healthybites.spec.js
 1. Visit the URL: https://healthybites.nichethyself.com/
 2. Click on Open Recipe Calculator button which opens in a new tab
 3. handle the new tab
 4. Verify that the title of the new page contains Recipe Calculator
 5. fill 10 for recipe servers details in the new window and click on calculate button
 6. expectation to verify that the calculation is done correctly by checking the text in the same window

### 5. Assignment to handle alert type prompt
- 3Feb26
**Test name** :  Prompt alert raised
**File name** : herpkuapp.spec.js
- Alert case 2.
 1. Visit the URL: https://the-internet.herokuapp.com/
 2. Click on JavaScript Alerts link
 3. Click on Click for JS Prompt button  
 4. Handle the prompt by entering some text "Hello World" and accepting the prompt (Clicking OK button)
 5. Verify that the result text is showing the entered text

### 5. Assignment to handle alert
- Date 4Feb26
**Test name** : alert raised for blank password
**File name** : tourism.spec.js
- Alert case 1.
 1. Visit the URL: https://nichethyself.com/tourism/home.html
 2. Enter the username and keep password blank
 3. Click on Submit button
 4. Handle the alert and capture the alert message and print it on console

### 6. Assignment to handle alert and confirm
- Date 4Feb26
- Alert case 2.
**Test name** : alert raised for blank password
**File name** : tourism.spec.js
 1. Visit the URL: https://nichethyself.com/tourism/home.html
 2. Enter the valid username and password and click on submit button
 3. After successful login, click on ship icon
 4. Handle alert by typing click on Cancel button and capture the alert message and print it on console
 5. Verify that you are still on the same page by checking the page title
 6. Again click on ship icon and this time accept the alert by clicking on OK button and capture the alert message and print it on console
 7. Verify that you are navigated to the new page by checking the page title

### 7. Assignment: Double Click
**Test name** : double click test
**File name** : w3schools.spec.js
 1. Visit the URL: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick
 2. Double click on "Double Click this paragraph to trigger a function" text
 3. Verify that the text is changed to "Hello World"


### 8. Assignment to study double click functionality
**Test name** : double click test
**File name** : demoqa.spec.js
1. Visit https://demoqa.com/buttons
2. Doule click on the button with text "Double Click Me"
3. Verify that the text "You have done a double click" is visible on the page

### 9. Assignment to study drag and drop functionality
**Test name** : drag and drop test
**File name** : demoqa.spec.js
1. Visit https://demoqa.com/droppable
2. Drag the box with text "Drag me" and drop it on the box with text "Drop here"
3. Verify that the text on the drop box is changed to "Dropped!"
4. Verify that the background color of the drop box is changed to rgb(70, 130, 180)

### 10. Assignment to study multiselect
**Test name** : multi select test
**File name** : demoqa.spec.js
 1. Visit https://demoqa.com/select-menu
 2. Select Sab and Audi
 3. Click submit button
 4. Verify that the selected values are displayed correctly

### 11. Assignment hover
**Test name** : hover test
**File name** : bsky.spec.js
1. Go to https://bsky.app/profile/vibium.bsky.social
2. hover over @vibium.bsky.social and it shows more details
3. Verify that the followers are 1.3k

### 12. Assignment to study download
**Test name** : download test
**File name** : demoqa.spec.js
 1. Visit https://demoqa.com/upload-download
 2. Click on Download and verify and store the file

### 13. Assignment frames nested frames
**Test name** : frame handling for nested frames
**File name** : herokuapp.spec.js
 1. Go to the https://the-internet.herokuapp.com/frames
 2. Click on the Nested frame link
 3. Verify the text in each frame

### 14. Assignment frames iframe
**Test name** : frame handling for iframe
**File name** : herokuapp.spec.js
 1. Go to the https://the-internet.herokuapp.com/frames
 2. Click on the iframe link
 3. Verify the text inside the editor

### 15. Assignment snapshot assert
**Test name** : snapshot test
**File name** : tourism.spec.js
 1. Visit the URL: https://nichethyself.com/tourism/home.html
 2. Verify the page using snapshot assert

### 16. Assignment snapshot2
**Test name** : snapshot test2
**File name** : tourism.spec.js
1. Visit the URL: https://nichethyself.com/tourism/home.html
2. Click on Customized tour package link which opens in a new tab
3. Verify the page using snapshot assert
4. Use dropdown menu value Home stay and verify the page using snapshot
5. Mask a few fields and see if masking is reflected in the baseline snapshot

### 17. Assignment Aria snapshot
**Test name** : snapshot test
**File name** : tourism.spec.js
 1. Visit the URL: https://nichethyself.com/tourism/home.html
 2. Verify the aria snapshot for the form element

### 18. Assignment custom fixtures
**Test name** : custom fixture test
**File name** : tourismV2.spec.js
1. Visit the URL: https://nichethyself.com/tourism/home.html
2. Create a custom fixture for login
3. use it for login tests.

### 19. Assignment custom fixtures
**Test name** : custom fixture test
**File name** : tourismV3.spec.js
1. Visit the URL: https://nichethyself.com/tourism/home.html
2. Create a custom fixture this time do it with scope worker
3. Write another test for customized tours select England in checkbox using above fixture.

### 20. Assignment annotations and tags
**File name** : tourismV3.spec.js
- try different annotations: 
- add tags to your testcases.

### 21. Assignment for Page object model
**File Structure:** 
- tourismTestWithPageObjectModel
    - components
    - fixtures
    - pages
-tests

1. FOr website: https://nichethyself.com/tourism 
2. Create a login page
3. Create Myaccount page class
4. Customized tour page class
5. page fixtures like authenticated page fixture
6. Test cases using these fixtures.
    - testcase should not have locator
    - page file should not have more expects. 
    