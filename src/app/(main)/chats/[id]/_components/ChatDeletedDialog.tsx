import { ROUTES } from "@/config/routesConfig";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type ChatDeletedDialogProps = {
  open: boolean;
};

export default function ChatDeletedDialog({ open }: ChatDeletedDialogProps) {
  const router = useRouter();
  const handleClose = useCallback(() => {
    router.push(ROUTES.CHATS);
  }, [router]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="chat-deleted-dialog-title"
      aria-describedby="chat-deleted-dialog-description"
    >
      <DialogTitle id="chat-deleted-dialog-title">Chat was deleted</DialogTitle>
      <DialogContent>
        <DialogContentText id="chat-deleted-dialog-description">
          The chat was deleted by some participant
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
