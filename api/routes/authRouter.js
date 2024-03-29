import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post(`/signup` , authController.singup)
router.post(`/signin` , authController.singin)
router.post(`/google` , authController.google)
router.get(`/signout` , authController.signout)

export default router;