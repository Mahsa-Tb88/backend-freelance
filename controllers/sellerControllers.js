import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

export async function getSellers(req, res) {
  try {
    const sellers = await User.find({ isSeller: true });
    let mySellers = [];
    sellers.forEach((seller) => {
      const list = {
        sellerId: seller._id.toString(),
        username: seller.username,
        profileImg: seller.profileImg,
        desc: seller.desc,
        country: seller.country,
        joinDate: seller.createdAt,
      };
      mySellers.push(list);
    });
    res.success("sellers fetched successfully!", mySellers, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function getSeller(req, res) {
  try {
    const sellerInfo = await User.findById(req.params.id);
    sellerInfo.password = undefined;
    const sellerProducts = await Product.find({ sellerId: req.params.id });

    res.success(
      "sellers fetched successfully!",
      { sellerInfo, sellerProducts },
      200
    );
  } catch (error) {
    res.fail(error.message, 500);
  }
}
