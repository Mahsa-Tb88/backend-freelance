import User from "../models/userSchema.js";

export async function initialize(req, res) {
  try {
    let user = {};
    if (req.username) {
      user = await User.findOne({ username: req.username });
    }
    res.success("Initialization was done successfully!", { user });
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
