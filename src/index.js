// *********** Vamos a crear nuestro servidor de express **********************
// Requerimos las librerias pertinentes
import express  from "express";
import morgan from "morgan";
import routerProductos from "./routes/prodcutos.router";
import routerAutenticacion from "./routes/autenticacion.routes";
import routerUsuarios from './routes/user.routes'
import multer from "multer";
import path from "path";
import pkjson from '../package.json';
import databases from './databases';
import { createRoles } from "./libs/aliniciar";
import dotenv from 'dotenv';
let cors = require("cors");



console.log(process.env.PORT)
// Creamos nuestra app express
const app = express();
createRoles();

// Configuraciones

// configuramos dotenv
dotenv.config()
// Le seteamos un puerto proveniente de env o el 3000 por default
app.set('port', process.env.PORT || 3000)

// configuramos storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: function (req, file, cb) {
      const nombreArchivo = Date.now() + path.extname(file.originalname);
      cb(null, nombreArchivo);
    }
  });


//Middlewares
app.use(express.urlencoded())
app.use(express.json());
app.use(cors());
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Error en la ruta');
});
app.use(morgan('dev'));
app.use(express.json());
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img'),
    limits:{fileSize: 1000000}
}).single('imagen'));

// Rutas
app.get('/', (req, res) =>{
  res.json({
    nombre: pkjson.name,
    autor: pkjson.author,
    descripcion: pkjson.description,
    verion: pkjson.v
  })
})
app.use('/api/productos', routerProductos);
app.use('/api/auth', routerAutenticacion);
app.use('/api/usuarios', routerUsuarios)


// Archivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));


// Inicio del servidor
app.listen(app.get('port'), () =>{
    console.log(`Servidor on en el puerto ${app.get('port')}`);
})


