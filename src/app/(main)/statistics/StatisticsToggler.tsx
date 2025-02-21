"use client";
import { ROUTES } from "@/config/routesConfig";
import { Tabs, Tab } from "@mui/material";
import { redirect, usePathname } from "next/navigation";

export default function StatisticsToggler() {
  const pathname = usePathname();
  const handleTabChange = (_event: React.SyntheticEvent, value: string) => {
    redirect(value);
  };

  return (
    <Tabs
      value={pathname}
      onChange={handleTabChange}
      aria-label="statistics tabs"
    >
      <Tab label="Cards" value={ROUTES.CARDS_STATISTICS} />
      <Tab label="Sets" value={ROUTES.SETS_STATISTICS} />
      <Tab label="Top users" value={ROUTES.USERS_STATISTICS} />
    </Tabs>
  );
}
