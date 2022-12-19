const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/authMiddleware");


router.post("/api/service/create/", auth, userController.createService);
router.get("/api/users/close/", auth, userController.closeService);




module.exports = router;