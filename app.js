// importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const env = require("dotenv");
const helmet = require("helmet");
const fileUpload = require('express-fileupload')
// importing routes 
const authRoutes = require('./routes/authRoutes')
const billRoutes = require('./routes/billRoutes')
const complaintRoutes = require('./routes/complaintRoute')
const pushNotificationRoutes=require('./routes/pushNotificationRoutes')



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



app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});