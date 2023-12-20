import { Router } from "express";
import { ReceiptController } from "../controller/receipt.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';

const receiptController = new ReceiptController();

export default (router: Router) => {
    //get receipt by receipt number
    router.get('/receipt', authMiddleware, receiptController.getByReceiptNumber);
    // generate a receipt
    router.get('/receipt/:id', authMiddleware, receiptController.generateReceipt);
}
