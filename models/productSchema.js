import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    albumImage: {
      type: [String],
      default: [],
    },
    totalStar: {
      type: Number,
      default: 1,
    },
    desc: {
      type: String,
      required: true,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      default: 1,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
