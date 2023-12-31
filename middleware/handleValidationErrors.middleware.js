import { validationResult } from "express-validator";
import { HttpError } from "../utils/errors/httpError.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new HttpError(422, `Invalid input`, errors.array()));
  }

  next();
};
