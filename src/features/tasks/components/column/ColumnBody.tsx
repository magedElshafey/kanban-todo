import AddIcon from "@mui/icons-material/Add";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Box, Button, CircularProgress, Skeleton, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

import type { ColumnId, Task } from "../../../../shared/types/task";
import { TaskCard } from "../task-card/TaskCard";

type Props = {
  title: string;
  columnId: ColumnId;

  tasks: Task[];
  sentinelRef: React.RefObject<HTMLDivElement>;

  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;

  onRetry: () => void;
  onFetchNext: () => void;
  onAddTask: (columnId: ColumnId) => void;
};

export const ColumnBody = memo(function ColumnBody({
  title,
  columnId,
  tasks,
  sentinelRef,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  onRetry,
  onFetchNext,
  onAddTask,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: `column:${columnId}`,
    data: { type: "column", columnId },
  });
  return (
    <Box
      ref={setNodeRef}
      data-scroll-container="true"
      role="region"
      aria-label={`${title} column`}
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        pr: 0.5,
        WebkitOverflowScrolling: "touch",
      }}
    >
      {isLoading ? (
        <Stack spacing={1}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={78} />
          ))}
        </Stack>
      ) : isError ? (
        <Stack spacing={1} sx={{ py: 2 }}>
          <Typography color="error" variant="body2">
            Failed to load tasks.
          </Typography>
          <Button size="small" onClick={onRetry}>
            Retry
          </Button>
        </Stack>
      ) : (
        <SortableContext
          items={tasks.map((t) => `task:${t.id}`)}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={1}>
            {tasks.length === 0 ? (
              <Box sx={{ py: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  No tasks yet.
                </Typography>
              </Box>
            ) : (
              tasks.map((t, index) => <TaskCard key={t.id} task={t} index={index} />)
            )}

            <Box sx={{ pt: 0.5 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => onAddTask(columnId)}
                sx={{
                  borderStyle: "dashed",
                  borderColor: "rgba(0,0,0,0.18)",
                  color: "text.secondary",
                  bgcolor: "rgba(255,255,255,0.6)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  whiteSpace: "nowrap",
                }}
              >
                Add task
              </Button>
            </Box>

            <Box ref={sentinelRef} sx={{ height: 1 }} />

            {isFetchingNextPage && (
              <Stack direction="row" justifyContent="center" sx={{ py: 1 }}>
                <CircularProgress size={18} aria-label="Loading more" />
              </Stack>
            )}

            {hasNextPage && !isFetchingNextPage && (
              <Stack direction="row" justifyContent="center" sx={{ py: 1 }}>
                <Button size="small" onClick={onFetchNext}>
                  Load more
                </Button>
              </Stack>
            )}
          </Stack>
        </SortableContext>
      )}
    </Box>
  );
});
