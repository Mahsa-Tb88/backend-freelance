import bcryptjs from "bcryptjs";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

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

export async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.fail("please enter username and password");
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.fail("username or password is not valid.", 402);
      return;
    }

    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      res.fail("username or password is not valid.", 402);
      return;
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.password = undefined;
    res.success("Logged in successfully!", { user, token });
  } catch (error) {
    res.fail(error.message, 500);
  }
}
