import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post(`/update/:id` , verifyToken ,  userController.updateUser);


export default router;