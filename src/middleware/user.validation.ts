import { Request, Response, NextFunction } from 'express';
import { schemaErrors } from '../helpers/schema.errors.helpers';
import { userValidationSchema } from '../schemas/user.schema';

// define handler
export const userValidationMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const errors = schemaErrors(req.body, userValidationSchema);

    if (typeof errors === 'object' && errors !== null && !Array.isArray(errors)) {
        return res.status(422).json({
            success: false,
            error: errors
        })
    }
    next();
}