import { Box, Typography } from "@mui/material";
import CreateEpisodeForm from "../CreateEpisodeForm";

export default function CreateEpisodePage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Create episode</Typography>
      <CreateEpisodeForm />
    </Box>
  );
}
