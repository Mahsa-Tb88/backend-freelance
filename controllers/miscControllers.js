import Msg from "../models/msgSchema.js";
import User from "../models/userSchema.js";

export async function initialize(req, res) {
  try {
    let user = {};
    if (req.username) {
      user = await User.findOne({ username: req.username });
    }
    const msgs = await Msg.find({ to: req.username, isSeen: false });
    const unreadMsgs = msgs.length;
    user.password = undefined;
    res.success("Initialization was done successfully!", { user, unreadMsgs });
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function uploadFile(req, res) {
  const filename = req.file.filename;

  const body = {
    filename: filename,
    url: "/uploads/" + req.folder + "/" + filename,
  };
  res.success("The file was uploaded successfully!", body);
}
