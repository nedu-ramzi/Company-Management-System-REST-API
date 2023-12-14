import { config as dotenv } from 'dotenv';
import mongoose, { MongooseError } from 'mongoose';
import multer from 'multer';
import { Request} from 'express';
import { ApplicationError } from '../helpers/errors.helpers';
dotenv();

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
export const config = {
    server: {
        port: parseInt(process.env.PORT, 10),
        mode: process.env.MODE_ENV
    },
    database: async () => {
        await mongoose.connect(process.env.MONGOOSE_URI);
        mongoose.connection.on('error', (e: MongooseError) => {
            console.log(`We encountered the following error while trying to connect to the database: ${e.message}`)
        });
        mongoose.connection.on('open', () => {
            console.info('Mongo Database connection successful');
        });
    },
     fileStorage: multer.diskStorage({
        destination: function async(req: Request, file: Request['file'], cb: Function) {
            const isValid = FILE_TYPE_MAP[file.mimetype as keyof typeof FILE_TYPE_MAP];
            if (!isValid) {
                throw new ApplicationError('Invalid Image Type', 400);
            }
            cb(null, './public/upload')
        },
        filename: function async (req: Request, file: Request['file'], cb: Function) {
            const fileName = file.originalname.split(' ').join('-');
            const extension = FILE_TYPE_MAP[file.mimetype as keyof typeof FILE_TYPE_MAP];
            cb(null, `${fileName}-${Date.now()}.${extension}`);
        }
    }),
    services: {
        jwt: {
            expiresIn: '24hr',
            secret: process.env.JWT_SECRET,
        }
    }
}