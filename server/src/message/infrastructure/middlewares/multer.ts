import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "./uploads");
  },
});

export const upload = multer({ storage });
