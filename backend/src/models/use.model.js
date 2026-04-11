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
        require:[true,"Password is required"],
        select:false, //so that no one can read password from db if we want to read
        // it we have to explicitly call select function for it.
    },
    bio:{
        type:String
    },
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/wmea4u2le/palceholder.svg"                                              
    },
    followers:[{
        type: mongo.Schema.Types.ObjectId,
        ref:"users"
    }],
    following:[{
        type: mongo.Schema.Types.ObjectId,
        ref:"users"
    }]
})

const userModel = mongo.model("users",userSchema);

module.exports = userModel;