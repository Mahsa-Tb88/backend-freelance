import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const allowedExtensions = ["png", "jpg", "webp", "jpeg", "svg"];
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const extension = file.originalname.toLowerCase().split(".").pop();
    if (!allowedExtensions.includes(extension)) {
      cb({ code: "INVALID_EXTENSION" });
    } else {
      if (file.originalname.toLowerCase().includes("design")) {
        req.folder = "design";
        cb(null, path.join(__dirname, "../", "uploads/design"));
      } else if (file.originalname.toLowerCase().includes("profile")) {
        req.folder = "profiles";
        cb(null, path.join(__dirname, "../", "uploads/profiles"));
      } else {
        req.folder = "others";
        cb(null, path.join(__dirname, "../", "uploads/others"));
      }
    }
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.toLowerCase().split(".").pop();
    const fullname =
      file.originalname.split(".")[0] + Date.now() + "." + extension;
    console.log(fullname);
    cb(null, fullname);
  },
});

const uploader = multer({ storage, limits: { fileSize: 1024 * 1024 } });
export default uploader.single("file");
