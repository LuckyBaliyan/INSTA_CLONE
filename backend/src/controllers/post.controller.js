const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function  createPostController (req, res) {
    console.log(req.body, req.file);

    const token = req.cookies.token;

    //if we hav't get token form browser or old token (expired) i.e 
    //either user not registered or he/she is not logged in right now!
    if(!token){
        res.status(401).json({
            message:"Unauthorized acess please signup / login first!"
        })
    }

    // if token is worng the server should respond with status 401 not 500 (default)
    // to handle this
    let decoded = null;
    
    try{
       decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(401).json({
            message:"user not authorized for this action !"
        })
    }

    console.log(decoded);

    const file = await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName:req.file.originalname,
        folder:"Insta-Clone-Posts/images" 
        //to store the assets in diffrent folders in image-kit media gallery 
    });

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"Post Created Sucessfully",
        post:post,
    });
}

module.exports = {createPostController};