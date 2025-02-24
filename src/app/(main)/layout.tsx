import { Stack, SxProps } from "@mui/material";
import Header from "./_components/(header)/Header";
import Footer from "./_components/Footer";
import MainProviders from "./MainProviders";
import { userService } from "@/services/userService";
import PageError from "@/components/PageError";
import MainContainer from "./_components/MainContainer";

const globalWrapperStyles: SxProps = {
  minHeight: "100vh",
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
        <MainContainer>{children}</MainContainer>
        <Footer />
      </Stack>
    </MainProviders>
  );
}
