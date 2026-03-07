import api from "@/lib/api";

export interface Resource {
  id: string;
  category: string;
  heading: string;
  description?: string;
  fileUrl: string;
  fileType?: "pdf" | "docx";
  [key: string]: unknown;
}

/** Backend may return { success, count, data } with items using _id */
interface ApiResourceItem {
  _id: string;
  category: string;
  heading: string;
  description?: string;
  fileUrl: string;
  fileType?: string;
  [key: string]: unknown;
}

function mapApiResourceToResource(item: ApiResourceItem): Resource {
  return {
    id: item._id,
    category: item.category,
    heading: item.heading,
    description: item.description,
    fileUrl: item.fileUrl,
    fileType:
      item.fileType === "pdf" || item.fileType === "docx" ? item.fileType : undefined,
  };
}

function normalizeResourcesResponse(data: unknown): Resource[] {
  if (Array.isArray(data)) {
    return data.map((item: ApiResourceItem) => mapApiResourceToResource(item));
  }
  if (data && typeof data === "object" && "data" in data) {
    const arr = (data as { data?: ApiResourceItem[] }).data;
    return Array.isArray(arr) ? arr.map(mapApiResourceToResource) : [];
  }
  if (data && typeof data === "object" && "resources" in data) {
    const arr = (data as { resources?: ApiResourceItem[] }).resources;
    return Array.isArray(arr) ? arr.map(mapApiResourceToResource) : [];
  }
  return [];
}

function normalizeSingleResourceResponse(data: unknown): Resource {
  if (data && typeof data === "object" && "data" in data) {
    const item = (data as { data?: ApiResourceItem }).data;
    if (item && typeof item === "object" && "_id" in item) {
      return mapApiResourceToResource(item as ApiResourceItem);
    }
  }
  if (data && typeof data === "object" && "_id" in data) {
    return mapApiResourceToResource(data as ApiResourceItem);
  }
  return data as Resource;
}

export async function getResources(): Promise<Resource[]> {
  const response = await api.get<{ success?: boolean; count?: number; data?: ApiResourceItem[] }>("/resources");
  return normalizeResourcesResponse(response.data);
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  if (!category) return getResources();
  const response = await api.get<{ success?: boolean; count?: number; data?: ApiResourceItem[] }>("/resources", {
    params: { category },
  });
  return normalizeResourcesResponse(response.data);
}

export async function createResource(
  payload: Omit<Resource, "id">,
  options?: { file?: File }
): Promise<Resource> {
  if (options?.file) {
    const formData = new FormData();
    formData.append("category", String(payload.category));
    formData.append("heading", String(payload.heading));
    formData.append("description", String(payload.description ?? ""));
    formData.append("fileType", String(payload.fileType ?? "pdf"));
    formData.append("file", options.file);
    const response = await api.post<{ success?: boolean; data?: ApiResourceItem }>(
      "/resources",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return normalizeSingleResourceResponse(response.data);
  }
  const response = await api.post<{ success?: boolean; data?: ApiResourceItem }>("/resources", payload);
  return normalizeSingleResourceResponse(response.data);
}

export async function updateResource(
  id: string,
  payload: Partial<Omit<Resource, "id">>,
  options?: { file?: File }
): Promise<Resource> {
  if (options?.file) {
    const formData = new FormData();
    formData.append("category", String(payload.category ?? ""));
    formData.append("heading", String(payload.heading ?? ""));
    formData.append("description", String(payload.description ?? ""));
    formData.append("fileType", String(payload.fileType ?? "pdf"));
    formData.append("file", options.file);
    const response = await api.put<{ success?: boolean; data?: ApiResourceItem }>(
      `/resources/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return normalizeSingleResourceResponse(response.data);
  }
  const response = await api.put<{ success?: boolean; data?: ApiResourceItem }>(`/resources/${id}`, payload);
  return normalizeSingleResourceResponse(response.data);
}

export async function deleteResource(id: string): Promise<void> {
  await api.delete(`/resources/${id}`);
}
