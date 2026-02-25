import { Box, Container, Stack, Typography, Link, Divider } from "@mui/material";

export function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        bgcolor: "background.paper",
        py: { xs: 2.5, md: 3 },
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ xs: "center", md: "center" }}
          justifyContent="space-between"
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://www.mindluster.com"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ fontWeight: 600 }}
            >
              MindLuster
            </Link>
            . All rights reserved.
          </Typography>

          <Divider
            sx={{
              display: { xs: "block", md: "none" },
              width: "60%",
            }}
          />

          <Typography variant="body2" color="text.secondary">
            Developed & Designed by{" "}
            <Link
              href="https://wa.me/201022153359"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ fontWeight: 600 }}
            >
              Maged Elshafey
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
