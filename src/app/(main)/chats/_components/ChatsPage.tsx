import { Button, Stack, SxProps, Typography } from "@mui/material";
import SearchChats from "./SearchChats";
import { ResponsiveStyleValue } from "@mui/system";
import Link from "next/link";
import { ROUTES } from "@/config/routesConfig";
import { Suspense } from "react";
import ChatsWrapper from "./ChatsWrapper";
import { CHAT_NAME_PARAM } from "../page";

const headerStyles: SxProps = {
  mb: 2,
};

const headerDirection: ResponsiveStyleValue<"row" | "column"> = {
  xs: "column",
  sm: "row",
};

export default async function ChatsPage(props: {
  searchParams?: Promise<{
    [CHAT_NAME_PARAM]?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchChatName = searchParams?.[CHAT_NAME_PARAM];
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Your chats
      </Typography>
      <Stack direction={headerDirection} spacing={1} sx={headerStyles}>
        <SearchChats />
        <Button component={Link} href={ROUTES.CREATE_CHAT} variant="outlined">
          Create chat
        </Button>
      </Stack>
      <Suspense>
        <ChatsWrapper chatName={searchChatName} page={currentPage} />
      </Suspense>
    </>
  );
}
