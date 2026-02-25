import { DndContext, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Box } from "@mui/material";
import { useMemo } from "react";

import { COLUMNS } from "../../../../shared/types/task";
import { Column } from "../column/Column";
import { TaskCardOverlay } from "../task-card/TaskCardOverlay";
import { useBoardDnd } from "./useBoardDnd";

export function Board() {
  const { sensors, activeTask, collisionDetection, handleDragStart, handleDragEnd } = useBoardDnd();

  const overlay = useMemo(() => {
    if (!activeTask) return null;
    return (
      <Box sx={{ width: 320, transform: "rotate(2deg)" }}>
        <TaskCardOverlay task={activeTask} />
      </Box>
    );
  }, [activeTask]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll
      modifiers={[restrictToWindowEdges]}
    >
      <Box
        sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2 }}
      >
        {COLUMNS.map((c) => (
          <Column key={c.id} columnId={c.id} title={c.title} color={c.color} />
        ))}
      </Box>

      <DragOverlay
        dropAnimation={{
          duration: 300,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {overlay}
      </DragOverlay>
    </DndContext>
  );
}
