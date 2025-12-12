import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import CloudinaryStorage from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: { v2: cloudinary },
  params: {
    folder: "project-backend",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const uploadImage = multer({ storage });

export default uploadImage;
