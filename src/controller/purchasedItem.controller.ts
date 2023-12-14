import { Request, Response,  } from "express";
import { Purchased } from "../models/purchasedItem.model";
import purchasedItem from "routes/purchasedItem";

interface reqBody {
    purchasedItem: string[],
    purchasedQuantity: number,
    totalPrice: number,
    attendant: string,
    customer: string
}
export class PurchasedItemController {

    //Register a purchase
    // async registerPurchase(req: Request, res: Response) {
    //     try {
    //         const inputFields:reqBody = req.body;
    //         const totalPrice = await inputFields.purchasedItem.price * inputFields.purchasedQuantity;
    //         const purchase = await Purchased.create({...inputFields, totalPrice});
    //         return res.status(201).json({
    //             "success": true,
    //             "message": "Purchased items registered Successfully",
    //             "data": {
    //                 "purchase": purchase
    //             }
    //         });

    //     } catch (error) {
    //         return res.status(422).json({
    //             "success": false,
    //             "error": {
    //                 "message": error.message,
    //                 "code": error.code
    //             }
    //         });
    //     }
    // }

    
    //get all Purchase
    async getAllPurchase(req:Request, res:Response){
        try {
            const purchase = await Purchased.find().sort({ 'dateOrdered': -1 });
            return res.status(200).json({
                "success": true,
                "message": "Purchased items fetched Successfully",
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

    //get a Purchase
    // async getApurchase(req:Request, res:Response){
    //     try {
    //         const id = req.params.id;
    //         const purchase = await Purchased.findById(id).populated({
    //             path: 'purchasedQuantity',
    //             populate: {
    //                 path: 'attendant',
    //                 populate: 'customer'
    //             }}).sort({ 'createdAt': -1 });
    //         return res.status(200).json({
    //             "success": true,
    //             "message": "Purchased items registered Successfully",
    //             "data": {
    //                 "purchase": purchase
    //             }
    //         });
    //     } catch (error) {
    //         return res.status(400).json({
    //             "success": false,
    //             "error": {
    //                 "message": error.message,
    //                 "code": error.code
    //             }
    //         });
    //     }
    // }
}