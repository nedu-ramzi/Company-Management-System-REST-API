import { Router } from "express";
import { CustomerController } from "../controller/customer.controller";
const customerController = new CustomerController();

export default (router: Router) => {
    //get customer details
    router.get('/customer', customerController.getCustomerDetails)
    //create customers
    router.post('/customer', customerController.createCustomer);
    //get a specific customer (by id)
    router.get('/customer/:id', customerController.getCustomerById);
    //update a customer
    router.put('/customer/:id', customerController.updateAcustomer);
    //delete a customer
    router.delete('/customer/:id', customerController.deleteAcustomer);
}