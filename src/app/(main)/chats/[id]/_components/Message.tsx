import { useMemo } from "react";
import { ListItem, Stack, SxProps, Typography } from "@mui/material";
import dayjs from "dayjs";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import DeleteMessageButton from "./DeleteMessageButton";
import { IMessageWithCreateStatus } from "../messageWithCreateStatus.interface";

const messageHeaderStyles: SxProps = {
  alignItems: "center",
};
const senderNameStyles: SxProps = {
  fontWeight: "bold",
};

type MessageProps = {
  chatId: string;
  message: IMessageWithCreateStatus;
};

export default function Message({ message, chatId }: MessageProps) {
  const messageStyles: SxProps = useMemo(
    () => ({
      bgcolor: message.sender.is_this_user_message
        ? "success.main"
        : "primary.main",
      p: 1.5,
      borderRadius: 2,
      color: "common.white",
      minWidth: "30%",
      maxWidth: "70%",
    }),
    [message.sender.is_this_user_message],
  );

  const listItemStyles: SxProps = useMemo(
    () => ({
      justifyContent: message.sender.is_this_user_message
        ? "flex-end"
        : "flex-start",
    }),
    [message.sender.is_this_user_message],
  );

  return (
    <ListItem sx={listItemStyles}>
      <Stack sx={messageStyles}>
        <Stack direction="row" sx={messageHeaderStyles} spacing={1}>
          <Typography sx={senderNameStyles}>
            {message.sender.is_this_user_message
              ? "You"
              : `${message.sender.name} ${message.sender.surname}`}
          </Typography>
          <Typography variant="caption">
            {message.creationStatus === MutationStatusEnum.PENDING &&
              "Sending..."}
            {message.creationStatus === MutationStatusEnum.ERROR && "Error"}
            {message.creationStatus === MutationStatusEnum.SUCCESS &&
              dayjs(message.created_at).format("DD.MM.YYYY HH:mm")}
          </Typography>
          {message.sender.is_this_user_message &&
            message.creationStatus === MutationStatusEnum.SUCCESS && (
              <DeleteMessageButton chatId={chatId} messageId={message.id} />
            )}
        </Stack>
        {message.message}
      </Stack>
    </ListItem>
  );
}
