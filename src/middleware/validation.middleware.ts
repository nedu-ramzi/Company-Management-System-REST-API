import { Request, Response, NextFunction } from 'express';
import { ValidationError } from "joi";
import { schemaErrors } from '../helpers/schema.errors.helpers';
import { Validation } from '../schemas/validation.schema';

const validation = new Validation();
// define handler
export class Validations {
    //error check
    errorCheck = (res: Response, errors: ValidationError | null | undefined, next: NextFunction) => {
        if (typeof errors === 'object' && errors !== null && !Array.isArray(errors)) {
            return res.status(422).json({
                success: false,
                error: errors
            });
        }
        next();
    }
    
    // User Validation middleware
    userValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const errors = schemaErrors(req.body, validation.userValidationSchema);
        this.errorCheck(res, errors, next);   
    }

    //login validation 
    loginValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const errors = schemaErrors(req.body, validation.loginValidationSchema);
        this.errorCheck(res, errors, next);  
    }

    //company validation
    compValidationMiddleware = (req: Request, res: Response, next: NextFunction)=>{
        const errors = schemaErrors(req.body, validation.companyValidationSchema);
        this.errorCheck(res, errors, next);  
    }

    //customer validation
    customerValidationMiddleware = (req: Request, res: Response, next: NextFunction)=>{
        const errors = schemaErrors(req.body, validation.customerValidationSchema);
        this.errorCheck(res, errors, next);
    }
}