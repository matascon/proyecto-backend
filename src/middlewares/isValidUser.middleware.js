//Este middleware sirve para comprobar si el usuario puede hacer alguina acción porque esa acción tiene que ver con su propio perfil o si es un admin haciendo una acción

const isValidUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sameUser = req.user._id === id ? true : false;

    //Si es user y el id a modificar es diferente no le deja
    if (!sameUser && req.user.role === "user") {
      return res.status(401).json({ message: "Unauthorized, no same user" });
    }

    //Aquí se da por echo que o el user va a ejercer alguna acción sobre sí mismo o que es admin y puede hacer cualquier acción
    return next();
  } catch (error) {
    return next(error);
  }
};

export default isValidUser;
