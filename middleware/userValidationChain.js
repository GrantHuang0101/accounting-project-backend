import { body } from "express-validator";

export const userValidationChain = [
  body("username")
    .exists()
    .isString()
    .withMessage("Username is required and must be a string"),

  body("password")
    .exists()
    .isString()
    .withMessage("Password is required and must be a string"),

  body("email")
    .exists()
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),
];
