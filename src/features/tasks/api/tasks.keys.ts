import type { ColumnId, Priority } from "../../../shared/types/task";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (params: { column: ColumnId; q: string; priority: Priority[] }) =>
    [...taskKeys.all, "list", params] as const,
};
