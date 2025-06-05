const ProductServices = require("../../services/admin/ProductServices");

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        const file = req.files;
        

        if (!data.productName?.trim() || !data.category?.trim() || !data.color?.trim() ||
            data.price == null || data.quantity == null) {
            return res.status(400).json({ error: 'Missing or invalid input fields' });
        }

        const result = await ProductServices.createProduct(data, file);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

const getAllProduct = async (req, res) => {
    try {

        const result = await ProductServices.getAllProduct();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
        })
    }
}

module.exports = {
    createProduct,
    getAllProduct
};
