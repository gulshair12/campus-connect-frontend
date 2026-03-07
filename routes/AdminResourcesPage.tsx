"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  type Resource,
} from "@/services/resourceService";
import type { ResourceFormData } from "@/lib/validations/resource";

export function AdminResourcesPage() {
  const queryClient = useQueryClient();
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  async function handleSubmit(data: ResourceFormData, selectedFile?: File | null) {
    try {
      if (editingResource) {
        await updateResource(
          editingResource.id,
          {
            category: data.category,
            heading: data.heading,
            description: data.description,
            fileUrl: data.fileUrl,
            fileType: data.fileType,
          },
          { file: selectedFile ?? undefined }
        );
        queryClient.invalidateQueries({ queryKey: ["resources"] });
        toast.success("Resource updated.");
        setEditingResource(null);
      } else {
        await createResource(
          {
            category: data.category,
            heading: data.heading,
            description: data.description,
            fileUrl: data.fileUrl ?? "",
            fileType: data.fileType,
          },
          selectedFile ? { file: selectedFile } : undefined
        );
        queryClient.invalidateQueries({ queryKey: ["resources"] });
        toast.success("Resource created.");
        setShowForm(false);
      }
    } catch {
      toast.error(
        editingResource ? "Failed to update resource." : "Failed to create resource."
      );
    }
  }

  async function handleDelete(resource: Resource) {
    if (!confirm(`Delete "${resource.heading}"?`)) return;
    setDeletingId(resource.id);
    try {
      await deleteResource(resource.id);
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource deleted.");
    } catch {
      toast.error("Failed to delete resource.");
    } finally {
      setDeletingId(null);
    }
  }

  const formOpen = showForm || editingResource;

  function closeModal() {
    setShowForm(false);
    setEditingResource(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] md:text-3xl">
        Manage Resources
      </h1>
      <p className="mt-1 text-gray-600">Upload, edit, and delete resources.</p>

      <Button
        className="mt-6"
        onClick={() => {
          setEditingResource(null);
          setShowForm(true);
        }}
      >
        Upload resource
      </Button>

      <Modal
        open={!!formOpen}
        onClose={closeModal}
        title={editingResource ? "Edit resource" : "New resource"}
      >
        <ResourceForm
          resource={editingResource}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
          Resources list
        </h2>
        {isLoading ? (
          <p className="text-gray-500">Loading resources...</p>
        ) : (
          <ResourceTable
            resources={resources}
            onEdit={(r) => {
              setEditingResource(r);
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
