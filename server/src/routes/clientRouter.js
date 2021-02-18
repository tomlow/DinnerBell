import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/pantry",
  "/recipes/userRecipes",
  "/recipes/:id",
  "/ingredients/edit/:id",
  "/ingredients/delete/:id",
  "/profile",
];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
