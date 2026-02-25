export type ColumnId = "backlog" | "in_progress" | "review" | "done";
export type Priority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  description: string;
  column: ColumnId;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
};

export const COLUMNS: Array<{ id: ColumnId; title: string; color: string }> = [
  { id: "backlog", title: "TO DO", color: "#2563eb" },
  { id: "in_progress", title: "IN PROGRESS", color: "#f59e0b" },
  { id: "review", title: "IN REVIEW", color: "#7c3aed" },
  { id: "done", title: "DONE", color: "#10b981" },
];

export const PRIORITIES: Array<{ id: Priority; title: string }> = [
  { id: "low", title: "Low" },
  { id: "medium", title: "Medium" },
  { id: "high", title: "High" },
];
