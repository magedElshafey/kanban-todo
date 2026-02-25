import { Box } from "@mui/material";
import React from "react";

export function AppShell({
  header,
  subHeader,
  children,
  footer,
}: {
  header: React.ReactNode;
  subHeader?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {header}
      {subHeader}
      <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
      {footer}
    </Box>
  );
}
