"use client";
import { Grid2, GridSize } from "@mui/material";
import TransactionForm from "./TransactionForm";
import { useMemo } from "react";
import { Role } from "@/enums/role.enum";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/constants/envConstants";
import PaymentForm from "./PaymentForm";
import WithdrawError from "./WithdrawError";
import useTopUp from "../useTopUp";
import useWithdraw from "../useWithdraw";

const gridFormColumns: Record<string, GridSize> = {
  xs: 12,
  md: "grow",
};

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

type TransactionFormsProps = {
  role: Role;
  exchangeRate: number;
  isTopUpSuccessful?: boolean;
};

export default function TransactionForms({
  role,
  exchangeRate,
  isTopUpSuccessful,
}: TransactionFormsProps) {
  const { onTopUpSubmit, paymentData, resetPaymentData } = useTopUp(
    role,
    isTopUpSuccessful,
  );
  const { onWithdrawSubmit, withdrawError } = useWithdraw();

  const stripeOptions = useMemo(
    () => ({ clientSecret: paymentData?.clientSecret }),
    [paymentData?.clientSecret],
  );

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <TransactionForm title="Top Up" onSubmit={onTopUpSubmit} />
        </Grid2>
        <Grid2 size={gridFormColumns}>
          <TransactionForm title="Withdraw" onSubmit={onWithdrawSubmit} />
        </Grid2>
      </Grid2>
      {withdrawError !== null && <WithdrawError errorCode={withdrawError} />}
      {paymentData?.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <PaymentForm
            numberOfPoints={paymentData.numberOfPoints}
            exchangeRate={exchangeRate}
            handleClose={resetPaymentData}
          />
        </Elements>
      )}
    </>
  );
}
