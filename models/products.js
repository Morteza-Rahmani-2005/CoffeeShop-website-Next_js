import mongoose from "mongoose";


const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        category: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
            default: "bi-cup-hot-fill",
        },

        available: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            required: true,

        },

        sold: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
const model = mongoose.models.Product || mongoose.model("Product", productSchema);

export default model;