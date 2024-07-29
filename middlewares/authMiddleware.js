import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export async function checkToken(req, res, next) {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const user = await User.findOne({ username: decode.username });
      req.username = user.username;
      req.isSeller = user.isSeller;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
}
