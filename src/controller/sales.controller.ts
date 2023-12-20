import { Request, Response, } from "express";
import { Sales } from "../models/sales.model";
import { Inventory } from "../models/inventory.model";
import { ApplicationError } from "../helpers/errors.helpers";

interface PurchaseRequest {
    inventory: string[],
    purchasedQuantity: { [inventoryId: string]: number },
    attendant: string,
    customer: string,
    vat: number,
    discount: number,
    tenderedAmount: number,
    payType: 'Cash' | 'Transfer' | 'POS'
}
export class SalesController {

    //Register a purchase
    async registerSales(req: Request, res: Response) {
        try {
            const inputFields: PurchaseRequest = req.body;
            if (!Array.isArray(inputFields.inventory) || inputFields.inventory.length === 0) {
                throw new ApplicationError('Invalid inventory array', 400);
            }
            const inventoryItems = await Inventory.find({ _id: { $in: inputFields.inventory } });
            if (!inventoryItems || inventoryItems.length === 0) {
                throw new ApplicationError('Product ID not found', 404);
            }
            const totalPrice = inventoryItems.reduce((total, item) => {
                const inventoryId = item._id.toString();
                const quantity = inputFields.purchasedQuantity[inventoryId] || 0;
                const vat = inputFields.vat || 0;
                const discount = inputFields.discount || 0;
                return total + item.price * quantity - vat - discount;
            }, 0);
            const change = inputFields.tenderedAmount - totalPrice;
            if (inputFields.tenderedAmount < totalPrice) {
                throw new ApplicationError('Tendered Amount is less than the Total price', 422);
            }
            const sales = (await Sales.create({ ...inputFields, totalPrice, change, purchasedQuantity: inputFields.purchasedQuantity }));

            //get the number of inventory stock remaining after each sale
            const stock = await Inventory.find({ _id: { $in: inputFields.inventory } });
            const remainingStock = stock.map(item => ({
                _id: item._id,
                remainingQuantity: item.quantity - inputFields.purchasedQuantity[item._id.toString()],
            }));
            
            return res.status(201).json({
                success: true,
                message: "sales captured successfully",
                data: {
                    sales,
                    remainingStock
                }
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

    // get a Purchase by id
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

    //get total amount of sales
    async getTotalAmount(req: Request, res: Response) {
        try {
            const totalSales = await Sales.aggregate([
                {
                    $group: {
                        _id: null,
                        totalsales: {
                            $sum: '$totalPrice'
                        }
                    }
                }
            ]);

            if (!totalSales || totalSales.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Total sales could not be generated'
                    }
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Total Amount Fetched',
                data: {
                    totalsales: totalSales.pop().totalsales.toString()
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: {
                    message: error.message,
                    code: 'INTERNAL_SERVER_ERROR'
                }
            });
        }
    }

    // sales count
    async getSalesCount(req: Request, res: Response) {
        try {
            const salesCount = await Sales.countDocuments();
            return res.status(200).json({
                success: true,
                message: 'Sales Count Fetched',
                data: {
                    salesCount
                }
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Error fetching sales count',
                    details: error.message
                }
            });
        }

    }

}