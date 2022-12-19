const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);


const Bill = mongoose.model("BillSchema", billSchema);
module.exports = Bill;