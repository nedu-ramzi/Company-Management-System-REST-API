import { Request, Response, } from "express";
import { Sales } from "../models/sales.model";
import { Inventory } from "../models/inventory.model";
import { ApplicationError } from "../helpers/errors.helpers";

interface PurchaseRequest {
    inventory: string,
    purchasedQuantity: number,
    attendant: string,
    customer: string
}
export class SalesController {
    //Register a purchase
    async registerSales(req: Request, res: Response) {
        try {
            const inputFields: PurchaseRequest = req.body;
            const inventoryItems = await Inventory.find({ _id: { $in: inputFields.inventory } });
            if (!inventoryItems) {
                throw new ApplicationError('Product ID not found', 404);
            }
            const totalPrice = inventoryItems.reduce((total, item) => {
                const quantity = inputFields.purchasedQuantity || 0;
                return total + item.price * quantity;
            }, 0);
            const sales = await Sales.create({ ...inputFields, totalPrice });
            return res.status(201).json({
                success: true,
                message: "sales captured successfully",
                data: {
                    sales
                },
            });
        } catch (error) {
            return res.status(422).json({
                success: false,
                error: {
                    message: error.message,
                    code: error.code,
                },
            });
        }
    }


    //get all Purchase
    async getAllSales(req: Request, res: Response) {
        try {
            const sales = await Sales.find().populate([
                { path: "inventory", model: "Inventory", select: 'productName price description' },
                { path: "attendant", model: "User", select: 'name phone role staffId' },
                { path: "customer", model: "Customer", select: 'name phone' },
            ]);
            return res.status(200).json({
                success: true,
                message: "Purchased Item Records",
                data: {
                    sales
                },
            });
        } catch (error) {
            return res.status(422).json({
                success: false,
                error: {
                    message: error.message,
                    code: error.code,
                },
            });
        }
    }

    // get a Purchase
    async getAsales(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const sales = await Sales.findById(id).populate([
                { path: "inventory", model: "Inventory", select: 'productName price description' },
                { path: "attendant", model: "User", select: 'name phone role staffId' },
                { path: "customer", model: "Customer", select: 'name phone' },
            ]).sort({ 'createdAt': -1 });
            return res.status(200).json({
                "success": true,
                "message": "sales fetched Successfully",
                "data": {
                    sales
                }
            });
        } catch (error) {
            return res.status(400).json({
                "success": false,
                "error": {
                    "message": error.message,
                    "code": error.code
                }
            });
        }
    }

    //get all 
}