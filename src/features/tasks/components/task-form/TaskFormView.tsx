import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { COLUMNS, PRIORITIES } from "../../../../shared/types/task";
import { HelperText } from "./HelperText";

const HELP_MIN = 20;

export function TaskFormView({
  open,
  title,
  busy,
  isMobile,
  canEditColumn,
  control,
  errors,
  titleInputRef,
  onClose,
  onSubmitPrimary,
  onSubmitAndAnother,
  showCreateAndAnother,
  showError,
}: {
  open: boolean;
  title: string;
  busy: boolean;
  isMobile: boolean;
  canEditColumn: boolean;

  control: any;
  errors: any;
  titleInputRef: React.RefObject<HTMLInputElement>;

  onClose: () => void;
  onSubmitPrimary: () => void;
  onSubmitAndAnother: () => void;
  showCreateAndAnother: boolean;
  showError: boolean;
}) {
  return (
    <Dialog open={open} onClose={() => (!busy ? onClose() : undefined)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900 }}>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Controller
            control={control}
            name="title"
            render={({ field }: any) => (
              <TextField
                {...field}
                inputRef={titleInputRef}
                label="Title"
                required
                error={!!errors.title}
                helperText={<HelperText text={errors.title?.message} />}
                FormHelperTextProps={{ sx: { m: 0, mt: 0.5, minHeight: `${HELP_MIN}px` } }}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }: any) => (
              <TextField
                {...field}
                label="Description"
                required
                multiline
                minRows={3}
                error={!!errors.description}
                helperText={<HelperText text={errors.description?.message} />}
                FormHelperTextProps={{ sx: { m: 0, mt: 0.5, minHeight: `${HELP_MIN}px` } }}
              />
            )}
          />

          <Controller
            control={control}
            name="priority"
            render={({ field }: any) => (
              <TextField
                {...field}
                select
                label="Priority"
                required
                error={!!errors.priority}
                helperText={<HelperText text={errors.priority?.message} />}
                FormHelperTextProps={{ sx: { m: 0, mt: 0.5, minHeight: `${HELP_MIN}px` } }}
              >
                {PRIORITIES.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.title}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="column"
            render={({ field }: any) => (
              <TextField
                {...field}
                select
                label="Column"
                required
                disabled={!canEditColumn}
                error={!!errors.column}
                helperText={<HelperText text={errors.column?.message} />}
                FormHelperTextProps={{ sx: { m: 0, mt: 0.5, minHeight: `${HELP_MIN}px` } }}
              >
                {COLUMNS.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.title}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {showError && (
            <Typography color="error" variant="body2">
              Something went wrong. Please try again.
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          gap: 1,
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: "stretch",
        }}
      >
        <Button
          onClick={onClose}
          disabled={busy}
          fullWidth={isMobile}
          sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minHeight: 44 }}
        >
          Cancel
        </Button>

        {showCreateAndAnother && (
          <Button
            variant="outlined"
            disabled={busy}
            onClick={onSubmitAndAnother}
            fullWidth={isMobile}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: 44,
            }}
          >
            Create & add another
          </Button>
        )}

        <Button
          variant="contained"
          disabled={busy}
          onClick={onSubmitPrimary}
          fullWidth={isMobile}
          sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minHeight: 44 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
