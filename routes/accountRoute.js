import express from "express";
import { AccountRepository } from "../repository/accountRepository.js";
import { AccountController } from "../controller/accountController.js";
import { accountValidationChain } from "../middleware/accountValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { jwtGuardMiddleware } from "../middleware/jwtGuard.middleware.js";
import { AuthService } from "../service/authService.js";
import { UserRepository } from "../repository/userRepository.js";

const router = express.Router();

const accountRepository = new AccountRepository();
const accountController = new AccountController(accountRepository);

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

router.use(jwtGuardMiddleware(authService));
//admin

router.get("/", accountController.getAllAccounts);

router.get("/:id", accountController.getAccountById);

router.post(
  "/",
  accountValidationChain,
  handleValidationErrors,
  accountController.createAccount
);

router.delete("/:id", accountController.deleteAccountById);

export default router;
