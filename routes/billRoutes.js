const { Router } = require("express");
const billController = require("../controllers/billController");
const router = Router();
const auth = require("../middleware/authMiddleware");


router.get("/api/bill/get/", auth, billController.getBills);
router.post("/api/bill/details/", auth, billController.createdBill);



module.exports = router;