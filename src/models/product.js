
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true },

        description: { type: String, required: false },

        category: { type: String, required: true },

        images: [
            { type: String, required: true }
        ],

        details: [
            {
                size: { type: String, required: false, },
                color: { type: String, required: true, },
                price: { type: Number, required: true, min: 0 },
                quantity: { type: Number, required: true, min: 0 },
            },
        ],

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        sale: {
            price: { type: Number, min: 0 },
            startDate: { type: Date },
            endDate: { type: Date },
        },

        soldCount: { type: Number, default: 0, min: 0 }, // Lượt bán
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
