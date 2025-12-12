import deleteImgCloudinary from "../utils/deleteImg.js";

export const validateFormUser = async (req, res, next) => {
  try {
    if (!req.body.userName || !req.body.email || !req.body.password) {
      if (req.file) {
        const imgUrl = req.file.secure_url || req.file.path;
        deleteImgCloudinary(imgUrl);
      }

      return res.status(400).json({ message: "Incomplete form" });
    }

    return next();
  } catch (error) {
    console.log(`Aqui entra`);
    console.log(`${req.body.email}`);
    return next(error);
  }
};

export const validateFormBook = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.year) {
      if (req.file) {
        const imgUrl = req.file.secure_url || req.file.path;
        deleteImgCloudinary(imgUrl);
      }

      return res.status(400).json({ message: "Incomplete form" });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
