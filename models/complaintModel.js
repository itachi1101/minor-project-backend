const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema(
    {
        creatorType: {
            type: String,
            required: true
        },
        creatorId: {
            type: String,
            required: true
        },
        imagePath: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);


const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;