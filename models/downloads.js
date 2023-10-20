const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const downloadSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    fileUrl: {
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

module.exports = mongoose.model("download",downloadSchema)