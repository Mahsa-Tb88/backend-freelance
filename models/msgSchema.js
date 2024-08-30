import mongoose, { Schema } from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    fromUserId: {
      type: String,
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastMsg: {
      type: String,
      default: "",
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Msg = mongoose.model("Msg", msgSchema);
export default Msg;
