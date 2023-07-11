// **************  codeamos el router de productos  ******************
import express from "express";
import Dbproductos from '../models/productos';
import * as productosCtrl from '../controllers/productos.controller';
import * as authJwt from "../middlewares/authJwt";


const router = express.Router()
// Vamos a definir las rutas
//Ruta para obtener todos los productos
router.get("/", productosCtrl.obtenerProductos)

// Ruta para obtener un producto mediante ID
router.get("/:id", productosCtrl.obtenerProductoId)

// Ruta para agregar un producto
router.post("/", productosCtrl.cargarProducto)

// Ruta para agregar una imagen a un documento de la db
router.post("/img/:id", productosCtrl.cargarImagen)

// Ruta para actualizar un producto
router.put("/:id", productosCtrl.actualizarProducto)

// Ruta para eliminar un producto
router.delete("/:id",productosCtrl.eliminarProducto)

// Prueba
router.post("/prueba", (req, res) =>{
  try{
    console.log(req.body.nombre)
    res.json('informacion recibida')
  }catch(error){
    res.json(error)
  }
  
})

// Exportamos el router
export default router;

