const jwt = require("jsonwebtoken");

async function verifyUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unorthorized Access!"
        });
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(401).json({
            message:"Unorthorized action token is't valid"
        })
    }

    //using this (adding a new property in req) we acess decodeed.id in our api logic 
    req.user = decoded;

    //used to forward req from middleware to next layer i.e controllers
    next();
}

module.exports = verifyUser;