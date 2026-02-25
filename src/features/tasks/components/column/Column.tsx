import { Card, CardContent, Divider } from "@mui/material";
import { useCallback } from "react";

import type { ColumnId } from "../../../../shared/types/task";
import { useUiStore, uiSelectors } from "../../../../stores/ui.store";
import { ColumnBody } from "./ColumnBody";
import { ColumnHeader } from "./ColumnHeader";
import { useColumnTasks } from "./useColumnTasks";

export function Column({
  columnId,
  title,
  color,
}: {
  columnId: ColumnId;
  title: string;
  color: string;
}) {
  const openCreateInColumn = useUiStore(uiSelectors.openCreateInColumn);

  const {
    tasks,
    total,
    sentinelRef,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    refetch,
  } = useColumnTasks(columnId);

  const handleAddTask = useCallback(
    (col: ColumnId) => openCreateInColumn(col),
    [openCreateInColumn],
  );

  const handleRetry = useCallback(() => refetch(), [refetch]);
  const handleFetchNext = useCallback(() => fetchNextPage(), [fetchNextPage]);

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: { xs: "65vh", md: "100vh" },
        bgcolor: "rgba(0,0,0,0.02)",
        borderColor: "rgba(0,0,0,0.06)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          pb: 2,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <ColumnHeader title={title} color={color} total={total} />
        <Divider sx={{ my: 1.5 }} />

        <ColumnBody
          title={title}
          columnId={columnId}
          tasks={tasks}
          sentinelRef={sentinelRef}
          isLoading={isLoading}
          isError={isError}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onRetry={handleRetry}
          onFetchNext={handleFetchNext}
          onAddTask={handleAddTask}
        />
      </CardContent>
    </Card>
  );
}
