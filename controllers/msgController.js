import Msg from "../models/msgSchema.js";

export async function getMsgList(req, res) {
  console.log("getmsglist....", req.userId, req.params.id);
  if (req.userId != req.params.id) {
    res.fail("You are not authorized!", 402);
    return;
  }
  try {
    const msgList = await Msg.find({ fromUserId: req.userId }).populate(
      "toUserId"
    );
    res.success("fetch successfully", msgList, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
