import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../helpers/errors.helpers';
import { config } from '../config/config.main';


export const upload = multer({ storage: config.fileStorage });

export const isFile = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.file){
        throw new ApplicationError('Upload a Profile Image', 400);
    }
    next();
}