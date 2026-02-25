import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUiStore, uiSelectors } from "../../../stores/ui.store";
import type { Priority } from "../../../shared/types/task";

const PRIORITIES: Priority[] = ["high", "medium", "low"];

export function useBoardFilter() {
  const priorityFilter = useUiStore(uiSelectors.priorityFilter);
  const togglePriority = useUiStore(uiSelectors.togglePriority);
  const resetPriorityFilter = useUiStore(uiSelectors.resetPriorityFilter);

  const qc = useQueryClient();

  const total = useMemo(() => {
    const queries = qc.getQueryCache().findAll({ queryKey: ["tasks"] });
    let count = 0;

    for (const q of queries as any[]) {
      if (!q.state.data?.pages) continue;
      for (const page of q.state.data.pages) {
        count += page.items.length;
      }
    }

    return count;
  }, [qc, priorityFilter]);

  return {
    priorities: PRIORITIES,
    priorityFilter,
    togglePriority,
    resetPriorityFilter,
    total,
    hasFilter: priorityFilter.length > 0,
  };
}
