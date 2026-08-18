import { useCallback, useEffect, useMemo, useState } from "react";
import { apiGetEvents } from "@/lib/api";

export type Event = {
  id: string; // uuid en BDD
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss ou HH:mm
  duration: string; // HH:mm (stocké en Supabase en type time)
  type: "raid" | "world_boss" | "event" | "recurring";
  description?: string | null;
};

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiGetEvents();
      setEvents(data as Event[]);
    } catch (e: any) {
      setError(e?.message || "Erreur lors du chargement des événements");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Realtime supprimé côté client, le backend peut pousser du SSE/websocket plus tard si besoin

  const groupedByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const ev of events) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [events]);

  return { events, loading, error, fetchEvents, groupedByDate };
};


