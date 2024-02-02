CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE accounts (
    accountId INT PRIMARY KEY AUTO_INCREMENT,
    accountName VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE transactions (
    transactionId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    accountId INT,
    amount DECIMAL(15, 2) NOT NULL,
    transactionDate DATE NOT NULL,
    description TEXT,
    dc CHAR(6) NOT NULL,
    entryId VARCHAR(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (accountId) REFERENCES accounts(accountId)

);