import { body } from "express-validator";

export const userValidationChain = [
  body("Username")
    .exists()
    .isString()
    .withMessage("Username is required and must be a string"),

  body("Password")
    .exists()
    .isString()
    .withMessage("Password is required and must be a string"),

  body("Email")
    .exists()
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),
];
