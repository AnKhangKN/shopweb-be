const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: false, default: "Khách hàng"},

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {type: String, required: true},

        shippingAddress: [
            {
                phone: {type: String, required: false,},
                address: {type: String, required: false},
                city: {type: String, required: false},
            }
        ], // Địa chỉ lưu mảng địa chỉ để có thể sử dụng khi giao hàng

        image: {type: String, required: false},

        accountStatus: {
            type: String,
            enum: ["active", "inactive", "banned"],
            default: "active",
            required: true,
        },

        isAdmin: {type: Boolean, default: false},

        accessToken: {type: String},

        refreshToken: {type: String},

        emailVerified: {type: Boolean, default: false},

        wishlist: [
            {
                productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
                ProductName: {type: String, required: false},
                ProductImg: {type: String, required: false},
            },
        ],

        following: {type: Number, min: 0, default: 0, required: false},

    },
    {
        timestamps: true,  // Tự động tạo createdAt và updatedAt
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
