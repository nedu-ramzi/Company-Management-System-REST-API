import { Router } from "express";
import company from "./company";
import customer from './customer';
import inventory from './inventory';
import users from './users';
import auth from './auth';

import purchasedItem from './sales'

const router = Router();

export default (): Router => {
    auth(router);
    company(router);
    customer(router);
    inventory(router);
    users(router);

    purchasedItem(router);

    return router
}