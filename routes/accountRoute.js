import express from "express";
import { AccountRepository } from "../repository/accountRepository.js";
import { AccountController } from "../controller/accountController.js";
import { accountValidationChain } from "../middleware/accountValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { adminGuardMiddleware } from "../middleware/adminGuard.middleware.js";

const router = express.Router();

const accountRepository = new AccountRepository();
const accountController = new AccountController(accountRepository);

router.use(adminGuardMiddleware);

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
