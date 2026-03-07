import api from "@/lib/api";

export type EventFilter = "today" | "7days" | "30days";

export interface Event {
  id: string;
  heading: string;
  description: string;
  date: string;
  location: string;
  image?: string | null;
  [key: string]: unknown;
}

/** Backend returns { success, count, data } with items using _id */
interface ApiEventItem {
  _id: string;
  heading: string;
  description: string;
  date: string;
  location: string;
  image?: string | null;
  [key: string]: unknown;
}

function mapApiEventToEvent(item: ApiEventItem): Event {
  return {
    id: item._id,
    heading: item.heading,
    description: item.description,
    date: item.date,
    location: item.location,
    image: item.image ?? undefined,
  };
}

function normalizeEventsResponse(data: unknown): Event[] {
  if (Array.isArray(data)) {
    return data.map((item: ApiEventItem) => mapApiEventToEvent(item));
  }
  if (data && typeof data === "object" && "data" in data) {
    const arr = (data as { data?: ApiEventItem[] }).data;
    return Array.isArray(arr) ? arr.map(mapApiEventToEvent) : [];
  }
  if (data && typeof data === "object" && "events" in data) {
    const arr = (data as { events?: ApiEventItem[] }).events;
    return Array.isArray(arr) ? arr.map(mapApiEventToEvent) : [];
  }
  return [];
}

function normalizeSingleEventResponse(data: unknown): Event {
  if (data && typeof data === "object" && "data" in data) {
    const item = (data as { data?: ApiEventItem }).data;
    if (item && typeof item === "object" && "_id" in item) {
      return mapApiEventToEvent(item as ApiEventItem);
    }
  }
  if (data && typeof data === "object" && "_id" in data) {
    return mapApiEventToEvent(data as ApiEventItem);
  }
  return data as Event;
}

export async function getEvents(): Promise<Event[]> {
  const response = await api.get<{ success?: boolean; count?: number; data?: ApiEventItem[] }>("/events");
  return normalizeEventsResponse(response.data);
}

/**
 * GET /events?filter=today|7days|30days
 * Backend getDateRange(filter) returns MongoDB date range for event.date.
 */
export async function getEventsByFilter(filter: EventFilter): Promise<Event[]> {
  const response = await api.get<{ success?: boolean; count?: number; data?: ApiEventItem[] }>("/events", {
    params: { filter },
  });
  return normalizeEventsResponse(response.data);
}

export async function createEvent(payload: Omit<Event, "id">): Promise<Event> {
  const response = await api.post<{ success?: boolean; data?: ApiEventItem }>("/events", payload);
  return normalizeSingleEventResponse(response.data);
}

export async function updateEvent(id: string, payload: Partial<Omit<Event, "id">>): Promise<Event> {
  const response = await api.put<{ success?: boolean; data?: ApiEventItem }>(`/events/${id}`, payload);
  return normalizeSingleEventResponse(response.data);
}

export async function deleteEvent(id: string): Promise<void> {
  await api.delete(`/events/${id}`);
}
