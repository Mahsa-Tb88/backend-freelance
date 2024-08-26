import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    country: {
      type: String,
    },
    language: {
      type: String,
      default: "English",
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    aveResponseTime: {
      type: Number,
      default: 1,
    },
    phoneNumber: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
