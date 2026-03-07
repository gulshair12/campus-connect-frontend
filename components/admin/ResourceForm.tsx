"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { resourceSchema, type ResourceFormData } from "@/lib/validations/resource";
import { RESOURCE_CATEGORY_OPTIONS } from "@/components/filters/CategoryFilter";
import type { Resource } from "@/services/resourceService";

export interface ResourceFormProps {
  resource?: Resource | null;
  onSubmit: (data: ResourceFormData, selectedFile?: File | null) => Promise<void>;
  onCancel: () => void;
}

const categoryOptions = RESOURCE_CATEGORY_OPTIONS.filter((o) => o.value !== "");

export function ResourceForm({ resource, onSubmit, onCancel }: ResourceFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: resource
      ? {
          category: resource.category,
          heading: resource.heading,
          description: resource.description ?? "",
          fileUrl: resource.fileUrl,
          fileType: resource.fileType ?? "pdf",
        }
      : undefined,
  });

  const fileUrl = watch("fileUrl");
  const fileType = watch("fileType");

  function getFileTypeFromFile(file: File): "pdf" | "docx" {
    const name = file.name.toLowerCase();
    if (name.endsWith(".docx") || name.endsWith(".doc")) return "docx";
    return "pdf";
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const type = getFileTypeFromFile(file);
    setValue("fileType", type);
    setValue("fileUrl", ""); // Clear so we send the file in create/update request
  }

  async function handleSubmitClick(data: ResourceFormData) {
    const hasFile = selectedFile || data.fileUrl;
    if (!hasFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    await onSubmit(data, selectedFile ?? undefined);
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
          {...register("category")}
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.category?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>
      <Input
        label="Heading"
        placeholder="Resource title"
        error={errors.heading?.message}
        {...register("heading")}
      />
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
          placeholder="Brief description"
          rows={2}
          {...register("description")}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          File (PDF or DOCX) <span className="text-red-500">*</span>{" "}
          {resource ? "(upload to replace existing)" : ""}
        </label>
        <input
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3478F6] file:px-4 file:py-2 file:text-white file:hover:bg-[#2a6ad4]"
        />
        {(selectedFile || fileUrl) && (
          <p className="mt-1 text-sm text-green-600">
            {selectedFile ? `File selected: ${selectedFile.name}` : "File uploaded."}
            {fileType && ` (${fileType})`}
          </p>
        )}
        {errors.fileType?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.fileType.message}</p>
        )}
        {errors.fileUrl?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.fileUrl.message}</p>
        )}
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {resource ? "Update resource" : "Create resource"}
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
