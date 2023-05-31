// Funciones para manejar la autenticacion de los usuarios

// Importamos el modelo para manejarnos con la db
import User from "../models/user";
// Importamos esta libreria para generar tokens de acceso
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/role";

// Funcion para manejar la creacion de usuarios
export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    // Utilizamos el metodo para encriptar el password
    password: await User.encryptPassword(password),
  });
  // Antes de guardar el usuario vamos a comprobar si nos esta enviando el rol del usuario
  if (roles) {
    // Si nos envia un rol vamos a comprobar en la db si el rol recivido es valido
    const foundRoles = await Role.find({ name: { $in: roles } });
    // Si el rol es valido, se lo agregamos al usuario
    if(foundRoles.length > 0){
      newUser.roles = foundRoles.map((role) => role._id);
    }else{
      // Si no es valido le devolvemos un 400
      return res.status(400).json({
        mensaje: `El rol asignado no corresponde a ningun rol existente`
      })
    }
    
    // Si no nos envia ningun rol le agregamos por defecto el rol user
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  // Cuando guardamos el usario en la db, ella nos devuelve el usuario con su id
  const savedUser = await newUser.save();

  // Vamos a generar un toquen
  // Esta funcion nos pode
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, // expira en 24 horas
  });

  res.json({ token });
};

// Funcion para comprobar los datos del usuario al logearse
export const signin = async (req, res) => {
  // Primero vamos a ver si el email que pasa el usuario existe en la base de datos
  // Como anteriormente relacionamos el campo roles con la coleccion de la db roles, con el populate dejamos expuestos estos datos
  const userFound = await User.findOne({email: req.body.email}).populate('roles');

  // Si el email no esta en la db le devolvemos un 400 
  if(!userFound) return res.status(400).json({mensaje: 'No se encontro el usuario'});

  // Si el email esta en la db comparamos la contraseña
  const matchPassword = await User.comparePassword(req.body.password, userFound.password);

  // Si la contraseña no coincide devolvemos un 401
  if(!matchPassword) return res.status(401).json({token: null, mensaje:'Password invalido'});

  // Si los datos proporcionados coinciden le entregamos un token por 24hs
  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 86400
  })

  res.json({token});
};
