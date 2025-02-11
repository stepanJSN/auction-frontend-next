import { Box, SxProps, Typography } from "@mui/material";

const authContainerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: 2,
};

const titleStyles = {
  mb: {
    sx: 1,
    md: 2,
  },
  textAlign: "center",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={authContainerStyles}>
      <Typography variant="h4" sx={titleStyles}>
        Rick & Morty cards
      </Typography>
      {children}
    </Box>
  );
}
