import { Router } from "express";
import { SalesController } from "../controller/sales.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';

const salesController = new SalesController();

export default (router: Router) => {
    //Register a sale
    router.post('/sales', authMiddleware, salesController.registerSales);
    //get all sales
    router.get('/sales', authMiddleware, salesController.getAllSales);
    //get total amount of sales
    router.get('/sales/totalsales', authMiddleware, adminAuth, salesController.getTotalAmount);
    //get sales count/ number of sales
    router.get('/sales/salescount', authMiddleware, adminAuth, salesController.getSalesCount);

    
    //get a sale
    router.get('/sales/:id', authMiddleware, salesController.getAsales);
}
