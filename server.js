const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");

dotenv.config();

// Kết nối MongoDB trước khi server chạy
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8001;

    app.listen(PORT, '0.0.0.0',() => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
