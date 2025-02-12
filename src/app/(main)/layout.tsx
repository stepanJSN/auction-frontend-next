"use client";
import { Container, Stack, SxProps } from "@mui/material";
import useUserData from "./useUserData";
import useWebsocket from "./useWebsocket";
import Header from "./(header)/Header";
import Footer from "./Footer";

const globalWrapperStyles: SxProps = {
  minHeight: "100vh",
};

const containerStyles: SxProps = {
  flex: "auto",
  position: "relative",
  py: 2,
};

export default function MainLayout({
  children,
  cardModal,
}: Readonly<{
  children: React.ReactNode;
  cardModal: React.ReactNode;
}>) {
  useUserData();
  useWebsocket();

  return (
    <Stack sx={globalWrapperStyles}>
      <Header />
      <Container sx={containerStyles}>{children}</Container>
      {cardModal}
      <Footer />
    </Stack>
  );
}
