import { Request } from 'express';
import Joi, { ValidationError } from 'joi';

export const schemaErrors = function (payload: Request, schema: Joi.ObjectSchema<any>): ValidationError | null {
    const { error } = schema.validate(payload, { abortEarly: false });

    let errors:any = {};

    if (error) {
        error.details.forEach((item) => {
            let key = item.context?.key ?? '';

            let errorBag = {
                message: item.message,
            };

            errors[key] = errorBag;
        });

        return errors;
    }

    return null;
};