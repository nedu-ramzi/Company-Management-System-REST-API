import { Router } from "express";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';
import { CompanyController } from "../controller/company.controller";
import { Validations } from '../middleware/validation.middleware';

const companyController = new CompanyController();
const validations = new Validations();

export default (router: Router) => {
    //Get company
    router.get('/company', authMiddleware, adminAuth, companyController.getCompany);

    //Create a company
    router.post('/company', validations.compValidationMiddleware, authMiddleware, adminAuth, companyController.createCompany);

    //Update a company by id
    router.patch('/company/:id', validations.compValidationMiddleware, authMiddleware, adminAuth, companyController.updateCompany);

    //delete company by id
    router.delete('/company/:id', authMiddleware, adminAuth, companyController.deleteAcompany);
}