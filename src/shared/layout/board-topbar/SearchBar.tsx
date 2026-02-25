import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { debounce } from "../../utils/debounce";

export const SearchBar = memo(function SearchBar({
  value,
  onChangeDebounced,
  delay = 300,
}: {
  value: string;
  onChangeDebounced: (value: string) => void;
  delay?: number;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  const debounced = useMemo(() => debounce(onChangeDebounced, delay), [onChangeDebounced, delay]);

  return (
    <TextField
      fullWidth
      value={local}
      onChange={(e) => {
        const v = e.target.value;
        setLocal(v);
        debounced(v);
      }}
      placeholder="Search tasks (title or description)…"
      inputProps={{ "aria-label": "Search tasks" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
});
