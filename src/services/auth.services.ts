import { Request, Response } from 'express';
import { User } from '../models/users.model';
import { ApplicationError } from '../helpers/errors.helpers';
import { genRandomString } from '../helpers/randomString.helpers'
import bcryptjs from 'bcryptjs';
import { issueToken } from './jwt.services';


interface reqBody {
    name: string;
    phone: string[];
    role: "Admin" | "Staff";
    staffId: string;
    email?: string;
    address?: string,
    password: string,
    confirmPassword: string
}

export class AuthController {
    //register user as staff
    async registerUser(req: Request, res: Response) {
        try {
            const inputFields: reqBody = req.body;
            const emailExist = await User.findOne({ email: inputFields.email });
            if (emailExist) {
                throw new ApplicationError('User with this email already exist', 422);
            }
            if (inputFields.password !== inputFields.confirmPassword) {
                throw new ApplicationError('password do not match',422)
            }
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(inputFields.password, salt);
            const user = await User.create({ ...inputFields, password:hashedPassword ,staffId: genRandomString() });

            return res.status(201).json({
                "success": true,
                "message": "User registered Successfully",
                "data": {
                    "user": user
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

    //login User
    async loginUser(req: Request, res:Response){
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) throw new ApplicationError('User acount not found', 404);
            const comparePassword = await bcryptjs.compare(password, user.password);

            //generate token 
            const payload = {
                id: user.id,
                email: user.email,
                password: user.password,
                admin: user.role,
                staffId:user.staffId
            }
            const token = await issueToken(payload);

            return res.status(200).json({
                success: true,
                message: 'User Logged in',
                authorization: {
                    type: 'Bearer',
                    token: token
                }
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Login failed',
                err: {
                    err: error.message,
                    code: error.code
                }
            })
        }

    }
}