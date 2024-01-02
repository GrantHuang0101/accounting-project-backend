import { body } from "express-validator";

export const transactionValidationChain = [
  body("userId")
    .exists()
    .isInt()
    .withMessage("UserID is required and must be an integer"),

  body("accountId")
    .exists()
    .isInt()
    .withMessage("AccountID is required and must be an integer"),

  body("amount")
    .exists()
    // Decimal(15,2)
    .isDecimal({
      decimal_digits: "1,2",
      force_decimal: false,
      max_digits: "15",
    })
    .withMessage("Amount is required and must be a decimal"),

  body("transactionDate")
    .exists()
    .isISO8601()
    // be aware of the data type
    .withMessage("TransactionDate is required and must be a valid date"),

  // optional
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];
