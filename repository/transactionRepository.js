import { pool } from "../database.js";
import { HttpError } from "../utils/errors/httpError.js";

export class TransactionRepository {
  getAllTransactions = async () => {
    const [rows] = await pool.query("SELECT * FROM transactions");
    return rows;
  };

  getAllTransactionsByUserId = async (userId) => {
    const [rows] = await pool.query(
      `
    SELECT * 
    FROM transactions
    WHERE userId = ?
    `,
      [userId]
    );
    return rows;
  };

  getTransactionById = async (transactionId) => {
    const [rows] = await pool.query(
      `SELECT * 
    FROM transactions
    WHERE transactionId = ?
    `,
      [transactionId]
    );
    return rows[0];
  };

  createTransaction = async (
    userId,
    accountId,
    amount,
    transactionDate,
    description
  ) => {
    const [result] = await pool.query(
      `
    INSERT INTO transactions (userId, accountId, amount, transactionDate, description)
    VALUES (?, ?, ?, ?, ?)
    `,
      [userId, accountId, amount, transactionDate, description]
    );
    const newTransactionId = result.insertId;
    return this.getTransactionById(newTransactionId);
  };

  deleteTransactionById = async (transactionId) => {
    await pool.query(
      `
    DELETE FROM transactions
    WHERE transactionId = ?
    `,
      [transactionId]
    );

    console.log(`Transaction with ID ${transactionId} has been deleted.`);
    return null;
  };

  updateTransactionById = async (transactionId, updates) => {
    const { accountId, amount, transactionDate, description } = updates;
    await pool.query(
      `
    UPDATE transactions
    SET
      accountId = ?,
      amount = ?,
      transactionDate = ?,
      description = ?
    WHERE transactionId = ?
    `,
      [accountId, amount, transactionDate, description, transactionId]
    );

    const updatedTransaction = await this.getTransactionById(transactionId);
    return updatedTransaction;
  };
}
