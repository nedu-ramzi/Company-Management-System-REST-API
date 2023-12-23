import Joi from "joi";
enum Role {
    Admin = 'Admin',
    Staff = 'Staff',
}
export class Validation {

    //user validation
    userValidationSchema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(10).required(),
        confirmPassword: Joi.string().min(5).max(10).required(),
        address: Joi.string().min(5).max(50).required(),
        phone: Joi.array().max(11).required(),
        role: Joi.string().valid(...Object.values(Role)).required(),
        profileImage: Joi.string().min(5).max(30)
    });

    //login Validation
    loginValidationSchema = Joi.object({
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(10).required(),
    });

    //company validation
    companyValidationSchema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(50).email().required(),
        address: Joi.string().min(5).max(50).required(),
        phone: Joi.array().max(11).required(),
        regNo: Joi.string().max(30),
    });

    //Customer validation
    customerValidationSchema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(50).email().required(),
        address: Joi.string().min(5).max(50).required(),
        phone: Joi.array().max(11).required(),
    });
}
