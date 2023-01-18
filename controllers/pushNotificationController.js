const PushNotification = require('../models/pushNotificationModel')
const  MessageSender =require('../firebase')
module.exports.saveToken = async (req, res) => {
    try {
        const { sector, tokenId } = req.body
        await PushNotification.create({
            sector, tokenId
        })
        res.status(201).send("SUCCESS")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports.sendNotification = async (req, res) => {
    try {
        const {tokens}=req.body
        await MessageSender(tokens)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports.getTokenBySector=async(req,res)=>{
    try {
        const {sector}=req.body
        const result=await PushNotification.find({sector})
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.messsage)
    }
}