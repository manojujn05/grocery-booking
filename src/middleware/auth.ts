import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  // Get the JWT token from the request headers
  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ error: 'Access token is missing' });
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

export default authenticateToken;
