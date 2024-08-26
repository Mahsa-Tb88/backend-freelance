import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
    imgBuyer: {
      type: String,
      required: true,
    },
    buyerCountry: {
      type: String,
      required: true,
    },
    rateStar: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
