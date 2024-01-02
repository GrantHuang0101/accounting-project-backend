import { body } from "express-validator";

export const accountValidationChain = [
  body("accountName")
    .exists()
    .isString()
    .withMessage("AccountName is required and must be a string"),
];
