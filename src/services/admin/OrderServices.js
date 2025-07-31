const Order = require("../../models/order")

const getOrders = () => {
    return new Promise( async (resolve, reject) => {
        try {

            const orders = await Order.find();
            resolve(orders);

        } catch (error) {
            reject(error);
        }
    })
}

const updateStatusOrder = ({orderId, status}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findByIdAndUpdate(
                orderId,
                { status },
                { new: true }
            );

            if (!order) {
                return reject({
                    status: 404,
                    message: "Order not found",
                });
            }

            resolve({
                message: "Order updated successfully",
                data: order, // trả về đơn hàng đã cập nhật
            });
        } catch (error) {
            reject({
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    });
};

module.exports = {
    getOrders,
    updateStatusOrder
}