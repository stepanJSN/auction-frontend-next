import { selectUser } from "@/lib/features/user/userSlice";
import useNewMessageListener from "./chats/hooks/useNewMessageListener";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { IMessageEventPayload } from "@/interfaces/message.interfaces";
import NewMessageLink from "./_components/NewMessageLink";

export default function useNewMessageDisplay() {
  const { id } = useSelector(selectUser);
  const { enqueueSnackbar } = useSnackbar();

  const handleNewMessage = useCallback(
    (messageData: IMessageEventPayload) => {
      console.log(messageData);
      if (messageData.sender.id === id) return;
      enqueueSnackbar(`New message from ${messageData.sender.name}`, {
        variant: "info",
        action: <NewMessageLink chatId={messageData.chat_id} />,
      });
    },
    [enqueueSnackbar, id],
  );
  useNewMessageListener(handleNewMessage);
}
