import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//Check Connection
const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

export { pool, checkDatabaseConnection };
