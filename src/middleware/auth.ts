import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Access token is missing');
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET || '', (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

export default authToken;
