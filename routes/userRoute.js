import express from "express";
import { UserRepository } from "../repository/userRepository.js";
import { UserController } from "../controller/userController.js";

const router = express.Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

export default router;
