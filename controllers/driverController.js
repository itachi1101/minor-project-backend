const Driver = require('../models/driverModel')


module.exports.getDriverDetails = async (req, res) => {
    try {
        const { id } = req.body
        const driver = await Driver.findById(id)
        res.status(200).send({ driver })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}


module.exports.deleteDriver = async (req, res) => {
    try {
        const { id } = req.body
        const driver = await Driver.findByIdAndDelete(id)
        if (!driver)
            throw new Error("NO USER FOUND ")
        else {
            res.status(200).send("USER DELETED SUCCESSFULLY")
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports.getAllocatedSectors = async (req, res) => {
    try {
        const { id } = req.body
        const { sectors } = await Driver.findById(id)
        res.status(200).send({ sectors })

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

