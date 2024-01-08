import { HttpError } from "../utils/errors/httpError.js";

export class AccountController {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  getAllAccounts = async (req, res, next) => {
    try {
      const accounts = await this.accountRepository.getAllAccounts();
      return res.status(200).send(accounts);
    } catch (error) {
      next(error);
    }
  };

  getAccountById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const account = await this.accountRepository.getAccountById(id);

      if (!account) {
        next(new HttpError(404, `Account with ID ${id} not found.`));
        return;
      }

      return res.status(200).send(account);
    } catch (error) {
      next(error);
    }
  };

  createAccount = async (req, res, next) => {
    try {
      const { accountName, type } = req.body;
      const newAccount = await this.accountRepository.createAccount(
        accountName
      );

      return res.status(201).send(newAccount);
    } catch (error) {
      next(error);
    }
  };

  deleteAccountById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await this.accountRepository.getAccountById(id);

      if (!deleted) {
        next(new HttpError(404, `Account with ID ${id} not found.`));
        return;
      }

      await this.accountRepository.deleteAccountById(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
