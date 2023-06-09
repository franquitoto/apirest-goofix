// Aca manejamos las rutas para auntenticaciones
import { Router} from "express";
const router =  Router();

// Importamos las funciones para manejar las rutas
import * as autenticacionCtrl from '../controllers/autenticacion.controller';
import * as verifySignup from '../middlewares/verifySignup';
import * as authJwt from '../middlewares/authJwt'

// Ruta para crear un usuario
router.post('/signup',verifySignup.checkDuplicateUserOrEmail, autenticacionCtrl.signUp)

// Ruta para loguearse
router.post('/signin', autenticacionCtrl.signin)

// Ruta para chequear si es admin
router.post('/isadmin', authJwt.verifyToken, authJwt.isAdmin)


export default router;