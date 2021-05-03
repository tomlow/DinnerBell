# DinnerBell

Let's get cooking.

## Overview

<b>DinnerBell</b> is a web application that solves the problem of not knowing what to cook. It allows a user to enter the ingredients in their pantry and see a list of recommended recipes. They can save recipes they like to their profile for later, where they will appear in different color gradients depending on whether the user has the right ingredients or not. Additionally, each recipe's show page will display summary information, required ingredients, missing ingredients if any, and instructions for cooking.

## In-Depth Structure

DinnerBell uses the Spoonacular API and robust data normalization and massaging to ensure that relevant and complete results are returned to the user. A modular React front end manages complex state and props to dynamically update the UI with the returned data as the user interacts with the site. Ant design components, the React Async library, and custom Sass styling with a Foundation base ensure that these interactions are smooth and intuitive.

Finally, a postgreSQL relational database structure stores user data and use of the Objection ORM and Knex query builder library make interacting with the database fast and easily customized.

This application also uses S3 image storage, session storage, and end-to-end Cypress testing.

[Watch a demo here](https://vimeo.com/544460383)
Or
[Click here to visit DinnerBell's Heroku page](https://launch31-dinner-bell-app.herokuapp.com/)

## Technologies Used

- React - 16.13
- Express - 4.17.1
- Node - 14.15
- PostgreSQL - 8.5.1
- Objection
- Knex
- Passport
- Spoonacular API
- React Select
- Material UI
- Ant Design
- Webpack

## Available Scripts and Installation Instructions

Clone the repo and run the following.

#### `yarn install`

Installs dependencies

#### `yarn run db:migrate latest`

Creates and migrates the database (must be run from the server directory)

#### `yarn run dev`

Starts the Express server. This application can be accessed locally at http://localhost:3000

#### `yarn run db:seed`

Seeds database with sample ingredients for a demonstration or test. Must be registered as a user first, and must be run from the server directory.

## Coming Soon 

### This Week (5/2/21)
- Stable state between pages for non-user ingredients
- Improved authentication error messaging 

### Soon After
- Shopping list feature--automatically remove ingredients used in recipes from your pantry and add them to a shopping list.
- Dietary filters when searching recipes
