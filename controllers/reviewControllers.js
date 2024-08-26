import Product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";

export async function createReviewsOfProduct(req, res) {
  const { desc, rateStar, imgBuyer, buyer, buyerCountry } = req.body;
  try {
    const id = req.params.productId;

    const product = await Product.findById(id);
    if (!product) {
      res.fail("This Product is not valid", 402);
    }
    const review = await Review.create({
      productId: req.params.productId,
      buyer,
      imgBuyer,
      buyerCountry,
      rateStar,
      desc,
    });
    res.success("review was created successfully", { review }, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
export async function getReviewsOfProduct(req, res) {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.fail("This Product is not valid", 402);
    }
    const reviews = await Review.find({ productId });
    res.success("reviews were fetched successfully", reviews, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
