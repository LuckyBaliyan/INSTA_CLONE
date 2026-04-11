const express = require("express");
const postRouter = express.Router();
const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()});

const postController = require("../controllers/post.controller")

const verifyUser = require("../middlewares/auth.middleware")

/**
 * POST /api/posts [protected] only those user's can acess having a valid token
 * - req.body = {caption, image-file} 
*/

postRouter.post("/",upload.single("image"), verifyUser ,postController.createPostController);
postRouter.get("/", verifyUser, postController.getPostController);
postRouter.get("/details/:postId", verifyUser, postController.getPostDetailsController);


/**
 * @route POST /api/posts/like/:postId
 * @description like a post with the id provided in the req params 
*/

postRouter.post("/like/:postId", verifyUser, postController.likePostController);
postRouter.post("/unlike/:postId", verifyUser, postController.unlikePostController);



/**
 * @route GET /api/posts/ 
 * @description GET all the posts from any user 
*/

postRouter.get("/feed", verifyUser, postController.getFeedController);


module.exports = postRouter;

