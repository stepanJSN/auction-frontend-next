"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <StoreProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarProvider>
              <CssBaseline />
              {children}
            </SnackbarProvider>
          </LocalizationProvider>
        </StoreProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
