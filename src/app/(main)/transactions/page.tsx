import PageError from "@/components/PageError";
import { Role } from "@/enums/role.enum";
import { userService } from "@/services/userService";
import { Grid2, Skeleton, Typography } from "@mui/material";
import { GridSize, SxProps } from "@mui/system";
import { Suspense } from "react";
import SystemFee from "./_components/SystemFee";
import ExchangeRate from "./_components/ExchangeRate";
import TransactionForm from "./_components/TransactionForm";
import { topUpAction, withdrawAction } from "./transactions.actions";

const gridFormColumns: Record<string, GridSize> = {
  xs: 12,
  md: "grow",
};

const textPlaceholderSize: SxProps = {
  fontSize: "1rem",
};

export default async function Transactions() {
  const { data: user } = await userService.getCurrent();

  if (!user) {
    return <PageError />;
  }

  return (
    <>
      <Typography variant="h5">
        Total balance: {user.balance.total} CP
      </Typography>
      <Typography variant="h5">
        Available balance: {user.balance.available} CP
      </Typography>
      {user.role === Role.ADMIN && (
        <Suspense
          fallback={<Skeleton variant="text" sx={textPlaceholderSize} />}
        >
          <SystemFee />
        </Suspense>
      )}
      <Suspense fallback={<Skeleton variant="text" sx={textPlaceholderSize} />}>
        <ExchangeRate />
      </Suspense>
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <TransactionForm title="Top Up" onSubmit={topUpAction} />
        </Grid2>
        <Grid2 size={gridFormColumns}>
          <TransactionForm title="Withdraw" onSubmit={withdrawAction} />
        </Grid2>
      </Grid2>
    </>
  );
}
