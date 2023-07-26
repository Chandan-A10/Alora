const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
//middleware to handle upcoming body data
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connecting to DB
connectDB();

//routes

//auth route
app.use("/api/v1/auth", authRoute);

//category route
app.use("/api/v1/category", categoryRoute);

//product route
app.use("/api/v1/products", productRouter);

//cart route
app.use("/api/v1/cart", cartRouter);

//order route
app.use("/api/v1/order", orderRouter);


app.use("/userimages",express.static("uploads/users"))
app.use("/categoryimages",express.static("uploads/category"))
app.use("/productimage",express.static("uploads/products"))

app.listen(8000, (err) => {
  !err
    ? console.log("Server started successfuly..")
    : console.log("Error Starting Server");
});
