import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post(`/update/:id` , verifyToken ,  userController.updateUser);
router.delete(`/delete/:id` , verifyToken ,  userController.deleteUser);
router.get(`/lists/:id` , verifyToken , userController.getUserList);
router.get(`/:id` , verifyToken , userController.getUser);


export default router;