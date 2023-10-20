const RecordServices = require("../Services/recordServices");
const Credit = require("../models/expenseCredit");
const Debit = require("../models/expenseDebit");
const Note = require("../models/notes");
const Download = require("../models/downloads");

exports.getMonthlyRecord = async (req, res) => {
    try {
        let offsetC;
        let offsetD;
        let limitToShow
        if (+req.query.height >= 500) {
            offsetC = (+req.query.page - 1) * 4;
            offsetD = (+req.query.page - 1) * 4;
            limitToShow = 4
        } else {
            offsetC = (+req.query.page - 1) * 2;
            offsetD = (+req.query.page - 1) * 2;
            limitToShow = 2
        }
        const expenseCount = await Debit.countDocuments({"user.userId": req.user._id,createdMonth: +req.query.month})
        const creditCount = await Credit.countDocuments({"user.userId": req.user._id, createdMonth: +req.query.month});
        const nOffset = offsetC + offsetD

        const resultD = await Debit.find({"user.userId": req.user._id})
        .skip(offsetD)
        .limit(limitToShow)
        const resultC = await Credit.find({"user.userId": req.user._id})
        .skip(offsetC)
        .limit(limitToShow)
        const totalExpense = req.user.totalExpense
        const totalCredit = req.user.totalCredit

         res.status(200).json({
            resultD,
            resultC,
            currentPage: req.query.page,
            nextPage: +req.query.page + 1,
            prevPage: +req.query.page - 1,
            isNextPage: offsetC+resultC.length < creditCount || offsetD + resultD.length < expenseCount,
            isPrevPage: nOffset > 0,
            isPremium: req.user.isPrimium,
            totalExpense: totalExpense,
            totalCredit: totalCredit,
            creditLength: resultC.length,
            debitLength: resultD.length
         })
    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}

exports.getYearlyRecord =  async (req, res) => {
    try {
        let offsetC;
        let offsetD;
        let limitToShow
        if (+req.query.height >= 500) {
            offsetC = (+req.query.page - 1) * 4;
            offsetD = (+req.query.page - 1) * 4;
            limitToShow = 4
        } else {
            offsetC = (+req.query.page - 1) * 2;
            offsetD = (+req.query.page - 1) * 2;
            limitToShow = 2
        }
        const expenseCount = await Debit.countDocuments({"user.userId": req.user._id,
        createdYear: +req.query.year})
        const creditCount = await Credit.countDocuments({"user.userId": req.user._id, 
        createdYear: +req.query.year});
        const nOffset = offsetC + offsetD

        const resultD = await Debit.find({"user.userId": req.user._id})
        .skip(offsetD)
        .limit(limitToShow)
        const resultC = await Credit.find({"user.userId": req.user._id})
        .skip(offsetC)
        .limit(limitToShow)
        const totalExpense = req.user.totalExpense
        const totalCredit = req.user.totalCredit

         res.status(200).json({
            resultD,
            resultC,
            currentPage: req.query.page,
            nextPage: +req.query.page + 1,
            prevPage: +req.query.page - 1,
            isNextPage: offsetC+resultC.length < creditCount || offsetD + resultD.length < expenseCount,
            isPrevPage: nOffset > 0,
            isPremium: req.user.isPrimium,
            totalExpense: totalExpense,
            totalCredit: totalCredit,
            creditLength: resultC.length,
            debitLength: resultD.length
         })
    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}


const date = new Date()

exports.downloadMonthlyData = async (req, res) => {
    try {
        const userData = await Credit.find({"user.userId":req.user._id})
        const stringyfiedData = JSON.stringify(userData);
        const fileName = `ExpenseData/${req.user.id}/${new Date()}`
        const fileUrl = await RecordServices.uploadToAws(stringyfiedData, fileName)
        const downloads = new Download({
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            fileUrl: fileUrl,
            user: {
                name: req.user.name,
                userId: req.user._id
            }
        })
        await downloads.save()
        res.status(200).json({ fileUrl, response: "Success" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ err, response: "Something Went Wrong!" })
    }
}

exports.showPrevDownloads = async (req, res) => {
    try {
        const records = await Download.find({"user.userId": req.user._id})
        res.status(200).json({ records })

    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}

exports.addNotes = async (req, res) => {
    try {
        const result = await new Note({
            note: req.body.note,
            date: req.body.date,
            month: req.body.month,
            year: req.body.year,
            day: req.body.day,
            user: {
                name: req.user.name,
                userId: req.user._id
            }
        })
        await result.save()
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json("Something Went Wrong!")
    }
}

exports.getAllNotes = async (req, res) => {
    try {
        const result = await Note.find({"user.userId": req.user._id})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json("Something Went Wrong!")
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        await Note.findOneAndRemove(noteId)
        res.status(200).json("Successfully Deleted")
    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}