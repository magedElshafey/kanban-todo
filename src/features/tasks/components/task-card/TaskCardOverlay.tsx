import { Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React, { memo } from "react";

import type { Task } from "../../../../shared/types/task";
import { TaskCardFooter } from "./TaskCardFooter";
import { TaskCardHeader } from "./TaskCardHeader";

const MotionPaper = motion(Paper);

export const TaskCardOverlay = memo(function TaskCardOverlay({ task }: { task: Task }) {
  return (
    <MotionPaper
      variant="outlined"
      sx={{
        px: 2,
        py: 1.25,
        borderRadius: 3,
        borderColor: "rgba(0,0,0,0.08)",
        bgcolor: "rgba(255,255,255,0.95)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        pointerEvents: "none",
      }}
    >
      <Stack spacing={1}>
        <TaskCardHeader
          title={task.title}
          description={task.description}
          onEdit={() => {}}
          onDelete={() => {}}
        />
        <TaskCardFooter priority={task.priority} onChangePriority={() => {}} />
      </Stack>
    </MotionPaper>
  );
});
