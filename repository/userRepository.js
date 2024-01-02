import { pool } from "../database.js";

export class UserRepository {
  getAllUsers = async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  };

  getUserById = async (UserID) => {
    const [rows] = await pool.query(
      `SELECT * 
    FROM users
    WHERE UserID = ?
    `,
      [UserID]
    );
    return rows[0];
  };

  // for authService
  getUserByUsername = async (Username) => {
    const [rows] = await pool.query(
      `SELECT * 
      FROM users
      WHERE Username = ?
      `,
      [Username]
    );
    return rows[0];
  };

  deleteUserById = async (UserID) => {
    const [rows] = await pool.query(
      `
    DELETE FROM users
    WHERE UserID = ?
    `,
      [UserID]
    );
    console.log(`User with ID ${UserID} has been deleted.`);
    return null;
  };

  createUser = async (Username, Password, Email, Role) => {
    const [result] = await pool.query(
      `
    INSERT INTO users (Username, Password, Email, Role)
    VALUES (?, ?, ?, ?)
    `,
      [Username, Password, Email, Role]
    );
    const UserID = result.insertId;
    return this.getUserById(UserID);
  };
}
