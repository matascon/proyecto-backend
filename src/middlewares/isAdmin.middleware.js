//Aquí simplemente compruebo que es admin SÍ O SÍ

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    return res.status(401).json({ message: "Unauthorized, no admin" });
  } catch (error) {
    return next(error);
  }
};

export default isAdmin;
