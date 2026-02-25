import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, Chip, IconButton, Stack } from "@mui/material";
import { memo } from "react";
import type { Priority } from "../../../shared/types/task";

export const FilterBarView = memo(function FilterBarView({
  priorities,
  selected,
  onToggle,
  onReset,
  hasFilter,
}: {
  priorities: Priority[];
  selected: Priority[];
  onToggle: (p: Priority) => void;
  onReset: () => void;
  hasFilter: boolean;
}) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: { xs: 56, sm: 64 },
        zIndex: 10,
        bgcolor: "background.paper",
        borderBottom: "1px solid #eaecef",
        px: 2,
        py: 1.25,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <FilterAltIcon fontSize="small" />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {priorities.map((p) => {
            const active = selected.includes(p);

            return (
              <Chip
                key={p}
                label={p.toUpperCase()}
                clickable
                onClick={() => onToggle(p)}
                variant={active ? "filled" : "outlined"}
                sx={{
                  flex: "0 0 auto",
                  fontWeight: 900,
                  borderRadius: 999,
                  transition: "all 150ms ease",
                  transform: active ? "scale(1.05)" : "scale(1)",
                  ...(active && {
                    bgcolor: "rgba(29,78,216,0.10)",
                    color: "primary.main",
                    borderColor: "rgba(29,78,216,0.22)",
                  }),
                }}
              />
            );
          })}
        </Box>

        <Box sx={{ flex: 1 }} />

        {hasFilter && (
          <IconButton
            size="small"
            onClick={onReset}
            sx={{
              flex: "0 0 auto",
              bgcolor: "rgba(0,0,0,0.05)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
});
