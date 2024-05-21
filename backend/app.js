require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "https://marketspace-five.vercel.app",
    credentials: true,
  })
);

// imageUpload
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers

const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRoute");
const itemRouter = require("./routes/itemRoute");
const saleRouter = require("./routes/sale.route");
const verifyEmailRouter = require("./routes/verifyEmail");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./images"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("<h1>MarketSpace</h1>");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/sales", saleRouter);
app.use("/api/verify-email", verifyEmailRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
