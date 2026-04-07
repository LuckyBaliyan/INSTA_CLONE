const mongo = require("mongoose");

const followSchema = new mongo.Schema({
    follower:{
        type:String,
        ref:"users",
        required:[true, "Follower is Required!"]
    },
    followee:{
        type:String,
        ref:"users",
        required:[true, "Followee is required!"]
    },
},{timestamps:true}
);

// to insure the connection b/w followe --> followe is unique and not repeating
followSchema.index({follower: 1, followee: 1}, {unique: true});
const followModel = mongo.model("follows", followSchema);

module.exports = followModel;
