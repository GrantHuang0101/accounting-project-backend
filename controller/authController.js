import { HttpError } from "../utils/errors/httpError.js";

export class AuthController {
  constructor(authService, userRepository) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  registerGeneral = async (req, res, next) => {
    try {
      const userInfo = req.body;

      if (await this.userRepository.getUserByUsername(userInfo.username)) {
        return next(new HttpError(409, "User already exists"));
      }

      const user = await this.authService.registerGeneral(userInfo);
      const token = this.authService.generateToken(user);

      const { userId, username, email, role } = user;
      res
        .status(201)
        .json({ user: { userId, username, email, role }, token: token });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const userInfo = req.body;
      const user = await this.authService.login(userInfo);
      const token = this.authService.generateToken(user);

      const { userId, username, email, role } = user;
      res
        .status(200)
        .json({ user: { userId, username, email, role }, token: token });
    } catch (error) {
      next(error);
    }
  };
}
