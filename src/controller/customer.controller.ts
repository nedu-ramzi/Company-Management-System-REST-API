import company from "routes/company";
import { Customer } from "../models/customers.model";
import { Request, Response } from "express";
import { ApplicationError } from "../helpers/errors.helpers";

interface reqBody {
    name: string,
    email: string,
    address: string,
    phone: string
}

export class CustomerController {
    //get customer details
    async getCustomerDetails(req: Request, res: Response) {
        try {
            const customer = await Customer.find();
            if (!customer) {
                throw new ApplicationError('Customer not found', 404);
            }
            return res.status(200).json({
                "success": true,
                "message": "Customer fetched Successfully",
                "data": {
                    "customer": customer
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

    //create customers
    async createCustomer(req: Request, res: Response) {
        try {
            const inputFields: reqBody = req.body;
            const emailExits = await Customer.findOne({ email: inputFields.email });
            if (emailExits) {
                throw new ApplicationError('Email Already exists', 422);
            }
            const customer = await Customer.create(inputFields);
            return res.status(201).json({
                "success": true,
                "message": "Customer registered Successfully",
                "data": {
                    "customer": customer
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

    //get a specific customer (by id)
    async getCustomerById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const customer = await Customer.findById(id);

            return res.status(200).json({
                "success": true,
                "message": "Customer fetched Successfully",
                "data": {
                    "customer": customer
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

    //update a customer
    async updateAcustomer(req: Request, res: Response) {
        try {
            const inputFields:reqBody = req.body;
            const id = req.params.id;
            const customer = await Customer.findByIdAndUpdate(id, inputFields, { new: true });
            customer.save();
            return res.status(200).json({
                "success": true,
                "message": "Customer Updated Successfully",
                "data": {
                    "customer": customer
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

    //delete a customer
    async deleteAcustomer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const customer = await Customer.findByIdAndDelete(id);
            return res.status(200).json({
                "success": true,
                "message": "Customer deleted Successfully",
                "data": {
                    "customer": customer
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