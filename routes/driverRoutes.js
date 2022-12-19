const { Router } = require("express");
const driverController = require("../controllers/driverController");
const router = Router();
const auth = require("../middleware/authMiddleware");



router.post("/api/driver/update/", auth, driverController.updateProfile);
router.get("/api/driver/details/", auth, driverController.getUserDetails);
router.delete("api/driver/delete/", auth, driverController.deleteUser)



module.exports = router;