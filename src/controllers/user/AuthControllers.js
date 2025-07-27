const AuthServices = require('../../services/user/AuthServices');

const isValidEmail = (email) => {
    // Regex kiểm tra email chuẩn
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const changeEmail = async (req, res) => {
    try {
        const userId = req.userId;
        const { email } = req.body;

        // Kiểm tra rỗng
        if (!email) {
            return res.status(400).json({ message: "Email không được để trống." });
        }

        // Kiểm tra định dạng email
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email không hợp lệ." });
        }

        const result = await AuthServices.changeEmail({ userId, email });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(401).json({
            message: error.message || "Internal Server Error",
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { password, newPassword, confirmPassword } = req.body;

        // Kiểm tra đầu vào
        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Không được để trống các trường mật khẩu."
            });
        }

        // Kiểm tra xác nhận mật khẩu mới
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Xác nhận mật khẩu mới không khớp."
            });
        }

        // Gọi service xử lý đổi mật khẩu
        const result = await AuthServices.changePassword({ userId, password, newPassword });

        return res.status(200).json(result); // Trả về thông báo thành công

    } catch (error) {
        // Nếu service trả về lỗi, trả lại cho client
        return res.status(400).json({
            message: error.message || "Đã xảy ra lỗi trong quá trình đổi mật khẩu."
        });
    }
};

module.exports = {
    changeEmail,
    changePassword
};
