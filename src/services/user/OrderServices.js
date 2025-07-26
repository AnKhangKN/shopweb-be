const Order = require("../../models/order");
const Product = require("../../models/product")
const User = require("../../models/user");
const Cart = require("../../models/cart");

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
            // 1. Cập nhật tồn kho
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

            // 2. Tạo đơn hàng
            const order = await Order.create({
                userId,
                shippingAddress,
                items,
                orderNote,
                totalPrice,
                shippingPrice,
                paymentMethod,
                isPaid: paymentMethod === "bankTransfer",
                paidAt: paymentMethod === "bankTransfer" ? new Date() : null,
            });

            // 3. Xóa các item đã mua khỏi cart
            await Cart.updateOne(
                { userId },
                {
                    $pull: {
                        items: {
                            $or: items.map(item => ({
                                productId: item.productId,
                                size: item.size,
                                color: item.color
                            }))
                        }
                    }
                }
            );

            resolve({
                message: "Thanh toán thành công!",
                order
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getShippingAddress = async ({ userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId);

            resolve({
                message: "lấy thông tin thành công",
                shippingAddress: user.shippingAddress,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const addShippingAddress = async ({ userId, phone, address, city }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        shippingAddress: {
                            phone,
                            address,
                            city,
                        },
                    },
                },
                { new: true } // trả về user đã cập nhật
            );

            resolve({
                message: "Thêm địa chỉ thành công!",
                shippingAddress: updatedUser.shippingAddress,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteShippingAddress = async ({ userId, phone, address, city }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        shippingAddress: {
                            phone,
                            address,
                            city,
                        },
                    },
                },
                { new: true }
            );

            resolve(updatedUser);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createOrder,
    getShippingAddress,
    addShippingAddress,
    deleteShippingAddress
};
