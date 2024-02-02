import fs from "fs-extra";
import { pool } from "./database.js";

const checkIfAccountsExist = async () => {
  const connection = await pool.getConnection();
  try {
    const result = await connection.query(
      "SELECT COUNT(*) AS total FROM accounts"
    );
    return result[0][0].total;
  } catch (error) {
    console.error("Error checking if accounts exist:", error);
    return false;
  } finally {
    connection.release();
  }
};

const insertAccountsFromCsv = async () => {
  const accountsExist = await checkIfAccountsExist();

  if (accountsExist) {
    console.log("Accounts already exists. Skipping insertion.");
  } else {
    const csvData = fs.readFileSync("accounts.csv", "utf-8");
    const dataRows = csvData
      .trim()
      .split("\n")
      .map((row) => row.split(","));
    dataRows.shift();
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(
        `
        INSERT INTO accounts (accountName, type)
        VALUES ?
      `,
        [dataRows]
      );
      await connection.commit();
      console.log("Accounts insert successfully.");
    } catch (error) {
      await connection.rollback();
      console.log("Error inserting accounts: ", error);
    } finally {
      connection.release();
    }
  }
};

export { insertAccountsFromCsv };
