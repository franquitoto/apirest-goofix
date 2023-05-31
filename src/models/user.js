// Vamos a crear el esquema de los usuarios
import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

// creamos el esquema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Los roles van a estar relacionados mendiantes el parametro ref
    roles: [
      {
        ref: "Role",
        // aca le estamos aclarando que no vamos a guardar el nombre del rol por si mismo, si no el ID que le asigna mongoose al crearlo
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Creamos el metodo para encriptar la contraseña
userSchema.statics.encryptPassword = async(password) =>{
  //Generamos un algoritmo 10 veces
  const salt = await bcrypt.genSalt(10)
  // Retornamos la contraseña cifrada
  return await bcrypt.hash(password, salt)
};

// Creamos un metodo para comparar la contraseña ingresada por el usuario con la guardada en la db
userSchema.statics.comparePassword = async(password, receivedPassword) =>{
  // Retornamos un true o false dependiendo si las contraseñas coinciden
  return await bcrypt.compare(password, receivedPassword);
};

export default model('User', userSchema);
