const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signUpSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPrimium: {
        type: Boolean,
        required: true,
        default: false
    },
    totalExpense: {
        type: Number,
        required: true,
        default: 0
    },
    totalCredit: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("User",signUpSchema )
