const cartModel = require("../Models/cartModel");
const orderModel = require("../Models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { cart, payedAmount } = req.body;
    const user = req.user._id;
    const cartObj = await new cartModel({
      user: user,
      payedAmount: payedAmount,
      items: cart,
    }).save();
    cart.forEach(async (product) => {
      const obj = new orderModel({
        user: user,
        cart: cartObj._id,
        productOwner: product.product.owner._id,
        payedProductAmount: product.product.price * product.quantity,
        productBought: product.product._id,
        quantity: product.quantity,
      });
      await obj.save();
    });
    res.status(200).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while placing order",
      err,
    });
  }
};

module.exports = {
  placeOrder,
};
