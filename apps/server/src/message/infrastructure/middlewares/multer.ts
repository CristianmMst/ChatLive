import fs from "node:fs";
import multer from "multer";
import path from "node:path";

const uploadDirectory = path.join(__dirname, "../../../../uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, uploadDirectory);
  },
});

export const upload = multer({ storage });
