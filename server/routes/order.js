const express=require("express")
const { checkTokenValidity } = require("../middleware/authMiddleware")
const { getAllOrder, getSingleOrder, CancelOrder } = require("../controllers/orderController")
const router = express.Router()

//getAllOrders
router.get("/allorders",checkTokenValidity,getAllOrder)

//getSingleOrders
router.get("/singleorder",checkTokenValidity,getSingleOrder)

//cancel Order
router.get("/cancel/:id",checkTokenValidity,CancelOrder)

module.exports=router