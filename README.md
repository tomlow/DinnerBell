# DinnerBell

All of the below could be on one experimental branch for now

- ignore the api for now, we just need to make sure we are tracking in our app, the unit, amount and ingredient name, for each ingredient we want in our panty
- setup the model for ingredient, and for amount, as well as the relation mapping between user, ingredient and amount
- in `yarn console` create a few ingredients and assign them to a user through amounts

At this point, if we wanted to, we would be able to see a UserPantry page, that displays all of the ingredients that a user has in their pantry with amounts

---

Most relevant api documentation for querying Recipe by ingredient
https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients

- in a simple JS file that probably exists in a `server/src/apiClients/spoonacularAPIWrapper.js`

* we test out the search recipe by ingredient functionality in our app for the first time
* then: retrieve all of the ingredients for a specific user

would this happen in the router? I guess we need a recipes index page, right?

- search the spoonacular api for recipes that include those ingredients (ignore the amounts )
- you should now have, an array of recipe objects from the spoonacular api. Each recipe object has an array on it that also has the ingredients for that recipe (this is all still info from the api)
- now, we can compare the required ingredients for each recipe against the amount of ingredients that you have in your pantry, and filter out those recipes where you dont have enough ingredients

Alternatively

- Recipe index page (you can add these using a seeder or yarn console. and a recipe just needs a name)
- Recipe show page
- Add new ingredient => on this recipe show page, i want to be able to add the ingredients for that recipe including the amount
<!-- many to many -->
- now we can search the spoonacular api for recipes that we might want to add to our recipe list

Here is when we can get back to the pantry side of things

- add ingredient to pantry (whether or not you want to retrieve existing ingredients with a form fill search also works)
- now we can do the recipe search by ingredient and start comparing pantry to recipes and filter accordingly
