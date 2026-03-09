import api from "@/lib/api";

export type ConnectionStatus =
  | "none"
  | "pending_sent"
  | "pending_received"
  | "friends";

export interface BuddyUser {
  id: string;
  fullName: string;
  university: string;
  department: string;
  imageUrl?: string | null;
  connectionStatus: ConnectionStatus;
}

interface ApiBuddyUser {
  _id: string;
  fullName: string;
  university: string;
  department: string;
  imageUrl?: string | null;
  connectionStatus?: ConnectionStatus;
  [key: string]: unknown;
}

function mapApiBuddyToBuddy(item: ApiBuddyUser): BuddyUser {
  return {
    id: item._id,
    fullName: item.fullName,
    university: item.university,
    department: item.department,
    imageUrl: item.imageUrl ?? undefined,
    connectionStatus: item.connectionStatus ?? "none",
  };
}

function normalizeBuddyResponse(data: unknown): BuddyUser[] {
  if (Array.isArray(data)) {
    return data.map((item: ApiBuddyUser) => mapApiBuddyToBuddy(item));
  }
  if (data && typeof data === "object" && "data" in data) {
    const arr = (data as { data?: ApiBuddyUser[] }).data;
    return Array.isArray(arr) ? arr.map(mapApiBuddyToBuddy) : [];
  }
  if (data && typeof data === "object" && "users" in data) {
    const arr = (data as { users?: ApiBuddyUser[] }).users;
    return Array.isArray(arr) ? arr.map(mapApiBuddyToBuddy) : [];
  }
  return [];
}

function normalizeStringArrayResponse(data: unknown): string[] {
  const extractIds = (arr: unknown[]): string[] =>
    arr.map((x) => {
      if (typeof x === "string") return x;
      if (x && typeof x === "object" && "_id" in x)
        return String((x as { _id: unknown })._id);
      if (x && typeof x === "object" && "id" in x)
        return String((x as { id: unknown }).id);
      return "";
    }).filter(Boolean);

  if (Array.isArray(data)) return extractIds(data);
  if (data && typeof data === "object" && "data" in data) {
    const arr = (data as { data?: unknown[] }).data;
    return Array.isArray(arr) ? extractIds(arr) : [];
  }
  if (data && typeof data === "object" && "userIds" in data) {
    const arr = (data as { userIds?: unknown[] }).userIds;
    return Array.isArray(arr) ? extractIds(arr) : [];
  }
  return [];
}

export async function getUsersWithStatus(): Promise<BuddyUser[]> {
  const response = await api.get<unknown>("/buddy/users");
  return normalizeBuddyResponse(response.data);
}

export async function sendRequest(userId: string): Promise<void> {
  await api.post(`/buddy/request/${userId}`);
}

export async function acceptRequest(userId: string): Promise<void> {
  await api.post(`/buddy/accept/${userId}`);
}

export async function rejectRequest(userId: string): Promise<void> {
  await api.post(`/buddy/reject/${userId}`);
}

export async function cancelRequest(userId: string): Promise<void> {
  await api.post(`/buddy/cancel/${userId}`);
}

export async function getFriends(): Promise<BuddyUser[]> {
  const response = await api.get<unknown>("/buddy/friends");
  return normalizeBuddyResponse(response.data);
}

export async function getOnlineUsers(): Promise<string[]> {
  const response = await api.get<unknown>("/buddy/online");
  return normalizeStringArrayResponse(response.data);
}
