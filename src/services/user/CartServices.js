const Cart = require('../../models/cart');

const createCart = ({ user_id, productId, productName, productImage, size, color, price, quantity }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: user_id });

            // Nếu chưa có giỏ hàng => tạo mới
            if (!cart) {
                const newCart = await Cart.create({
                    userId: user_id,
                    items: [{
                        productId,
                        productName,
                        productImage,
                        size,
                        color,
                        price,
                        quantity,
                    }]
                });

                return resolve({
                    message: "Tạo giỏ hàng mới và thêm sản phẩm thành công!",
                    cart: newCart,
                });
            }

            // Tìm sản phẩm trùng (cùng id + size + color)
            const existingItemIndex = cart.items.findIndex(item =>
                item.productId.toString() === productId.toString() &&
                item.size === size &&
                item.color === color
            );

            if (existingItemIndex !== -1) {
                // Cộng dồn số lượng nếu đã có
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Thêm mới nếu chưa có
                cart.items.push({
                    productId,
                    productName,
                    productImage,
                    size,
                    color,
                    price,
                    quantity,
                });
            }

            await cart.save();

            resolve({
                message: "Thêm sản phẩm vào giỏ hàng thành công!",
                cart,
            });

        } catch (error) {
            reject(error);
        }
    });
};

const getCarts = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const carts = await Cart.findOne({userId: user_id});
            resolve({
                message: "Lấy cart thành công!",
                carts
            });
            
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createCart,
    getCarts
};
