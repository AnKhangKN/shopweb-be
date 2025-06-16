const path = require("path");
const fs = require("fs");
const getAllImageProducts = async (req, res) => {
    try {

        const { filename } = req.params;

        const filePath = path.join(__dirname, '../../uploads/products', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        res.sendFile(filePath);

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
        })
    }
}

module.exports = { getAllImageProducts };