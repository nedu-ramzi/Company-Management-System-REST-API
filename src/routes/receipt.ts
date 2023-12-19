import { Router } from "express";
import { ReceiptController } from "../controller/receipt.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';

const receiptController = new ReceiptController();

export default (router: Router) => {
    // generate a receipt
    router.get('/receipt/:id', authMiddleware, receiptController.generateReceipt);
}
