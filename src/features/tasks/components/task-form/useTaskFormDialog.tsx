import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useUiStore, uiSelectors } from "../../../../stores/ui.store";
import { useCreateTask, useUpdateTask } from "../../hooks/useTaskMutations";
import { TaskFormSchema, type TaskFormValues } from "../../model/task.schema";

export function useTaskFormDialog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const open = useUiStore(uiSelectors.taskDialogOpen);
  const mode = useUiStore(uiSelectors.dialogMode);
  const editingTask = useUiStore(uiSelectors.editingTask);
  const prefillColumn = useUiStore(uiSelectors.createPrefillColumn);
  const close = useUiStore(uiSelectors.closeDialog);

  const create = useCreateTask();
  const update = useUpdateTask();

  const isEdit = mode === "edit";

  const defaultValues = useMemo<TaskFormValues>(
    () => ({
      title: editingTask?.title ?? "",
      description: editingTask?.description ?? "",
      column: editingTask?.column ?? prefillColumn ?? "backlog",
      priority: editingTask?.priority ?? "medium",
    }),
    [editingTask, prefillColumn],
  );

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    defaultValues,
  });

  const { reset, clearErrors, formState } = form;
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    reset(defaultValues, {
      keepDirty: false,
      keepTouched: false,
      keepErrors: false,
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    clearErrors();
  }, [open, defaultValues, reset, clearErrors]);

  const busy = formState.isSubmitting || create.isPending || update.isPending;

  const submitCreate = useCallback(
    async (values: TaskFormValues) => {
      await create.mutateAsync(values);
      close();
    },
    [create, close],
  );

  const submitCreateAndAnother = useCallback(
    async (values: TaskFormValues) => {
      await create.mutateAsync(values);

      reset(
        { title: "", description: "", column: values.column, priority: values.priority },
        {
          keepDirty: false,
          keepTouched: false,
          keepErrors: false,
          keepIsSubmitted: false,
          keepSubmitCount: false,
        },
      );
      clearErrors();
      requestAnimationFrame(() => titleInputRef.current?.focus());
    },
    [create, reset, clearErrors],
  );

  const submitEdit = useCallback(
    async (values: TaskFormValues) => {
      if (!editingTask) return;
      await update.mutateAsync({ id: editingTask.id, values });
      close();
    },
    [editingTask, update, close],
  );

  const onPrimarySubmit = isEdit ? submitEdit : submitCreate;

  return {
    open,
    close,
    isEdit,
    isMobile,
    busy,
    prefillColumn,
    editingTask,
    titleInputRef,
    createError: create.isError,
    updateError: update.isError,
    form,
    onPrimarySubmit,
    onCreateAndAnother: submitCreateAndAnother,
  };
}
