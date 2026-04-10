const express = require("express");
const verifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router();

const {
  registerController,
  loginController,
  getMeController
} = require("../controllers/auth.controllers");



authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", verifyUser, getMeController);

module.exports = authRouter;
