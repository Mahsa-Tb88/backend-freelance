import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    fromUserId: {
      type: String,
      required: true,
    },
    desc: {
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

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
