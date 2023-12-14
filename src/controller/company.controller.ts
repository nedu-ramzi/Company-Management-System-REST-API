import { Request, Response, application } from "express";
import { Company } from "../models/company.model";
import { ApplicationError } from "../helpers/errors.helpers";

interface reqBody{
    name: string,
    email: string,
    address: string,
    regNo: string
}

export class CompanyController {
    //Create a company
    async createCompany(req: Request, res: Response) {
        try {
            const inputFields:reqBody  = req.body;
            const emailExits = await Company.findOne({email: inputFields.email});
            if (emailExits) {
                throw new ApplicationError('Email Already Exist', 422);
            }
            const company = await Company.create(inputFields);
            company.save();
            return res.status(201).json({
                "success": true,
                "message": "Company Created Successfully",
                "data": {
                    "company": company
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

    //Get company
    async getCompany(req: Request, res: Response) {
        try {
            const company = await Company.find();
            if (!company) {
                throw new ApplicationError('Company not found', 404)
            }
            return res.status(200).json({
                "success": true,
                "message": "Company fetched Successfully",
                "data": {
                    "company": company
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

    //Update a company by id
    async updateCompany(req: Request, res: Response) {
        try {
            const inputFields:reqBody = req.body;
            const id = req.params.id;
            const company = await Company.findByIdAndUpdate(id, inputFields, { new: true });
            if (!company) {
                throw new ApplicationError('Company not found', 404)
            }
            return res.status(200).json({
                "success": true,
                "message": "Company Updated Successfully",
                "data": {
                    "company": company
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

    //delete company by id
    async deleteAcompany(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const company = await Company.findByIdAndDelete(id);
            return res.status(200).json({
                "success": true,
                "message": "Company deleted Successfully",
                "data": {
                    "company": company
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