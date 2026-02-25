import { CssBaseline } from "@mui/material";
import { QueryProvider } from "./providers/QueryProvider";
import { AppThemeProvider } from "./providers/ThemeProvider";
import { BoardPage } from "../pages/BoardPage";
import { Toaster } from "sonner";
export function App() {
  return (
    <QueryProvider>
      <AppThemeProvider>
        <CssBaseline />
        <BoardPage />
        <Toaster richColors position="top-right" closeButton />
      </AppThemeProvider>
    </QueryProvider>
  );
}
