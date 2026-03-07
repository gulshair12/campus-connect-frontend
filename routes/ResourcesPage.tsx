"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { getResourcesByCategory } from "@/services/resourceService";

export function ResourcesPage() {
  const [category, setCategory] = useState("");
  const { data: resources = [], isLoading, isError } = useQuery({
    queryKey: ["resources", category],
    queryFn: () => getResourcesByCategory(category),
  });

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1e3a5f] md:text-5xl">
            Resources
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Access study guides, visa information, housing tips, and academic
            materials.
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-full rounded bg-gray-200" />
                <div className="mt-4 h-8 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-red-700">
              Unable to load resources. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && resources.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.heading}
                description={resource.description}
                category={resource.category}
                fileUrl={resource.fileUrl}
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && resources.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-8 py-16 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              No resources found in this category.
            </h3>
            <p className="mt-2 max-w-sm text-gray-500">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
