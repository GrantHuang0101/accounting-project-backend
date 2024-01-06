import express from "express";
import { TransactionController } from "../controller/transactionController.js";
import { TransactionRepository } from "../repository/transactionRepository.js";
import { transactionValidationChain } from "../middleware/transactionValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";

const router = express.Router();

const transactionRepository = new TransactionRepository();
const transactionController = new TransactionController(transactionRepository);

router.get("/user", transactionController.getAllTransactionsByUserId);

router.post(
  "/",
  transactionValidationChain,
  handleValidationErrors,
  transactionController.createTransaction
);

router.delete("/:id", transactionController.deleteTransactionById);

router.put(
  "/:id",
  transactionValidationChain,
  handleValidationErrors,
  transactionController.updateTransactionById
);

export default router;
