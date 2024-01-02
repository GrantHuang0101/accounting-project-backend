import express from "express";
import { TransactionController } from "../controller/transactionController.js";
import { TransactionRepository } from "../repository/transactionRepository.js";
import { transactionValidationChain } from "../middleware/transactionValidationChain.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware.js";
import { UserRepository } from "../repository/userRepository.js";
import { AuthService } from "../service/authService.js";

const router = express.Router();

const transactionRepository = new TransactionRepository();
const transactionController = new TransactionController(transactionRepository);

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

router.use(jwtGuardMiddleware(authService));

router.get("/:userId", transactionController.getAllTransactionsByUserId);

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

//admin

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);

export default router;
