import { User } from "../api/models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.replace("Bearer ", "");

    const { id } = verifyToken(token);

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.user.password = null;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
