import bcrypt from 'bcrypt';
import UserQueries from '../database/queries/user';
import Authenticator from '../utils/Authenticator';

export default class UserController {
  /**
   * static method to create user
   * @param {object} request
   * @param {object} response
   * @returns {object} user object or error message
   */
  static async createUser(request, response) {
    const {
      email, password, username, phoneNumber,
    } = request.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
      const dbResponse = await UserQueries.CreateUser([email, username, hashPassword, phoneNumber]);
      if (dbResponse.rows.length) {
        const dbUser = dbResponse.rows[0];
        const newUser = {
          id: dbUser.user_id,
          email: dbUser.email,
          username: dbUser.username,
          phoneNumber: dbUser.phone_number,
          createdAt: dbUser.createdAt,
        };

        const token = Authenticator.authenticateUser(newUser);

        return response.status(201)
          .json({ user: newUser, token, message: 'User created successfully' });
      }
      return response.status(500).json({
        message: 'An error occured while creating the user',
      });
    } catch (error) {
      return response.status(500).json({
        message: 'An error occured while creating the user',
      });
    }
  }

  /**
   * static method to generate access token for users
   * @param {object} request
   * @param {object} response
   * @returns {object} user object or error message
   */
  static async signin(request, response) {
    const { email, password } = request.body;
    try {
      const where = 'WHERE email = $1';
      const values = [email];
      const dbResponse = await UserQueries.GetUsers(where, values);
      if (dbResponse.rows.length) {
        const dbUser = dbResponse.rows[0];
        const user = {
          id: dbUser.user_id,
          email: dbUser.email,
          username: dbUser.username,
          phoneNumber: dbUser.phone_number,
        };
        if (bcrypt.compareSync(password, dbUser.password)) {
          const token = Authenticator.authenticateUser(user);

          return response.status(200)
            .json({ user, token, message: 'Login successful' });
        }
      }

      return response.status(401).json({ message: 'Email or Password is incorrect' });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * static method to delete user
   * @param {object} request
   * @param {object} response
   * @returns {object} user object or error message
   */
  static async deleteUser(request, response) {
    const { id } = request.decoded.user;
    try {
      await UserQueries.DeleteUser([id]);
      return response.status(200).json({ message: 'Contact has been deleted along with all sms references' });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}
