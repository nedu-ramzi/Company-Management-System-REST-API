import { Request, Response, } from "express";
import { Sales } from "../models/sales.model";
import { Receipt } from "../models/receipt.model";
import { ApplicationError } from "../helpers/errors.helpers";
import { genRandomString } from "../helpers/randomString.helpers";

export class ReceiptController {
    //generate recepit for sales
    async generateReceipt(req: Request, res: Response) {
        try {
            const salesId = req.params.id;
            const receiptNumber = genRandomString();
            const createReceipt = await Receipt.create({ receiptNumber, salesId });
            const receipt = await Sales.findById(salesId).populate([
                { path: "inventory", model: "Inventory", select: 'productName price description' },
                { path: "attendant", model: "User", select: 'name phone role staffId' },
                { path: "customer", model: "Customer", select: 'name phone' },
            ]);
            if (!receipt) {
                throw new ApplicationError('Sales not found', 404);
            }
            return res.status(200).json({
                "success": true,
                "message": "sales fetched Successfully",
                "data": {
                    Receipt: receipt,
                    createReceipt
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: {
                    message: 'Error generating receipt',
                    details: error.message
                }
            });
        }
    }

    //get receipt by receipt number
    async getByReceiptNumber(req: Request, res: Response) {
        try {
            const { receiptNumber } = req.body;
            const receipt = await Receipt.findOne({ receiptNumber }).populate({
                path: "salesId",
                model: "Sales",
                populate: [
                    { path: "inventory", model: "Inventory", select: 'productName price description' },
                    { path: "attendant", model: "User", select: 'name phone role staffId' },
                    { path: "customer", model: "Customer", select: 'name phone' },
                ]
            });
            if (!receipt) {
                throw new ApplicationError('Not a receipt number', 400);
            }
            return res.status(200).json({
                "success": true,
                "message": "Receipt fetched with receipt number",
                "data": {
                    receipt
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: {
                    message: 'Error fetchig receipt by Receipt number',
                    details: error.message
                }
            });
        }

    }
}