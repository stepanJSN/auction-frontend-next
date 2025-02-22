import { Container, Stack, SxProps } from "@mui/material";
import Header from "./(header)/Header";
import Footer from "./Footer";
import MainProviders from "./MainProviders";
import { userService } from "@/services/userService";
import PageError from "@/components/PageError";

const globalWrapperStyles: SxProps = {
  minHeight: "100vh",
};

const containerStyles: SxProps = {
  flex: "auto",
  position: "relative",
  py: 2,
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: userData } = await userService.getCurrent();

  if (!userData) {
    return <PageError />;
  }

  return (
    <MainProviders userData={userData}>
      <Stack sx={globalWrapperStyles}>
        <Header />
        <Container sx={containerStyles}>{children}</Container>
        <Footer />
      </Stack>
    </MainProviders>
  );
}
