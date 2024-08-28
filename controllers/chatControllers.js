import Chat from "../models/chatSchema.js";

export async function getChatById(req, res) {
  console.log(req.body);
  try {
    const chats = await Chat.find({ chatId: req.params.id });
    console.log(chats);
    res.success("chats were fetched successfully", chats, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function sendChat(req, res) {
 
  const { chatId, desc } = req.body;
  try {
    const chat = await Chat.create({ chatId, desc, userId: req.userId });
    res.success("new chat was created successfully",chat,200)
  } catch (error) {
    res.fail(error.message,500)
  }
}
