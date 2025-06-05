const Product = require("../../models/product");

const createProduct = (newProduct, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy ra tên file từ files
            const imageFilenames = files.map(file => file.filename);

            const createdProduct = await Product.create({
                productName: newProduct.productName,
                category: newProduct.category,
                description: newProduct.description,
                images: imageFilenames, // lưu array tên file
                details: [
                    {
                        color: newProduct.color,
                        size: newProduct.size,
                        price: newProduct.price,
                        quantity: newProduct.quantity,
                    },
                ],
            });

            resolve({
                message: 'Product created successfully',
                product: createdProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const products = await Product.find();

            if (!products) {
                reject({
                    message: 'No Products Found',
                    product: [],
                })
            }

            resolve({
                message: 'Product list successfully',
                product: products,
            })

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createProduct,
    getAllProduct
};
