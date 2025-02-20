import PageError from "@/components/PageError";
import { Role } from "@/enums/role.enum";
import { userService } from "@/services/userService";
import { Alert, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Suspense } from "react";
import SystemFee from "./_components/SystemFee";
import CreateStripeAccountButton from "./_components/CreateStripeAccountButton";
import TransactionForms from "./_components/TransactionForms";
import { systemService } from "@/services/systemService";

const textPlaceholderSize: SxProps = {
  fontSize: "1rem",
};
const alertStyles = {
  my: 1,
};

export default async function Transactions() {
  const [{ data: user }, { data: exchangeRate }] = await Promise.all([
    userService.getCurrent(),
    systemService.getExchangeRate(),
  ]);

  if (!user || !exchangeRate) {
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
      <Typography variant="h5" gutterBottom>
        Exchange rate: for 1CP = {exchangeRate.exchange_rate}$
      </Typography>
      {!user.has_stripe_account && user.role === Role.USER && (
        <Alert severity="warning" sx={alertStyles}>
          If you want to withdraw funds, you need to add create a Stripe
          account.
          <CreateStripeAccountButton />
        </Alert>
      )}
      <TransactionForms
        role={user.role}
        exchangeRate={exchangeRate.exchange_rate}
      />
    </>
  );
}
