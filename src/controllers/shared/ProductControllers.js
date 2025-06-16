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

module.exports = {
    getAllProducts,
}