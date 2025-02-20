import PageError from "@/components/PageError";
import { Role } from "@/enums/role.enum";
import { userService } from "@/services/userService";
import { Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Suspense } from "react";
import SystemFee from "./_components/SystemFee";
import ExchangeRate from "./_components/ExchangeRate";
import CreateStripeAccountButton from "./_components/CreateStripeAccountButton";

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
      {!user.has_stripe_account && user.role === Role.USER && (
        <CreateStripeAccountButton />
      )}
    </>
  );
}
