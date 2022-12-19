const Bill = require('../models/billsModel')



// create bill 
module.exports.createBill = async (req, res) => {
    const { userId, amount, month, year } = req.body
    try {
        const bill = await Bill.create({
            userId, amount, month, year
        })
        res.status(201).send({ bill })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}


// bill by user
module.exports.getBillsByUser = async (req, res) => {
    const { userId } = req.body
    try {
        const bills = await Bill.find({ userId })
        res.status(200).send({ bills })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

// get single bill
module.exports.getSingleBill = async (req, res) => {
    const { billId } = req.body
    try {
        const singleBill = await Bill.findById({ _id: billId })
        res.status(200).send({ singleBill })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}


// get all bills
module.exports.getAllBills = async (req, res) => {
    try {
        console.log("yes")
        const bills = await Bill.find()
        res.status(200).send({ bills })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}