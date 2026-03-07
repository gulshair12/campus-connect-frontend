"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { eventSchema, type EventFormData } from "@/lib/validations/event";
import { toDateInputValue } from "@/lib/formatDate";
import { uploadEventImage } from "@/services/uploadService";
import type { Event } from "@/services/eventService";

export interface EventFormProps {
  event?: Event | null;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [imageUploading, setImageUploading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          heading: event.heading,
          description: event.description,
          date: event.date?.includes("T") ? toDateInputValue(event.date) : event.date,
          location: event.location,
          image: event.image ?? "",
        }
      : undefined,
  });

  const imageUrl = watch("image");

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const url = await uploadEventImage(file);
      setValue("image", url);
    } catch (err: unknown) {
      setValue("image", "");
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Image upload failed. Please try again.";
      toast.error(message);
    } finally {
      setImageUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Heading"
        placeholder="Event title"
        error={errors.heading?.message}
        {...register("heading")}
      />
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
          placeholder="Event description"
          rows={3}
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <Input
        label="Date"
        type="date"
        error={errors.date?.message}
        {...register("date")}
      />
      <Input
        label="Location"
        placeholder="Venue or address"
        error={errors.location?.message}
        {...register("location")}
      />
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          disabled={imageUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3478F6] file:px-4 file:py-2 file:text-white file:hover:bg-[#2a6ad4]"
        />
        {imageUploading && (
          <p className="mt-1 text-sm text-gray-500">Uploading...</p>
        )}
        {imageUrl && !errors.image && (
          <p className="mt-1 text-sm text-green-600">Image uploaded.</p>
        )}
        {errors.image?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {event ? "Update event" : "Create event"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
