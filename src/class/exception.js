class AuthError extends Error {
  /**
   * Constructor
   */
  constructor() {
    super('Unauthorized');
    this.status = 401;
  }
}

class ForbiddenError extends Error {
  /**
   * Constructor
   * @param {string} detail the detail of the forbidden reason.
   */
  constructor(detail = 'some unknown reason') {
    super(`Your request was forbidden, cause ${detail}`);
    this.status = 403;
  }
}

class InputError extends Error {
  /**
   * Constructor
   * @param {string} field the error field in request parameters.
   */
  constructor(field) {
    super(`The parameter '${field}' was incorrect, please check it!`);
    this.field = field;
    this.status = 400;
  }
}

class NotFoundError extends Error {
  /**
   * Constructor
   * @param {string} resource the resource name.
   */
  constructor(resource = 'resource') {
    super(`The '${resource}' you wanted coudn't be found`);
    this.status = 404;
  }
}

export default { AuthError, ForbiddenError, InputError, NotFoundError };
