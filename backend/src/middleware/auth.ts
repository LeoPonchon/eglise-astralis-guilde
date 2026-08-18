import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { username: string; role: string };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const isAuthenticated = (req.session as any)?.isAuthenticated === true;
  if (!isAuthenticated) return res.status(401).json({ error: 'Unauthenticated' });
  req.user = (req.session as any)?.user;
  return next();
}


