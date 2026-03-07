"use client";

import { Button } from "@/components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import type { Resource } from "@/services/resourceService";

export interface ResourceTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
  isDeletingId?: string | null;
}

export function ResourceTable({
  resources,
  onEdit,
  onDelete,
  isDeletingId,
}: ResourceTableProps) {
  if (resources.length === 0) {
    return (
      <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
        No resources yet. Upload one above.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Heading
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              File
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td className="px-4 py-3 text-sm text-gray-900">
                {resource.heading}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {resource.category}
              </td>
              <td className="px-4 py-3 text-sm">
                {resource.fileUrl ? (
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3478F6] hover:underline"
                  >
                    View / Download
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(resource)}
                    className="flex items-center gap-1.5 border-gray-300 !text-gray-700 hover:bg-gray-100 [&_svg]:shrink-0"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(resource)}
                    disabled={isDeletingId === resource.id}
                    className="flex items-center gap-1.5 border-red-200 !text-red-600 hover:bg-red-50 [&_svg]:shrink-0"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
