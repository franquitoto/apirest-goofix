import Role from "../models/role"
export const createRoles = async () =>{
  try{
    // chequeamos en la base de datos por unica vez cuantos roles hay creamos
    const count = await Role.estimatedDocumentCount();

    //Si hay algun rol creado no hacemos nada
    if(count > 0) return;

    // La primera vez que se ejecute el servidor va a crear estos roles
    const values = await Promise.all([
      new Role({name:'user'}).save(),
      new Role({name:'moderator'}).save(),
      new Role({name:'admin'}).save()
    ]);
    console.log(values);
  }catch(error){
    console.log(error);
  }
}