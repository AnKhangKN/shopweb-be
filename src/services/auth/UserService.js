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

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Tài khoản không tồn tại");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Mật khẩu không đúng");
  }

  const payload = {
    id: user._id, // quan trọng: key phải là `id` để middleware dùng
    isAdmin: user.isAdmin || false,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      accountStatus: user.accountStatus,
      isAdmin: user.isAdmin,
    },
    token,
  };
};

const getUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
    const user= User.findById(id)
      if (!user) {
        return reject(
            {
              message: "Người dùng không tồn tại"

            }
        )
      }
      resolve({
        massage: "Lấy thông tin người dùng",
        user: user,
      });
    } catch (e) {
      reject(e);
    }
  })
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
