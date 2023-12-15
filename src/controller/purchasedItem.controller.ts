import { Request, Response,  } from "express";
import { Purchased } from "../models/purchasedItem.model";
import { Inventory } from "../models/inventory.model";
import { ApplicationError } from "../helpers/errors.helpers";

interface PurchaseRequest {
    inventory: string,
    purchasedQuantity: number,
    attendant: string,
    customer: string
}
export class PurchasedItemController {

    //Register a purchase
    async registerPurchase(req: Request, res: Response) {
        try {
            const inputFields: PurchaseRequest = req.body;

            // Fetch the Inventory items based on the provided IDs
            const inventoryItems = await Inventory.find({ _id: { $in: inputFields.inventory } });
            if (!inventoryItems){
                throw new ApplicationError('Product ID not found', 404);
            }
            // Calculate the total price by summing up the prices of each item multiplied by purchasedQuantity
            const totalPrice = inventoryItems.reduce((total, item) => {
                const quantity = inputFields.purchasedQuantity || 0;
                return total + item.price * quantity;
            }, 0);

            // Create the Purchase document with the calculated totalPrice
            const purchase = await Purchased.create({ ...inputFields, totalPrice });
            return res.status(201).json({
                success: true,
                message: "Purchased captured successfully",
                data: {
                    purchase
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
    async getAllPurchase(req: Request, res: Response) {
        try {
            const purchases = await Purchased.find().populate([
                { path: "inventory", model: "Inventory", select: 'productName price description' },
                { path: "attendant", model: "User", select: 'name phone role staffId'},
                { path: "customer", model: "Customer", select: 'name phone'},
            ]);
            return res.status(200).json({
                success: true,
                message: "Purchased Item Records",
                data: { 
                    purchases
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
    async getApurchase(req:Request, res:Response){
        try {
            const id = req.params.id;
            const purchase = await Purchased.findById(id).populate([
                { path: "inventory", model: "Inventory", select: 'productName price description' },
                { path: "attendant", model: "User", select: 'name phone role staffId' },
                { path: "customer", model: "Customer", select: 'name phone' },
            ]).sort({ 'createdAt': -1 });
            return res.status(200).json({
                "success": true,
                "message": "Purchased items registered Successfully",
                "data": {
                    "purchase": purchase
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