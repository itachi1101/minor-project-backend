const { Router } = require("express");
const driverController = require("../controllers/driverController");
const router = Router();
const auth = require("../middlewares/authMiddleware");



// router.post("/api/driver/update/", auth, driverController.updateProfile);
router.get("/api/driver/details/", auth, driverController.getDriverDetails);
router.delete("api/driver/delete/", auth, driverController.deleteDriver)
router.get("/api/driver/sectors/",auth,driverController.getAllocatedSectors)


module.exports = router;