const express=require("express")
const { placeOrder } = require("../controllers/cartController")
const { checkTokenValidity } = require("../middleware/authMiddleware")
const router = express.Router()

//to placeOrder
router.post("/placeOrder",checkTokenValidity,placeOrder)

module.exports=router