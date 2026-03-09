import api from "@/lib/api";

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

interface ApiChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  [key: string]: unknown;
}

function mapApiMessageToMessage(item: ApiChatMessage): ChatMessage {
  return {
    id: item._id,
    senderId: item.senderId,
    receiverId: item.receiverId,
    message: item.message,
    createdAt: item.createdAt,
  };
}

function normalizeChatResponse(data: unknown): ChatMessage[] {
  if (Array.isArray(data)) {
    return data.map((item: ApiChatMessage) => mapApiMessageToMessage(item));
  }
  if (data && typeof data === "object" && "data" in data) {
    const arr = (data as { data?: ApiChatMessage[] }).data;
    return Array.isArray(arr) ? arr.map(mapApiMessageToMessage) : [];
  }
  if (data && typeof data === "object" && "messages" in data) {
    const arr = (data as { messages?: ApiChatMessage[] }).messages;
    return Array.isArray(arr) ? arr.map(mapApiMessageToMessage) : [];
  }
  return [];
}

export async function getChatHistory(friendId: string): Promise<ChatMessage[]> {
  const response = await api.get<unknown>(`/chat/${friendId}`);
  return normalizeChatResponse(response.data);
}
