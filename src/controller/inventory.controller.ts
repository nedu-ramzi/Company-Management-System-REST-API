import { Request, Response } from "express";
import { Inventory } from "../models/inventory.model";

interface reqBody {
    productName: string,
    quantity: string,
    price: number,
    description: string
}

export class InventoryController {
    //Register inventory/product
    async createInventory(req: Request, res: Response) {
        try {
            const inputFields: reqBody = req.body;
            const inventory = await Inventory.create(inputFields);
            inventory.save();
            return res.status(201).json({
                "success": true,
                "message": "Inventory registered Successfully",
                "data": {
                    "inventory": inventory
                }
            });
        } catch (error) {
            return res.status(422).json({
                "success": false,
                "error": {
                    "message": error.message,
                    "code": error.code
                }
            });
        }
    }

    //get all inventory/product
    async getAllInventory(req: Request, res: Response) {
        try {
            const inventory = await Inventory.find();
            return res.status(200).json({
                "success": true,
                "message": "All Inventory fetched Successfully",
                "data": {
                    "inventory": inventory
                }
            })
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

    //get a specific inventory/product
    async getInventoryById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const inventory = await Inventory.findById(id);
            return res.status(200).json({
                "success": true,
                "message": "Inventory fetched Successfully",
                "data": {
                    "inventory": inventory
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

    //update an inventory/product
    async updateInventory(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const inputFields: reqBody = req.body;
            const inventory = await Inventory.findByIdAndUpdate(id, inputFields, { new: true });
            inventory.save();
            return res.status(200).json({
                "success": true,
                "message": "Inventory Updated Successfully",
                "data": {
                    "inventory": inventory
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

    //delete an inventory/product
    async deleteInventory(req: Request, res: Response){
        try {
            const id = req.params.id;
            const inventory = await Inventory.findByIdAndDelete(id);
            return res.status(200).json({
                "success": true,
                "message": "Inventory Deleted Successfully",
                "data": {
                    "inventory": inventory
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
}