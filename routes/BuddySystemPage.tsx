"use client";

import { BuddyCard } from "@/components/cards/BuddyCard";
import { BuddyFilter } from "@/components/filters/BuddyFilter";

const DUMMY_STUDENTS = [
  {
    id: "1",
    fullName: "Alex Johnson",
    university: "State University",
    department: "Computer Science",
    bioPreview:
      "Third-year CS student. Happy to help with coding, campus navigation, and finding the best coffee spots.",
  },
  {
    id: "2",
    fullName: "Maria Garcia",
    university: "State University",
    department: "Engineering",
    bioPreview:
      "Graduate student in Mechanical Engineering. Love showing new students around the labs and study areas.",
  },
  {
    id: "3",
    fullName: "James Chen",
    university: "State University",
    department: "Business",
    bioPreview:
      "MBA student. Can help with career advice, networking, and understanding the business school culture.",
  },
  {
    id: "4",
    fullName: "Sofia Patel",
    university: "State University",
    department: "Arts & Humanities",
    bioPreview:
      "Art history major. Happy to share tips on campus life, cultural events, and settling in.",
  },
  {
    id: "5",
    fullName: "David Kim",
    university: "State University",
    department: "Computer Science",
    bioPreview:
      "Senior CS student. Experienced with internships and research. Happy to mentor newcomers.",
  },
  {
    id: "6",
    fullName: "Emma Wilson",
    university: "State University",
    department: "Natural Sciences",
    bioPreview:
      "Biology PhD student. Can help with lab work, research opportunities, and academic writing.",
  },
];

export function BuddySystemPage() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1e3a5f] md:text-5xl">
            Buddy System
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Connect with experienced students who can guide you through campus
            life and help you settle in.
          </p>
        </div>

        <div className="mb-8">
          <BuddyFilter />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_STUDENTS.map((student) => (
            <BuddyCard
              key={student.id}
              fullName={student.fullName}
              university={student.university}
              department={student.department}
              bioPreview={student.bioPreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
