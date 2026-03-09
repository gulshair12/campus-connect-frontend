"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { eventSchema, type EventFormData } from "@/lib/validations/event";
import { toDateInputValue } from "@/lib/formatDate";
import { getFileNameFromUrl } from "@/lib/fileUtils";
import { uploadEventImage } from "@/services/uploadService";
import type { Event } from "@/services/eventService";

export interface EventFormProps {
  event?: Event | null;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
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

  useEffect(() => {
    return () => {
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    };
  }, [previewObjectUrl]);

  function handleRemoveImage() {
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      setPreviewObjectUrl(null);
    }
    setSelectedFile(null);
    setValue("image", "");
    setFileInputKey((k) => k + 1);
  }

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewObjectUrl(objectUrl);
    setSelectedFile(file);
    setImageUploading(true);
    try {
      const url = await uploadEventImage(file);
      setValue("image", url);
      URL.revokeObjectURL(objectUrl);
      setPreviewObjectUrl(null);
      setSelectedFile(null);
    } catch (err: unknown) {
      setValue("image", "");
      URL.revokeObjectURL(objectUrl);
      setPreviewObjectUrl(null);
      setSelectedFile(null);
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
          Upload Image <span className="text-red-500">*</span>
        </label>
        <p className="mb-2 text-xs text-gray-500">Max file size: 5MB</p>
        {!imageUrl && !selectedFile ? (
          <input
            key={fileInputKey}
            type="file"
            accept="image/*"
            onChange={onImageChange}
            disabled={imageUploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3478F6] file:px-4 file:py-2 file:text-white file:hover:bg-[#2a6ad4]"
          />
        ) : (
          <div className="relative inline-block">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <div className="relative aspect-video w-64 max-w-full">
                {previewObjectUrl ? (
                  <img
                    src={previewObjectUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={imageUploading}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-md transition hover:bg-red-600 disabled:opacity-50"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-2.72 2.72a.75.75 0 101.06 1.06L10 11.06l2.72 2.72a.75.75 0 101.06-1.06L11.06 10l2.72-2.72a.75.75 0 00-1.06-1.06L10 8.94 7.28 6.22z" />
                  </svg>
                </button>
              </div>
              <p className="truncate px-3 py-2 text-sm text-gray-600">
                {selectedFile
                  ? selectedFile.name
                  : imageUrl
                    ? getFileNameFromUrl(imageUrl)
                    : ""}
              </p>
            </div>
            {imageUploading && (
              <p className="mt-1 text-sm text-gray-500">Uploading...</p>
            )}
          </div>
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
