import { HttpError } from "../utils/errors/httpError.js";

export class TransactionController {
  constructor(transactionRepository, transactionService) {
    this.transactionRepository = transactionRepository;
    this.transactionService = transactionService;
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

  /////////

  editTransactions = async (req, res, next) => {
    const userId = res.locals.user.userId;
    try {
      const patchData = req.body;
      const { update, create, deleted } =
        await this.transactionService.classifyEditTransactions(patchData);

      //update check
      await update.map(async (entry) => {
        const transaction = await this.transactionRepository.getTransactionById(
          entry.transactionId
        );

        if (!transaction) {
          throw new HttpError(
            404,
            `Transaction with ID ${entry.transactionId} not found.`
          );
        }
        if (transaction[0].userId !== userId) {
          throw new HttpError(
            403,
            "Forbidden: You do not own these transactions."
          );
        }
      });

      //delete check
      for (const id of deleted) {
        const transactionRow =
          await this.transactionRepository.getTransactionById(id);

        if (!transactionRow[0]) {
          return next(
            new HttpError(404, `Transaction with ID ${id} not found.`)
          );
        }

        if (transactionRow[0].userId !== userId) {
          return next(
            new HttpError(403, "Forbidden: You do not own these transactions.")
          );
        }
      }

      await this.transactionRepository.editTransactions(
        userId,
        create,
        update,
        deleted
      );

      return res.status(200).send("Edit successfully");
    } catch (error) {
      next(error);
    }
  };

  //////////

  createTransactions = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId;
      const transactionsData = req.body;

      const result = await this.transactionRepository.createTransactions(
        userId,
        transactionsData
      );

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  deleteTransactionsByIds = async (req, res, next) => {
    try {
      const { transactionIds } = req.body;

      if (!Array.isArray(transactionIds)) {
        return next(
          new HttpError(400, "Invalid input: transactionIds must be an array.")
        );
      }

      for (const id of transactionIds) {
        const transactionRow =
          await this.transactionRepository.getTransactionById(id);

        if (!transactionRow[0]) {
          return next(
            new HttpError(404, `Transaction with ID ${id} not found.`)
          );
        }

        if (transactionRow[0].userId !== res.locals.user.userId) {
          return next(
            new HttpError(403, "Forbidden: You do not own these transactions.")
          );
        }
      }

      await this.transactionRepository.deleteTransactions(transactionIds);

      return res.status(204).send("Transactions deleted successfully.");
    } catch (error) {
      next(error);
    }
  };
}
