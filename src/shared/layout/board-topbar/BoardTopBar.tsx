import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useUiStore, uiSelectors } from "../../../stores/ui.store";
import { CreateButton } from "./CreateButton";
import { SearchBar } from "./SearchBar";
import AddIcon from "@mui/icons-material/Add";

export function BoardTopBar({ onOpenMobileSearch }: { onOpenMobileSearch: () => void }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const search = useUiStore(uiSelectors.search);
  const setSearch = useUiStore(uiSelectors.setSearch);
  const openCreate = useUiStore(uiSelectors.openCreate);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid #eaecef" }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: { xs: 56, sm: 64 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            flex: "0 0 auto",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: { xs: 160, sm: 220 },
          }}
        >
          Kanban ToDo
        </Typography>

        {!isMobile && (
          <Box
            sx={{
              flex: "1 1 auto",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 760, minWidth: 0 }}>
              <SearchBar value={search} onChangeDebounced={setSearch} delay={250} />
            </Box>
          </Box>
        )}

        {isMobile && <Box sx={{ flex: "1 1 auto" }} />}

        <Box sx={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              aria-label="Open search"
              onClick={onOpenMobileSearch}
              sx={{
                bgcolor: "rgba(0,0,0,0.04)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.07)" },
              }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {!isMobile ? (
            <CreateButton onClick={openCreate} />
          ) : (
            <IconButton
              color="primary"
              onClick={openCreate}
              aria-label="Create new task"
              sx={{
                bgcolor: "rgba(29, 78, 216, 0.10)",
                "&:hover": { bgcolor: "rgba(29, 78, 216, 0.16)" },
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
