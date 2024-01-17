import { NEW_ENTRY_ID } from "../utils/errors/constants.js";

export class TransactionService {
  classifyEditTransactions = async (patchData) => {
    const { patch, deleted } = patchData;
    const update = [];
    const create = [];

    for (const entry of patch) {
      if (entry.transactionId === NEW_ENTRY_ID) {
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
