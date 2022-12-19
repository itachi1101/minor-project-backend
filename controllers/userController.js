const User = require("../models/userModel");

// --------------------USER------------------------------


// get user 
module.exports.getUserDetails = async (req, res) => {
    const { adharNo, houseNo } = req.body
    try {
        const user = await User.findOne({ adharNo, houseNo })
        res.status(200).send({ id: user._id, user });
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}



// delete user 
module.exports.deleteUser = async (req, res) => {
    const { adharNo, houseNo } = req.body
    try {
        const user = await User.findOneAndDelete({ adharNo, houseNo })
        if (!user)
            throw new Error("USER DOES NOT EXITS")
        else {
            res.status(200).send({ message: "USER DELETED SUCCESSFULLY" })
        }
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}