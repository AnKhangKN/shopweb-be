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

    const user = await userService.loginUser(email, password);

    return res.status(200).json({
      status: "OK",
      message: "Đăng nhập thành công",
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
};
