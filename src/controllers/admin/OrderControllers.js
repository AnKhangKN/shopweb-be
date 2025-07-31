const OrderServices = require("../../services/admin/OrderServices");

const getOrders = async (req, res) => {
    try {

        const result = await OrderServices.getOrders();
        res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message || "Internal Server Error",
        })
    }
}

const updateStatusOrder = async(req, res) => {
    try {

        const orderId = req.params.id;
        const { status } = req.body;

        const result = await OrderServices.updateStatusOrder({orderId, status});
        res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message || "Internal Server Error",
        })
    }
}

module.exports = {
    getOrders,
    updateStatusOrder,
}