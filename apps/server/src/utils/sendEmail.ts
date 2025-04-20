import axios from 'axios';
import config from '@/config/config';
import logger from './logger';
import { EmailData } from '@/interface/middleware';

/**
 * EmailService class provides methods to send emails using an external email service.
 * It uses Axios to make HTTP requests to the email service API.
 */
class EmailService {
  static async send(emailData: EmailData): Promise<any> {
    try {
      const response = await axios.post(config.EMAIL_API_URL, emailData, {
        headers: {
          Authorization: `${config.EMAIL_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      logger.error(`Error sending email: ${JSON.stringify(error)}`);
    }
  }
}

export default EmailService;
