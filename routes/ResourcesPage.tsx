"use client";

import { ResourceCard } from "@/components/cards/ResourceCard";
import { CategoryFilter } from "@/components/filters/CategoryFilter";

const DUMMY_RESOURCES = [
  {
    id: "1",
    title: "International Student Guide",
    description: "Complete guide to settling in, campus resources, and academic expectations.",
    category: "Campus Life",
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Visa Application Checklist",
    description: "Step-by-step checklist for visa renewal and extension.",
    category: "Visa & Immigration",
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Study Skills Workshop Notes",
    description: "Tips for time management, note-taking, and exam preparation.",
    category: "Academic",
    fileType: "DOCX",
  },
  {
    id: "4",
    title: "Housing Guide",
    description: "On-campus and off-campus housing options and tips.",
    category: "Housing",
    fileType: "PDF",
  },
  {
    id: "5",
    title: "Career Fair Preparation",
    description: "How to prepare your resume and make the most of career events.",
    category: "Career",
    fileType: "PDF",
  },
  {
    id: "6",
    title: "Academic Support Services",
    description: "Overview of tutoring, writing centers, and counseling.",
    category: "Academic",
    fileType: "DOCX",
  },
];

export function ResourcesPage() {
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
          <CategoryFilter />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_RESOURCES.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              fileType={resource.fileType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
