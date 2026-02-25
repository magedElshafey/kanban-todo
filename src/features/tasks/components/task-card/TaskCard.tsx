import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React, { memo, useMemo } from "react";

import type { Task } from "../../../../shared/types/task";
import { TaskCardFooter } from "./TaskCardFooter";
import { TaskCardHeader } from "./TaskCardHeader";
import { useTaskCardActions } from "./useTaskCardActions";

const MotionPaper = motion(Paper);

export const TaskCard = memo(function TaskCard({ task, index }: { task: Task; index: number }) {
  const { handleEdit, handleDelete, handlePriorityChange } = useTaskCardActions(task);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `task:${task.id}`,
    data: {
      type: "task",
      taskId: task.id,
      fromColumn: task.column,
      task,
    },
  });

  const style = useMemo<React.CSSProperties>(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.4 : 1,
      cursor: isDragging ? "grabbing" : "grab",
      touchAction: "none",
    }),
    [transform, transition, isDragging],
  );

  return (
    <MotionPaper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      variant="outlined"
      sx={{
        px: 2,
        py: 1.25,
        borderRadius: 3,
        borderColor: "rgba(0,0,0,0.08)",
        bgcolor: "rgba(255,255,255,0.95)",
        transition: "box-shadow 150ms ease",
        boxShadow: isDragging ? "0 18px 40px rgba(0,0,0,0.18)" : undefined,
        "&:hover": {
          boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Stack spacing={1}>
        <TaskCardHeader
          title={task.title}
          description={task.description}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TaskCardFooter priority={task.priority} onChangePriority={handlePriorityChange} />
      </Stack>
    </MotionPaper>
  );
});
