import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;