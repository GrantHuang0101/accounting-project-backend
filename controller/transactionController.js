import { HttpError } from "../utils/errors/httpError.js";

export class TransactionController {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  getAllTransactions = async (req, res, next) => {
    // generally not using it
    try {
      const transactions =
        await this.transactionRepository.getAllTransactions();
      return res.status(200).send(transactions);
    } catch (error) {
      next(error);
    }
  };

  getTransactionById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const transactionRow =
        await this.transactionRepository.getTransactionById(id);
      const transaction = transactionRow[0];

      if (!transaction) {
        next(new HttpError(404, `Transaction with ID ${id} not found.`));
      }

      if (transaction.userId !== res.locals.user.userId) {
        next(new HttpError(403, "Forbidden: You do not own this transaction."));
        return;
      }

      return res.status(200).send(transactionRow);
    } catch (error) {
      next(error);
    }
  };

  getAllTransactionsByUserId = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId; // get from the payload
      const transactions =
        await this.transactionRepository.getAllTransactionsByUserId(userId);
      return res.status(200).send(transactions);
    } catch (error) {
      next(error);
    }
  };

  createTransaction = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId;
      const { accountId, amount, transactionDate, description, dc, entryId } =
        req.body;
      const newTransaction = await this.transactionRepository.createTransaction(
        userId,
        accountId,
        amount,
        transactionDate,
        description,
        dc,
        entryId
      );

      return res.status(201).send(newTransaction);
    } catch (error) {
      next(error);
    }
  };

  updateTransactionById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      const transaction = await this.transactionRepository.getTransactionById(
        id
      );

      if (!transaction) {
        next(new HttpError(404, `Transaction with ID ${id} not found.`));
        return;
      }

      if (transaction.userId !== res.locals.user.userId) {
        next(new HttpError(403, "Forbidden: You do not own this transaction."));
        return;
      }

      const updatedTransaction =
        await this.transactionRepository.updateTransactionById(id, updates);

      return res.status(200).send(updatedTransaction);
    } catch (error) {
      next(error);
    }
  };

  deleteTransactionById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const transactionRow =
        await this.transactionRepository.getTransactionById(id);
      const deleted = transactionRow[0];

      if (!deleted) {
        next(new HttpError(404, `Transaction with ID ${id} not found.`));
        return;
      }

      if (deleted.userId !== res.locals.user.userId) {
        next(new HttpError(403, "Forbidden: You do not own this transaction."));
        return;
      }

      await this.transactionRepository.deleteTransactionById(id);
      return res.status(204).send(`Transaction with ID ${id} deleted.`);
    } catch (error) {
      next(error);
    }
  };
}
