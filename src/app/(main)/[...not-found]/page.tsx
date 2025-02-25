import { ROUTES } from "@/config/routesConfig";
import { Box, Link, Stack, SxProps, Typography } from "@mui/material";

const containerStyles: SxProps = {
  height: "70vh",
  alignItems: "center",
  justifyContent: "center",
};

const textWrapperStyles: SxProps = {
  textAlign: "center",
};

export default function NotFoundPage() {
  return (
    <>
      <Stack sx={containerStyles}>
        <Box sx={textWrapperStyles}>
          <Typography variant="h4" gutterBottom>
            404 Page not found
          </Typography>
          <Link href={ROUTES.USER_CARDS}>Go to the home page</Link>
        </Box>
      </Stack>
    </>
  );
}
