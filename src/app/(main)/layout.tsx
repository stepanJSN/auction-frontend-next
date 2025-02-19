"use client";
import { Container, Stack, SxProps } from "@mui/material";
import useUserData from "./useUserData";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  useUserData();

  return (
    <Stack sx={globalWrapperStyles}>
      <Header />
      <Container sx={containerStyles}>{children}</Container>
      <Footer />
    </Stack>
  );
}
