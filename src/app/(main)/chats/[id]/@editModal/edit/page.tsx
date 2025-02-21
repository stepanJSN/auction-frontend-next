import ModalPage from "@/components/ModalPage";
import { Box, SxProps, Typography } from "@mui/material";
import EditChatForm from "./EditChatForm";
import { chatsService } from "@/services/chatsService";
import PageError from "@/components/PageError";

const pageInnerWrapper: SxProps = {
  p: 2,
  minWidth: {
    xs: "none",
    sm: 450,
  },
};

export default async function EditChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data: chatData } = await chatsService.findOne(id);

  if (!chatData) {
    return <PageError />;
  }

  return (
    <ModalPage>
      <Box sx={pageInnerWrapper}>
        <Typography variant="h5" gutterBottom>
          Edit chat
        </Typography>
        <EditChatForm initialData={chatData} />
      </Box>
    </ModalPage>
  );
}
