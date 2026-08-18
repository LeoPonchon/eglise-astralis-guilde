const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(path: string, options: { method?: HttpMethod; body?: unknown } = {}): Promise<T> {
  const { method = "GET", body } = options;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : (undefined as unknown as T);
  if (!res.ok) {
    const message = isJson && (data as any)?.error ? (data as any).error : res.statusText;
    throw new Error(message || "Erreur requête API");
  }
  return data as T;
}

// Auth
export async function apiLogin(username: string, password: string) {
  return request<{ ok: boolean; user: { username: string; role: string } }>("/api/auth/login", {
    method: "POST",
    body: { username, password },
  });
}

export async function apiLogout() {
  return request<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}

export async function apiMe() {
  return request<{ user: { username: string; role: string } }>("/api/auth/me");
}

// Events
export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "raid" | "world_boss" | "event" | "recurring";
  description?: string | null;
};

export async function apiGetEvents(): Promise<CalendarEvent[]> {
  return request<CalendarEvent[]>("/api/events");
}

export async function apiCreateEvent(payload: Omit<CalendarEvent, "id">) {
  return request<CalendarEvent>("/api/events", { method: "POST", body: payload });
}

export async function apiUpdateEvent(id: string, payload: Partial<Omit<CalendarEvent, "id">>) {
  return request<CalendarEvent>(`/api/events/${id}`, { method: "PUT", body: payload });
}

export async function apiDeleteEvent(id: string) {
  await request<void>(`/api/events/${id}`, { method: "DELETE" });
}


