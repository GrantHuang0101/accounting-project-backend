import { body } from "express-validator";

export const transactionValidationChain = [
  body("UserID")
    .exists()
    .isInt()
    .withMessage("UserID is required and must be an integer"),

  body("AccountID")
    .exists()
    .isInt()
    .withMessage("AccountID is required and must be an integer"),

  body("Amount")
    .exists()
    // Decimal(15,2)
    .isDecimal({
      decimal_digits: "1,2",
      force_decimal: false,
      max_digits: "15",
    })
    .withMessage("Amount is required and must be a decimal"),

  body("TransactionDate")
    .exists()
    .isISO8601()
    // be aware of the data type
    .withMessage("TransactionDate is required and must be a valid date"),

  // optional
  body("Description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];
