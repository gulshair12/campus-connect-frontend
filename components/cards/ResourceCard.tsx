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
  description: string;
  category: string;
  fileType: string;
}

export function ResourceCard({
  title,
  description,
  category,
  fileType,
}: ResourceCardProps) {
  const Icon =
    fileTypeIcons[fileType.toUpperCase()] || fileTypeIcons.default;

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
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">{fileType}</span>
            <Button variant="primary" size="sm">
              Download
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
