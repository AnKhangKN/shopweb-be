const userService = require("../../services/auth/UserService");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    return res.status(201).json({
      status: "OK",
      message: "Đăng ký thành công!",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "ERROR",
        message: "Email và mật khẩu là bắt buộc",
      });
    }

    const result = await userService.loginUser(email, password);

    return res.status(200).json({
      status: "OK",
      message: "Đăng nhập thành công",
      token: result.token,
      data: result.user, // => frontend có thể lưu tên, email, id...
    });
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId; // authMiddleware đã giải mã và gắn vào req
    console.log("userId", userId);
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Ẩn thông tin nhạy cảm (password...)
    const { password, ...safeUser } = user.toObject();

    res.status(200).json({
      status: "OK",
      message: "Lấy thông tin người dùng thành công",
      data: safeUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
};
