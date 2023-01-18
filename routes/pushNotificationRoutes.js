const express = require("express");
const router = express.Router();
const pushNotificationController=require('../controllers/pushNotificationController')

router.post("/api/user/notification/create/",pushNotificationController.saveToken)
router.post("/api/user/notification/send/",pushNotificationController.sendNotification)
router.post("/api/user/notification/sector/",pushNotificationController.getTokenBySector)
module.exports=router