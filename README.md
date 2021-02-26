# DinnerBell

Let's get cooking.

## Overview

<b>DinnerBell</b> is a web application that solves the problem of not knowing what to cook. It allows a user to enter the ingredients in their pantry and see a list of recommended recipes based on their inventory. They can save recipes they like to their profile for later, where they will appear in different color gradients depending on whether their required ingredients are still in the user's pantry. Additionally, each recipe's show page will display summary information, required ingredients, missing ingredients if any, and instructions for cooking.

## In-Depth Structure

DinnerBell uses the Spoonacular API and a series of fetch requests, nested routers, and careful serialization to ensure that relevant and complete data is returned based on the user's needs. A modular, component-based React front end manages complex state and props to dynamically update the UI with the returned data as the user interacts with the site. Ant design components, the React Async library, and custom Sass styling with a Foundation base ensure that these interactions are smooth and intuitive.

Finally, a postgreSQL relational database structure backs user data in a low-runtime, separated fashion, and use of the Objection ORM and Knex schema generators make interacting with the database low-cost and easily modular.

This application also uses AWS image storage, session storage, and Cypress testing.

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

- Shopping list feature--automatically remove ingredients used in recipes from your pantry and add them to a shopping list.
- Dietary options when searching recipes
- Inter-user messaging
