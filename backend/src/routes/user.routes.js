const express = require("express");

const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const verifyUser = require("../middlewares/auth.middleware");


/**
 * @route POST /api/users/follow/:userId
 * @description follow a user
*/

userRouter.post("/follow/:userName", verifyUser, userController.followUserController);


module.exports = userRouter;