import { HttpError } from "../utils/errors/httpError.js";

export class TransactionService {
  classifyEditTransactions = async (patchData) => {
    const { patch, deleted } = patchData;
    const update = [];
    const create = [];

    const NEW_ENTRY = -1;
    for (const entry of patch) {
      if (entry.transactionId === NEW_ENTRY) {
        create.push(entry);
      } else {
        update.push(entry);
      }
    }

    return {
      update: update,
      create: create,
      deleted: deleted,
    };
  };
}
