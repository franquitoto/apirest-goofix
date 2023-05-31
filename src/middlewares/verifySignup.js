// Con este middleware vamos a verificar que el usuario ingresado sea unico
import User from "../models/user"



export const checkDuplicateUserOrEmail = async (req, res, next) =>{
  // Guardamos el usuario en una constante
  const user = await User.findOne({username: req.body.username});

  // Si el usuario existe devlvemos un 400
  if(user) return res.status(400).json({mensaje: 'El usuario ya existe, intente con otro'});

  // Guardamos el email en una constante
  const email = await User.findOne({email: req.body.email});

  // Si el email existe devolvemos un 400
  if(email) return res.status(400).json({mensaje: 'El email ya existe, intente con otro'});

  // Si no existe el usuario y email seguimos
  next();
}