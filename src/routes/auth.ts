import { Router } from "express";
import { AuthController } from "../services/auth.services";
import { userValidationMiddleware } from '../middleware/user.validation';

const authController = new AuthController();

export default (router: Router) => {
    //register user as staff
    router.post('/auth', userValidationMiddleware, authController.registerUser);
    // login
    router.post('/auth/login', authController.loginUser);
}