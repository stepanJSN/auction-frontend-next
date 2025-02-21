import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useMutation from "@/hooks/useMutation";
import { deleteMessageAction } from "../../chats.actions";
import { useCallback } from "react";

type DeleteMessageButtonProps = {
  chatId: string;
  messageId: string;
};

export default function DeleteMessageButton({
  chatId,
  messageId,
}: DeleteMessageButtonProps) {
  const { isPending, mutate: deleteMessage } = useMutation(deleteMessageAction);
  const handleDelete = useCallback(() => {
    deleteMessage({
      chatId,
      messageId,
    });
  }, [chatId, deleteMessage, messageId]);

  return (
    <IconButton
      disabled={isPending}
      aria-label="delete"
      size="small"
      color="error"
      onClick={handleDelete}
    >
      <DeleteIcon />
    </IconButton>
  );
}
