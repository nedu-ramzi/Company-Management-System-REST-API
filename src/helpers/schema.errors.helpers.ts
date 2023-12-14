import { Request } from 'express';
import Joi, { Schema, ValidationError } from 'joi';

export const schemaErrors = function (payload: Request, schema: Schema): Record<string, { message: string }> | null {
    const { error } = schema.validate(payload, { abortEarly: false }) as { error?: ValidationError };

    let errors: Record<string, { message: string }> = {};

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