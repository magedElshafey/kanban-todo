import { Chip, MenuItem, Select, Stack } from "@mui/material";
import { memo } from "react";
import type { Priority } from "../../../../shared/types/task";

function priorityStyles(p: Priority) {
  if (p === "high") return { bgcolor: "rgba(239,68,68,0.12)", color: "#b91c1c" };
  if (p === "medium") return { bgcolor: "rgba(245,158,11,0.16)", color: "#92400e" };
  return { bgcolor: "rgba(107,114,128,0.12)", color: "#374151" };
}

export const TaskCardFooter = memo(function TaskCardFooter({
  priority,
  onChangePriority,
}: {
  priority: Priority;
  onChangePriority: (priority: Priority) => void;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Chip
        size="small"
        label={priority.toUpperCase()}
        sx={{
          fontWeight: 900,
          height: 22,
          ...priorityStyles(priority),
        }}
      />

      <Select
        size="small"
        value={priority}
        onChange={(e) => onChangePriority(e.target.value as Priority)}
        sx={{ height: 30, fontSize: 13, minWidth: 110 }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
    </Stack>
  );
});
