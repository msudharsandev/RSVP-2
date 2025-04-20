import config from '@/config/config';
import { errorHandler, successHandler } from '@/config/morgan';
import { router } from '@/routes/v1/routes';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { json, NextFunction, urlencoded, type Express } from 'express';
import logger from '@/utils/logger';
import { apiLimiter } from '@/utils/rateLimiter';

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
      if (config.NODE_ENV === 'development') {
        logger.info(err.stack);
      }
      return res
        .status(500)
        .json({ message: `We are experiencing high traffic, please try again later` });
    });

  return app;
};
