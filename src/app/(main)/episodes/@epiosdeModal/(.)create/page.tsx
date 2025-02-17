import ModalPage from "@/components/ModalPage";
import { Box, Typography } from "@mui/material";
import CreateEpisodeForm from "../../CreateEpisodeForm";

export default function CreateEpisodePage() {
  return (
    <ModalPage maxWidth="xs">
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Create episode</Typography>
        <CreateEpisodeForm />
      </Box>
    </ModalPage>
  );
}
