import ModalPage from "@/components/ModalPage";
import { Box, SxProps, Typography } from "@mui/material";
import CreateChatForm from "./_components/CreateChatForm";

const pageInnerWrapper: SxProps = {
  p: 2,
  minWidth: {
    xs: "none",
    sm: 450,
  },
};

export default function CreateChatPage() {
  return (
    <ModalPage>
      <Box sx={pageInnerWrapper}>
        <Typography variant="h5" gutterBottom>
          Create chat
        </Typography>
        <CreateChatForm />
      </Box>
    </ModalPage>
  );
}
