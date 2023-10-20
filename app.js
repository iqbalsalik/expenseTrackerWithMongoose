require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose")

const path = require("path");
const fs = require("fs");

const router = require("./routes/router");
const expense = require("./routes/expDebitRouter");
const purchaseRouter = require("./routes/purchase");
const premiumRouter = require("./routes/premium");
const navigationRouter = require("./routes/navigationRouter");
const credit = require("./routes/creditRouter");
const allRecordsRouter = require("./routes/allRecords");


// const User = require("./models/signupModel");
// const Expense = require("./models/expenseDebit");
// const Order = require("./models/order");
// const ForgotPass = require("./models/forgotPasswordReques");
// const ExpenseCredit = require("./models/expenseCredit");
// const Downloads = require("./models/downloads");
// const Notes = require("./models/notes");


const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,"access.log"),{
    flag:"a"
})

app.use(morgan(("combined"),{stream:accessLogStream}))
app.use(compression());
app.use(cors());

app.use(bodyParser.json());
app.use(express.static("public"))

app.use(expense);
app.use(router);
app.use(purchaseRouter);
app.use(premiumRouter);
app.use(navigationRouter);
app.use(credit);
app.use(allRecordsRouter)




mongoose.connect("mongodb+srv://sisalik84:kA0M0kG69vqbgCn2@cluster0.j7b9de6.mongodb.net/ExpenseTracker?retryWrites=true&w=majority").then(result=>{
    app.listen(process.env.PORT)
})
