const express = require("express");

const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const verifyUser = require("../middlewares/auth.middleware");


/**
 * @route POST /api/users/follow/:userId
 * @description follow a user
*/

userRouter.post("/follow/:userName", verifyUser, userController.followUserController);
userRouter.post("/unfollow/:userName", verifyUser, userController.unfollowUserController);
userRouter.post("/accept/:userName", verifyUser, userController.acceptFollowController);
userRouter.post("/reject/:userName", verifyUser, userController.rejectFollowController);
userRouter.get("/follow/req", verifyUser, userController.getFollowRequestsController);



module.exports = userRouter;