const CartServices = require("../../services/user/CartServices");

const createCart = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({message: "Chưa đăng nhập"});
        }

        const {productId, productName, productImage, size, color, price, quantity} = req.body;

        // Kiểm tra dữ liệu bắt buộc
        if (!productId || !price || !quantity) {
            return res.status(400).json({message: "Thiếu thông tin sản phẩm"});
        }

        const result = await CartServices.createCart({
            userId, productId, productName, productImage, size, color, price, quantity
        });

        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        });
    }
};

const getCarts = async (req, res) => {
    try {
        const user_id = req.userId;

        const result = await CartServices.getCarts(user_id);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

const updateQuantity = async (req, res) => {
    try {

        const user_id = req.userId;

        const {
            productId,
            color,
            size,
            quantity,
        } = req.body;

        const result = await CartServices.updateQuantity({
            user_id,
            productId,
            color,
            size,
            quantity,
        })

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

const deleteCartItem = async (req, res) => {
    try {

        const user_id = req.userId;

        const {
            productId,
            size,
            color
        } = req.body;

        const result = await CartServices.deleteCartItem({user_id, productId, size, color});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

module.exports = {
    createCart,
    getCarts,
    updateQuantity,
    deleteCartItem
};
