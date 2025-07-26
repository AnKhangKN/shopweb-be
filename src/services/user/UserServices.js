const Order = require("../../models/order");
const User = require("../../models/user");

const getAllOrderHistory = ({userId}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderHistory = await Order.findOne({userId: userId})

            resolve({
                message: "Order History",
                orderHistory,
            });

        } catch (error) {
            reject(error);
        }
    })
}

const updateUserName = ({ userId, userName }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId || !userName) {
                return reject("Missing userId or userName");
            }

            const userInfo = await User.findOneAndUpdate(
                { _id: userId },
                { $set: { userName: userName } },
                { new: true }
            );

            if (!userInfo) {
                return reject("User not found");
            }

            resolve(userInfo); // trả về thông tin user sau khi cập nhật
        } catch (error) {
            reject(error);
        }
    });
};

const uploadAvatar = ({ userId, file }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imageFilename = file.filename;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { image: imageFilename },
                { new: true }
            );

            resolve({
                message: "Cập nhật avatar thành công",
                image: updatedUser.image,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllOrderHistory,
    updateUserName,
    uploadAvatar
}