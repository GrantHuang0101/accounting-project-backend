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
    SELECT 
        transactions.*,
        accounts.accountName,
        accounts.type
    FROM transactions
    JOIN accounts ON transactions.accountId = accounts.accountId
    WHERE transactions.userId = ?
    ORDER BY transactions.transactionDate DESC, transactions.dc DESC;
    `,
      [userId]
    );
    return rows;
  };

  getTransactionById = async (transactionId) => {
    const [transaction] = await pool.query(
      `
      SELECT *
      FROM transactions
      WHERE transactionId = ?
    `,
      [transactionId]
    );

    const entryId = transaction[0].entryId;
    const [rows] = await pool.query(
      `
      SELECT 
        transactions.*,
        accounts.accountName,
        accounts.type
      FROM transactions
      JOIN accounts ON transactions.accountId = accounts.accountId
      WHERE transactions.entryId = ?
    `,
      [entryId]
    );

    return rows;
  };

  createTransaction = async (
    userId,
    accountId,
    amount,
    transactionDate,
    description,
    dc,
    entryId
  ) => {
    const [result] = await pool.query(
      `
    INSERT INTO transactions (userId, accountId, amount, transactionDate, description, dc, entryId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [userId, accountId, amount, transactionDate, description, dc, entryId]
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
    const { accountId, amount, transactionDate, description, dc } = updates;
    await pool.query(
      `
    UPDATE transactions
    SET
      accountId = ?,
      amount = ?,
      transactionDate = ?,
      description = ?
      dc = ?
    WHERE transactionId = ?
    `,
      [accountId, amount, transactionDate, description, dc, transactionId]
    );

    const updatedTransaction = await this.getTransactionById(transactionId);
    return updatedTransaction;
  };
}
