import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMiddleware, adminAuth } from '../middleware/auth.middleware';
import { upload , isFile} from '../middleware/fileUpload.middleware';


const userController = new UserController();

export default (router: Router) => {
   //get all user
    router.get('/user', authMiddleware, adminAuth, userController.getAllUser);
   //get a particular user
    router.get('/user/:id', authMiddleware, userController.getAuser);
   //update a user
    router.patch('/user/:id', authMiddleware, adminAuth, userController.updateUser);
   //delete a user
    router.delete('/user/:id', authMiddleware, adminAuth, userController.deleteAuser);
    //upload profile pic
    router.patch('/user/profile/:id', upload.single('profileImage'), isFile, userController.uploadProfile);
    //delete a profile pic
    router.delete('/user/profile/:id', userController.deleteProfilePic);
}
