import express from "express";
import { editProfile, getCurrentUser, getOtherUsers, search } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
import { uploads } from "../middleware/multer.js";

const userRouter =express.Router();


userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/others",isAuth,getOtherUsers)
userRouter.put("/profile",isAuth,uploads.single("image"),editProfile)
userRouter.get("/search",isAuth,search)



export default userRouter;