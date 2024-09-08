import Product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";

export async function createReviewsOfProduct(req, res) {
  const { desc, rateStar, imgBuyer, buyer, buyerCountry } = req.body;
  if (desc == "") {
    res.fail("Please Write your idea", 402);
    return;
  }

  if (req.username !== buyer) {
    res.fail("You are not authorized!", 402);
    return;
  }
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
    const reviews = await Review.find({ productId: id });
    let newTotalStar;
    const sumRateStar = reviews.reduce(
      (sum, review) => sum + review.rateStar,
      0
    );
    newTotalStar = sumRateStar / reviews.length;
    await Product.findByIdAndUpdate(id, {
      totalStar: Math.round(newTotalStar),
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

export async function deleteReview(req, res) {
  try {
    const review = await Review.findById(req.params.id);
    if (req.username !== review.buyer) {
      res.fail("You are not authorized!", 402);
      return;
    }
    await Review.findByIdAndDelete(req.params.id);

    /// update totalstar of product
    let newTotalStar;
    const reviews = await Review.find({ productId: review.productId });
    const sumRateStar = reviews.reduce(
      (sum, review) => sum + review.rateStar,
      0
    );
    if (reviews.length) {
      newTotalStar = sumRateStar / reviews.length;
    } else {
      newTotalStar = 1;
    }

    await Product.findByIdAndUpdate(review.productId, {
      totalStar: Math.floor(newTotalStar),
    });

    res.success("review was deleted successfully!", 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
