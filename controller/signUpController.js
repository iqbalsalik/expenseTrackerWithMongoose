const path = require("path");

const bcrypt = require("bcrypt");


const Users = require("../models/signupModel");

exports.getSignUpPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "signUp.html"))
};

exports.userSingUp = async (req, res) => {
    try{
        const password = req.body.password;
        let existingUser = await Users.findOne({"emailId": req.body.emailId})
        if(existingUser){
            res.status(400).json("User Already Exists!")
        }else{
            bcrypt.hash(password,10,async(err, hash)=>{
                if(err){
                   return res.status(401).json("Something Went Wrong!")
                }
                let user = new Users({
                    name:req.body.name,
                    emailId: req.body.emailId,
                    password: hash
                })
                await user.save()
                return res.status(200).json("Successfully Singed UP!!")
            })
        } 
    } catch (err){
        console.log(err)
        res.status(500).json("Something Went Wrong!!")
    }
    
}