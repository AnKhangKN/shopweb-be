const Cart = require('../../models/cart');
const Product = require('../../models/product');

const createCart = ({ userId, productId, productName, productImage, size, color, price, quantity }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(productId);
            if (!product) return reject("Sản phẩm không tồn tại");

            // Tìm biến thể (variant) đúng theo size + color
            const variant = product.details.find(
                (d) => d.color === color && d.size === size
            );

            if (!variant) {
                return reject("Không tìm thấy biến thể sản phẩm (màu/sz) phù hợp");
            }

            if (quantity > variant.quantity) {
                return reject("Số lượng vượt quá tồn kho hiện có cho biến thể này");
            }

            const cart = await Cart.findOne({ userId });

            // Nếu chưa có giỏ hàng => tạo mới
            if (!cart) {
                const newCart = await Cart.create({
                    userId,
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
                const currentQty = cart.items[existingItemIndex].quantity;

                if (currentQty + quantity > variant.quantity) {
                    return reject("Không thể thêm, vượt quá số lượng tồn kho cho biến thể này");
                }

                cart.items[existingItemIndex].quantity += quantity;
            } else {
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

const updateQuantity = ({ user_id, productId, color, size, quantity }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: user_id });
            if (!cart) return reject("Cart not found");

            // 1. Tìm sản phẩm trong Product
            const product = await Product.findById(productId);
            if (!product) return reject("Product not found");

            // 2. Tìm variant tương ứng (color + size)
            const variant = product.details.find(
                (d) => d.color === color && d.size === size
            );
            if (!variant) return reject("Product variant not found");

            // 3. Kiểm tra tồn kho
            if (quantity > variant.quantity) {
                return reject(`Số lượng vượt quá tồn kho (${variant.quantity})`);
            }

            // 4. Tìm item trong giỏ và cập nhật
            let itemUpdated = false;
            for (let item of cart.items) {
                if (
                    item.productId.toString() === productId.toString() &&
                    item.color === color &&
                    item.size === size
                ) {
                    item.quantity = quantity;
                    itemUpdated = true;
                    break;
                }
            }

            if (!itemUpdated) return reject("Item not found in cart");

            await cart.save();

            resolve({
                message: "Quantity updated successfully",
                cart,
            });

        } catch (error) {
            reject(error.message || "Internal error");
        }
    });
};

const deleteCartItem = ({ user_id, productId, color, size }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: user_id });

            if (!cart) {
                return reject("Cart not found");
            }

            // Lọc lại các item không trùng với item cần xóa
            const filteredItems = cart.items.filter(item =>
                !(
                    item.productId.toString() === productId.toString() &&
                    item.color === color &&
                    item.size === size
                )
            );

            // Nếu không thay đổi gì (tức item cần xóa không tồn tại)
            if (filteredItems.length === cart.items.length) {
                return reject("Item not found in cart");
            }

            cart.items = filteredItems;
            await cart.save();

            resolve({
                message: "Item deleted from cart successfully",
                cart,
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createCart,
    getCarts,
    updateQuantity,
    deleteCartItem
};
