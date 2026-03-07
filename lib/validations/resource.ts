import { z } from "zod";

export const resourceFileTypeEnum = z.enum(["pdf", "docx"], {
  required_error: "File type is required",
  invalid_type_error: "File type must be pdf or docx",
});

export const resourceSchema = z.object({
  category: z.string().min(1, "Category is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().optional(),
  fileUrl: z.string().optional(),
  fileType: resourceFileTypeEnum,
});

export type ResourceFormData = z.infer<typeof resourceSchema>;
