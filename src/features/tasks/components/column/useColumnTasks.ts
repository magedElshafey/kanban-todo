import { useEffect, useMemo, useRef } from "react";
import type { ColumnId, Task } from "../../../../shared/types/task";
import { useUiStore, uiSelectors } from "../../../../stores/ui.store";
import { useTasksInfinite } from "../../hooks/useTasksInfinite";

function flatten(pages: Array<{ items: Task[] }>): Task[] {
  return pages.flatMap((p) => p.items);
}

export function useColumnTasks(columnId: ColumnId) {
  const q = useUiStore(uiSelectors.search);
  const priority = useUiStore(uiSelectors.priorityFilter);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, refetch } =
    useTasksInfinite({ column: columnId, q, priority });

  const tasks = useMemo(() => (data ? flatten(data.pages) : []), [data]);
  console.log("pages", data?.pages[0]);
  const total = data?.pages?.[0]?.totalCount ?? 0;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const el = sentinelRef.current;
    if (!el) return;

    const root = el.closest("[data-scroll-container='true']") as HTMLElement | null;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) fetchNextPage();
      },
      { root: root ?? null, threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return {
    tasks,
    total,
    sentinelRef,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    refetch,
  };
}
