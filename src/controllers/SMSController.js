import SMSQueries from '../database/queries/sms';

export default class SMSController {
  /**
   * static method to create sms
   * @param {object} request
   * @param {object} response
   * @returns {object} sms object or error message
   */
  static async sendSMS(request, response) {
    const { message } = request.body;
    const { id } = request.decoded.user;
    try {
      const dbResponse = await SMSQueries.createSMS([id, request.receiverId, message]);
      if (dbResponse.rows.length) {
        const dbSms = dbResponse.rows[0];
        const newSms = {
          id: dbSms.user_id,
          sender_id: dbSms.sender_id,
          receiver_id: dbSms.receiver_id,
          message: dbSms.message,
          status: 'SENT',
          createdAt: dbSms.createdAt,
        };

        return response.status(201)
          .json({ sms: newSms, message: 'Sms sent successfully' });
      }
      return response.status(500).json({
        message: 'An error occured while sending the sms',
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  /**
   * static method to get sms list
   * @param {object} request
   * @param {object} response
   * @returns {object} sms object or error message
   */
  static async getSMS(request, response) {
    const { id } = request.decoded.user;
    try {
      const dbResponse = await SMSQueries.getUserSMS([id]);
      const smsList = [...dbResponse.rows];

      return response.status(200)
        .json({ smsList, message: 'Sms list retrieved successfully' });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}
