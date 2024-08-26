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
    language,
    aveResponseTime,
    isSeller,
    phoneNumber,
    desc,
  } = req.body;
  try {
    if ((!username, !email, !password)) {
      res.fail("Please enter a value for fields.", 402);
      return;
    }
    const findUser = await User.findOne({ $or: [{ username }, { email }] });
    if (findUser) {
      res.fail("username or email already exists.", 401);
      return;
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      profileImg,
      country,
      language,
      aveResponseTime,
      isSeller,
      phoneNumber,
      desc,
    });
    newUser.password = undefined;
    res.success("Your registration was done successfully!", newUser);
  } catch (e) {
    console.log(e.message);
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

    const token = jwt.sign({ username }, process.env.SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24,
      sameSite: "None",
      secure: false,
    });
    user.password = undefined;
    res.success("Logged in successfully!", { user });
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function signOut(req, res) {
  if (req.username) {
    res.clearCookie("token");
    res.success("cookie cleared successfully!", 200);
  }
}
