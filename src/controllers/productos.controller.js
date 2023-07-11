import { json } from "express";
import Producto from "../models/productos";
import fs from 'fs';
import path from 'path'


// Funcion para obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({productos});
  } catch (error) {
    res.status(500).json({
      Mensaje: "Hubo un error al obtener los productos",
      error,
    });
  }
};

// Funcion para obtener un solo producto mediante ID
export const obtenerProductoId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    
    
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      Mensaje: "Hubo un error al obtener un producto",
      error,
    });
  }
};

// Funcion para cargar un nuevo producto
export const cargarProducto = async (req, res) => {
  try {
    const nombreArchivo = req.file.filename;
    const rutaArchivo = req.file.path;
    console.log(nombreArchivo)
    const nuevaImagen = {
      urlImg: `http://localhost:3000/${rutaArchivo.slice(49, 70)}`,
      nombreImg: nombreArchivo,
      pathImg: rutaArchivo.slice(49, 70),
    };
    console.log(nuevaImagen);

    const nuevoProducto =
      new Producto({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        modelo: req.body.modelo,
        capacidad: req.body.capacidad,
        marca: req.body.marca,
        color: req.body.color,
        imagen: nuevaImagen
      }) 
      
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      Mensaje: "Error al cargar producto",
      error,
    });
  }
};

// Funcion para cargar una imagen a un producto ya creado
export const cargarImagen = async (req, res) => {
  
  try {
    const nombreArchivo = req.file.filename;
    const rutaArchivo = req.file.path;
    console.log(nombreArchivo)

    const producto = await Producto.findById(req.params.id);
    const rutaArchivo2 = path.join(__dirname, `../public/img/${producto.imagen.nombreImg}`);

fs.unlink(rutaArchivo2, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo ha sido eliminado correctamente. ',rutaArchivo2);
});
    
    const nuevaImagen = {
      urlImg: `http://localhost:3000/${rutaArchivo.slice(49, 70)}`,
      nombreImg: nombreArchivo,
      pathImg: rutaArchivo.slice(49, 70),
    };
    console.log(nuevaImagen);
    await Producto.findByIdAndUpdate(req.params.id, { imagen: nuevaImagen });
    res.json(producto.imagen.nombreImg);
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error al cargar la imagen",
      err,
    });
  }
};

// Funcion para actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      Mensaje: "Ruta principal",
      Utilidad: `Ruta para actualizar un producto mendiante id, ${req.params.id}`,
    });
  } catch (errr) {
    res.status(500).json({
      Mensaje: "Error en el seridor",
      errr,
    });
  }
};

// Funcion para eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndRemove(req.params.id);
    res.json({
      Mensaje: "Ruta principal",
      Utilidad: `Ruta para eliminar un producto mendiante id, ${req.params.id}`,
    });
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error en el servidor",
      err,
    });
  }
};
