import { HttpError } from "../utils/errors/httpError.js";

export const adminGuardMiddleware = (req, res, next) => {
  const user = res.locals.user;

  if (!user || user.role !== "admin") {
    next(new HttpError(403, "Forbidden: Admin access required"));
    return;
  }

  next();
};
