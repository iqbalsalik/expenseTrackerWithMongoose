const path = require("path");

const Debits = require("../models/expenseDebit");
const Users = require("../models/signupModel");


exports.getExpensePage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "daily.html"))
}

exports.getAllExpenseData = async (req, res) => {
    let result = await Debits.find({"user.userId": req.user._id})
    let user = await Users.findOne({_id: req.user._id})
    res.status(200).json({result,isPremium:user.isPrimium})
}


exports.addDebitAmount = async (req, res) => {
    try {
        let { category, amount, description,createdDate,createdMonth,createdYear } = req.body;
        const result = await new Debits({
            category:category,
            amount: amount,
            description: description,
            user: {
                name: req.user.name,
                userId: req.user
            },
            createdDate: createdDate,
            createdMonth: createdMonth,
            createdYear: createdYear
        })
        await result.save()
        await Users.findOneAndUpdate({_id: req.user._id},{
            totalExpense: req.user.totalExpense + +amount
        })
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const prodId = req.params.expId
        const item = await Debits.findOneAndRemove({_id: prodId})
        await Users.findOneAndUpdate({_id: req.user._id},{
            totalExpense: req.user.totalExpense - item.amount
        })
        res.status(200).json("Successfully Deleted!");
    } catch (err) {
        res.status(400).json("Something Went Wrong!")
    }
}