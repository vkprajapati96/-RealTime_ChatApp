import express from "express";
import isAuth from "../middleware/isAuth.js";
import { uploads } from "../middleware/multer.js";
import { getMessage, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiver",isAuth,uploads.single("image"),sendMessage);
messageRouter.get("/get/:receiver",isAuth,getMessage);

export default messageRouter;
