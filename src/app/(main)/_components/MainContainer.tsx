"use client";
import { Container, SxProps } from "@mui/material";
import useNewMessageDisplay from "../useNewMessageDisplay";

const containerStyles: SxProps = {
  flex: "auto",
  position: "relative",
  py: 2,
};

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  useNewMessageDisplay();
  return <Container sx={containerStyles}>{children}</Container>;
}
