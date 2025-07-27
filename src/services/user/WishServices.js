const User = require("../../models/user");

const addWishList = ({ userId, productId, productName, productImg }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId);

            if (!user) {
                return reject({ message: "User not found" });
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong wishlist chưa
            const exists = user.wishlist.some(
                (item) => item.productId.toString() === productId.toString()
            );

            if (exists) {
                return reject({
                    message: `Product with id ${productId} already exists in wishlist`,
                });
            }

            // Thêm sản phẩm mới vào wishlist
            user.wishlist.push({
                productId,
                productName,
                productImg,
            });

            await user.save();

            resolve({ message: "Product added to wishlist", wishlist: user.wishlist });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteWishItem = ({ userId, productId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        wishlist: {
                            productId: productId,
                        }
                    }
                },
                { new: true }
            );

            resolve(updatedUser);
        } catch (error) {
            reject(error);
        }
    });
};

const getAllWishList = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return reject({ message: "User ID is required." });
            }

            const user = await User.findById(userId).select("wishlist");

            if (!user) {
                return reject({ message: "User not found." });
            }

            resolve({
                message: "Lấy danh sách yêu thích thành công!",
                wishlist: user.wishlist,
            });
        } catch (error) {
            reject({ message: "Lỗi server khi lấy danh sách yêu thích.", error });
        }
    });
};

// const checkWishList = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!userId) {
//                 return reject({ message: "User ID is required." });
//             }
//
//             const user = await User.findById(userId).select("wishlist");
//
//             if (!user) {
//                 return reject({ message: "User not found." });
//             }
//
//             resolve({
//                 message: "Lấy danh sách yêu thích thành công!",
//                 wishlist: user.wishlist,
//             });
//         } catch (error) {
//             reject({ message: "Lỗi server khi lấy danh sách yêu thích.", error });
//         }
//     });
// }

module.exports = {
    addWishList,
    deleteWishItem,
    getAllWishList,
    // checkWishList
}