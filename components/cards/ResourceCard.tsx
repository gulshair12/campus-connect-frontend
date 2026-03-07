"use client";

import { Book, FileText, FileVideo } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const fileTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  DOCX: FileText,
  default: Book,
  video: FileVideo,
};

export interface ResourceCardProps {
  title: string;
  description?: string;
  category: string;
  fileType?: string;
  fileUrl?: string;
}

function getFileTypeFromUrl(url: string): string {
  if (!url) return "File";
  const lower = url.toLowerCase();
  if (lower.includes(".pdf")) return "PDF";
  if (lower.includes(".docx") || lower.includes(".doc")) return "DOCX";
  return "File";
}

export function ResourceCard({
  title,
  description = "",
  category,
  fileType,
  fileUrl,
}: ResourceCardProps) {
  const resolvedFileType = fileType ?? (fileUrl ? getFileTypeFromUrl(fileUrl) : "File");
  const Icon =
    fileTypeIcons[resolvedFileType.toUpperCase()] || fileTypeIcons.default;

  const actionButton = fileUrl ? (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
    >
      <Button variant="primary" size="sm">
        View / Download
      </Button>
    </a>
  ) : (
    <span className="text-xs font-medium text-gray-400">No file</span>
  );

  return (
    <Card className="flex flex-col bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#3478F6]/10 text-[#3478F6]">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {category}
          </span>
          <h3 className="mt-2 text-lg font-bold text-[#1e3a5f]">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">{resolvedFileType}</span>
            {actionButton}
          </div>
        </div>
      </div>
    </Card>
  );
}
