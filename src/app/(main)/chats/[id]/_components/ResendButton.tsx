import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useCallback } from "react";

type ResendButtonProps = {
  messageId: string;
  onResendMessage: (messageId: string) => void;
};

export default function ResendButton({
  messageId,
  onResendMessage,
}: ResendButtonProps) {
  const handleResend = useCallback(() => {
    onResendMessage(messageId);
  }, [onResendMessage, messageId]);

  return (
    <IconButton
      aria-label="resend"
      size="small"
      color="error"
      onClick={handleResend}
    >
      <RefreshIcon />
    </IconButton>
  );
}
