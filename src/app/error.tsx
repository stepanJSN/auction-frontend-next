"use client";

import { Button, Typography } from "@mui/material";
import { Box, Stack, SxProps } from "@mui/system";

const containerStyles: SxProps = {
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
};

const textWrapperStyles: SxProps = {
  textAlign: "center",
};

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack sx={containerStyles}>
      <Box sx={textWrapperStyles}>
        <Typography variant="h4" gutterBottom>
          Some error happened. Try again later
        </Typography>
        <Button onClick={reset}>Try again</Button>
      </Box>
    </Stack>
  );
}
