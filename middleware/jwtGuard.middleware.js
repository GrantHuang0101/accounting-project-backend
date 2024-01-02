import { HttpError } from "../utils/errors/httpError.js";

export const jwtGuardMiddleware = (authService) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new HttpError(401, "Unauthorized"));
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      next(new HttpError(401, "Unauthorized"));
      return;
    }

    try {
      const payload = authService.verifyToken(token);
      res.locals.user = payload;
      next();
    } catch (error) {
      next(new HttpError(401, "Unauthorized"));
    }
  };
};
