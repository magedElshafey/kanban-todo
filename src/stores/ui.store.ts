import { create } from "zustand";
import type { ColumnId, Priority, Task } from "../shared/types/task";

type DialogMode = "create" | "edit";

type UiState = {
  search: string;
  priorityFilter: Priority[];

  taskDialogOpen: boolean;
  dialogMode: DialogMode;
  editingTask: Task | null;
  createPrefillColumn: ColumnId | null;
};

type UiActions = {
  setSearch: (v: string) => void;

  togglePriority: (p: Priority) => void;
  resetPriorityFilter: () => void;

  openCreate: () => void;
  openCreateInColumn: (column: ColumnId) => void;
  openEdit: (task: Task) => void;
  closeDialog: () => void;
};

export type UiStore = UiState & UiActions;

const initialState: UiState = {
  search: "",
  priorityFilter: [],
  taskDialogOpen: false,
  dialogMode: "create",
  editingTask: null,
  createPrefillColumn: null,
};

function toggleInArray<T>(arr: T[], value: T) {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

export const useUiStore = create<UiStore>((set) => {
  const openDialog = (params: {
    mode: DialogMode;
    task?: Task | null;
    prefillColumn?: ColumnId | null;
  }) => {
    set({
      taskDialogOpen: true,
      dialogMode: params.mode,
      editingTask: params.task ?? null,
      createPrefillColumn: params.prefillColumn ?? null,
    });
  };

  return {
    ...initialState,

    setSearch: (v) => set({ search: v }),

    togglePriority: (p) =>
      set((state) => ({
        priorityFilter: toggleInArray(state.priorityFilter, p),
      })),

    resetPriorityFilter: () => set({ priorityFilter: [] }),

    openCreate: () => openDialog({ mode: "create" }),

    openCreateInColumn: (column) => openDialog({ mode: "create", prefillColumn: column }),

    openEdit: (task) => openDialog({ mode: "edit", task }),

    closeDialog: () =>
      set({
        taskDialogOpen: false,
        editingTask: null,
        createPrefillColumn: null,
      }),
  };
});

export const uiSelectors = {
  search: (s: UiStore) => s.search,
  priorityFilter: (s: UiStore) => s.priorityFilter,

  taskDialogOpen: (s: UiStore) => s.taskDialogOpen,
  dialogMode: (s: UiStore) => s.dialogMode,
  editingTask: (s: UiStore) => s.editingTask,
  createPrefillColumn: (s: UiStore) => s.createPrefillColumn,

  setSearch: (s: UiStore) => s.setSearch,
  togglePriority: (s: UiStore) => s.togglePriority,
  resetPriorityFilter: (s: UiStore) => s.resetPriorityFilter,

  openCreate: (s: UiStore) => s.openCreate,
  openCreateInColumn: (s: UiStore) => s.openCreateInColumn,
  openEdit: (s: UiStore) => s.openEdit,
  closeDialog: (s: UiStore) => s.closeDialog,
} as const;
