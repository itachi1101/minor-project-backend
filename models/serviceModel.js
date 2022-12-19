const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
    {
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
        }
    },
    { timestamps: true }
);


const ServiceSchema = mongoose.model("ServiceSchema", serviceSchema);
module.exports = ServiceSchema;