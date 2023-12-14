import { Router } from "express";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';
import { CompanyController } from "../controller/company.controller";
const companyController = new CompanyController();

export default (router: Router) => {
    //Get company
    router.get('/company', authMiddleware, adminAuth, companyController.getCompany);

    //Create a company
    router.post('/company', authMiddleware, adminAuth, companyController.createCompany);

    //Update a company by id
    router.put('/company/:id', authMiddleware, adminAuth, companyController.updateCompany);

    //delete company by id
    router.delete('/company/:id', authMiddleware, adminAuth, companyController.deleteAcompany);
}