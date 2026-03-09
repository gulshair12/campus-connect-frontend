"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { resourceSchema, type ResourceFormData } from "@/lib/validations/resource";
import { RESOURCE_CATEGORY_OPTIONS } from "@/components/filters/CategoryFilter";
import { getFileNameFromUrl } from "@/lib/fileUtils";
import type { Resource } from "@/services/resourceService";

export interface ResourceFormProps {
  resource?: Resource | null;
  onSubmit: (data: ResourceFormData, selectedFile?: File | null) => Promise<void>;
  onCancel: () => void;
}

const categoryOptions = RESOURCE_CATEGORY_OPTIONS.filter((o) => o.value !== "");

function DocumentIcon({ type }: { type?: "pdf" | "docx" }) {
  if (type === "docx") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-12 w-12 text-blue-600"
      >
        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-12 w-12 text-red-600"
    >
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
    </svg>
  );
}

export function ResourceForm({ resource, onSubmit, onCancel }: ResourceFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
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

  function handleRemoveFile() {
    setSelectedFile(null);
    setValue("fileUrl", "");
    setFileInputKey((k) => k + 1);
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
          Upload Resource <span className="text-red-500">*</span>{" "}
          {resource ? "(upload to replace existing)" : ""}
        </label>
        <p className="mb-2 text-xs text-gray-500">Max file size: 10MB</p>
        {!selectedFile && !fileUrl ? (
          <input
            key={fileInputKey}
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={onFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3478F6] file:px-4 file:py-2 file:text-white file:hover:bg-[#2a6ad4]"
          />
        ) : (
          <div className="relative inline-block">
            <div className="relative flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 pr-12">
              <DocumentIcon type={fileType} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {selectedFile ? selectedFile.name : fileUrl ? getFileNameFromUrl(fileUrl) : ""}
                </p>
                {fileType && (
                  <p className="text-xs text-gray-500">Type: {fileType.toUpperCase()}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-md transition hover:bg-red-600"
                aria-label="Remove file"
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
          </div>
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
