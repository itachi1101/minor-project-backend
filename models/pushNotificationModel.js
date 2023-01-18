const mongoose = require("mongoose");
const pushNotificationSchema = new mongoose.Schema(
    {
        sector:{
            type:String,
            required:true
        },
        tokenId:{
            type:String,
            required:true
        }
    },
    
);


const PushNotification = mongoose.model("PushNotification", pushNotificationSchema);
module.exports = PushNotification;