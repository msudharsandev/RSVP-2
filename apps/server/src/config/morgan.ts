import morgan, { StreamOptions } from 'morgan';
import { Request, Response, RequestHandler } from 'express';

import config from '@/config/config';
import logger from '@/utils/logger';

morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage || '');

const getIpFormat = (): string => (config.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

/**
 * Morgan middleware for logging successful HTTP requests.
 * Logs requests with status codes less than 400.
 */
const successHandler: RequestHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: <StreamOptions>{
    write: (message: string) => logger.info(message.trim()),
  },
});

/**
 * Morgan middleware for logging error HTTP requests.
 * Logs requests with status codes 400 and above.
 */
const errorHandler: RequestHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: <StreamOptions>{
    write: (message: string) => logger.error(message.trim()),
  },
});

export { successHandler, errorHandler };
