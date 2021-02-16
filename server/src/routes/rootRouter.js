import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import ingredientsRouter from "./api/v1/ingredientsRouter.js"
import recipesRouter from "./api/v1/recipesRouter.js"
import userRecipesRouter from "./api/v1/userRecipesRouter.js"
import clientRouter from "./clientRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/ingredients", ingredientsRouter)
rootRouter.use("/api/v1/recipes", recipesRouter)
rootRouter.use("/api/v1/userRecipes", userRecipesRouter)

export default rootRouter;
