import { pool } from "../database.js";

export class AccountRepository {
  getAllAccounts = async () => {
    const [rows] = await pool.query("SELECT * FROM accounts");
    return rows;
  };

  getAccountById = async (accountId) => {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM accounts
      WHERE accountId = ?
      `,
      [accountId]
    );
    return rows[0];
  };

  createAccount = async (accountName) => {
    const [result] = await pool.query(
      `
      INSERT INTO accounts (accountName)
      VALUES (?)
      `,
      [accountName]
    );
    const newAccountId = result.insertId;
    return this.getAccountById(newAccountId);
  };

  deleteAccountById = async (accountId) => {
    const [rows] = await pool.query(
      `
      DELETE FROM accounts
      WHERE accountId = ?
      `,
      [accountId]
    );
    console.log(`Account with ID ${accountId} has been deleted.`);
    return null;
  };
}
