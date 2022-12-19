const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
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


const BillSchema = mongoose.model("BillSchema", billSchema);
module.exports = BillSchema;