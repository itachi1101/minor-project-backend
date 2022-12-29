const User = require("../models/userModel");
const Driver = require("../models/driverModel")

// --------------------USER------------------------------


// sign up
module.exports.signUp_post = async (req, res) => {
    const { username, mobile, adharNo, houseNo, imagePath, password,sector} = req.body;
    try {
        const userExists = await User.findOne({ houseNo });
        if (userExists) {
            res.status(400);
            throw new Error("User Already Exists");
        }
        const user = await User.create({
            username,
            mobile,
            adharNo,
            houseNo,
            imagePath,
            password,
            sector
        });
        res.status(201).json({ id: user._id, user });
} catch (err) {
        res.status(400).send({ error: err.message });
    }
};

// for login
module.exports.userLogin = async (req, res) => {
    try {
        
        const { adharNo } = req.body;
        const user = await User.findByCredentials(adharNo, req.body.password);
        const token = await user.generateAuthToken();
        const { password, createdAt, updatedAt, isAdmin, __v, ...others } =
            user._doc;

        res.send({ ...others, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};


// ----------------------------------DRIVER------------------------


module.exports.driverSignup = async (req, res) => {
    const { username, mobile, adharNo, vehicleNo, imagePath, password,sectors} = req.body;
    try {
        const driverExists = await Driver.findOne({ adharNo });
        if (driverExists) {
            res.status(400);
            throw new Error("User Already Exists");
        }
        const driver = await Driver.create({
            username, mobile, adharNo, vehicleNo, imagePath, password,sectors
        })
        res.status(201).json({ id: driver._id, driver });


    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

// login
module.exports.driverLogin = async (req, res) => {
    try {
        console.log(req.body.adharNo,req.body.password)
        const user = await Driver.findByCredentials(
            req.body.adharNo,
            req.body.password
        );
        const token = await user.generateAuthToken();
        const { password, createdAt, updatedAt, __v, ...others } = user._doc;
        res.send({ ...others, token });
    } catch (error) {
        res.status(400).send("ACCESS DENIED");
    }
};







// ----------------------------------------COMMON LOGOUT------------
module.exports.logout = async (req, res) => {
    try {
        req.user.token = null;
        res.send();
    } catch (error) {
        req.status(500).send();
    }
};