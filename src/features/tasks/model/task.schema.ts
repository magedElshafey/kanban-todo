import { z } from "zod";

export const ColumnIdSchema = z.enum(["backlog", "in_progress", "review", "done"]);
export const PrioritySchema = z.enum(["low", "medium", "high"]);

export const TaskFormSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  description: z.string().trim().min(2, "Description is required"),
  column: ColumnIdSchema,
  priority: PrioritySchema,
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
