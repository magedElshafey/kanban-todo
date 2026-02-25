import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { memo } from "react";

export const CreateButton = memo(function CreateButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="contained" startIcon={<AddIcon />} onClick={onClick} aria-label="Create task">
      New task
    </Button>
  );
});
