import Chat from "../models/chatSchema.js";
import Msg from "../models/msgSchema.js";
import Order from "../models/orderSchema.js";

export async function getChatById(req, res) {
  try {
    const chats = await Chat.find({ chatId: req.params.id });
    const order = await Order.findOne({ chatId: req.params.id });
    //
    const msg = await Msg.findOne({ chatId: req.params.id });
    if (!msg) {
      await Msg.create({
        chatId: req.params.id,
        fromUserId: req.userId,
        toUserId: req.isSeller ? order.buyerId : order.sellerId,
        isSeen: false,
      });
    } else {
      // await Msg.findOneAndUpdate({ chatId: req.params.id }, { isSeen: true });
    }

    //

    if (
      req.userId == order.sellerId.toString() ||
      req.userId == order.buyerId.toString()
    ) {
      const updateChats = await Chat.updateMany(
        {
          chatId: req.params.id,
          fromUserId: req.isSeller
            ? order.buyerId.toString()
            : order.sellerId.toString(),
        },
        { isSeen: true }
      );

      res.success("chats were fetched successfully", chats, 200);
    } else {
      res.fail("You are not athorized", 402);
      return;
    }

    // console.log(req.params.id,)
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
      fromUserId: req.userId,
      isSeen: false,
    });

    const updateMSG = await Msg.findOneAndUpdate(
      { chatId },
      { $set: { lastMsg: desc, isSeen: false } }
    );
    console.log("updateeea", updateMSG);

    res.success("new chat was created successfully", chat, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function chatList() {
  try {
  } catch (error) {}
}
