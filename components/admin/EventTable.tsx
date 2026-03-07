"use client";

import { Button } from "@/components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import { formatEventDate } from "@/lib/formatDate";
import type { Event } from "@/services/eventService";

export interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  isDeletingId?: string | null;
}

export function EventTable({ events, onEdit, onDelete, isDeletingId }: EventTableProps) {
  if (events.length === 0) {
    return (
      <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
        No events yet. Create one above.
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
              Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Location
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-3 text-sm text-gray-900">{event.heading}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {event.date?.includes("T") ? formatEventDate(event.date) : event.date}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{event.location}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(event)}
                    className="flex items-center gap-1.5 border-gray-300 !text-gray-700 hover:bg-gray-100 [&_svg]:shrink-0"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(event)}
                    disabled={isDeletingId === event.id}
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
