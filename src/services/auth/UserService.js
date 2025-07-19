const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const { email, password, userName } = userData;

  // Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã tồn tại.");
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName: userName || "Khách hàng",
    email,
    password: hashedPassword,
  });

  return {
    id: newUser._id,
    userName: newUser.userName,
    email: newUser.email,
  };
};

const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Tài khoản không tồn tại");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Mật khẩu không đúng");
      }

      // Tạo payload để đưa vào token
      const payload = {
        id: user._id,
        isAdmin: user.isAdmin || false,
      };

      // Tạo token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d", // hoặc "1d", "30m", v.v.
      });

      resolve({
        id: user._id,
        userName: user.userName,
        email: user.email,
        accountStatus: user.accountStatus,
        isAdmin: user.isAdmin,
        token, // Trả về token ở đây
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
