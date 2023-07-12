//// ******** Definimos el esquema de los productos *********
import {mongoose, Schema }from "mongoose";

const productosSchema = new Schema({
    // Propiedades obligatorias
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    // Con esto nos aseguramos de que al crear un producto tenga bien la categoria
    enum: ['celulares', 'accesorios', 'fundas'],
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  //propiedades opcionales
  modelo: String, // Modelo del producto (celular, computadora, etc.)
  capacidad: String, // Capacidad (almacenamiento, RAM, etc.) del producto
  marca: String, // Marca del producto
  color: String, // Color del producto
  imagen: {
    urlImg: String,
    nombreImg: String,
    pathImg: String
  } 
});

  const Producto = mongoose.model('productos', productosSchema);

export default Producto;

