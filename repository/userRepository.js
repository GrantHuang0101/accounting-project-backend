import { pool } from "../database.js";

export class UserRepository {
  getAllUsers = async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  };

  getUserById = async (userId) => {
    const [rows] = await pool.query(
      `SELECT * 
    FROM users
    WHERE userId = ?
    `,
      [userId]
    );
    return rows[0];
  };

  // for authService
  getUserByUsername = async (username) => {
    const [rows] = await pool.query(
      `SELECT * 
      FROM users
      WHERE username = ?
      `,
      [username]
    );
    return rows[0];
  };

  deleteUserById = async (userId) => {
    await pool.query(
      `
    DELETE FROM users
    WHERE userId = ?
    `,
      [userId]
    );
    console.log(`User with ID ${userId} has been deleted.`);
    return null;
  };

  createUser = async (username, password, email, role) => {
    const [result] = await pool.query(
      `
    INSERT INTO users (username, password, email, role)
    VALUES (?, ?, ?, ?)
    `,
      [username, password, email, role]
    );
    const userId = result.insertId;
    return this.getUserById(userId);
  };
}
