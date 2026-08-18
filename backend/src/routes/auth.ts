import { Router } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

router.post('/login', (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  (req.session as any).isAuthenticated = true;
  (req.session as any).user = { username: 'admin', role: 'admin' };
  return res.json({ ok: true, user: { username: 'admin', role: 'admin' } });
});

router.post('/logout', (req, res) => {
  req.session?.destroy(() => {});
  return res.json({ ok: true });
});

router.get('/me', (req: AuthenticatedRequest, res) => {
  const isAuthenticated = (req.session as any)?.isAuthenticated === true;
  if (!isAuthenticated) return res.status(401).json({ error: 'Unauthenticated' });
  const user = (req.session as any)?.user;
  return res.json({ user });
});

export default router;


