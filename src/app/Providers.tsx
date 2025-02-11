"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import StoreProvider from "./StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <StoreProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
  );
}
