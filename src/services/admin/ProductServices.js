const Product = require("../../models/product");

const createProduct = (newProduct, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imageFilenames = files.map(file => file.filename);

            // Tạo detail object, chỉ thêm size nếu có
            const productDetail = {
                color: newProduct.color?.trim(),
                price: newProduct.price,
                quantity: newProduct.quantity,
            };

            if (newProduct.size) {
                productDetail.size = newProduct.size?.trim();
            }

            const createdProduct = await Product.create({
                productName: newProduct.productName?.trim(),
                category: newProduct.category?.trim(),
                description: newProduct.description?.trim(),
                images: imageFilenames,
                details: [productDetail],
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
                    products: [],
                })
            }

            resolve({
                message: 'Product list successfully',
                products,
            })
        } catch (error) {
            reject(error);
        }
    })
}

const addProductDetail = (newProductDetail, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imageFilenames = files.map(file => file.filename);
            const { productId, color, size, price, quantity } = newProductDetail;

            const product = await Product.findById(productId);
            if (!product) {
                return reject({ message: 'No product found' });
            }

            // Kiểm tra trùng color hoặc trùng cả color + size
            const isDuplicate = product.details.some(detail => {
                if (size) {
                    // Sản phẩm có màu và size
                    return detail.color?.trim() === color && detail.size?.trim() === size;
                } else {
                    // Sản phẩm chỉ có màu
                    return detail.color?.trim() === color;
                }
            });

            if (isDuplicate) {
                if (size) {
                    return reject({
                        message: 'Màu và kích thước đã tồn tại, hãy chọn màu hoặc size khác', color, size
                    });
                } else {
                    return reject({
                        message: 'Loại màu này đã tồn tại, hãy chọn màu khác', color
                    });
                }
            }

            if (product.details.length === 5) {
                return reject({
                    message: 'Chi tiết sản phẩm đã quá nhiều hãy xóa hoặc thay đổi các chi tiết cũ',
                })
            }

            // Thêm detail mới
            const newDetail = {
                color,
                price,
                quantity,
            };
            if (size) {
                newDetail.size = size;
            }

            product.details.push(newDetail);

            // Thêm ảnh nếu có
            if (imageFilenames.length > 0) {
                product.images.push(...imageFilenames);
            }

            const updatedProduct = await product.save();

            resolve({
                message: 'Product detail added successfully',
                product: updatedProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateProduct = (productData, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { productId, details, status, ...restUpdates } = productData;
            const imageFilenames = files.map(file => file.filename);

            const product = await Product.findById(productId);
            if (!product) {
                return reject({ message: 'No product found' });
            }

            // Cập nhật các trường khác
            Object.assign(product, restUpdates);

            // Chỉ gán nếu là giá trị hợp lệ
            if (status === 'active' || status === 'inactive') {
                product.status = status;
            }

            // Cập nhật chi tiết sản phẩm nếu có
            if (details) {
                product.details = Array.isArray(details)
                    ? details.map(d => ({ ...d, _id: d._id || new mongoose.Types.ObjectId() }))
                    : [];
            }

            // Thêm ảnh mới nếu có
            if (imageFilenames.length > 0) {
                product.images = Array.from(new Set([...product.images, ...imageFilenames]));
            }

            const updatedProduct = await product.save();
            resolve({
                message: 'Product updated successfully',
                product: updatedProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProductDetail = ({ productId, detailId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(productId);

            if (!product) {
                return reject({ message: "Product not found" });
            }

            if (product.details.length <= 1) {
                return reject({ message: "Không thể xóa nếu chỉ có 1 chi tiết sản phẩm." });
            }

            product.details = product.details.filter(
                detail => detail._id.toString() !== detailId
            );

            await product.save();

            resolve({
                message: "Product detail deleted successfully",
                product
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createProduct,
    getAllProduct,
    addProductDetail,
    updateProduct,
    deleteProductDetail
};
