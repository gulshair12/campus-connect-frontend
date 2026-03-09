"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EventForm } from "@/components/admin/EventForm";
import { EventTable } from "@/components/admin/EventTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type Event,
} from "@/services/eventService";
import type { EventFormData } from "@/lib/validations/event";

export function AdminEventsPage() {
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const createMutation = useMutation({
    mutationFn: (data: EventFormData) =>
      createEvent({
        heading: data.heading,
        description: data.description,
        date: data.date,
        location: data.location,
        image: data.image,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created.");
      setShowForm(false);
      setEditingEvent(null);
    },
    onError: () => {
      toast.error("Failed to create event.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EventFormData }) =>
      updateEvent(id, {
        heading: data.heading,
        description: data.description,
        date: data.date,
        location: data.location,
        image: data.image,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated.");
      setEditingEvent(null);
      setShowForm(false);
    },
    onError: () => {
      toast.error("Failed to update event.");
    },
  });

  async function handleSubmit(data: EventFormData) {
    if (editingEvent) {
      await updateMutation.mutateAsync({ id: editingEvent.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  }

  async function handleDelete(event: Event) {
    if (!confirm(`Delete "${event.heading}"?`)) return;
    setDeletingId(event.id);
    try {
      await deleteEvent(event.id);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted.");
    } catch {
      toast.error("Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  }

  const formOpen = showForm || editingEvent;

  function closeModal() {
    setShowForm(false);
    setEditingEvent(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] md:text-3xl">
        Manage Events
      </h1>
      <p className="mt-1 text-gray-600">Create, edit, and delete events.</p>

      <Button
        className="mt-6"
        onClick={() => {
          setEditingEvent(null);
          setShowForm(true);
        }}
      >
        Create event
      </Button>

      <Modal
        open={!!formOpen}
        onClose={closeModal}
        title={editingEvent ? "Edit event" : "New event"}
      >
        <EventForm
          event={editingEvent}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
          Events list
        </h2>
        {isLoading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : (
          <EventTable
            events={events}
            onEdit={(e) => {
              setEditingEvent(e);
              setShowForm(true);
            }}
            onDelete={handleDelete}
            isDeletingId={deletingId}
          />
        )}
      </div>
    </div>
  );
}
