import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IChat } from "@/interfaces/chats.interfaces";
import Link from "next/link";
import { ROUTES } from "@/config/routesConfig";
import DeleteChatButton from "./DeleteChatButton";

const mainContainerStyles: SxProps = {
  height: "100%",
  backgroundColor: "common.white",
  minWidth: "300px",
  maxWidth: {
    xs: "80%",
    md: "100%",
  },
  padding: 2,
  zIndex: 1,
};
const settingsBackgroundStyles: SxProps = {
  position: {
    xs: "absolute",
    md: "static",
  },
  width: "100%",
  right: "0",
  height: "98%",
  justifyContent: "flex-end",
  backgroundColor: "#8080800a",
};
const listStyles: SxProps = {
  flex: "auto",
};
const closeIconStyles: SxProps = {
  alignSelf: "flex-start",
  display: {
    sx: "block",
    md: "none",
  },
};

type ChatSettingsProps = {
  participants: IChat["users"];
  chatId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatSettings({
  isOpen,
  participants,
  onClose,
  chatId,
}: ChatSettingsProps) {
  const settingsVisibility = {
    display: {
      xs: isOpen ? "flex" : "none",
      md: "block",
    },
  };

  return (
    <Box sx={{ ...settingsBackgroundStyles, ...settingsVisibility }}>
      <Stack sx={mainContainerStyles}>
        <IconButton
          aria-label="Close settings"
          onClick={onClose}
          sx={closeIconStyles}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Participants</Typography>
        <List sx={listStyles}>
          {participants.map((participant) => (
            <ListItem key={participant.id}>
              <ListItemText primary={participant.name} />
            </ListItem>
          ))}
        </List>
        <Stack spacing={1}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            href={ROUTES.EDIT_CHAT(chatId)}
          >
            Edit
          </Button>
          <DeleteChatButton chatId={chatId} />
        </Stack>
      </Stack>
    </Box>
  );
}
