import Client from '../connect';

export default class SMSQueries {
  /**
   * static method to create sms in the database
   * @param {array} values
   * @returns {object} query response
   */
  static async createSMS(values) {
    const query = 'INSERT INTO sms (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }
}
