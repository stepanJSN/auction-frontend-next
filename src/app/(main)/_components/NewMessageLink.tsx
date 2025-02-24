import { ROUTES } from "@/config/routesConfig";
import { Link, SxProps } from "@mui/material";
import NextLink from "next/link";
import React from "react";

const linkStyles: SxProps = {
  color: "common.white",
};

export default function NewMessageLink({ chatId }: { chatId: string }) {
  return (
    <Link component={NextLink} href={ROUTES.CHAT(chatId)} sx={linkStyles}>
      See message
    </Link>
  );
}
