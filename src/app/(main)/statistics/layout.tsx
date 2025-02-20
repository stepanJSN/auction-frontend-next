import { Typography } from "@mui/material";
import { Suspense } from "react";
import GeneralStatisticsSkeleton from "./GeneralStatisticsSkeleton";

export default function StatisticsLayout({
  children,
  general,
}: {
  children: React.ReactNode;
  general: React.ReactNode;
}) {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Statistics
      </Typography>
      <Suspense fallback={<GeneralStatisticsSkeleton />}>{general}</Suspense>
      {children}
    </>
  );
}
