const admin = require('firebase-admin')

var serviceAccount = require("./minorproject1-f1f3f-firebase-adminsdk-6qsvl-4e73d84e1a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function MessageSender(tokens) {
    const message = {
        notification: {
            title: "Garbage Collection",
            body: "Your Garbage Collection Vehicle is arriving soon. Please keep your bin outside"
        },
        tokens
    }
    admin.messaging().sendMulticast(message).then(res => {
        console.log("send success")
    }).catch(error => console.log(error))
}
async function MessageSenderCustom(tokens,location) {
    const message = {
        notification: {
            title: "Garbage Full",
            body: `Your Garbage at ${location} is ready for pickup`
        },
        tokens
    }
    admin.messaging().sendMulticast(message).then(res => {
        console.log("send success")
    }).catch(error => console.log(error))
}



module.exports = {MessageSender,MessageSenderCustom}