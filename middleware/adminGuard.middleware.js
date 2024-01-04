import { UserRepository } from "../repository/userRepository.js";
import { HttpError } from "../utils/errors/httpError.js";

export const adminGuardMiddleware = async (req, res, next) => {
  const user = res.locals.user;

  const userRepository = new UserRepository();
  const userFromDb = await userRepository.getUserById(user.userId);
  if (userFromDb.role !== "admin") {
    next(new HttpError(403, "Forbidden: Admin access required"));
    return;
  }

  next();
};
