import Client from '../connect';

export default class UserQueries {
  /**
   * static method to get users from the database
   * @param {stirng} where
   * @param {array} values
   * @returns {object} query response
   */
  static async GetUsers(where, values) {
    let query = 'SELECT * FROM users ';
    if (where) query += where;
    query += ';';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }

  /**
   * static method to create users in the database
   * @param {array} values
   * @returns {object} query response
   */
  static async CreateUser(values) {
    const query = 'INSERT INTO users (email, username, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }
}
