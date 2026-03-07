import { z } from "zod";

export const eventSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  image: z.string().min(1, "Image is required"),
});

export type EventFormData = z.infer<typeof eventSchema>;
