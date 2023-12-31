import { HttpError } from "../utils/errors/httpError.js";

export class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userRepository.getAllUsers();
      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        next(new HttpError(404, `User with ID ${id} not found.`));
      }

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { Username, Password, Email, Role } = req.body;
      const newUser = await this.userRepository.createUser(
        Username,
        Password,
        Email,
        Role
      );

      return res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await this.userRepository.getUserById(id);

      if (!deleted) {
        next(new HttpError(404, `User with ID ${id} not found.`));
      }

      await this.userRepository.deleteUserById(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
