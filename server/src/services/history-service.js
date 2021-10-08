import serviceErrors from './service-errors.js';

/** Logs in the history that the given book is borrowed by the given user. */
const logHistoryBorrowing = (historyData) => {
  return async (userId, bookId) =>
    await historyData.logBorrowing(userId, bookId);
};

/** Logs in the history that the given book is returned by the given user. */
const logHistoryReturning = (historyData) => {
  return async (userId, bookId) =>
    await historyData.logReturning(userId, bookId);
};

/** Gets all the history for the given user. */
const getHistoryByUserId = (historyData) => {
  return async (userId) => {
    const history = await historyData.getByUserId(userId);

    if (!history[0]) {
      return {
        history: null,
        historyError: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    return {
      history: history,
      historyError: null,
    };
  };
};
export default {
  logHistoryBorrowing,
  logHistoryReturning,
  getHistoryByUserId,
};
