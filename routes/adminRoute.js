import express from "express";
import { AuthController } from "../controller/authController.js";
import { userValidationChain } from "../middleware/userValidationChain.js";
import { accountValidationChain } from "../middleware/accountValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { AuthService } from "../service/authService.js";
import { UserRepository } from "../repository/userRepository.js";
import { AccountRepository } from "../repository/accountRepository.js";
import { AccountController } from "../controller/accountController.js";
import { UserController } from "../controller/userController.js";
import { TransactionRepository } from "../repository/transactionRepository.js";
import { TransactionController } from "../controller/transactionController.js";

const router = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService, userRepository);
router.post(
  "/register",
  userValidationChain,
  handleValidationErrors,
  authController.registerAdmin
);

const accountRepository = new AccountRepository();
const accountController = new AccountController(accountRepository);
router.post(
  "/accounts",
  accountValidationChain,
  handleValidationErrors,
  accountController.createAccount
);
router.delete("/accounts/:id", accountController.deleteAccountById);

const userController = new UserController(userRepository);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post(
  "/users",
  userValidationChain,
  handleValidationErrors,
  userController.createUser
);
router.delete("/users/:id", userController.deleteUserById);

const transactionRepository = new TransactionRepository();
const transactionController = new TransactionController(transactionRepository);
router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/:id", transactionController.getTransactionById);

export default router;
