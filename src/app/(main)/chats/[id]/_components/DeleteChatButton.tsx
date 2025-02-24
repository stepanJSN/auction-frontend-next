import useMutation from "@/hooks/useMutation";
import { Button } from "@mui/material";
import { deleteChatAction } from "../../chats.actions";
import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { MutationStatusEnum } from "@/enums/mutationStatus";

type DeleteChatButtonProps = {
  chatId: string;
};

export default function DeleteChatButton({ chatId }: DeleteChatButtonProps) {
  const { isPending, mutate: deleteChat } = useMutation(deleteChatAction);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = useCallback(async () => {
    const response = await deleteChat(chatId);
    if (response.status === MutationStatusEnum.ERROR) {
      enqueueSnackbar("Error. Failed to delete chat", {
        variant: "error",
      });
    }
  }, [chatId, deleteChat, enqueueSnackbar]);

  return (
    <Button
      variant="contained"
      color="error"
      disabled={isPending}
      fullWidth
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
