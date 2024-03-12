# Liquidise - QA Engineer Code Challenge

## Overview

This is a technical test for a QA Engineer role at Liquidise.

We've included the coding challenge below. Please review this and email Brendan at `brendan@liquidise.com` if you have any questions.

Once you receive this challenge, you will have 48 hours to complete your submission, which must be uploaded to a public GitHub repository.

We will assess:

1. Your code quality and comments
2. The way you utilise Git features to progress your work
3. Your ability to complete each item in the `Objectives` list below

We will then evaluate your job application based on this review.

## Setup

Using Node 16 and Yarn, run:

```
yarn install
```

Run the service after this, using:

```
yarn pizza
```

Run the service after this, using:

```
yarn test-all
```

## Challenge

We've launched a new service, which adds the ability to order pizzas.

The system collects all the orders and then sends them to the Kitchen Partner, who is well known for their amazing pizzas.

Once the orders are sent to the Kitchen Partner, a contract is given for cooking.

We don't wait for those orders to be completed before accepting other orders but we keep track of their current status.

The Kitchen Partner verifies whether each order can be processed, including verification of the required ingredients.

If it finds that the order can be processed, it starts cooking the pizza. The orders don't need to be processed sequentially. They have a lot of chefs ready to start cooking.

If they can't process an order, the service should notify us. Hopefully we hear it.

## Objectives

The objectives of this challenge are:

1. Ensure that the Kitchen Partner can take order(s) and process them if the right conditions are met
2. Ensure that we keep track of the current status of order(s)
3. Ensure that once the orders are given for cooking, the chefs go ahead and collect the required ingredients and then bake the pizza.
4. Add any future improvement ideas, challenges, suggestions or comments to the `Candidate Notes` section below
5. Assuming a simple front-end was built for this service:
   a. Note your preferred UI testing framework
   b. Your opinions on it's suitability for our tech stack - TypeScript, React, MongoDB
   c. Pros and cons of this framework
   d. Note your responses in the `Candidate UI Testing Framework Recommendations` section below

## Requirements

1. Must be built using TypeScript
2. Build Jest test script(s) that validate the code in the `src` directory meets each of the Objectives listed above
3. Ensure the Jest configuration is correct and there is an easy way to run your Jest test script(s)

## Candidate Notes

1. Add a check if orderId is existing for addOrder
2. Incorrect error for processPizzaOrder when orderId does not exists
3. processPizzaOrder was very challenging. I tried using a mock but I couldn't finish it right away.

## Candidate UI Testing Framework Recommendations

1. Preferred UI testing will be Playwright which is suitable for Typescript and React:
   PROS
   - supports multiple browsers
   - fast
   - reliable
   - a lot of helpful locators
   - supports multiple programming language
   CONS
   - Doesn't have a way to interact with MongoDB but it can access api endpoints
