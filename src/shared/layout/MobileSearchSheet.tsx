import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useUiStore, uiSelectors } from "../../stores/ui.store";

export function MobileSearchSheet({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const search = useUiStore(uiSelectors.search);
  const setSearch = useUiStore(uiSelectors.setSearch);

  const [draft, setDraft] = useState(search);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setDraft(search), [search]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const submit = () => {
    setSearch(draft.trim());
    onClose();
  };

  const reset = () => {
    setDraft("");
    setSearch("");
    onClose();
  };

  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableDiscovery={iOS}
      disableBackdropTransition={!iOS}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          pb: "env(safe-area-inset-bottom)",
        },
        role: "dialog",
        "aria-label": "Search tasks",
      }}
    >
      <Box sx={{ pt: 1, pb: 0.5, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 44, height: 5, borderRadius: 999, bgcolor: "rgba(0,0,0,0.18)" }} />
      </Box>

      <Box sx={{ px: 2, pb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontWeight: 900, flex: "1 1 auto" }}>Search</Typography>
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        sx={{ px: 2, pb: 2 }}
      >
        <TextField
          inputRef={inputRef}
          fullWidth
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search tasks (title or description)…"
          inputProps={{ "aria-label": "Search tasks input" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: draft.trim() ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="Clear" onClick={() => setDraft("")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          <Button type="button" variant="outlined" onClick={reset}>
            Reset
          </Button>
          <Button type="submit" variant="contained" disabled={draft.trim() === search.trim()}>
            Apply
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
