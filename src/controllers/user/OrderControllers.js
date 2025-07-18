const OrderServices = require("../../services/user/OrderServices")

const createOrder = async (req, res) => {
    try {

        const userId = req.params.userId;
        const {shippingAddress, items, orderNote, totalPrice, shippingPrice, paymentMethod} = req.body;

        const result = await OrderServices.createOrder({
            userId,
            shippingAddress, items, orderNote, totalPrice, shippingPrice, paymentMethod
        });
        return res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    createOrder
}