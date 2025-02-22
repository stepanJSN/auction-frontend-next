"use client";
import { IUser } from "@/interfaces/user.interfaces";
import { SocketProvider } from "@/provider/SocketProvider";
import StoreProvider from "@/provider/StoreProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";

export default function MainProviders({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: IUser;
}) {
  return (
    <StoreProvider userData={userData}>
      <SocketProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </LocalizationProvider>
      </SocketProvider>
    </StoreProvider>
  );
}
