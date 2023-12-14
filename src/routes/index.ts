import { Router } from "express";
import company from "./company";
import customer from './customer';
import inventory from './inventory';
import users from './users';
import auth from './auth';
import sales from './sales';
import purchasedItem from './purchasedItem'

const router = Router();

export default (): Router => {
    auth(router);
    company(router);
    customer(router);
    inventory(router);
    users(router);

    purchasedItem(router);
    sales(router);

    return router
}