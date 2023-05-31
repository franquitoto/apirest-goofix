//// ******** Definimos el esquema de las imagenes *********

const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagenSchema = new Schema({
    nombreArchivo: String,
    rutaArchivo: String
  });

const Imagen = mongoose.model('Imagen', imagenSchema);

module.exports = Imagen;