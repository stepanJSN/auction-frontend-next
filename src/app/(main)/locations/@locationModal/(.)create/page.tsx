import ModalPage from "@/components/ModalPage";
import { Box, Typography } from "@mui/material";
import CreateLocationForm from "../../CreateLocationForm";

export default function CreateLocationPage() {
  return (
    <ModalPage maxWidth="xs">
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Create location</Typography>
        <CreateLocationForm />
      </Box>
    </ModalPage>
  );
}
