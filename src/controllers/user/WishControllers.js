const WishServices = require("../../services/user/WishServices");

const addWishList = async (req, res) => {
    try {
        const userId = req.userId;

        const {productId, productName, productImg} = req.body;

        const result = await WishServices.addWishList({userId, productId, productName, productImg});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            error: error.message || "Internal Server Error"
        });

    }
}

const deleteWishItem = async (req, res) => {
    try {
        const userId = req.userId;
        const {productId} = req.body;

        const result = await WishServices.deleteWishItem({userId, productId});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            error: error.message || "Internal Server Error"
        })
    }
}

const getAllWishList = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(404).json({
                error: "User not found"
            })
        }

        const result = await WishServices.getAllWishList(userId);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            error: error.message || "Internal Server Error"
        })
    }
}

module.exports = {
    addWishList,
    deleteWishItem,
    getAllWishList
};