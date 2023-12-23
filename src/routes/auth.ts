import { Router } from "express";
import { AuthController } from "../services/auth.services";
import { Validations } from '../middleware/validation.middleware';
const validations = new Validations();
const authController = new AuthController();

export default (router: Router) => {
    //register user as staff
    router.post('/auth', validations.userValidationMiddleware, authController.registerUser);
    // login
    router.post('/auth/login', validations.loginValidationMiddleware, authController.loginUser);
}