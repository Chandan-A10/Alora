const express=require("express")
const { checkTokenValidity } = require("../middleware/authMiddleware")
const { getAllOrder, getSingleOrder, CancelOrder,delieverOrder } = require("../controllers/orderController")
const router = express.Router()

//getAllOrders
router.get("/allorders",checkTokenValidity,getAllOrder)

//getSingleOrders
router.get("/singleorder",checkTokenValidity,getSingleOrder)

//cancel Order
router.get("/cancel/:id",checkTokenValidity,CancelOrder)

//deliever order
router.get("/delievered/:id",checkTokenValidity,delieverOrder)


module.exports=router