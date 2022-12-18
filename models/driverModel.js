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
            unique:true
        },
        password: {
            type: String,
            require: true
        },
        imagePath: {
            type: String,
        },
        type: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString(), isAdmin: user.isAdmin },
        process.env.JWT_SECRET
    );
    user.token = token;
    await user.save();
    return token;
};

// login method
userSchema.statics.findByCredentials = async (adharNo, password) => {
    const user = await User.findOne({ adharNo });
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
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;