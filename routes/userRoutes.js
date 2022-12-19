const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/authMiddleware");

router.get("/api/user/details/", auth, userController.getUserDetails);
router.delete("api/user/delete/", auth, userController.deleteUser)



module.exports = router;