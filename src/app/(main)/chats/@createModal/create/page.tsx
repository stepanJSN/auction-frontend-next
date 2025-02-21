import ModalPage from "@/components/ModalPage";
import { Box, SxProps, Typography } from "@mui/material";

const pageInnerWrapper: SxProps = {
  p: 2,
  minWidth: {
    xs: "none",
    sm: 450,
  },
};

export default function CreateChatPage() {
  // const { handleCreate, errorCode, creationStatus } = useCreateChat();
  // const getErrorMessage = useErrorMessage(manageChatErrorMessages);

  // const actions = useMemo(
  //   () => (
  //     <Button
  //       disabled={
  //         creationStatus === MutationStatusEnum.PENDING ||
  //         creationStatus === MutationStatusEnum.SUCCESS
  //       }
  //       type="submit"
  //       variant="contained">
  //       {creationStatus === MutationStatusEnum.PENDING
  //         ? 'Creating...'
  //         : 'Create'}
  //     </Button>
  //   ),
  //   [creationStatus],
  // );

  return (
    <ModalPage>
      <Box sx={pageInnerWrapper}>
        <Typography variant="h5" gutterBottom>
          Create chat
        </Typography>
      </Box>
    </ModalPage>
  );
}
