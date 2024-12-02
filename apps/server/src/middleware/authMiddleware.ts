import config from '@/config/config';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

export interface AuthenticatedRequest<
  P = {},
  ResBody = {},
  ReqBody = { accessToken?: string; refreshToken?: string },
> extends Request<P, ResBody, ReqBody> {
  userId?: number;
}

/**
 * Checks for a refresh token in the request cookies or body, and verifies it.
 *
 * @param req - The authenticated request object containing cookies and body.
 * @returns The decoded token if verification is successful, otherwise false.
 */
const checkFromRefreshToken = (req: AuthenticatedRequest) => {
  const refreshToken = req.cookies.refreshToken || req.headers.refreshToken;
  if (!refreshToken) {
    return false;
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    return false;
  }

  return decoded;
};

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken || req.headers.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decodedToken = verifyAccessToken(token) || checkFromRefreshToken(req);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.userId = decodedToken.userId;

    // if token was expired, generate new token and set cookie
    if (!token) {
      const newToken = generateAccessToken({ userId: decodedToken.userId });
      res.cookie('accessToken', newToken, {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
        path: '/',
      });
    }

    next();
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware;
