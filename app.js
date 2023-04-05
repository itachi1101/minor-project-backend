// importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios')
const morgan = require("morgan");
const env = require("dotenv");
const helmet = require("helmet");
const fileUpload = require('express-fileupload')
const PushNotification = require('./models/pushNotificationModel')
// importing routes 
const authRoutes = require('./routes/authRoutes')
const billRoutes = require('./routes/billRoutes')
const complaintRoutes = require('./routes/complaintRoute')
const pushNotificationRoutes = require('./routes/pushNotificationRoutes')
const userRoutes = require('./routes/userRoutes')
const driverRoutes = require('./routes/driverRoutes');
const { MessageSenderCustom,MessageSender } = require("./firebase");

env.config();
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
try {
  mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(`Error:${error.message}`);
  process.exit();
}

app.use(fileUpload({
  useTempFiles: true,
}))


app.use(authRoutes)
app.use(billRoutes)
app.use(complaintRoutes)
app.use(pushNotificationRoutes)
app.use(userRoutes)
app.use(driverRoutes)
app.post('/add', async (req, res) => {
  try {
    const [lat, lng] = Object.keys(req.body)[0].split(' ')
    const API_KEY = process.env.API_KEY_ONE
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${API_KEY}`
    const data = await axios.get(url);
    const tokens =["fR0r3lefQmeh5Sr3bftQ4m:APA91bHvvb1O1SEy-CHQ_T_1ukjs5c64BrG0n8aOJvRgwk5XghBjchSWtlPobtsf6NHmqlo0DjYN2iDekkoT3cx4PZSGba3naTaMS1hWM7iAU0WReFRkoDb-ropBlED4lIP34NOdRaj8"]
    await MessageSenderCustom(tokens,data.data[0].name);
    res.status(200).send(data.data[0].name)
  } catch (error) {
    res.status(500).send(error.message);
  }
})
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});