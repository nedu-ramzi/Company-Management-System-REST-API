import { Router } from "express";
import { CustomerController } from "../controller/customer.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';
import { Validations } from "../middleware/validation.middleware";
const customerController = new CustomerController();

const validations = new Validations();
export default (router: Router) => {
    //get customer details
    router.get('/customer', authMiddleware, customerController.getCustomerDetails)
    //create customers
    router.post('/customer',validations.customerValidationMiddleware, authMiddleware, customerController.createCustomer);
    //get a specific customer (by id)
    router.get('/customer/:id', authMiddleware, customerController.getCustomerById);
    //update a customer
    router.patch('/customer/:id', authMiddleware, customerController.updateAcustomer);
    //delete a customer
    router.delete('/customer/:id', authMiddleware, adminAuth, customerController.deleteAcustomer);
}