import { Box, Typography } from "@mui/material";
import CreateLocationForm from "../CreateLocationForm";

export default function CreateLocationPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Create location</Typography>
      <CreateLocationForm />
    </Box>
  );
}
