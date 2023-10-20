const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const debitSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    createdDate: {
        type: Number,
        required: true
    },
    createdMonth: {
        type: Number,
        required: true
    },
    createdYear: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Debits",debitSchema)
