const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },

        comment: {
            type: String,
            default: "",
            trim: true,
        },

        images: [
            {
                type: String, // link ảnh do người dùng upload
            },
        ],

        isEdited: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // createdAt: ngày đánh giá, updatedAt: chỉnh sửa
    }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
