import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import * as authCtrl from '../middlewares/authJwt';
import * as verifySignup from '../middlewares/verifySignup';

const router = Router();

// consultar lista de usuarios
router.get('/', userCtrl.obtenerUsuarios)
router.post('/',[authCtrl.verifyToken, authCtrl.isAdmin, verifySignup.checkDuplicateUserOrEmail] , userCtrl.createUser)

export default router;