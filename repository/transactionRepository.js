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

  // Create
  createTransactions = async (userId, transactionsData) => {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const values = this.mappingForCreate(transactionsData, userId);

      const [result] = await connection.query(
        `
      INSERT INTO transactions (userId, accountId, amount, transactionDate, description, dc, entryId)
      VALUES ?
      `,
        [values]
      );

      await connection.commit();

      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

  // Delete
  deleteTransactions = async (transactionIds) => {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const result = await connection.query(
        `
            DELETE FROM transactions
            WHERE transactionId IN (?)
            `,
        [transactionIds]
      );

      await connection.commit();

      console.log(
        `Transactions with IDs ${transactionIds.join(", ")} have been deleted.`
      );
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

  // Edit
  editTransactions = async (userId, creates, updates, deleted) => {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      if (creates.length !== 0) {
        // Create
        const createValues = this.mappingForCreate(creates, userId);

        await connection.query(
          `
      INSERT INTO transactions (userId, accountId, amount, transactionDate, description, dc, entryId)
      VALUES ?;
      `,
          [createValues]
        );
      }

      if (updates.length !== 0) {
        // Update
        const updateValues = this.mappingForUpdate(updates);

        for (const values of updateValues) {
          await connection.query(
            `
            UPDATE transactions
            SET
                accountId = ?,
                amount = ?,
                transactionDate = ?,
                description = ?,
                dc = ?
            WHERE transactionId = ?;
            `,
            values
          );
        }
      }

      if (deleted.length !== 0) {
        // Delete
        await connection.query(
          `
            DELETE FROM transactions
            WHERE transactionId IN (?);
            `,
          [deleted]
        );
      }

      await connection.commit();

      return;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

  //// mapping methods
  mappingForCreate = (createTransactionsData, userId) => {
    const result = createTransactionsData.map((transaction) => [
      userId,
      transaction.accountId,
      transaction.amount,
      transaction.transactionDate,
      transaction.description,
      transaction.dc,
      transaction.entryId,
    ]);
    return result;
  };

  mappingForUpdate = (updateTransactionsData) => {
    const result = updateTransactionsData.map((update) => [
      update.accountId,
      parseFloat(update.amount),
      update.transactionDate,
      update.description,
      update.dc,
      update.transactionId,
    ]);
    return result;
  };
}
