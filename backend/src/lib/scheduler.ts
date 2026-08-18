import cron from 'node-cron';
import { supabaseAdmin } from './supabase.js';

// Webhook et rôle pour les événements récurrents
const DISCORD_WEBHOOK_RECURRING_EVENT_URL = process.env.DISCORD_WEBHOOK_RECURRING_EVENT_URL || process.env.DISCORD_WEBHOOK_EVENT_URL;
const DISCORD_ROLE_RECURRING_ID = process.env.DISCORD_ROLE_RECURRING_ID; // 1434674823396593798 (ping quotidien)
const CALENDAR_URL_BASE = (process.env.FRONTEND_ORIGINS || 'http://localhost:8080')
  .split(',')[0]
  .trim();
const CALENDAR_URL = `${CALENDAR_URL_BASE}/calendar`;

/**
 * Crée un événement dans la base de données et envoie une notification Discord
 * Exactement comme si c'était créé manuellement via l'API
 */
async function createRecurringEvent(
  title: string,
  date: string,
  time: string,
  duration: string,
  description: string
) {
  if (!supabaseAdmin) {
    console.error('[scheduler] Supabase non configuré');
    return;
  }

  try {
    // Créer l'événement dans la base de données
    const payload = {
      title,
      date,
      time,
      duration,
      type: 'recurring',
      description,
    };

    const { data: event, error } = await supabaseAdmin
      .from('calendar_events')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error('[scheduler] Erreur lors de la création de l\'événement:', error);
      return;
    }

    // Envoyer la notification Discord
    if (DISCORD_WEBHOOK_RECURRING_EVENT_URL) {
      const embed = {
        title: `📅 Nouvel évènement: ${event.title}`,
        description: event.description ?? '—',
        color: 0x5865f2,
        fields: [
          { name: 'Date', value: event.date, inline: true },
          { name: 'Heure', value: event.time, inline: true },
          { name: 'Durée', value: event.duration || '—', inline: true },
          { name: 'Type', value: event.type || 'other', inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `L'Église d'Astralis - ${CALENDAR_URL}`,
        },
      };

      const content = DISCORD_ROLE_RECURRING_ID ? `<@&${DISCORD_ROLE_RECURRING_ID}>` : null;

      await fetch(DISCORD_WEBHOOK_RECURRING_EVENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          allowed_mentions: DISCORD_ROLE_RECURRING_ID ? { roles: [DISCORD_ROLE_RECURRING_ID] } : undefined,
          embeds: [embed],
        }),
      });

      console.log(`[scheduler] Événement créé et envoyé: ${title}`);
    }
  } catch (err) {
    console.error('[scheduler] Erreur lors de la création de l\'événement récurrent:', err);
  }
}

/**
 * Obtient la date d'aujourd'hui au format YYYY-MM-DD
 */
function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Obtient le jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
 */
function getDayOfWeek(): number {
  return new Date().getDay();
}

/**
 * Tâche quotidienne : Ping à 8h du matin pour les activités quotidiennes
 * Cron: 0 8 * * * (chaque jour à 8h00)
 */
export function scheduleDailyActivitiesReminder() {
  cron.schedule('0 8 * * *', () => {
    const today = getTodayDate();
    createRecurringEvent(
      'Activités Quotidiennes',
      today,
      '08:00',
      '24:00',
      '🕐 **Rappel des activités quotidiennes**\n\nN\'oubliez pas de faire vos activités quotidiennes ! Détails disponibles dans le salon #activités-quotidiennes.'
    );
  }, {
    timezone: 'Europe/Paris'
  });
  console.log('[scheduler] Tâche quotidienne programmée (8h00)');
}

/**
 * Tâche weekend : Ping vendredi, samedi et dimanche à 16h pour Danse et Chasse de Guilde
 * Cron: 0 16 * * 5,6,0 (vendredi=5, samedi=6, dimanche=0 à 16h00)
 */
export function scheduleWeekendGuildActivities() {
  cron.schedule('0 16 * * 5,6,0', () => {
    const today = getTodayDate();
    const dayOfWeek = getDayOfWeek();
    const isFriday = dayOfWeek === 5;

    // Danse de Guilde - Vendredi seulement
    if (isFriday) {
      createRecurringEvent(
        'Danse de Guilde (Guild Dance)',
        today,
        '17:30',
        '12:00',
        '💃 **Danse de Guilde**\n\n🕓 **Horaires :** Vendredi, de 17h30 à 05h30 (heure française)\n\nPour plus d\'informations, consultez #activités-guilde'
      );
    }

    // Chasse de Guilde - Vendredi, samedi et dimanche
    createRecurringEvent(
      'Chasse de Guilde (Guild Hunt)',
      today,
      '16:00',
      '14:00',
      '🏹 **Chasse de Guilde**\n\n🕓 **Horaires :** Vendredi, samedi et dimanche, de 16h00 à 06h00 (heure française)\n\nPour plus d\'informations, consultez #activités-guilde'
    );
  }, {
    timezone: 'Europe/Paris'
  });
  console.log('[scheduler] Tâches weekend programmées (vendredi, samedi, dimanche à 16h00)');
}

/**
 * Initialise toutes les tâches récurrentes
 */
export function initScheduler() {
  scheduleDailyActivitiesReminder();
  scheduleWeekendGuildActivities();
  console.log('[scheduler] Toutes les tâches récurrentes ont été initialisées');
}

