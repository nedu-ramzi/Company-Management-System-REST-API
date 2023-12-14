import { Router } from "express";
import { PurchasedItemController } from "../controller/purchasedItem.controller";

const purchasedItemController = new PurchasedItemController();

export default (router: Router) => {
    //Register a purchase
    // router.post('/purchased', purchasedItemController.registerPurchase);
    //get all Purchase
    router.get('/purchased', purchasedItemController.getAllPurchase)
    //get a Purchase

    // update a purchase

    //delete a purchase
}
