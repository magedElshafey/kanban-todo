import { toast } from "sonner";

export function confirmDeleteToast(params: {
  title?: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
}) {
  const {
    title = "Delete task?",
    description = "This action can’t be undone.",
    confirmLabel = "Delete",
    onConfirm,
  } = params;

  toast(title, {
    description,
    action: {
      label: confirmLabel,
      onClick: onConfirm,
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
}
