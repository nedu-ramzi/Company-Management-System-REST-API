import { Request, Response } from 'express';
import { User } from '../models/users.model';
import bcryptjs from 'bcryptjs';
import { ApplicationError } from '../helpers/errors.helpers';
import { genRandomString } from '../helpers/randomString.helpers';

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

export class UserController {
    //get all user
    async getAllUser(req: Request, res: Response) {
        try {
            const user = await User.find();
            return res.status(200).json({
                "success": true,
                "message": "All User fetched Successfully",
                "data": {
                    "user": user
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

    //get a particular user
    async getAuser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            return res.status(200).json({
                "success": true,
                "message": "User fetched Successfully",
                "data": {
                    "user": user
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

    //update a user
    async updateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const inputFields: reqBody = req.body;
            if (inputFields.password !== inputFields.confirmPassword) {
                throw new ApplicationError('password do not match', 422);
            }
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(inputFields.password, salt);
            const user = await User.findByIdAndUpdate(id, { ...inputFields, password: hashedPassword, staffId: genRandomString() });
            return res.status(200).json({
                "success": true,
                "message": "User Updated Successfully",
                "data": {
                    "user": user
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


    //delete a user
    async deleteAuser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndDelete(id);

            return res.status(200).json({
                "success": true,
                "message": "User Updated Successfully",
                "data": {
                    "user": user
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

    //upload a profile picture
    async uploadProfile(req: Request, res: Response) {
        try {
            if (req.file) {
                const id = req.params.id;
                const { profileImage } = req.body;
                const fileName = req.file.filename;
                const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
                const url = `${basePath}${fileName}`;

                const user = await User.findByIdAndUpdate(id, { profileImage: url }, { new: true });

                return res.status(200).json({
                    "success": true,
                    "message": "Profile Picture uploaded Successfully",
                    "data": {
                        "user": user
                    }
                })     
            }else{
                throw new ApplicationError('Profile Image not found', 400);
            }
            
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
