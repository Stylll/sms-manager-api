import {
  isEmpty,
} from 'validator';
import UserQueries from '../../database/queries/user';

class ValidateSMS {
  /**
   * static method to validate username
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validatePhoneNumber(request, response, next) {
    const { phoneNumber } = request.params;
    try {
      const where = 'where phone_number = $1';
      const values = [phoneNumber];
      const dbResponse = await UserQueries.GetUsers(where, values);
      if (dbResponse.rows.length === 0) {
        request.errors.phoneNumber = {
          message: `No user was found with this phone number: ${phoneNumber}`,
          statusCode: 400,
        };

        return next();
      }
      const user = dbResponse.rows[0];
      request.receiverId = user.user_id;
    } catch (error) {
      console.log('error: ', error);
    }
    return next();
  }

  /**
   * static method to validate message
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateMessage(request, response, next) {
    const { message } = request.body;
    if (!message) {
      request.errors.message = {
        message: 'Message is required',
        statusCode: 400,
      };
      return next();
    }

    if (isEmpty(message, { ignore_whitespace: true })) {
      request.errors.message = {
        message: 'Message is required',
        statusCode: 400,
      };

      return next();
    }

    return next();
  }
}

export default ValidateSMS;
