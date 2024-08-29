import Chat from "../models/chatSchema.js";
import Order from "../models/orderSchema.js";

export async function getChatById(req, res) {
  try {
    const chats = await Chat.find({ chatId: req.params.id });
    const order = await Order.findOne({ chatId: req.params.id });

    // console.log(req.params.id,)
    const updateChats = await Chat.updateMany(
      {
        chatId: req.params.id,
        fromUserId: req.isSeller
          ? order.buyerId.toString()
          : order.sellerId.toString(),
      },
      { isSeen: true }
    );
    // console.log("updateee..", updateChats);
    res.success("chats were fetched successfully", chats, 200);
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
    res.success("new chat was created successfully", chat, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
