const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        shippingAddress: {
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                productImage: { type: String, required: true },
                productName: { type: String, required: true },
                size: { type: String, required: false, },
                color: { type: String, required: true },
                price: { type: Number, required: true, min: 0 },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],

        orderNote: {
            type: String,
            default: "Đơn hàng chưa có ghi chú!",
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        shippingPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "creditCard"],
            default: "cod",
            required: true,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: {
            type: Date,
            required: false,
        },

        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
            required: true,
        },

        cancelReason: {
            type: String,
            default: "",
        },

        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
