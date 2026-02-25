import { useCallback } from "react";
import type { Priority, Task } from "../../../../shared/types/task";
import { useUiStore, uiSelectors } from "../../../../stores/ui.store";
import { useDeleteTask, usePatchPriority } from "../../hooks/useTaskMutations";
import { confirmDeleteToast } from "../../../../shared/ui/confirmDeleteToast";
import { toast } from "sonner";

export function useTaskCardActions(task: Task) {
  const openEdit = useUiStore(uiSelectors.openEdit);
  const deleteTask = useDeleteTask();
  const patchPriority = usePatchPriority();

  const handleEdit = useCallback(() => {
    openEdit(task);
  }, [openEdit, task]);

  const handleDelete = useCallback(() => {
    confirmDeleteToast({
      title: "Delete this task?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      onConfirm: () => {
        deleteTask.mutate(task.id, {
          onSuccess: () => toast.success("Task deleted successfully"),
          onError: () => toast.error("Failed to delete task"),
        });
      },
    });
  }, [deleteTask, task.id]);

  const handlePriorityChange = useCallback(
    (priority: Priority) => {
      patchPriority.mutate({
        id: task.id,
        priority,
      });
    },
    [patchPriority, task.id],
  );

  return {
    handleEdit,
    handleDelete,
    handlePriorityChange,
  };
}
