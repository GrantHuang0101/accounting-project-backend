import { pool } from "../database.js";

export class AccountRepository {
  getAllAccounts = async () => {
    const [rows] = await pool.query("SELECT * FROM accounts");
    return rows;
  };

  getAccountById = async (AccountID) => {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM accounts
      WHERE AccountID = ?
      `,
      [AccountID]
    );
    return rows[0];
  };

  createAccount = async (AccountName) => {
    const [result] = await pool.query(
      `
      INSERT INTO accounts (AccountName)
      VALUES (?)
      `,
      [AccountName]
    );
    const newAccountId = result.insertId;
    return this.getAccountById(newAccountId);
  };

  deleteAccountById = async (AccountID) => {
    const [rows] = await pool.query(
      `
      DELETE FROM accounts
      WHERE AccountID = ?
      `,
      [AccountID]
    );
    console.log(`Account with ID ${AccountID} has been deleted.`);
    return null;
  };
}
