import {
  isEmail, trim, isNumeric, isEmpty,
} from 'validator';
import UserQueries from '../../database/queries/user';

class ValidateUser {
  /**
   * static method to validate user email
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateEmail(request, response, next) {
    const { email } = request.body;
    if (!isEmail(email)) {
      request.errors.email = {
        message: 'Email is invalid',
        statusCode: 400,
      };

      return next();
    }

    try {
      const where = 'where email = $1';
      const values = [email];
      const dbResponse = await UserQueries.GetUsers(where, values);
      if (dbResponse.rows.length) {
        request.errors.email = {
          message: 'Email already exists',
          statusCode: 409,
        };
      }
    } catch (error) {
      console.log('error: ', error);
    }

    return next();
  }

  /**
   * static method to validate user password
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validatePassword(request, response, next) {
    const { password } = request.body;
    if (trim(password).length <= 5) {
      request.errors.password = {
        message: 'Password must be above 5 characters',
        statusCode: 400,
      };
    }

    return next();
  }

  /**
   * static method to validate user phone number
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validatePhoneNumber(request, response, next) {
    const { phoneNumber } = request.body;
    if (!(trim(phoneNumber).length === 11)) {
      request.errors.phoneNumber = {
        message: 'Phone number must be 11 digits',
        statusCode: 400,
      };

      return next();
    }

    if (!isNumeric(phoneNumber, { no_symbols: true })) {
      request.errors.phoneNumber = {
        message: 'Phone number can only consist of numbers',
        statusCode: 400,
      };

      return next();
    }

    try {
      const where = 'where phone_number = $1';
      const values = [phoneNumber];
      const dbResponse = await UserQueries.GetUsers(where, values);
      if (dbResponse.rows.length) {
        request.errors.phoneNumber = {
          message: 'Phone number already exists',
          statusCode: 409,
        };
      }
    } catch (error) {
      console.log('error: ', error);
    }

    return next();
  }

  /**
   * static method to validate username
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateUsername(request, response, next) {
    const { username } = request.body;
    if (isEmpty(username, { ignore_whitespace: true })) {
      request.errors.username = {
        message: 'Username is required',
        statusCode: 400,
      };

      return next();
    }

    try {
      const where = 'where username = $1';
      const values = [username];
      const dbResponse = await UserQueries.GetUsers(where, values);
      if (dbResponse.rows.length) {
        request.errors.username = {
          message: 'Username already exists',
          statusCode: 409,
        };
      }
    } catch (error) {
      console.log('error: ', error);
    }

    return next();
  }
}

export default ValidateUser;
