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

    const user = await userService.loginUser(email, password); // Trả về user nếu đúng

    // Tạo token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin || false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      status: "OK",
      message: "Đăng nhập thành công",
      data: user, // đã chứa token ở đây
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
    const userId = req.user.id;

    const user = await userService.getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "User not found" });
    }
    return res.status(200).json({
      status: "OK",
      message: "Lấy thông tin người dùng thành công",
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
};
