import ModalPage from "@/components/ModalPage";
import { Box, SxProps, Typography } from "@mui/material";

const pageInnerWrapper: SxProps = {
  p: 2,
  minWidth: {
    xs: "none",
    sm: 450,
  },
};

export default function EditChatPage() {
  return (
    <ModalPage>
      <Box sx={pageInnerWrapper}>
        <Typography variant="h5" gutterBottom>
          Edit chat
        </Typography>
      </Box>
    </ModalPage>
  );
}
