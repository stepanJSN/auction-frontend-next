import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function useSidebarVisibility(
  mobileVersionBreakpoint: Breakpoint,
) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobileVersion = useMediaQuery(
    theme.breakpoints.down(mobileVersionBreakpoint),
  );
  const toggleSidebarVisibility = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const ref = useRef(null);

  useOnClickOutside(ref, handleSidebarClose);

  return {
    isSidebarOpen: isMobileVersion ? isSidebarOpen : true,
    toggleSidebarVisibility,
    ref,
  };
}
