const jwt = require("jsonwebtoken");
const User = require("../models/signupModel");
require("dotenv").config()

const userAuthentication = async(req,res,next)=>{
    try{
        const token = req.header("authorization");
        const authUser = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
        const user = await User.findById(authUser.userId);
        req.user= user;
        next()
    }catch(err){
        res.status(404).json("User Not Found!!")
    }
}

module.exports = {userAuthentication};