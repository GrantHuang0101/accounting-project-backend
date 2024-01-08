import { JwtConfig } from "../jwt.config.js";
import { HttpError } from "../utils/errors/httpError.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  registerGeneral = async (userInfo) => {
    const { username, password, email } = userInfo;
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser(
      username,
      hashPassword,
      email,
      "user"
    );
  };

  registerAdmin = async (userInfo) => {
    const { username, password, email } = userInfo;
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser(
      username,
      hashPassword,
      email,
      "admin"
    );
  };

  login = async (userInfo) => {
    const { username, password } = userInfo;
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new HttpError(404, "Incorrect username or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(404, "Incorrect username or password");
    }
    return user;
  };

  generateToken = (user) => {
    const { userId, username } = user;
    const payload = {
      userId: userId,
      username: username,
    };

    return jwt.sign(payload, String(JwtConfig["secretKey"]), {
      algorithm: "HS256",
      audience: JwtConfig["audience"],
      issuer: JwtConfig["issuer"],
    });
  };

  verifyToken = (token) => {
    return jwt.verify(token, String(JwtConfig["secretKey"]), {
      algorithms: "HS256",
      audience: JwtConfig["audience"],
      issuer: JwtConfig["issuer"],
    });
  };
}
