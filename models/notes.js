const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    day: {
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
            ref: "User",
            required: true
        }
    }
})

module.exports = mongoose.model("Note",noteSchema)
