const Complaint = require("../models/complaintModel");


// create complaint
module.exports.createComplaint = async (req, res) => {
    try {
        const { creatorType, description, mobile,creatorId } = req.body
        const complaint = await Complaint.create({
            creatorType,
            creatorId,
            description,
            mobile
        })
        res.status(201).send({ complaint })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}



// get complaint
module.exports.getComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.find()
        res.status(200).send({ complaint })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

// get complaint by user 
module.exports.getComplaintById = async (req, res) => {
    try {
        const complaints = await Complaint.find({ creatorId: req.user._id })
        res.status(200).send({ complaints })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
// get complaint by creator type
module.exports.getComplaintByCreatorType = async (req, res) => {
    try {
        const { creatorType } = req.body
        const complaints = await Complaint.find({ creatorType })
        res.status(200).send(complaints)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

// delete complaint
module.exports.closeComplaint = async (req, res) => {
    try {
        const { id } = req.body
        const compalint = await Complaint.findByIdAndDelete(id)
        if (!compalint)
            throw new Error("NO SERVICE FOUND")
        else {
            res.status(200).send("CLOSED SUCCESSFULLY")
        }

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}



