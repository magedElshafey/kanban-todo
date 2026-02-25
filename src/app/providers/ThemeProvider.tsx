import { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1d4ed8" },
    secondary: { main: "#7c3aed" },
    background: { default: "#f6f7fb", paper: "#ffffff" },
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d32f2f",
          fontWeight: 700,
        },
      },
    },
  },
});

export function AppThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
