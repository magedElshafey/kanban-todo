import { useInfiniteQuery } from "@tanstack/react-query";
import type { ColumnId, Priority } from "../../../shared/types/task";
import { fetchTasksPage } from "../api/tasks.api";
import { taskKeys } from "../api/tasks.keys";

export const TASKS_PAGE_SIZE = 10;

type Params = {
  column: ColumnId;
  q: string;
  priority: Priority[];
};

export function useTasksInfinite({ column, q, priority }: Params) {
  return useInfiniteQuery({
    queryKey: taskKeys.list({ column, q, priority }),
    queryFn: ({ pageParam }) =>
      fetchTasksPage({
        column,
        q,
        priority,
        page: pageParam as number,
        limit: TASKS_PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((acc, p) => acc + p.items.length, 0);
      return loaded < lastPage.totalCount ? lastPage.page + 1 : undefined;
    },
  });
}
