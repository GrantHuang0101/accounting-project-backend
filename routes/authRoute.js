import express from "express";
import { AuthController } from "../controller/authController.js";
import { userValidationChain } from "../middleware/userValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { AuthService } from "../service/authService.js";
import { UserRepository } from "../repository/userRepository.js";
import { adminGuardMiddleware } from "../middleware/adminGuard.middleware.js";
import { jwtGuardMiddleware } from "../middleware/jwtGuard.middleware.js";

const router = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService, userRepository);

router.post(
  "/register",
  userValidationChain,
  handleValidationErrors,
  authController.registerGeneral
);

router.post("/login", authController.login);

router.use(jwtGuardMiddleware(authService));
router.use(adminGuardMiddleware);

router.post(
  "/register/admin",
  userValidationChain,
  handleValidationErrors,
  authController.registerAdmin
);

export default router;
