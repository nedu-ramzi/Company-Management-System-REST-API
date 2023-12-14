import { Router } from "express";
import { InventoryController } from "../controller/inventory.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';

const inventoryController = new InventoryController();

export default (router: Router) => {
    //Register inventory/product
    router.post('/inventory', authMiddleware, adminAuth, inventoryController.createInventory);
    //get all inventory/product
    router.get('/inventory', inventoryController.getAllInventory);
    //get a specific inventory/product
    router.get('/inventory/:id', inventoryController.getInventoryById);
    //update an inventory/product
    router.put('/inventory/:id', authMiddleware, adminAuth, inventoryController.updateInventory);
    //delete an inventory/product
    router.delete('/inventory/:id', authMiddleware, adminAuth, inventoryController.deleteInventory);
}
