const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const driverSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
            unique: true,
        },
        adharNo: {
            type: String,
            unique: true,
            required: true,
        },
        vehicleNo: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        imagePath: {
            type: String,
        },
    },
    { timestamps: true }
);
driverSchema.methods.toJSON = function () {
    const driver = this;
    const driverObject = driver.toObject();

    delete driverObject.password;
    delete driverObject.tokens;

    return driverObject;
};

driverSchema.methods.generateAuthToken = async function () {
    const driver = this;
    const token = jwt.sign(
        { _id: driver._id.toString() },
        process.env.JWT_SECRET
    );
    driver.token = token;
    await driver.save();
    return token;
};

// login method
driverSchema.statics.findByCredentials = async (adharNo, password) => {
    const user = await Driver.findOne({ adharNo });
    if (!user) {
        throw new Error("Adhar Number Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Password Invalid");
    }
    return user;
};

// hasing password before saving
driverSchema.pre("save", async function (next) {
    const driver = this;
    if (driver.isModified("password")) {
        driver.password = await bcrypt.hash(driver.password, 8);
    }
    next();
});

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;