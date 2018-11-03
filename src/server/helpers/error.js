import httpStatus from 'http-status';

class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    // THis is required since bluebird 4 doesn't append it anymore
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
    code
  ) {
    super(message, status, isPublic, code);
    this.name = 'APIError';
  }
}

/**
 * Unregistered user error
 * @extends ExtendableError
 */
class NotRegisteredError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor(
    message = 'Username does not exist, please register one',
    status = httpStatus.NOT_FOUND,
    isPublic = true,
    code = 401
  ) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

/**
 * Wrong password error.
 * @extends ExtendableError
 */

class WrongPasswordError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor(
    message = 'Wrong password entered',
    status = httpStatus.NOT_FOUND,
    isPublic = true,
    code = 401
  ) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

export default {
  APIError,
  NotRegisteredError,
  WrongPasswordError
};
