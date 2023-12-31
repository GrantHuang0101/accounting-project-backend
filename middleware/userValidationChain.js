import { body } from "express-validator";

export const userValidationChain = [
  body("Password")
    .exists()
    .isString()
    .withMessage("Password is required and must be a string"),

  body("Email")
    .exists()
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),

  body("Role")
    .exists()
    .isString()
    .withMessage("Role is required and must be a string"),
];
