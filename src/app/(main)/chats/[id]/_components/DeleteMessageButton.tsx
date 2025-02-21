import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useMutation from "@/hooks/useMutation";
import { useCallback } from "react";
import { MutationStatusEnum } from "@/enums/mutationStatus";

type DeleteMessageButtonProps = {
  messageId: string;
  onDeleteMessage: (messageId: string) => Promise<{
    status: MutationStatusEnum;
  }>;
};

export default function DeleteMessageButton({
  onDeleteMessage,
  messageId,
}: DeleteMessageButtonProps) {
  const { isPending, mutate: deleteMessage } = useMutation(onDeleteMessage);
  const handleDelete = useCallback(() => {
    deleteMessage(messageId);
  }, [deleteMessage, messageId]);

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
