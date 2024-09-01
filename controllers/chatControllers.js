import { isSeller } from "../middlewares/authMiddleWare.js";
import Chat from "../models/chatSchema.js";
import Msg from "../models/msgSchema.js";
import Order from "../models/orderSchema.js";

export async function getChatById(req, res) {
  try {
    const chats = await Chat.find({ chatId: req.params.id });
    const order = await Order.findOne({ chatId: req.params.id })
      .populate("sellerId")
      .populate("buyerId");

    // show message just to two these users
    if (
      req.userId == order.sellerId._id.toString() ||
      req.userId == order.buyerId._id.toString()
    ) {
      // we update message from other user
      await Chat.updateMany(
        {
          chatId: req.params.id,
          userId: req.isSeller
            ? order.buyerId._id.toString()
            : order.sellerId._id.toString(),
        },
        { isSeen: true }
      );

      // update msg for list of msg

      await Msg.findOneAndUpdate(
        {
          chatId: req.params.id,
          from: req.isSeller ? order.buyerId.username : order.sellerId.username,
        },
        { isSeen: true }
      );

      res.success("chats were fetched successfully", chats, 200);
    } else {
      res.fail("You are not athorized", 402);
      return;
    }
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function sendChat(req, res) {
  const { chatId, desc } = req.body;

  try {
    const chat = await Chat.create({
      chatId,
      desc,
      userId: req.userId,
      isSeen: false,
    });
    // create msg
    const msg = await Msg.findOne({ chatId });
    const order = await Order.findOne({ chatId })
      .populate("sellerId")
      .populate("buyerId");

    if (!msg) {
      await Msg.create({
        chatId,
        from: req.username,
        to: req.isSeller ? order.buyerId.username : order.sellerId.username,
        lastMsg: desc,
        isSeen: false,
      });
    } else {
      await Msg.findOneAndUpdate(
        { chatId },
        {
          $set: {
            from: req.username,
            to: req.isSeller ? order.buyerId.username : order.sellerId.username,
            lastMsg: desc,
            isSeen: false,
          },
        }
      );
    }

    res.success("new chat was created successfully", chat, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
