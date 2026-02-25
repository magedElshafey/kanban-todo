import { FilterBarView } from "./FilterBarView";
import { useBoardFilter } from "./useBoardFilter";

export function BoardFilterBar() {
  const { priorities, priorityFilter, togglePriority, resetPriorityFilter, hasFilter } =
    useBoardFilter();

  return (
    <FilterBarView
      priorities={priorities}
      selected={priorityFilter}
      onToggle={togglePriority}
      onReset={resetPriorityFilter}
      hasFilter={hasFilter}
    />
  );
}
