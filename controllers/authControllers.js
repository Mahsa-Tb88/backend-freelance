import bcryptjs from "bcryptjs";
import User from "../models/userSchema.js";
export async function registerUser(req, res) {
  const {
    username,
    email,
    password,
    profileImg,
    country,
    isSeller,
    phoneNumber,
    desc,
  } = req.body;

  try {
    if ((!username, !email, !password)) {
      res.fail("Please enter a value for fields.", 402);
      return;
    }
    const findUser1 = await User.findOne({ username });
    const findUser2 = await User.findOne({ email });
    if (findUser1 || findUser2) {
      res.fail("username or email already exists.");
      return;
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      profileImg,
      country,
      isSeller,
      phoneNumber,
      desc,
    });
    newUser.password = undefined;
    res.success("Your registration was done successfully!", newUser);
  } catch (e) {
    res.fail(e.message, 500);
  }
}
