const express = require("express");
const userModel = require("../models/use.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const authRouter = express.Router();


authRouter.post('/register', async (req, res) => {
    const { email, userName, password, bio, profileImg } = req.body;

    /* const isUserExistsByEmail = await userModel.findOne({email});
 
     if(isUserExistsByEmail){
         return res.status(409).json({
             message:"User already exsists with this email"
         })
     }
 
     const isUserExsistsByUserName = await userModel.findOne({userName});
 
     if(isUserExsistsByUserName){
         return res.status(409).json({
             message:"userName is already taken"
         })
     }
     
     */

    //optimised approach to check th useExsists
    const isUserAlreadyExsists = await userModel.findOne({
        $or: [
            { userName }, //user find on basis of userName return it
            { email } // or user find  on basis of email return it
        ]
    })

    if (isUserAlreadyExsists)
        return res.status(409).
            json(
                {
                   message: isUserAlreadyExsists.email === email
                   ? "Email already exists"
                   : "Username is already taken"
                }
            );


    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        userName: userName,
        email: email,
        bio,
        password: hash,
        profileImg: profileImg
    })


    const token = jwt.sign(
        {
        /**
         * user data
         * unique data
         */

        id: user._id,
       }
    , process.env.JWT_SECRET,
       { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(201).json({
        message:"user Registerd Sucessfully!",
        user:{
            email:user.email,
            userName:user.userName,
            bio:user.bio,
            profileImg:user.profileImg,
        }
    })

})

module.exports = authRouter;