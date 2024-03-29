const User = require("../models/userModel");

// --------------------USER------------------------------


// get user 
module.exports.getUserDetails = async (req, res) => {
    const { adharNo } = req.body
    try {
        const user = await User.findOne({ adharNo })
        res.status(200).send({ id: user._id, user });
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}


// get user by sector 
module.exports.getUsersBySector = async (req, res) => {
    try {
        const { sector } = req.body
        const users = await User.find({ sector })
        res.status(200).send({ users })
    } catch (error) {
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

// get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
// get user by id 
module.exports.getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send(error)
    }
}