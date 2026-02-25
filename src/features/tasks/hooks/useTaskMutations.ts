import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnId, Priority } from "../../../shared/types/task";
import { createTask, deleteTask, patchTask, updateTask } from "../api/tasks.api";
import { taskKeys } from "../api/tasks.keys";
import type { TaskFormValues } from "../model/task.schema";

type UpdatePayload = { id: number; values: TaskFormValues };
type MovePayload = {
  id: number;
  fromColumn: ColumnId;
  toColumn: ColumnId;
  overTaskId?: number;
};
type PatchPriorityPayload = { id: number; priority: Priority };

function useInvalidateTasks() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: taskKeys.all });
}

export function useCreateTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: (values: TaskFormValues) => createTask(values),
    onSuccess: invalidate,
  });
}

export function useUpdateTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, values }: UpdatePayload) => updateTask(id, values),
    onSuccess: invalidate,
  });
}

export function useDeleteTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: invalidate,
  });
}

export function useMoveTaskOptimistic() {
  const qc = useQueryClient();

  const getColumnFromKey = (queryKey: unknown): ColumnId | null => {
    if (!Array.isArray(queryKey)) return null;

    for (const part of queryKey) {
      if (part && typeof part === "object" && "column" in (part as any)) {
        return (part as any).column as ColumnId;
      }

      if (part && typeof part === "object") {
        for (const v of Object.values(part as Record<string, unknown>)) {
          if (v && typeof v === "object" && "column" in (v as any)) {
            return (v as any).column as ColumnId;
          }
        }
      }
    }

    return null;
  };

  const removeFromPages = (pages: any[], id: number) => {
    let removed: any | null = null;

    const next = pages.map((page) => {
      const items = page?.items ?? [];
      const idx = items.findIndex((t: any) => t?.id === id);
      if (idx === -1) return page;

      const nextItems = items.slice();
      removed = nextItems[idx];
      nextItems.splice(idx, 1);

      return { ...page, items: nextItems };
    });

    return { nextPages: next, removed };
  };

  const insertIntoPages = (pages: any[], task: any, overTaskId?: number) => {
    if (!pages.length) return pages;

    const appendToEnd = () => {
      const lastIndex = pages.length - 1;
      const last = pages[lastIndex];
      const lastItems = last?.items ?? [];
      const nextLast = { ...last, items: [...lastItems, task] };
      const next = pages.slice();
      next[lastIndex] = nextLast;
      return next;
    };

    if (!overTaskId) return appendToEnd();

    const pageIndex = pages.findIndex((p) =>
      (p.items ?? []).some((t: any) => t?.id === overTaskId),
    );
    if (pageIndex === -1) return appendToEnd();

    const page = pages[pageIndex];
    const items = page.items ?? [];
    const insertIndex = items.findIndex((t: any) => t?.id === overTaskId);
    if (insertIndex === -1) return appendToEnd();

    const nextItems = items.slice();
    nextItems.splice(Math.max(0, insertIndex), 0, task);

    const nextPage = { ...page, items: nextItems };
    const nextPages = pages.slice();
    nextPages[pageIndex] = nextPage;

    return nextPages;
  };

  const adjustTotal = (pages: any[], delta: number) => {
    if (!pages.length) return pages;
    const first = pages[0];
    return [
      { ...first, totalCount: Math.max(0, (first.totalCount ?? 0) + delta) },
      ...pages.slice(1),
    ];
  };

  return useMutation({
    mutationFn: ({ id, toColumn }: MovePayload) => patchTask(id, { column: toColumn }),

    onMutate: async ({ id, fromColumn, toColumn, overTaskId }: MovePayload) => {
      await qc.cancelQueries({ queryKey: taskKeys.all });

      const queries = qc.getQueryCache().findAll({ queryKey: taskKeys.all });
      const previous = new Map<string, unknown>();

      let movedTask: any | null = null;

      for (const q of queries) {
        const col = getColumnFromKey(q.queryKey);
        if (!col) continue;

        const data = qc.getQueryData<any>(q.queryKey);
        if (!data || !Array.isArray(data.pages)) continue;

        previous.set(q.queryHash, data);

        if (col === fromColumn) {
          const { nextPages, removed } = removeFromPages(data.pages, id);
          if (removed) movedTask = removed;

          const pagesWithTotal = removed ? adjustTotal(nextPages, -1) : nextPages;
          qc.setQueryData(q.queryKey, { ...data, pages: pagesWithTotal });
        }
      }

      if (movedTask) {
        const nextTask = { ...movedTask, column: toColumn };

        for (const q of queries) {
          const col = getColumnFromKey(q.queryKey);
          if (col !== toColumn) continue;

          const data = qc.getQueryData<any>(q.queryKey);
          if (!data || !Array.isArray(data.pages)) continue;

          if (!previous.has(q.queryHash)) previous.set(q.queryHash, data);

          const inserted = insertIntoPages(data.pages, nextTask, overTaskId);
          const pagesWithTotal = adjustTotal(inserted, +1);

          qc.setQueryData(q.queryKey, { ...data, pages: pagesWithTotal });
        }
      }

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx?.previous) return;

      const queries = qc.getQueryCache().findAll({ queryKey: taskKeys.all });
      for (const q of queries) {
        const snap = (ctx.previous as Map<string, unknown>).get(q.queryHash);
        if (snap) qc.setQueryData(q.queryKey, snap);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function usePatchPriority() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, priority }: PatchPriorityPayload) => patchTask(id, { priority }),
    onSettled: invalidate,
  });
}
