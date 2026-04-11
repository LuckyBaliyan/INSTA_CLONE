const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function  createPostController (req, res) {

    //taking the newly add req.user from middleware
    const userId = req.user.id; // --> decoded.id

    const file = await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName:req.file.originalname,
        folder:"Insta-Clone-Posts/images" 
        //to store the assets in diffrent folders in image-kit media gallery 
    });

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:userId
    })

    res.status(201).json({
        message:"Post Created Sucessfully",
        post:post,
    });
}

//fetch all posts by logged in user
async function getPostController(req,res){

    const userId = req.user.id; // --> decoded.id
    //Now return all the post of user having user:userId

    //find will fetch all meanwhile findOne fecths fist 
    const posts = await postModel.find({
        user:userId
    });

    res.status(201).json({
        message:"Posts fetched Sucessfully!",
        posts:posts
    });
}

/**
 * GET api/posts/details/:postId 
 * - return details about specific post with the id. also check whether the post 
 * belongs to the user that request for the post 
*/

async function getPostDetailsController(req,res){

    const userId = req.user.id; // --> decoded.id
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"Post Not Found!"
        })
    }

    //these are the object id's and in js they are not compared like this
    // we can used equals method because the objects are refrenced types in js and their 
    // inner properties can't be checked use strict equality (===)
    const isValidUser = post.user.equals(userId);

    if(!isValidUser){
        return res.status(403).json({
           message:"Forbidden Content for the current user!"
        })
    }

    return res.status(200).json({
       message:"Post Fetched Sucessfully !",
       post : post
    });
}

async function likePostController(req,res){
    const userName = req.user.userName;
    const postId = req.params.postId;

    const post  = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"Post does't Exsists"
        })
    }

    const like = await likeModel.create({
        post:postId,
        user:userName,
    })

    return res.status(200).json({
        message:"Post is liked sucessfully!",
        like:like
    })
}

async function getFeedController(req, res) {
    const user = req.user;

    const posts = await Promise.all((await postModel.find().populate("user").lean()).map(
        async(post)=>{
            const isLiked = await likeModel.findOne({
                user: user.userName,
                post:post._id
            })

            post.isLiked = Boolean(isLiked); // or we can also use !!isLiked 

            return post;
        }
    ))

    res.status(200).json({
        message:"posts fethced sucessfully!",
        posts:posts
    })
}

module.exports = {createPostController, getPostController, 
    getPostDetailsController, likePostController, getFeedController};