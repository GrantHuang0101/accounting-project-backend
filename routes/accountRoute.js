import express from "express";
import { AccountRepository } from "../repository/accountRepository.js";
import { AccountController } from "../controller/accountController.js";

const router = express.Router();

const accountRepository = new AccountRepository();
const accountController = new AccountController(accountRepository);

router.get("/", accountController.getAllAccounts);

router.get("/:id", accountController.getAccountById);

export default router;
