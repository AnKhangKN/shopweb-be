const CartServices = require("../../services/user/CartServices");

const createCart = async (req, res) => {
    try {
        const user_id = "687a53da7edf20ec85a09f41"; // test thử (req.user_id?.id)
        if (!user_id) {
            return res.status(401).json({ message: "Chưa đăng nhập" });
        }

        const { productId, productName,productImage, size, color, price, quantity } = req.body;

        // Kiểm tra dữ liệu bắt buộc
        if (!productId || !price || !quantity) {
            return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
        }

        const result = await CartServices.createCart({
            user_id, productId, productName, productImage, size, color, price, quantity
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

        // const user_id = "687a53da7edf20ec85a09f41"
        const user_id = req.params.user_id;

        const result = await CartServices.getCarts(user_id);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

module.exports = {
    createCart,
    getCarts
};
