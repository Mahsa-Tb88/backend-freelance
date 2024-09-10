import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export async function checkToken(req, res, next) {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const user = await User.findOne({
        username: decode.username.toLowerCase(),
      });
      req.username = user.username.toLowerCase();
      req.isSeller = user.isSeller;
      req.userId = user._id.toString();
      if (req.isSeller) {
        req.sellerId = user._id.toString();
      } else {
        req.buyerId = user._id.toString();
      }
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
}

export async function isSeller(req, res, next) {
  if (req.isSeller) {
    next();
  } else {
    res.fail("You are not athorized for creating a product", 402);
  }
}
