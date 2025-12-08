Gherkin keywords
---
Feature: describe a high-level capability or aspect of system
```
  Feature: User Authentication
```

Background: Used to define a set of steps that are common to all scenarios within a feature
```
  Background:
    Given a user is on the login page
```

Scenario: Describes a specific example of how the feature should behave under certain conditions
```
  Scenario: Successful login with valid credentials
```

Scenario Outline: Used for running the same scenario multiple times with different sets of data
```
  Scenario Outline: Login with various invalid credentials
    Given a user is on the login page
    When the user enters "<username>" and "<password>"
    Then the user should see an error message "<error_message>"

    Examples:
      | username | password | error_message      |
      | invalid  | password | Invalid credentials |
      | user     | wrong    | Invalid credentials |
```

Given: Describes the initial state or context of the system before an action is performed
```
 Given the user is logged in
```

When: Describes an action or event performed by the user or the system
```
  When the user clicks the "Logout" button
```

Describes the expected outcome or result after the action in the When step
```
  Then the user should be redirected to the login page
```

And / But: Used to extend Given, When, or Then steps, making scenarios more readable and concise by adding more conditions or actions without repeating the main keyword.
```
  # this is a comment
  When the user enters "username"
  And enters "password"
```

Doc Strings: Multi-line text blocks associated with a step, enclosed by three double quotes
```
  Given the user is on the login page
  And the following user exists:
    """
    {
      "username": "admin",
      "password": "secret"
    }
    """
```

Data Table
```
  Given the following users exist:
    | username | password | role    |
    | admin    | secret   | Admin   |
    | user1    | pass123  | Regular |
```