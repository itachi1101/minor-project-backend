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


module.exports.getAllDriver = async (req, res) => {
    try {
        const data = await Driver.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports.getDriverById=async(req,res)=>{
    try {
        const {id}=req.params
        const driver=await Driver.findById(id)
        res.status(200).send(driver)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}
module.exports.allocateSectors=async(req,res)=>{
    try {
        const {id}=req.body
        const {newSectors}=req.body
        const driver=await Driver.findById(id)
        const update=[...driver.sectors,...newSectors]
        // console.log(update)
        await driver.updateOne({sectors:update})
        
        res.status(200).send("Success")
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}