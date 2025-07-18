const Order = require("../../models/order");
const Product = require("../../models/product")

const createOrder = ({
                         userId,
                         shippingAddress,
                         items,
                         orderNote,
                         totalPrice,
                         shippingPrice,
                         paymentMethod,
                     }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Xử lý cập nhật số lượng tồn kho từng sản phẩm
            for (const item of items) {
                const { productId, quantity } = item;
                const product = await Product.findById(productId);
                if (!product) throw new Error(`Không tìm thấy sản phẩm ID: ${productId}`);

                const variant = product.details.find(
                    (v) => v.size === item.size && v.color === item.color
                );

                if (!variant) throw new Error(`Không tìm thấy biến thể sản phẩm`);

                if (variant.quantity < quantity) {
                    throw new Error(`Sản phẩm "${product.name}" không đủ hàng`);
                }

                variant.quantity -= quantity;
                await product.save();
            }

            // Tạo đơn hàng
            const order = await Order.create({
                userId,
                shippingAddress,
                items,
                orderNote,
                totalPrice,
                shippingPrice,
                paymentMethod,
                isPaid: paymentMethod === "creditCard",
                paidAt: paymentMethod === "creditCard" ? new Date() : null,
            });

            resolve({
                message: "Thanh toán thành công!",
                order
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
};
