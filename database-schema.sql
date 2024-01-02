CREATE DATABASE project_one;
USE project_one;

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE accounts (
    accountID INT PRIMARY KEY AUTO_INCREMENT,
    accountName VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    transactionID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    accountID INT,
    amount DECIMAL(15, 2) NOT NULL,
    transactionDate DATE NOT NULL,
    description TEXT,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (accountId) REFERENCES accounts(accountId)
);