import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = { id: decoded.id }; // Extend Request type with `user` in express.d.ts
    next(); // Ensure the request passes to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export default authenticateJWT;
