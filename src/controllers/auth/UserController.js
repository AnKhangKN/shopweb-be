const userService = require("../../services/auth/UserService");

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Kiểm tra email có được gửi không
  if (!email) {
    return res.status(400).json({
      status: "ERROR",
      message: "Vui lòng cung cấp email.",
    });
  }

  try {
    const result = await userService.sendOtpToEmail(email);
    res.status(200).json({
      status: "OK",
      message: "OTP đã được gửi đến email.",
    });
  } catch (e) {
    res.status(400).json({
      status: "ERROR",
      message: e.message || "Đã xảy ra lỗi khi gửi OTP.",
    });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await userService.verifyOtp(email, otp);
    res.status(200).json({
      status: "OK",
      message: "OTP chính xác",
    });
  } catch (e) {
    res.status(400).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("reset password", req.body);

  try {
    await userService.resetPassword(email, newPassword);
    res.status(200).json({
      status: "OK",
      message: "Đổi mật khẩu thành công",
    });
  } catch (e) {
    res.status(400).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
