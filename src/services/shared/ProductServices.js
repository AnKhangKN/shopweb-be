const Product = require('../../models/product');

const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Product.find({ status: "active" });

            if (!products) {
                reject({
                    message: 'No Products Found',
                    products: [],
                })
            }

            resolve({
                message: 'Products fetched successfully.',
                products,
            });

        } catch (error) {
            reject(error);
        }
    });
};

const getProductDetails = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const product = await Product.findById(productId);

            if (!product) {
                reject({
                    message: 'No Product Found',
                })
            }

            resolve({
                message: 'Products fetched successfully.',
                product,
            });

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllProducts,
    getProductDetails
};
