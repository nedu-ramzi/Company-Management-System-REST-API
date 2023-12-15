import { Router } from "express";
import { SalesController } from "../controller/sales.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';

const salesController = new SalesController();

export default (router: Router) => {
    //Register a purchase
    router.post('/sales', authMiddleware, salesController.registerSales);
    //get all Purchase
    router.get('/sales', authMiddleware, salesController.getAllSales);
    //get a Purchase
    router.get('/sales/:id', authMiddleware, salesController.getAsales);
}
