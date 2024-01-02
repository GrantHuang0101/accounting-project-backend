import express from "express";
import { UserRepository } from "../repository/userRepository.js";
import { UserController } from "../controller/userController.js";
import { userValidationChain } from "../middleware/userValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { jwtGuardMiddleware } from "../middleware/jwtGuard.middleware.js";
import { AuthService } from "../service/authService.js";

const router = express.Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);
const authService = new AuthService(userRepository);

router.use(jwtGuardMiddleware(authService));

//.....

//admin

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post(
  "/",
  userValidationChain,
  handleValidationErrors,
  userController.createUser
);

router.delete("/:id", userController.deleteUserById);

export default router;
