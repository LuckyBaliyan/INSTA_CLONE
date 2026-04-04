const express = require("express");
const postRouter = express.Router();
const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()});

const postController = require("../controllers/post.controller")

/**
 * POST /api/posts [protected] only those user's can acess having a valid token
 * - req.body = {caption, image-file} 
*/

postRouter.post("/",upload.single("image"),postController.createPostController);

module.exports = postRouter;

