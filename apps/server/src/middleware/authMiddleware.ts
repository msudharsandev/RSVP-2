import { verifyJwtToken } from "@/utils/jwt"; // Assuming you have a JWT utility
import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest<P = {}, ResBody = {}, ReqBody = {}>
  extends Request<P, ResBody, ReqBody> {
  userId?: number;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const decodedToken = verifyJwtToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error("Error verifying authentication token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
