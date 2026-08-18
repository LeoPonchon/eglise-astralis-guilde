import 'dotenv/config';
import express from 'express';
import cors from 'cors';
 
import session from 'express-session';
import authRouter from './routes/auth.js';
import eventsRouter from './routes/events.js';
import { initScheduler } from './lib/scheduler.js';

const app = express();

const port = Number(process.env.PORT || 4000);
const frontendOrigins = (process.env.FRONTEND_ORIGINS || 'http://localhost:8080')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

// Helper to allow configured origins and any subdomain of egliseastralis.com
function isAllowedOrigin(origin: string): boolean {
  if (frontendOrigins.includes(origin)) return true;
  try {
    const url = new URL(origin);
    const hostname = url.hostname.toLowerCase();
    // Allow apex and any subdomain of egliseastralis.com (prod)
    if (hostname === 'egliseastralis.com' || hostname.endsWith('.egliseastralis.com')) return true;
    // Common local dev hosts
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  } catch {
    // ignore invalid origin
  }
  return false;
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.use(express.json());

// Session simple en mémoire (ou redis en prod)
const cookieSecure = String(process.env.COOKIE_SECURE ?? (process.env.NODE_ENV === 'production' ? 'true' : 'false')) === 'true';
const cookieSameSite: 'lax' | 'strict' | 'none' = cookieSecure ? 'none' as const : 'lax';

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: cookieSecure,
      sameSite: cookieSameSite,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    },
  })
);

 

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] listening on http://0.0.0.0:${port}`);
  
  // Initialiser les tâches récurrentes
  initScheduler();
});


