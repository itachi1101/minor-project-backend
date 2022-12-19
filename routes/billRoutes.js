const { Router } = require("express");
const billController = require("../controllers/billController");
const router = Router();
const auth = require("../middlewares/authMiddleware");

// create a new bill
router.post("/api/bill/create/", auth, billController.createBill);

// get bill by user 
router.get("/api/bill/get/", auth, billController.getBillsByUser);

// get single bill
router.get("/api/bill/single/", auth, billController.getSingleBill)

// get all bills 
router.get("/api/bill/all/", auth, billController.getAllBills)


module.exports = router;