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
      const transaction = await this.transactionRepository.getTransactionById(
        id
      );

      if (!transaction) {
        next(new HttpError(404, `Transaction with ID ${id} not found.`));
      }

      return res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  };

  getAllTransactionsByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const transactions =
        await this.transactionRepository.getAllTransactionsByUserId(userId);
      return res.status(200).send(transactions);
    } catch (error) {
      next(error);
    }
  };

  createTransaction = async (req, res, next) => {
    try {
      const { UserID, AccountID, Amount, TransactionDate, Description } =
        req.body;
      const newTransaction = await this.transactionRepository.createTransaction(
        UserID,
        AccountID,
        Amount,
        TransactionDate,
        Description
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
      const deleted = await this.transactionRepository.getTransactionById(id);

      if (!deleted) {
        next(new HttpError(404, `Transaction with ID ${id} not found.`));
      }

      await this.transactionRepository.deleteTransactionById(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
