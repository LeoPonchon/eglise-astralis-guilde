import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Optional Discord webhook integration (per type with fallback)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL; // fallback
const DISCORD_WEBHOOK_RAID_URL = process.env.DISCORD_WEBHOOK_RAID_URL; // Raids & Donjons
const DISCORD_WEBHOOK_EVENT_URL = process.env.DISCORD_WEBHOOK_EVENT_URL; // Events
const DISCORD_WEBHOOK_WORLD_BOSS_URL = process.env.DISCORD_WEBHOOK_WORLD_BOSS_URL; // Chasses / World Boss
const DISCORD_WEBHOOK_RECURRING_EVENT_URL = process.env.DISCORD_WEBHOOK_RECURRING_EVENT_URL; // Recurring Events

// Optional role mentions per type
const DISCORD_ROLE_RAID_ID = process.env.DISCORD_ROLE_RAID_ID; // 1433391859891175456
const DISCORD_ROLE_EVENT_ID = process.env.DISCORD_ROLE_EVENT_ID; // 1433391509566259260
const DISCORD_ROLE_WORLD_BOSS_ID = process.env.DISCORD_ROLE_WORLD_BOSS_ID; // 1433391542617243669
const DISCORD_ROLE_RECURRING_ID = process.env.DISCORD_ROLE_RECURRING_ID; // 1434674823396593798 (ping quotidien)

// URL du calendrier pour affichage dans le footer des embeds
const CALENDAR_URL_BASE = (process.env.FRONTEND_ORIGINS || 'http://localhost:8080')
  .split(',')[0]
  .trim();
const CALENDAR_URL = `${CALENDAR_URL_BASE}/calendar`;

function getWebhookUrlByType(type: string | undefined | null): string | undefined {
  switch ((type || '').toLowerCase()) {
    case 'raid':
      return DISCORD_WEBHOOK_RAID_URL || DISCORD_WEBHOOK_URL;
    case 'world_boss':
      return DISCORD_WEBHOOK_WORLD_BOSS_URL || DISCORD_WEBHOOK_URL;
    case 'event':
      return DISCORD_WEBHOOK_EVENT_URL || DISCORD_WEBHOOK_URL;
    case 'recurring':
      return DISCORD_WEBHOOK_RECURRING_EVENT_URL || DISCORD_WEBHOOK_URL;
    default:
      return DISCORD_WEBHOOK_URL;
  }
}

function getRoleIdByType(type: string | undefined | null): string | undefined {
  switch ((type || '').toLowerCase()) {
    case 'raid':
      return DISCORD_ROLE_RAID_ID;
    case 'world_boss':
      return DISCORD_ROLE_WORLD_BOSS_ID;
    case 'event':
      return DISCORD_ROLE_EVENT_ID;
    case 'recurring':
      return DISCORD_ROLE_RECURRING_ID;
    default:
      return undefined;
  }
}

async function notifyDiscordOnEventCreate(event: {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  description: string | null;
}) {
  const targetWebhook = getWebhookUrlByType(event.type);
  if (!targetWebhook) return; // Not configured; skip

  try {
    // Build a clean, readable message embed
    const embed = {
      title: `📅 Nouvel évènement: ${event.title}`,
      description: event.description ?? '—',
      color: 0x5865f2, // Discord blurple
      fields: [
        { name: 'Date', value: event.date, inline: true },
        { name: 'Heure', value: event.time, inline: true },
        { name: 'Durée', value: event.duration || '—', inline: true },
        { name: 'Type', value: event.type || 'other', inline: true },
      ],
      // Timestamp à l'heure de création de l'embed (heure serveur)
      timestamp: new Date().toISOString(),
      footer: {
        text: `L'Église d'Astralis - ${CALENDAR_URL}`,
      },
    };

    const roleId = getRoleIdByType(event.type);
    const content = roleId ? `<@&${roleId}>` : null;

    await fetch(targetWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        allowed_mentions: roleId
          ? { roles: [roleId] }
          : undefined,
        embeds: [embed],
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[discord-webhook] Failed to send event notification:', err);
  }
}

async function notifyDiscordOnEventUpdate(event: {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  description: string | null;
}) {
  const targetWebhook = getWebhookUrlByType(event.type);
  if (!targetWebhook) return;

  try {
    const embed = {
      title: `✏️ Évènement modifié: ${event.title}`,
      description: event.description ?? '—',
      color: 0xf59e0b, // Amber
      fields: [
        { name: 'Date', value: event.date, inline: true },
        { name: 'Heure', value: event.time, inline: true },
        { name: 'Durée', value: event.duration || '—', inline: true },
        { name: 'Type', value: event.type || 'other', inline: true },
      ],
      // Timestamp à l'heure d'envoi de la modification
      timestamp: new Date().toISOString(),
      footer: {
        text: `L'Église d'Astralis - ${CALENDAR_URL}`,
      },
    };

    const roleId = getRoleIdByType(event.type);
    const content = roleId ? `<@&${roleId}>` : null;

    await fetch(targetWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        allowed_mentions: roleId ? { roles: [roleId] } : undefined,
        embeds: [embed],
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[discord-webhook] Failed to send event update notification:', err);
  }
}

router.get('/', async (_req, res) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase non configuré côté serveur' });
  const { data, error } = await supabaseAdmin
    .from('calendar_events')
    .select('id, title, date, time, duration, type, description')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data ?? []);
});

router.post('/', requireAuth, async (req, res) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase non configuré côté serveur' });
  const body = req.body ?? {};
  const payload = {
    title: String(body.title || ''),
    date: String(body.date || ''),
    time: String(body.time || ''),
    duration: String(body.duration || ''),
    type: String(body.type || 'other'),
    description: body.description ?? null,
  };

  if (!payload.title || !payload.date || !payload.time || !payload.duration || !payload.type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabaseAdmin.from('calendar_events').insert(payload).select().single();
  if (error) return res.status(500).json({ error: error.message });

  // Fire-and-forget Discord notification (do not block response)
  // no await to return fast; internal error is logged only
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  notifyDiscordOnEventCreate(data);
  return res.status(201).json(data);
});

router.put('/:id', requireAuth, async (req, res) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase non configuré côté serveur' });
  const { id } = req.params;
  const body = req.body ?? {};
  const update = {
    title: body.title,
    date: body.date,
    time: body.time,
    duration: body.duration,
    type: body.type,
    description: body.description ?? null,
  };

  const { data, error } = await supabaseAdmin.from('calendar_events').update(update).eq('id', id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  // Envoi d'une notification Discord pour signaler la modification
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  notifyDiscordOnEventUpdate(data);
  return res.json(data);
});

router.delete('/:id', requireAuth, async (req, res) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase non configuré côté serveur' });
  const { id } = req.params;
  const { error } = await supabaseAdmin.from('calendar_events').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(204).send();
});

export default router;


