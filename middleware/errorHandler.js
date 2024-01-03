import { HttpError } from "../utils/errors/httpError.js";

export const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  console.log(error.stack);
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      error: error.body || [],
    });
  }

  return res
    .status(500)
    .send({ message: "Internal Server Error", error: error.message });
};
