const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token xác thực" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Dùng đúng key đã tạo: `id`
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Token không hợp lệ", error: err.message });
  }
};

module.exports = { authMiddleware };
