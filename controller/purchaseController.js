const e = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

const Order = require("../models/order");
const User = require("../models/signupModel")

exports.buyPremium = async (req,res)=>{
try{
        const rzp = new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const amount = 2300;
    rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
        if(err){
            throw new Error(JSON.stringify(err))
        }
        const newOrder = await new Order({
            orderId:order.id,
            status:"PENDING",
            user: {
                name: req.user.name,
                userId: req.user._id
            }
        })
        await newOrder.save()
        return res.status(200).json({order,key_id:rzp.key_id})
    })
} catch(err){
    res.status(400).json("Something Went Wrong!!")
}
}

exports.updateTransactionStatus = async (req,res)=>{
   try {
    const {payment_id,order_id}= req.body;
    await Order.findOneAndUpdate({orderId:order_id},{paymentId:payment_id,status:"SUCCESSFULL"});
    await User.findOneAndUpdate({_id: req.user._id},{isPrimium: true})
    res.status(200).json({message:"Transaction Successfull",success:true})
      }catch(err){
        res.status(500).json({message:"Transaction Failed!",success:false})
      }
}

exports.updateFailureTransactionStatus= async(req,res)=>{
    try{
        const {order_id} = req.body;
        await Order.findOneAndUpdate({orderId: order_id,"user.userId": req.user.id},{
            paymentId:"Payment Failed",
            status: "Failed"
        })
    }catch(err){
        console.log(err)
    }
}