import express from "express";
import listController from "../controllers/list.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post(`/create` , verifyToken , listController.create)
router.delete(`/delete/:id` , verifyToken , listController.delete)
router.post(`/update/:id` , verifyToken , listController.update)
router.get(`/get/:id` , listController.get)
router.get(`/annonces` , listController.getList)

export default router;