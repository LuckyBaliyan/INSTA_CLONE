const userModel = require("../models/use.model");
//const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function registerController (req, res){
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


    //const hash = crypto.createHash('sha256').update(password).digest('hex');
    const hash = await bcrypt.hash(password, 10);
    // password and salt i.e how much layer of hashing ex:- 10

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
        userName: user.userName
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

}


async function loginController (req, res){
    const {userName,email,password} = req.body;

    /**
     * username
     * password
     * 
     * OR
     * 
     * email
     * password
    */

    const user = await userModel.findOne({
        /* Array of conditions */
        $or:[
            {
              userName:userName
            },
            {
              email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    //const hash = crypto.createHash("sha256").update(password).digest("hex");

    //convert the password in hash and then compare from db password as well in 1 line
    const isValidPassword =  await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(401).json({
            message:"User password is not valid"
        })
    }

    const token = jwt.sign(
        {id:user._id,
         userName: user.userName
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.cookie("token", token);

    res.status(201).
        json({
            message:"User Logged In sucessfully",
            user:{
                userName:user.userName,
                email:user.email,
                bio:user.bio,
                profileImg:user.profileImg
            }
        })
}

module.exports = {registerController, loginController};