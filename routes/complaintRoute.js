const cloudinary = require('cloudinary').v2
const { Router } = require("express");
const complaintController = require('../controllers/complaintController')
const router = Router();
const auth = require("../middlewares/authMiddleware");



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.post("/api/complaint/create/", auth, async (req, res, next) => {
    const file = req.files
    try {
        const { url } = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "complaint-photos/",
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
}, complaintController.createComplaint);



router.get("/api/complaint/get", auth, complaintController.getComplaint)

router.get("/api/complaint/user/", auth, complaintController.getComplaintById)

router.delete("/api/complaint/close/", auth, complaintController.closeComplaint);




module.exports = router;