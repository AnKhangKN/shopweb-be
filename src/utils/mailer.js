const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER, // địa chỉ gmail
    pass: process.env.EMAIL_APP_PASSWORD, // mật khẩu ứng dụng
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to,
    cc: process.env.EMAIL_SENDER,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
