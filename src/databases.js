// ******** Creamos la base de datos con mongo atlas mediante la libreria mongoose ********

// Importamos la libreria mongoose para manejarnos con la base de datos mongodb
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

// Declaramos provisoriamente nuestras credenciales para la db
const pasword = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const uri = `mongodb+srv://${dbuser}:${pasword}@cluster0.rxpoism.mongodb.net/${dbname}?retryWrites=true&w=majority`;

//
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const conection = mongoose.connection;
conection.once('open', () =>{
    console.log('db conectada');
})

export default mongoose
