import Msg from "../models/msgSchema.js";

export async function getMsgList(req, res) {
  if (req.userId != req.params.id) {
    res.fail("You are not authorized!", 402);
    return;
  }
  try {
    const query = { $or: [{ from: req.username }, { to: req.username }] };
    const msgList = await Msg.find(query);

    res.success("fetch successfully", msgList, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
export async function getUnreadMsg(req, res) {
  try {
    // find number of unreed Messages
    const msgs = await Msg.find({ to: req.username, isSeen: false });
    const unreadMsg = msgs.length;
    res.success("get unSeen Msgs successfully!", { unreadMsg }, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
