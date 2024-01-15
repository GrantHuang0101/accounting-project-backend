import express from "express";
import { TransactionController } from "../controller/transactionController.js";
import { TransactionRepository } from "../repository/transactionRepository.js";
import { transactionValidationChain } from "../middleware/transactionValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { TransactionService } from "../service/transactionService.js";

const router = express.Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService();
const transactionController = new TransactionController(
  transactionRepository,
  transactionService
);

router.get("/user", transactionController.getAllTransactionsByUserId);

router.get("/:id", transactionController.getTransactionById);

router.post("/", transactionController.createTransactions);

router.delete("/", transactionController.deleteTransactionsByIds);

router.patch("/", transactionController.editTransactions);

export default router;
