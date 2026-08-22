import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export interface AuthenticatedRequest extends Request {
    user?: { userId: string, email: string}
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({ success: false, error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
            userId: string,
            email: string
        }

        req.user = decoded

        next()


    } catch(error) {
        return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
}