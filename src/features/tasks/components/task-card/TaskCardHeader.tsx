import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { memo } from "react";

export const TaskCardHeader = memo(function TaskCardHeader({
  title,
  description,
  onEdit,
  onDelete,
}: {
  title: string;
  description?: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box sx={{ minWidth: 0, pr: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 900,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={0.5} sx={{ flex: "0 0 auto" }}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              color: "primary.main",
              bgcolor: "rgba(29,78,216,0.08)",
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              color: "error.main",
              bgcolor: "rgba(239,68,68,0.08)",
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
});
