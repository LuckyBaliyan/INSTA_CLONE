const followModel = require("../models/follow.model");
const userModel = require("../models/use.model");


async function followUserController(req, res){
    const followerUserName = req.user.userName;
    const followeeUserName = req.params.userName;

    if(followerUserName === followeeUserName){
        return res.status(400).json({
            message:"you can't follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        userName: followeeUserName
    });

    if(!isFolloweeExists){
        return res.status(404).json({
            message:"User you are trying to following do'st Exists"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUserName,
        followee:followeeUserName
    });

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You'r already following ${followeeUserName}`
        })
    }

    const followRecord = await followModel.create({
        follower:followerUserName,
        followee:followeeUserName
    });

    res.status(201).json({
        message:`You are now following ${followeeUserName}`,
        follow: followRecord
    });
}

async function unfollowUserController(req, res){

}

module.exports = { followUserController };