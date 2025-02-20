import { Box, SxProps, Typography } from "@mui/material";
import { Suspense } from "react";
import GeneralStatisticsSkeleton from "./GeneralStatisticsSkeleton";
import StatisticsToggler from "./StatisticsToggler";

const generalWrapperStyles: SxProps = {
  mb: 2,
};

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
      <Box sx={generalWrapperStyles}>
        <Suspense fallback={<GeneralStatisticsSkeleton />}>{general}</Suspense>
      </Box>
      <StatisticsToggler />
      {children}
    </>
  );
}
