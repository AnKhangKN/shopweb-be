const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyParser = require('body-parser');
const path = require("path");  // <-- cần dòng này
const fs = require("fs");      // <-- nếu có dùng fs

dotenv.config();

const app = express();

// CORS cấu hình cho phép FE React ở localhost:3000 truy cập, kèm cookie
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(bodyParser.json());

routes(app);


module.exports = app;
