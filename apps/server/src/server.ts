import config from '@/config/config';
import { errorHandler, successHandler } from '@/config/morgan';
import { router } from '@/routes/v1/routes';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { json, NextFunction, urlencoded, type Express } from 'express';
import logger from '@/utils/logger';
import { apiLimiter } from '@/utils/rateLimiter';
import { InternalError } from './utils/apiError';
import { ApiError } from './utils/apiError';

/**
 * Creates and configures the Express server.
 * @returns The configured Express application instance.
 */
export const createServer = (): Express => {
  const app = express();

  const corsOptions: CorsOptions = {
    origin: [config.CLIENT_URL],
    credentials: true,
  };

  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json({ limit: '1mb' }))
    .use(cors(corsOptions))
    .use(successHandler)
    .use(errorHandler)
    .use(cookieParser())
    .use(apiLimiter)
    .use('/v1', router)
    .use((req, res) => {
      return res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
    })
    .use((err: Error, _req: any, res: any, _next: NextFunction) => {
      if (err instanceof ApiError) {
        // req.error = err.message;
        ApiError.handle(err, res);
      } else {
        logger.error(err);
        const errorMessage = 'We are experiencing high traffic, please try again later';
        ApiError.handle(new InternalError(errorMessage), res);
      }
    });

  return app;
};
