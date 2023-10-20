const Credit = require("../models/expenseCredit");
const User = require("../models/signupModel");

exports.getAllCredit = async(req,res)=>{
    try{
       const result = await Credit.find({"user.userId": req.user._id})
       res.status(200).json(result)
    }catch(err){
        console.log(err);
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.addCredit = async(req,res)=>{
    try {
        let { category, amount, description,createdDate,createdMonth,createdYear } = req.body;
        const result = await new Credit({
            category: category,
            amount: amount,
            description: description,
            user: {
                name: req.user.name,
                userId: req.user._id
            },
            createdDate: createdDate,
            createdMonth: createdMonth,
            createdYear: createdYear
        })
        await result.save()
        await User.findOneAndUpdate({_id: req.user._id},{
            totalCredit: req.user.totalCredit + amount
        })
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json("Something Went Wrong!!")
    }
};

exports.deleteCredit = async (req, res) => {
    try {
        const prodId = req.params.expId
        const item = await Credit.findOneAndRemove({_id: prodId})
        await User.findOneAndUpdate({_id: req.user._id},{
            totalCredit: req.user.totalCredit - item.amount
        })
        res.status(200).json("Successfully Deleted!")
    } catch (err) {
        console.log(err)
        res.status(400).json("Something Went Wrong!")
    }
}

