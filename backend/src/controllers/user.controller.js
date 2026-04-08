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
        message:`Requested to follow ${followeeUserName}`,
        follow: followRecord
    });
}

async function unfollowUserController(req, res){
    const followerUserName = req.user.userName;
    const followeeUserName = req.params.userName;

    const isUserFollowing  = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName,
        status:"accepted"
    });

    if(!isUserFollowing){
        return  res.status(200).json({
            message:`You ar't following ${followeeUserName}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message:`You have unfollowed ${followeeUserName}`
    });

}

/**
 * @route POST /api/users/follow/:userName
 * @description accept the follow req of a user 
*/

async function acceptFollowController(req,res){
    const followeeUserName = req.user.userName;
    const followerUserName = req.params.userName;

    const request = await followModel.findOne({
        follower:followerUserName,
        followee:followeeUserName
    })

    if(!request){
        return res.status(404).json({
            message:"Request not found!"
        })
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({
        message:`Accepted the follow Request of ${followerUserName}`
    })
}

/**
 * @routes POST /api/users/reject/:userName
 * @description reject incoming request form req.prams.userName
*/

async function rejectFollowController(req, res){
    const followeeUserName = req.user.userName;
    const followerUserName = req.params.userName;

    const request = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName
    });

    if(!request){
        return res.status(404).json({
            message:"Request not found"
        });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
        message:`You rejected ${followerUserName}'s request`
    });
}


/**
 * @routes GET /api/users/follow/req 
*/


async function getFollowRequestsController(req, res){
    try{
        const userName = req.user.userName;

        const requests = await followModel.find({
            followee: userName,
            status: "pending"
        }).select("follower status createdAt");

        if(requests.length === 0){
            return res.status(200).json({
                message: "No follow requests",
                data: []
            });
        }

        res.status(200).json({
            count: requests.length,
            data: requests
        });

    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = { 
    followUserController, unfollowUserController, 
    acceptFollowController, rejectFollowController,
    getFollowRequestsController
};