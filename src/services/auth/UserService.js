const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../../models/otp");
const { sendMail } = require("../../utils/mailer");

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

const sendOtpToEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email không tồn tại");
  }

  // Tạo mã OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút hết hạn

  // Xóa OTP cũ (nếu có)
  await Otp.deleteMany({ email });

  // Lưu OTP mới vào DB
  await Otp.create({
    email,
    code: otpCode,
    expiresAt,
  });

  // Soạn nội dung email
  const subject = "Mã xác thực OTP từ ShopApp";
  const message = `Mã OTP của bạn là: ${otpCode}. Vui lòng không chia sẻ mã này với bất kỳ ai. Mã có hiệu lực trong 5 phút.`;

  try {
    await sendMail(email, subject, message);
    console.log(`Đã gửi OTP tới ${email}`);
  } catch (error) {
    console.error("❌ Gửi email thất bại:", error.message);
    throw new Error("Không thể gửi email. Vui lòng thử lại sau.");
  }
  return true;
};

const verifyOtp = async (email, otpCode) => {
  const otpEntry = await Otp.findOne({ email, code: otpCode });

  if (!otpEntry) {
    throw new Error("OTP không đúng");
  }

  if (otpEntry.expiresAt < new Date()) {
    await Otp.deleteOne({ _id: otpEntry._id });
    throw new Error("OTP đã hết hạn");
  }

  // Xác minh thành công => Xóa OTP (dùng 1 lần)
  await Otp.deleteOne({ _id: otpEntry._id });
};

const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email không tồn tại");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  sendOtpToEmail,
  verifyOtp,
  resetPassword,
};
