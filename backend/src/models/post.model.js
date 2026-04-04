const mongo = require("mongoose");

const postSchema = new mongo.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        require:[true,"ImgUlr is required to create a post"]
    },
    user:{
        ref:"users",
        type:mongo.Schema.Types.ObjectId,
        required:[true,"user id is required for post creation"]
    }
})

const postModel = mongo.model("posts",postSchema);

module.exports = postModel;