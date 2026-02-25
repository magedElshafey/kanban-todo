import React, { useMemo } from "react";
import { TaskFormView } from "./TaskFormView";
import { useTaskFormDialog } from "./useTaskFormDialog";

export function TaskFormDialog() {
  const {
    open,
    close,
    isEdit,
    isMobile,
    busy,
    prefillColumn,
    titleInputRef,
    createError,
    updateError,
    form,
    onPrimarySubmit,
    onCreateAndAnother,
  } = useTaskFormDialog();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const dialogTitle = isEdit ? "Edit task" : "Create task";
  const showCreateAndAnother = !isEdit;

  const canEditColumn = useMemo(() => {
    if (isEdit) return true;
    return !prefillColumn;
  }, [isEdit, prefillColumn]);
  return (
    <TaskFormView
      open={open}
      title={dialogTitle}
      busy={busy}
      isMobile={isMobile}
      canEditColumn={canEditColumn}
      control={control}
      errors={errors}
      titleInputRef={titleInputRef}
      onClose={close}
      onSubmitPrimary={handleSubmit(onPrimarySubmit)}
      onSubmitAndAnother={handleSubmit(onCreateAndAnother)}
      showCreateAndAnother={showCreateAndAnother}
      showError={createError || updateError}
    />
  );
}
