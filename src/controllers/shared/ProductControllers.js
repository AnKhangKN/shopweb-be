const ProductServices = require('../../services/shared/ProductServices')

const getAllProducts = async (req, res) => {
    try {

        const result = await ProductServices.getAllProducts();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

const getProductDetails = async (req, res) => {
    try {

        const productId = req.params.productId;

        if (!productId) {
            return res.status(400).json({
                message: "Product not found",
            })
        }

        const result = await ProductServices.getProductDetails(productId);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

module.exports = {
    getAllProducts,
    getProductDetails
}