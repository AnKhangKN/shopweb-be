const User = require('../../models/user');
const bcrypt = require('bcrypt');

const changeEmail = ({ userId, email }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra email đã tồn tại chưa (tránh trùng email của user khác)
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return reject("Email đã được sử dụng.");
            }

            // Tìm user và cập nhật email
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { email },
                { new: true } // Trả về document đã cập nhật
            );

            if (!updatedUser) {
                return reject("Không tìm thấy người dùng.");
            }

            resolve(updatedUser); // Trả về user mới sau khi cập nhật
        } catch (error) {
            reject(error.message || "Có lỗi xảy ra.");
        }
    });
};

const changePassword = ({ userId, password, newPassword }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return reject({ message: "Không tìm thấy người dùng." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return reject({ message: "Mật khẩu cũ không đúng." });
            }

            const isSame = await bcrypt.compare(newPassword, user.password);
            if (isSame) {
                return reject({ message: "Mật khẩu mới không được trùng với mật khẩu cũ." });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10); // đúng phải hash mật khẩu mới

            user.password = hashedPassword;
            await user.save();

            resolve({ message: "Đổi mật khẩu thành công." });
        } catch (error) {
            reject({ message: error.message || "Lỗi khi đổi mật khẩu." });
        }
    });
};


module.exports = {
    changeEmail,
    changePassword
};
