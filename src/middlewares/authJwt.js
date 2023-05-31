import config from "../config"
import Role from "../models/role";
import User from "../models/user"
import jwt from "jsonwebtoken";


// este middleware va a chequear que el token que tiene el usuario se valido para el programa
export const verifyToken = async (req, res, next) =>{
  try{
    // Guardamos el token que nos envia el usuario en una variable
    const token = req.headers["token"];

    // Si el token no existe le enviamos un 403
    if(!token) return res.status(403).json({mensaje: 'Se necesita un token'});

    // Si el token existe lo verificamos con jsonwebtoken pasandole tambien la configuracion secret
    const decoded = jwt.verify(token, config.SECRET);

    // Si el token se logra verificar vamos a obtener el ID que trae el token
    req.userId = decoded.id;

    // Ese ID deberia corresponder a un usuario, chequeamos en la db de usuarios que sea asi
    const user = await User.findById(req.userId, {password: 0});
  
    // Si no existe devolvemos un 404
    if(!user) return res.status(404).json({mensaje: 'usuario no encontrado'});

    // Si existe le damos via libre para que siga
    next()
  }catch(error){
    return res.status(401).json({mensaje: 'No esta autorizado'});
  }
}

// Funcion para chequear el nivel de acceso del usuario: si es moderador
export const isModerator = async (req, res, next) =>{
  try{
    // De la verificacion anterior del token chequeamos que el mismo sea valido, entonces con el req.userId podemos obtener el usuario
    
    const user = await User.findById(req.userId);

    // Cuando obtenemos el usuario podemos obtener el ID correspondiente a su propiedad roles
    const roles = await Role.find({_id: {$in: user.roles}});

    // chequeamos que el rol sea el correspondiente
    for(let i =0; i<roles.length;i++){
      if(roles[i].name === 'moderator'){
        // Dejamos que siga su curso si corresponde
        next()
        return
      }
    }
    // Si no corresponde le devolvemos un 403
    return res.status(403).json({mensaje: 'Requiere rol de molderador'});
  }catch(error){
    return res.status(403).json({mensaje: 'Requiere rol de molderador'});
  }
}
export const isAdmin = async (req, res, next) =>{
  try{
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for(let i =0; i<roles.length;i++){
      if(roles[i].name === 'admin'){
        next()
        return
      }
    }
    return res.status(403).json({mensaje: 'Requiere rol de admin'});
  }catch(error){
    return res.status(403).json({mensaje: 'Requiere rol de admin'});
  }
}