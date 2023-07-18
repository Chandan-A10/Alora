const orderModel = require("../Models/orderModel");

const getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("user")
      .populate("productBought")
      .populate("productOwner")
      .sort({ createdAt: -1 });
    console.log(orders);
    if (orders) {
      res.status(200).send({
        success: true,
        message: "Success",
        orders,
      });
    } else {
      res.status(204).send({
        success: false,
        message: "Not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to fetch orders",
      err,
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("user")
      .populate("productBought")
      .populate("productOwner")
      .sort({ createdAt: -1 });
    if (orders) {
      res.status(200).send({
        success: true,
        message: "Success",
        orders,
      });
    } else {
      res.status(204).send({
        success: false,
        message: "Not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to fetch orders",
      err,
    });
  }
};

const CancelOrder = async (req, res) => {
    console.log(req.params.id)
  try {
    await orderModel.findByIdAndUpdate(req.params.id,{status:"cancelled"},{new:true})
    res.status(200).send({
        success:true,
        message:'Order Canceled Successfully'
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to fetch orders",
      err,
    });
  }
};
module.exports = {
  getAllOrder,
  getSingleOrder,
  CancelOrder
};
