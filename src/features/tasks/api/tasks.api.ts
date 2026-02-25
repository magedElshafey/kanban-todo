import { API_BASE_URL, apiFetch } from "../../../shared/utils/api";
import type { ColumnId, Priority, Task } from "../../../shared/types/task";
import type { TaskFormValues } from "../model/task.schema";

export type PagedResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  totalCount: number;
};

function buildUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

export async function fetchTasksPage(params: {
  column: ColumnId;
  q: string;
  priority: Priority[];
  page: number;
  limit: number;
}): Promise<PagedResponse<Task>> {
  const url = new URL(buildUrl("/tasks"));

  url.searchParams.set("column", params.column);
  url.searchParams.set("_page", String(params.page));
  url.searchParams.set("_limit", String(params.limit));

  if (params.q.trim()) {
    url.searchParams.set("q", params.q.trim());
  }

  if (params.priority.length > 0) {
    params.priority.forEach((p) => {
      url.searchParams.append("priority", p);
    });
  }

  url.searchParams.set("_sort", "updatedAt");
  url.searchParams.set("_order", "desc");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await res.text());

  const items = (await res.json()) as Task[];
  const totalCount = Number(res.headers.get("X-Total-Count") ?? "0");

  return {
    items,
    page: params.page,
    limit: params.limit,
    totalCount,
  };
}

export async function createTask(input: TaskFormValues): Promise<Task> {
  const now = new Date().toISOString();
  return apiFetch<Task>(buildUrl("/tasks"), {
    method: "POST",
    body: JSON.stringify({ ...input, createdAt: now, updatedAt: now }),
  });
}

export async function updateTask(id: number, input: TaskFormValues): Promise<Task> {
  const now = new Date().toISOString();
  return apiFetch<Task>(buildUrl(`/tasks/${id}`), {
    method: "PATCH",
    body: JSON.stringify({ ...input, updatedAt: now }),
  });
}

export async function patchTask(
  id: number,
  patch: Partial<Pick<Task, "column" | "priority" | "title" | "description">>,
): Promise<Task> {
  const now = new Date().toISOString();
  return apiFetch<Task>(buildUrl(`/tasks/${id}`), {
    method: "PATCH",
    body: JSON.stringify({ ...patch, updatedAt: now }),
  });
}

export async function deleteTask(id: number): Promise<void> {
  await apiFetch<unknown>(buildUrl(`/tasks/${id}`), { method: "DELETE" });
}
