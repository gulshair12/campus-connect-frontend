import api from "@/lib/api";

export interface UploadResponse {
  url?: string;
  fileUrl?: string;
}

function parseUploadResponse(data: UploadResponse): string {
  const url = data?.url ?? data?.fileUrl;
  if (!url || typeof url !== "string") {
    throw new Error("Upload response did not return a URL");
  }
  return url;
}

/** Upload event image; returns URL to use in event create/update payload. */
export async function uploadEventImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<UploadResponse>(
    "/upload/event-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return parseUploadResponse(response.data);
}

/** Upload resource file (e.g. PDF/DOCX); returns URL to use in resource create/update payload. */
export async function uploadResourceFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<UploadResponse>(
    "/upload/resource-file",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return parseUploadResponse(response.data);
}
