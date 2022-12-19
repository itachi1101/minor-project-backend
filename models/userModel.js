const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const userSchema = new mongoose.Schema(
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
        houseNo: {
            type: String,
            required: true,
            unique: true
        },
        sector: {
            type: String,
            required: true
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
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );
    user.token = token;
    await user.save();
    return token;
};

// login method
userSchema.statics.findByCredentials = async (adharNo, houseNo, password) => {
    const user = await User.findOne({ adharNo, houseNo });
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

const User = mongoose.model("User", userSchema);
module.exports = User;