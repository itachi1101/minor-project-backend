const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
);
adminSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

adminSchema.methods.generateAuthToken = async function () {
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
adminSchema.statics.findByCredentials = async (adharNo, password) => {
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
adminSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const Admin  = mongoose.model("Admin", adminSchema);
module.exports = Admin;