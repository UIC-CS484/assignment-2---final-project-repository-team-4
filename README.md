### Mission

To provide a stock visualizer site to allow for users to view and keep track of the stocks they are invested in. Have a easy to use interface and helpful data to keep track of your stocks.

### Team Members
Wayne Kao   
    -Database Management, Passport Authentication, CI/CD Integration/Production Environment Hoster, Fullstack Dev  
    - Bio: Senior, likes anything tech related!  
Sean Kim - Full Stack dev, Front end, Server Endpoint, Chart, CI/CD Integration, CSS  
    - Bio: ENTER HERE  
Dean Mundrawala - Full Stack dev, RESTful API endpoint, CSS, Chart Data, Page Router, Passport Authentication  
    - Bio: ENTERHERE  

### Goals of Site
1. To create ways to user to compare stocks with other company
2. Store your current stocks that you are tracking
3. Analyse data so that it can track and give insights on patterns and trends that happen throughout a certain time period

### CODE SNIPPETS
RESTful API
```
var yahooFinance = require("yahoo-finance");

export const getHistoricalData = async (ticker, fromDate, toDate) => {
  await yahooFinance
    .historical({
      symbol: ticker,
      from: fromDate,
      to: toDate,
      period: "d",
    })
    .then(function (quotes) {
      if (quotes[0]) {
        console.log(`successfully retrieved ${quotes.length} results`);
        return quotes;
      } else {
        console.log("N/A");
        return undefined;
      }
    });
};
```

### Test Coverage plan

Right now our application has 2 major components: Creating an account and Signing into the dashboard.

Therefore, we will need to write test cases around these 2 core functionalities.

To run the test, just run "npm run test" in both client and server folder

## Test Cases for Creating an Account

1. Test that signup component renders
2. Test that state is updated on user input
   1. Test that first name is updated
   2. Test that last name is updated
   3. Test that email address is updated
   4. Test that password is updated
3. Test that checkPasswordStrength is working as intended
   1. Test that it succesfully passes a valid password
   2. Test that an erroneous password fails condition 1
   3. Test that an erroneous password fails condition 2

## Test Cases for Login into an Account

1. Test that signup component renders
2. Test that state is updated on user input
   1. Test that email is updated
   2. Test that password is updated

## Test Cases for Server (In server folder)

1. Test that POST register server call works as intended
   1. Test register to a new user and successful authentication
   2. Test register on user with same email in database
2. Test that POST login server call works as intended
   1. Test with right login information
   2. Test with wrong login information
3. Test that GET user returns confirmation of authenticated user or not
   1. Test with not authenticated
   2. Test with authenticated
4. Test that GET logout succesfully logs user out of session using GET user

### Charting Library and Meaningful Data Documentation

1. The charting library we are using is [Nivo](https://nivo.rocks/line). Specfically, the Nivo line chart.
2. The data endpoint, Historical Stock, from Yahoo Finance provides the user meaningful data pertaining to the price of the stock in it's history.
   1. We then use the Nivo Line chart to graph that data to help the user see the trend of the stock price over a period of time


### ER Diagram
![ERD Diagram](/ERD.png?raw=true "ERD Diagram")