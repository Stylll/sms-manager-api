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

  /**
   * static method to get sms in the database
   * @param {array} values
   * @returns {object} query response
   */
  static async getUserSMS(values) {
    const query = `select id, sender_id, sender.username sender_username,
    receiver_id, receiver.username receiver_username, message, 
    case when sender_id = $1 then 'SENT' else 'RECEIVED' END AS status,
    sms.created_at
    from sms
    inner join users AS sender ON sender.user_id = sms.sender_id
    inner join users AS receiver ON receiver.user_id = sms.receiver_id
    where sms.sender_id = $1 or sms.receiver_id = $1`;
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }
}
