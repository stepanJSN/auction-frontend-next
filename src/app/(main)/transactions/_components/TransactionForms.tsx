"use client";
import { Grid2, GridSize } from "@mui/material";
import { topUpAction, withdrawAction } from "../transactions.actions";
import TransactionForm from "./TransactionForm";
import { useCallback, useMemo, useState } from "react";
import { Role } from "@/enums/role.enum";
import usePaymentIntent from "../usePaymentIntent";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/constants/envConstants";
import PaymentForm from "./PaymentForm";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import WithdrawError from "./WithdrawError";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { updateUserBalance } from "@/lib/features/user/userSlice";

const gridFormColumns: Record<string, GridSize> = {
  xs: 12,
  md: "grow",
};

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
console.log(STRIPE_PUBLISHABLE_KEY);

type TransactionFormsProps = {
  role: Role;
  exchangeRate: number;
};

export default function TransactionForms({
  role,
  exchangeRate,
}: TransactionFormsProps) {
  const { handleTopUp, paymentData, resetPaymentData } = usePaymentIntent();
  const [withdrawError, setWithdrawError] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onTopUpSubmit = useCallback(
    async (amount: number) => {
      if (role === Role.ADMIN) {
        const response = await topUpAction(amount);
        if (response.status === MutationStatusEnum.SUCCESS && response.data) {
          enqueueSnackbar("Operation was successfully", {
            variant: "success",
          });
          dispatch(updateUserBalance(response.data));
          return response.status;
        }
        enqueueSnackbar("Error. Operation was not successful", {
          variant: "error",
        });
      }
      handleTopUp(amount);
    },
    [role, handleTopUp, enqueueSnackbar, dispatch],
  );
  const onWithdrawSubmit = useCallback(
    async (amount: number) => {
      const response = await withdrawAction(amount);
      if (response.status === MutationStatusEnum.SUCCESS && response.data) {
        enqueueSnackbar("Operation was successfully", {
          variant: "success",
        });
        dispatch(updateUserBalance(response.data));
        return response.status;
      }
      setWithdrawError(response.errorCode);
    },
    [dispatch, enqueueSnackbar],
  );
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
