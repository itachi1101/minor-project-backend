
const { Router } = require("express");
const complaintController = require('../controllers/complaintController')
const router = Router();
const auth = require("../middlewares/authMiddleware");





router.post("/api/complaint/create/", complaintController.createComplaint);



router.get("/api/complaint/get", complaintController.getComplaint)

router.get("/api/complaint/user/", auth, complaintController.getComplaintById)

router.delete("/api/complaint/close/", auth, complaintController.closeComplaint);

router.post("/api/complaint/type/all", complaintController.getComplaintByCreatorType)


module.exports = router;