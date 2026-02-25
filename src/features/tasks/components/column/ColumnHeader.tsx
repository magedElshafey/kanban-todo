import { Box, Chip, Stack, Typography } from "@mui/material";
import { memo } from "react";

export const ColumnHeader = memo(function ColumnHeader({
  title,
  color,
  total,
}: {
  title: string;
  color: string;
  total: number;
}) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
        <Box
          aria-hidden="true"
          sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color, flex: "0 0 auto" }}
        />
        <Typography
          variant="caption"
          sx={{
            fontWeight: 900,
            letterSpacing: 1,
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        <Chip
          label={total}
          size="small"
          sx={{
            height: 22,
            fontWeight: 800,
            bgcolor: "rgba(0,0,0,0.06)",
          }}
        />
      </Stack>
    </Stack>
  );
});
