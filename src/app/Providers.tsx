"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import StoreProvider from "../provider/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { SocketProvider } from "@/provider/SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <StoreProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SocketProvider>
              <SnackbarProvider>
                <CssBaseline />
                {children}
              </SnackbarProvider>
            </SocketProvider>
          </LocalizationProvider>
        </StoreProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
