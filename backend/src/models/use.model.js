const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    userName:{
        type:String,
        unique:[true,"User name already exsists"],
        required:[true,"User name is required"]
    },
    email:{
        type:String,
        unique:[true,"Email is already exsists"],
        require:[true,"user email address is required"]
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    },
    bio:{
        type:String
    },
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/wmea4u2le/palceholder.svg"
    }
})

const userModel = mongo.model("users",userSchema);

module.exports = userModel;