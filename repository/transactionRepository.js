import { pool } from "../database.js";
import { HttpError } from "../utils/errors/httpError.js";

export class TransactionRepository {
  getAllTransactions = async () => {
    const [rows] = await pool.query("SELECT * FROM transactions");
    return rows;
  };

  getAllTransactionsByUserId = async (UserID) => {
    const [rows] = await pool.query(
      `
    SELECT * 
    FROM transactions
    WHERE UserID = ?
    `,
      [UserID]
    );
    return rows;
  };

  getTransactionById = async (TransactionId) => {
    const [rows] = await pool.query(
      `SELECT * 
    FROM transactions
    WHERE TransactionId = ?
    `,
      [TransactionId]
    );
    return rows[0];
  };

  createTransaction = async (
    UserID,
    AccountID,
    Amount,
    TransactionDate,
    Description
  ) => {
    const [result] = await pool.query(
      `
    INSERT INTO transactions (UserID, AccountID, Amount, TransactionDate, Description)
    VALUES (?, ?, ?, ?, ?)
    `,
      [UserID, AccountID, Amount, TransactionDate, Description]
    );
    const newTransactionId = result.insertId;
    return this.getTransactionById(newTransactionId);
  };

  deleteTransactionById = async (TransactionId) => {
    await pool.query(
      `
    DELETE FROM transactions
    WHERE TransactionId = ?
    `,
      [TransactionId]
    );

    console.log(`Transaction with ID ${TransactionId} has been deleted.`);
    return null;
  };

  updateTransactionById = async (TransactionId, updates) => {
    const { AccountID, Amount, TransactionDate, Description } = updates;
    const [result] = await pool.query(
      `
    UPDATE transactions
    SET
      AccountID = ?,
      Amount = ?,
      TransactionDate = ?,
      Description = ?
    WHERE TransactionId = ?
    `,
      [AccountID, Amount, TransactionDate, Description, TransactionId]
      //Only the original user can update the transaction
    );

    if (result.affectedRows === 0) {
      throw new HttpError(
        404,
        `Transaction with ID ${TransactionId} not found.`
      );
    }
    const updatedTransaction = await this.getTransactionById(TransactionId);
    return updatedTransaction;
  };
}
