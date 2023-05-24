const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2

const authController = require('../controllers/authController')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// -------------------------USER ROUTES -------------------

router.post("/api/user/signup/", async (req, res, next) => {
    const file = req.files.image
    try {
        const { url } = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "user-photos/",
            responsive_breakpoints:
            {
                create_derived: true,
                bytes_step: 20000,
                min_width: 200,
                max_width: 1000
            }
        })
        req.body.imagePath = url
        next()
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}, authController.signUp_post);

router.post("/user/login/", authController.userLogin);


//------------------------DRIVER ROUTES --------------------
router.post("/api/driver/login/", authController.driverLogin);

router.post("/api/driver/signup/", async (req, res, next) => {
    const file = req.files.image
    try {
        const { url } = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "driver-photos/",
            responsive_breakpoints:
            {
                create_derived: true,
                bytes_step: 20000,
                min_width: 200,
                max_width: 1000
            }
        })
        req.body.imagePath = url
        next()
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}, authController.driverSignup)


// ---------------------------------LOGOUT-------------------
router.post("/api/logout/", authController.logout);


// exporting router
module.exports = router;